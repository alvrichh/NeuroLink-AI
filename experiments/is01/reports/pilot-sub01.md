# IS-01 pilot — real EEG results, 2026-11-12

**Outcome: this baseline does not provide evidence of above-chance inner-speech
classification.** This is a completed computational pilot on public human EEG,
not a synthetic demonstration, a new human experiment or a working mind reader.

[Reproduction and methods](../README.md) · [Machine-readable aggregate](pilot-sub01.json)

## Provenance

OpenNeuro ds003626 **2.1.2**, commit
`d96743351ae4e5d0ee7a1384320ea8d52a2ce698`, declared CC0.
All three source BDF files matched the byte sizes and MD5 hashes in
[dataset-lock.json](../dataset-lock.json). Local code commit at execution:
`2e8edd3` (full local commit and source SHA-256 are in the JSON); working tree clean.
GitHub connector publication may assign a different commit ID. The checked-in
`baseline.py` SHA-256 is the exact identity of the executed source.
Python 3.12.14, MNE 1.10.2, NumPy 2.3.5, SciPy 1.17.0, scikit-learn 1.8.0.

One participant, three sessions on one recording day. All complete required
trial sequences were accepted: 500 trials across conditions, including **200
inner-speech trials (50/class)**. Session 1 has a missing rest marker 46, which
is outside the required action window and is not reconstructed. No class or
action markers were inferred. The aggregate audit retains event counts.

| Session | Inner speech | Pronounced | Visualized | Total |
| --- | ---: | ---: | ---: | ---: |
| 01 | 80 | 40 | 80 | 200 |
| 02 | 80 | 40 | 80 | 200 |
| 03 | 40 | 20 | 40 | 100 |

## Held-out results

Each session is predicted by a model fitted only on the other two sessions.
No random trial split, hyperparameter search, feature selection, ICA or global
normalization. Scores below pool all out-of-fold predictions. Only the
inner/EEG model was designated for permutation inference; controls are descriptive.

| Analysis | Trials | Balanced accuracy | Macro-F1 |
| --- | ---: | ---: | ---: |
| **Inner speech / EEG (primary)** | **200** | **26.50%** | **0.2637** |
| Training-majority baseline (inner) | 200 | 25.00% | 0.1000 |
| Inner speech / EOG only | 200 | 28.50% | 0.2801 |
| Inner speech / EMG only | 200 | 27.50% | 0.2624 |
| Inner speech / EEG during visual cue | 200 | 21.00% | 0.2097 |
| Pronounced speech / EEG | 100 | 33.00% | 0.3233 |
| Visualized condition / EEG | 200 | 31.50% | 0.3142 |

Primary balanced accuracy by held-out session: **30.00%, 26.25%, 20.00%**.
Their unweighted mean is **25.4167%**, different from the pooled score because
session 03 has half as many trials. The permutation statistic is this unweighted
session mean: **p=0.46**, 199 within-block permutations with full pipeline refits,
seed 20261112; null mean 24.9916%. There is no significant advantage over chance.
Failure to detect an effect in this small pilot does not establish that inner
speech can never be decoded.

The descriptive session-cluster bootstrap range is **20.00–30.00%** (10,000
draws). Three clusters from one person and overlapping training sets do not
support a reliable population confidence interval. This is not uncertainty over
new people or new recording days.

Primary probability diagnostics: log loss **2.8772**, multiclass Brier score
**1.1136**. Uniform four-class probabilities would give log loss ln(4)=1.3863
and Brier 0.75. These poor probability scores argue against using this model's
confidence as a communication or abstention gate.

## Primary confusion matrix

Rows are true labels; columns are predictions. Counts, not percentages.

| True / predicted | arriba | abajo | derecha | izquierda |
| --- | ---: | ---: | ---: | ---: |
| arriba | 13 | 15 | 12 | 10 |
| abajo | 16 | 15 | 8 | 11 |
| derecha | 17 | 14 | 9 | 10 |
| izquierda | 10 | 17 | 7 | 16 |

## Artifact sensitivity

Three 95th-percentile thresholds were fitted on training trials only. The model
was refitted after excluding training artifacts and evaluated on retained test
trials. The all-trial analysis above remains the primary result.

| Held-out session | Retained train / total | Retained test / total | Coverage | Retained-test balanced accuracy |
| --- | ---: | ---: | ---: | ---: |
| 01 | 106 / 120 | 61 / 80 | 76.25% | 31.75% |
| 02 | 103 / 120 | 73 / 80 | 91.25% | 26.29% |
| 03 | 140 / 160 | 36 / 40 | 90.00% | 21.90% |

This selective analysis does not establish artifact-free neural decoding. EOG
and EMG controls score similarly to the primary model; neither their differences
nor the other-condition differences were significance-tested. Low cue-window
performance cannot exclude visual memory or attention effects in the action
window, particularly with different window lengths and PSD resolution.

## Verification and remaining work

- **12 synthetic software tests passed**: event parsing and rejection, missing
  conditions across runs, fold separation, training-only scaling/thresholds,
  block-preserving permutations, spectral features, EXG exclusion and checksums.
- **9 existing privacy-gate tests passed**; these remain synthetic state-machine
  tests and provide no evidence for a neural intention detector.
- The full raw-data pipeline completed, including all controls and 199
  permutations. The final checked-in source was rerun successfully.
- Generalization between people, between days, prospective recording, validated
  artifact rejection, calibrated abstention and false activations/hour remain
  **pending**. No model or trial-level data is exported or deployed.

The dataset contains instructed laboratory actions. It cannot determine whether
a spontaneous thought is private or voluntarily addressed to an assistant. This
pilot does not validate a mental password or a neural privacy firewall.
