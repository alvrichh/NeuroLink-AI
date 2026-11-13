"""IS-01: fixed, session-held-out raw EEG baseline; no web integration."""
import argparse
from collections import Counter
import hashlib
import importlib.metadata
import json
from pathlib import Path
import platform
import subprocess

import mne
import numpy as np
from scipy.signal import welch
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import balanced_accuracy_score, confusion_matrix, f1_score, log_loss
from sklearn.model_selection import LeaveOneGroupOut
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

from download import LOCK, verify

LABELS = ['arriba', 'abajo', 'derecha', 'izquierda']
CONDITIONS = {21: 'pronounced', 22: 'inner', 23: 'visualized'}
SEED = 20261112


def parse_trials(events, sfreq):
    """Use actual markers, never infer missing labels/timing from class balance.

    Only complete 42 -> class -> 44 -> 45 sequences are admitted. Mask BioSemi
    status upper bits before calling. A missing condition is an error.
    """
    trials, rejected = [], Counter()
    condition, block = None, 0
    events = np.asarray(events)
    for i, (sample, _, code) in enumerate(events):
        if code in (15, 16):
            condition = None
        if code in CONDITIONS:
            condition = CONDITIONS[int(code)]
            block += 1
        if code not in (31, 32, 33, 34):
            continue
        if condition is None:
            raise ValueError('Class marker before condition marker')
        if i < 1 or i + 2 >= len(events) or list(events[i-1:i+3, 2]) != [42, code, 44, 45]:
            rejected['incomplete_sequence'] += 1
            continue
        cue, action, end = int(sample), int(events[i+1, 0]), int(events[i+2, 0])
        if not (0.45 <= (action-cue)/sfreq <= 0.65 and 2.5 <= (end-action)/sfreq <= 2.8):
            rejected['unexpected_timing'] += 1
            continue
        trials.append(dict(cue=cue, action=action, end=end, y=int(code)-31,
                           condition=condition, block=block))
    if not trials:
        raise ValueError('No valid trials')
    return trials, dict(rejected)


def bandpower(data, sfreq, bands):
    """Trial-local Welch power: no continuous filtering, resampling or fit."""
    freqs, psd = welch(data, fs=sfreq, nperseg=min(int(sfreq), data.shape[-1]),
                       noverlap=0, detrend='constant', axis=-1)
    values = []
    for lo, hi in bands:
        bins = (freqs >= lo) & (freqs < hi)
        if not bins.any():
            raise ValueError('Insufficient frequency resolution')
        values.append(np.log10(np.maximum(psd[..., bins].mean(axis=-1), 1e-30)))
    return np.concatenate(values, axis=-1)


def trial_features(data, sfreq):
    """Input ordered 128 EEG + EXG1..8 in volts; fixed linked-ear reference."""
    if data.shape[0] != 136 or not np.isfinite(data).all():
        raise ValueError('Expected finite 128 EEG + 8 EXG channels')
    eeg = data[:128] - data[128:130].mean(axis=0)
    eog = np.stack([data[130]-data[131], data[132]-data[133]])
    emg = data[134:136] - data[128:130].mean(axis=0)
    features = dict(eeg=bandpower(eeg, sfreq, [(4, 8), (8, 13), (13, 30)]),
                    eog=bandpower(eog, sfreq, [(1, 4), (4, 8), (8, 13), (13, 30)]),
                    emg=bandpower(emg, sfreq, [(20, 45), (65, 100)]))
    # Label-free artifact severity; thresholds are fitted on training trials only.
    features['qc'] = np.array([np.ptp(eeg, axis=-1).max(), np.ptp(eog, axis=-1).max(),
                               features['emg'].max()])
    return features


def extract(root):
    rows, audit = [], []
    lock = json.loads(LOCK.read_text())
    channel_order = None
    for entry in lock['files']:
        path = root / entry['path']
        verify(path, entry)
        print(f'Extracting {entry["path"]}', flush=True)
        with mne.io.read_raw_bdf(path, preload=False, verbose='ERROR') as raw:
            sfreq = raw.info['sfreq']
            if sfreq != 1024:
                raise ValueError(f'Unexpected sample rate: {sfreq}')
            external = [f'EXG{i}' for i in range(1, 9)]
            eeg = [c for c in raw.ch_names if c not in external + ['Status']]
            if len(eeg) != 128 or not set(external).issubset(raw.ch_names):
                raise ValueError('Unexpected channel schema')
            order = eeg + external
            if channel_order is not None and order != channel_order:
                raise ValueError('Channel order differs between recordings')
            channel_order = order
            events = mne.find_events(raw, stim_channel='Status', initial_event=True,
                                     consecutive=True, mask=0xFFFF, verbose='ERROR')
            trials, dropped = parse_trials(events, sfreq)
            session = Path(entry['path']).parts[1]
            subject = Path(entry['path']).parts[0]
            for trial in trials:
                def window(anchor, start, stop):
                    a, b = anchor + round(start*sfreq), anchor + round(stop*sfreq)
                    if a < 0 or b > raw.n_times:
                        raise ValueError('Window outside recording')
                    return raw.get_data(picks=order, start=a, stop=b)
                features = trial_features(window(trial['action'], .5, 2.5), sfreq)
                # Visual cue interval: diagnostic, not a no-signal null.
                features['cue_eeg'] = trial_features(window(trial['cue'], .05, .45), sfreq)['eeg']
                rows.append(dict(**trial, **features, subject=subject, session=session,
                                 uid=f"{subject}/{session}/{trial['cue']}"))
            audit.append(dict(file=entry['path'], accepted=len(trials), rejected=dropped,
                              event_counts={str(int(k)):int(v) for k,v in Counter(events[:,2]).items()},
                              counts=dict(Counter(f"{t['condition']}/{LABELS[t['y']]}" for t in trials))))
    if len({r['uid'] for r in rows}) != len(rows):
        raise ValueError('Duplicate original trials')
    return rows, audit, channel_order


def split_indices(y, groups):
    if len(np.unique(groups)) < 2:
        raise ValueError('At least two independent groups are required')
    for train, test in LeaveOneGroupOut().split(np.zeros(len(y)), y, groups):
        if set(groups[train]) & set(groups[test]):
            raise ValueError('Group leakage')
        if set(y[train]) != set(range(4)) or set(y[test]) != set(range(4)):
            raise ValueError('Every fold must contain all four classes')
        yield train, test


def artifact_indices(qc, train, test):
    """Fit thresholds only on training data; return original trial indices."""
    threshold = np.quantile(qc[train], .95, axis=0)
    return (train[np.all(qc[train] <= threshold, axis=1)],
            test[np.all(qc[test] <= threshold, axis=1)])


def model():
    return make_pipeline(StandardScaler(), LogisticRegression(C=1.0, solver='lbfgs',
                         max_iter=2000, class_weight='balanced', random_state=SEED))


def scores(y, pred, proba=None):
    if len(y) == 0 or set(y) != set(range(4)):
        return dict(n=int(len(y)), status='not_estimable_missing_classes')
    result = dict(n=int(len(y)), balanced_accuracy=float(balanced_accuracy_score(y, pred)),
                  macro_f1=float(f1_score(y, pred, labels=range(4), average='macro', zero_division=0)),
                  confusion_matrix=confusion_matrix(y, pred, labels=range(4)).tolist())
    if proba is not None:
        result['log_loss'] = float(log_loss(y, proba, labels=range(4)))
        result['multiclass_brier'] = float(np.mean(np.sum((proba-np.eye(4)[y])**2, axis=1)))
    return result


def shuffle_within(y, strata, rng):
    result = y.copy()
    for group in np.unique(strata):
        idx = np.flatnonzero(strata == group)
        result[idx] = rng.permutation(y[idx])
    return result


def evaluate(rows, feature, permutations=199):
    X = np.stack([r[feature] for r in rows])
    qc = np.stack([r['qc'] for r in rows])
    y = np.array([r['y'] for r in rows])
    groups = np.array([r['subject']+'/'+r['session'] for r in rows])
    strata = np.array([r['subject']+'/'+r['session']+'/'+str(r['block']) for r in rows])
    folds = list(split_indices(y, groups))
    prediction, majority = np.zeros_like(y), np.zeros_like(y)
    probability = np.zeros((len(y), 4))
    fold_reports = []
    for train, test in folds:
        clf = model().fit(X[train], y[train])
        prediction[test] = clf.predict(X[test])
        probability[test] = clf.predict_proba(X[test])
        majority[test] = DummyClassifier(strategy='most_frequent').fit(X[train], y[train]).predict(X[test])
        # Predeclared 95th-percentile artifact sensitivity, not tuned to scores.
        good_train, good_test = artifact_indices(qc, train, test)
        clean = dict(status='not_estimable_missing_classes', n=int(len(good_test)))
        if set(y[good_train]) == set(range(4)) and set(y[good_test]) == set(range(4)):
            clean_model = model().fit(X[good_train], y[good_train])
            clean = scores(y[good_test], clean_model.predict(X[good_test]))
        fold_reports.append(dict(held_out=str(groups[test[0]]), all_trials=scores(y[test], prediction[test]),
            artifact_sensitivity=clean, retained_train=int(len(good_train)), total_train=int(len(train)),
            coverage=float(len(good_test)/len(test)),
            rejected_test_by_class=np.bincount(y[test[~np.isin(test,good_test)]], minlength=4).tolist()))
    observed = float(np.mean([f['all_trials']['balanced_accuracy'] for f in fold_reports]))
    # Fixed model, full refit for each permutation; preserve session and block counts.
    null = []
    rng = np.random.default_rng(SEED)
    for _ in range(permutations):
        shuffled = shuffle_within(y, strata, rng)
        perm_scores = []
        for train, test in folds:
            clf = model().fit(X[train], shuffled[train])
            perm_scores.append(balanced_accuracy_score(shuffled[test], clf.predict(X[test])))
        null.append(float(np.mean(perm_scores)))
    result = dict(pooled=scores(y, prediction, probability), majority=scores(y, majority),
                  folds=fold_reports, mean_session_balanced_accuracy=observed,
                  permutation=dict(n=permutations, statistic='mean session balanced accuracy',
                    null_mean=float(np.mean(null)) if null else None,
                    p_value=float((1+np.sum(np.array(null)>=observed))/(1+len(null))) if null else None))
    # Cluster bootstrap over held-out sessions, NOT IID trials. Descriptive only:
    # three clusters from one person and overlapping CV training sets are insufficient
    # for a reliable population confidence interval.
    fold_scores = [f['all_trials']['balanced_accuracy'] for f in fold_reports]
    draws = rng.choice(fold_scores, (10000, len(fold_scores)), replace=True).mean(axis=1)
    result['descriptive_session_bootstrap_95'] = np.quantile(draws, [.025, .975]).tolist()
    return result


def run(root, output, permutations):
    if permutations < 0:
        raise ValueError('permutations must be nonnegative')
    rows, audit, channels = extract(root)
    experiments = {}
    for condition in ('inner', 'pronounced', 'visualized'):
        subset = [r for r in rows if r['condition'] == condition]
        for feature in (('eeg', 'eog', 'emg', 'cue_eeg') if condition == 'inner' else ('eeg',)):
            name = f'{condition}/{feature}'
            print(f'Evaluating {name}', flush=True)
            experiments[name] = evaluate(subset, feature, permutations if name == 'inner/eeg' else 0)
    report = dict(status='REAL_EEG_EXECUTED', seed=SEED, dataset=json.loads(LOCK.read_text()),
        software={p: importlib.metadata.version(p) for p in ['numpy','scipy','scikit-learn','mne']},
        python=platform.python_version(), git_head_at_execution=subprocess.check_output(['git','rev-parse','HEAD'], text=True).strip(),
        git_working_tree_dirty=bool(subprocess.check_output(['git','status','--porcelain'], text=True).strip()),
        source_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        labels=LABELS, audit=audit, channels=channels, experiments=experiments,
        scope='Single-participant session transfer; no subject generalization or spontaneous thought decoding',
        confidence_warning='Three session clusters only; descriptive bootstrap, not population confidence',
        config=dict(action_window_seconds=[.5,2.5], cue_window_seconds=[.05,.45],
                    eeg_bands_hz=[[4,8],[8,13],[13,30]], artifact_train_quantile=.95,
                    model='StandardScaler + balanced LogisticRegression C=1', tuning='none'))
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, indent=2, allow_nan=False)+'\n')
    print(f'Aggregate report: {output}', flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data-dir', type=Path, default=Path('data/ds003626'))
    parser.add_argument('--output', type=Path, default=Path('runs/is01/aggregate.json'))
    parser.add_argument('--permutations', type=int, default=199)
    args = parser.parse_args()
    run(args.data_dir, args.output, args.permutations)
