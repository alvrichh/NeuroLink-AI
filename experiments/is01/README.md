# IS-01 — reproducible Nieto2022 baseline

Scientific code for [issue #8](https://github.com/alvrichh/NeuroLink-AI/issues/8).
[Executed pilot results](reports/pilot-sub01.md): pooled balanced accuracy 26.5%,
permutation p=0.46; no evidence of above-chance performance.

Completely separate from `apps/web` and privacy-gate simulations. No decoder is
connected to the website, networking, a communication gate or a device.

## Reproduce (Python 3.12)

From the repository root on Linux/macOS:

```bash
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -r experiments/is01/requirements.txt
python -m pytest experiments/is01/tests -q
python experiments/is01/download.py --data-dir data/ds003626
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 python experiments/is01/baseline.py \
  --data-dir data/ds003626 --permutations 199 --output runs/is01/aggregate.json
```

The download needs 1,882,207,989 bytes (~1.88 GB); allow 3 GB disk and several GB
RAM. Raw reading is lazy and features are computed one trial at a time. Download
is explicit, sequential, streamed to a temporary file, verified, then atomically
renamed. Failed partial downloads restart. Existing files are verified again.
No data is downloaded by tests or CI. Real runs fail if a required file is absent
or corrupt; there is no automatic synthetic fallback. Do not compare synthetic
test scores with the real EEG report. `--permutations 0` is a smoke run only and
leaves the permutation p-value null.

## Data provenance and scope

`dataset-lock.json` fixes **OpenNeuro ds003626 2.1.2**, git commit
`d96743351ae4e5d0ee7a1384320ea8d52a2ce698`, immutable S3 object version IDs,
file sizes and MD5 hashes from the commit's git-annex pointers. These checksums
verify source identity, not authenticity against an adversarial hash collision.
The pinned `dataset_description.json` declares **CC0**, BIDS 1.4, raw data and
DOI `10.18112/openneuro.ds003626.v2.1.2`.

NEMAR's page was inspected on 2026-11-12: its **on003626 v1.0.0** is a separate
mirror version with an OpenNeuro v2.0.0 provenance link; do not equate these
version numbers. Its catalogue reports 24.6 GB, 10 people, three sessions and
5,640 trials across all three conditions, not 5,640 inner-speech trials.

The preselected pilot is **sub-01, ses-01/02/03**, raw BioSemi BDF files:
`sub-01/ses-XX/eeg/sub-01_ses-XX_task-innerspeech_eeg.bdf`.
In the pinned tree there are no per-recording events/channels TSV sidecars;
labels come from the BDF Status channel. This subset is chosen by participant
order and budget, not performance. It supports **within-person, between-session
transfer on one recording day**, not new-day or between-person generalization.
The lock deliberately limits the pilot to these files. A larger study needs a
new reviewed lock and explicit leave-one-subject-out evaluation; simply adding
subjects to this session grouping would NOT measure subject generalization.
Participant 3 also requires the authors' documented condition corrections.

MOABB exposes a `Nieto2022` adapter, but its current documentation reports a
conflicting CC BY 4.0 badge and a broad event window. This implementation uses
the pinned raw source directly so timing, EXG diagnostics, and provenance are
explicit; it does not claim numerical equivalence with MOABB or the authors'
preprocessed derivatives. No upstream analysis code is copied or imported.

## Locked analysis choices

- Only condition marker **22** enters the primary inner-speech model. Markers
  21/23 select pronounced/visualized controls. Class markers 31/32/33/34 mean
  **arriba/abajo/derecha/izquierda**, in that order everywhere, including matrices.
- Require the observed sequence 42 → class → 44 → 45, a cue-to-action delay
  0.45–0.65 s and an action duration 2.5–2.8 s. Never synthesize missing tags or
  infer labels from balancing. Audit exclusions and all event counts. Missing
  class tags cannot be assigned a class; event totals expose this limitation.
- Use **[0.5, 2.5) seconds after marker 44**, entirely inside the action period.
  This delays past the initial visual response but does not prove elimination
  of visual memory, attention or directional imagery confounds. The published
  acquisition protocol says cue duration 0.5 s, consistent with raw markers;
  the author's current stimulation script at commit
  `3bd761aa4544b612352a52bae5094be75ba238c8` instead sets `T_Estimulo=2`.
  This mismatch was resolved against the paper and recordings before scoring.
- 128 EEG channels at 1,024 Hz. Fixed linked-ear reference EXG1/EXG2, Welch PSD
  with Hann windows, one-second segments, no overlap, constant detrending, and
  log mean PSD in [4,8), [8,13), [13,30) Hz: **384 EEG features**.
  No continuous filter can smear cue or adjacent-trial samples into features.
  No ICA, CSP, resampling, global scaling, channel selection or tuning.
  Ignoring 50 Hz bins is not equivalent to removing every line-noise artifact.
- StandardScaler → balanced logistic regression, C=1, lbfgs, max_iter=2000.
  Entire sessions are held out, one at a time; all scaling and classifier
  fitting use training sessions only. Every fold must contain all four classes.
  One sample per original trial; cue/action diagnostics remain in the same fold.
- Report pooled balanced accuracy, macro-F1, confusion counts, log loss and
  multiclass Brier score, plus session scores. Scores are out-of-fold; no model
  is selected using held-out scores. Probability scores are diagnostics, not a
  validated calibration/abstention policy.

## Controls and uncertainty

EOG-only uses EXG3−EXG4 and EXG5−EXG6, with 1–30 Hz band powers. EMG-only uses
EXG7/EXG8 (linked-ear reference), with 20–45 and 65–100 Hz powers. These are
separate classifiers on the same trials and folds, never EEG input features.
The scalp EEG can still contain ocular/muscular activity despite excluding EXG.

A fixed artifact sensitivity analysis estimates the 95th percentile of each of
three severity measures on training trials only: maximum EEG peak-to-peak,
maximum bipolar EOG peak-to-peak and maximum EMG log bandpower. It refits on
retained training trials and evaluates retained test trials. Coverage and
rejected counts per class are reported. This is a heuristic sensitivity test,
not clinical artifact detection or the authors' published EMG procedure. Scores
on retained trials are selective and cannot replace the all-trial primary score.
No imputation or label-dependent threshold fitting is used.

The cue-EEG classifier uses [0.05,0.45) s after the class marker: it diagnoses a
visual shortcut, **not a no-signal null**. Its shorter duration gives poorer
spectral resolution; direct score differences are descriptive. Pronounced and
visualized EEG classifiers use the same action window and held-out sessions.
Low diagnostic scores do not prove artifact absence; high scores do not isolate
which shared process explains action-period classification.

Primary negative controls are a training-majority classifier (four-class
balanced accuracy 0.25) and **199 full-pipeline label permutations within each
session/condition block**, preserving block counts. The statistic is mean
held-out-session balanced accuracy; p=(1 + null scores ≥ observed)/(B+1).
This assumes within-block exchangeability and does not model every temporal
dependency. The permutation test applies only to the prespecified inner/EEG
baseline, not to a post-hoc winner among controls. Fixed seed: 20261112.

The report also supplies a **descriptive session-cluster bootstrap 95% range**
(10,000 draws). With three same-person sessions and overlapping CV training
sets this is not a reliable population confidence interval. The fold range and
small sample size must accompany it. No statistical claim about people follows
from this pilot, irrespective of a nominal p-value.

## Privacy and interpretation

Only aggregate counts and metrics may be committed after review. Raw EEG,
features, trial predictions and fitted models stay local under ignored paths;
the runner exports none of them. Do not add raw recordings or identifiers.
Pseudonymous source session IDs in aggregate audit tables identify source files,
not real people. This experiment evaluates four instructed words in a laboratory
protocol. It does not read spontaneous thoughts, infer private intent, validate
a mental password, measure false activations/hour, or authorize transmission.
These require separate datasets, ethical review and prospective evaluation.

## Sources

- [Pinned dataset metadata](https://github.com/OpenNeuroDatasets/ds003626/blob/d96743351ae4e5d0ee7a1384320ea8d52a2ce698/dataset_description.json)
- [NEMAR catalogue](https://nemar.org/dataset/on003626)
- [Nieto et al. 2022, Scientific Data; full paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC8844234/)
- [Author source at inspected commit](https://github.com/N-Nieto/Inner_Speech_Dataset/tree/3bd761aa4544b612352a52bae5094be75ba238c8)
- [MOABB adapter documentation](https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html)

## Branch delivery

The root and `apps/web/vercel.json` disable automatic Vercel deployments only
for `science/is01-nieto2022-baseline`, so sharing this scientific branch does
not deploy a website preview. Other branches retain their existing defaults.
The GitHub Pages deployment workflow remains manual.
