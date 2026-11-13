"""Synthetic software checks only. These are NOT EEG performance evidence."""
import hashlib
import sys
from pathlib import Path

import numpy as np
import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from baseline import (artifact_indices, bandpower, evaluate, model, parse_trials, shuffle_within,
                      split_indices, trial_features)
from download import verify


def events():
    # Concentration, cue, action 0.5 s later, relax 2.5 s later.
    return np.array([[0,0,22],[100,0,42],[600,0,31],[1100,0,44],[3600,0,45],
                     [7000,0,23],[7100,0,42],[7600,0,34],[8100,0,44],[10600,0,45]])


def test_condition_label_and_actual_action_marker():
    trials, rejected = parse_trials(events(), 1000)
    assert rejected == {}
    assert [(t['condition'], t['y'], t['action']) for t in trials] == [('inner',0,1100),('visualized',3,8100)]


def test_missing_marker_not_imputed():
    trials, rejected = parse_trials(np.delete(events(), 3, axis=0), 1000)
    assert len(trials) == 1
    assert rejected == {'incomplete_sequence': 1}


def test_unknown_condition_fails_closed():
    with pytest.raises(ValueError, match='before condition'):
        parse_trials(events()[1:], 1000)


def test_wrong_timing_is_rejected():
    e = events(); e[3,0] = 900
    trials, rejected = parse_trials(e, 1000)
    assert len(trials) == 1 and rejected['unexpected_timing'] == 1


def test_sessions_disjoint_and_classes_required():
    y = np.tile(np.arange(4), 3)
    groups = np.repeat(['a','b','c'], 4)
    seen = []
    for train, test in split_indices(y, groups):
        assert not set(groups[train]) & set(groups[test])
        seen.extend(test)
    assert sorted(seen) == list(range(12))
    with pytest.raises(ValueError, match='four classes'):
        list(split_indices(np.zeros(12), groups))
    with pytest.raises(ValueError, match='two independent'):
        list(split_indices(y, np.zeros(12)))


def test_scaler_fits_training_only():
    X = np.arange(48).reshape(12,4).astype(float)
    y = np.tile(np.arange(4), 3)
    fitted = model().fit(X[:8], y[:8])
    before = fitted[0].mean_.copy()
    fitted.predict(X[8:] + 1e9)
    np.testing.assert_array_equal(before, X[:8].mean(axis=0))
    np.testing.assert_array_equal(before, fitted[0].mean_)


def test_shuffle_keeps_each_block_distribution():
    y = np.tile(np.arange(4), 10)
    strata = np.repeat(['a','b'],20)
    a = shuffle_within(y, strata, np.random.default_rng(4))
    b = shuffle_within(y, strata, np.random.default_rng(4))
    np.testing.assert_array_equal(a,b)
    assert not np.array_equal(a,y)
    for group in np.unique(strata):
        assert sorted(a[strata==group]) == sorted(y[strata==group])


def test_spectral_features_and_external_channel_isolation():
    fs = 256
    data = np.random.default_rng(5).normal(size=(136,512))*1e-6
    original = trial_features(data,fs)
    changed = data.copy(); changed[130:] *= 1000
    altered = trial_features(changed,fs)
    np.testing.assert_array_equal(original['eeg'], altered['eeg'])
    assert not np.array_equal(original['emg'], altered['emg'])
    sinusoid = np.sin(2*np.pi*10*np.arange(512)/fs)[None,:]
    power = bandpower(sinusoid, fs, [(4,8),(8,13),(13,30)])
    assert np.argmax(power) == 1
    assert original['eeg'].shape == (384,)


def test_checksum_rejects_corruption(tmp_path):
    p = tmp_path/'sample'; p.write_bytes(b'abc')
    entry = dict(bytes=3,md5=hashlib.md5(b'abc').hexdigest())
    verify(p,entry)
    p.write_bytes(b'xyz')
    with pytest.raises(ValueError,match='Checksum'):
        verify(p,entry)


def test_evaluation_synthetic_plumbing_and_coverage():
    rng=np.random.default_rng(2)
    rows=[]
    for session in range(3):
        for i in range(40):
            rows.append(dict(y=i%4,subject='synthetic',session=str(session),block=0,
                             eeg=rng.normal(size=8),qc=rng.uniform(size=3)))
    report=evaluate(rows,'eeg',permutations=2)
    assert report['pooled']['n']==120
    assert sum(map(sum,report['pooled']['confusion_matrix']))==120
    assert len(report['folds'])==3
    assert 0 < report['permutation']['p_value'] <= 1
    assert all(0 <= f['coverage'] <= 1 for f in report['folds'])


def test_held_out_artifacts_cannot_change_training_selection():
    qc = np.arange(36, dtype=float).reshape(12,3)
    train, test = np.arange(8), np.arange(8,12)
    original, _ = artifact_indices(qc, train, test)
    qc[test] = -1e9
    changed, kept_test = artifact_indices(qc, train, test)
    np.testing.assert_array_equal(original, changed)
    np.testing.assert_array_equal(kept_test, test)


def test_condition_does_not_carry_across_runs():
    e = events()
    e[5,2] = 15  # missing condition announcement after a new run
    with pytest.raises(ValueError, match='before condition'):
        parse_trials(e,1000)
