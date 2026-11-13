# IS-01 / NPF-01 — experimental protocol

[Español](../../technical/inner-speech-protocol.md)

**IS-01 status (2026-11-12): real-EEG pilot executed**, one participant, three held-out sessions, 200 inner-speech trials. Pooled balanced accuracy 26.5%, macro-F1 0.2637; permutation p=0.46 for the mean session score (199 permutations). No evidence of above-chance performance. Subject generalization and neural privacy-firewall validation remain pending.

[Reproducible implementation](../../../experiments/is01/README.md) · [Results and limitations](../../../experiments/is01/reports/pilot-sub01.md).

## IS-01: four-class imagined-speech decoding

Use Nieto2022 (10 subjects; four imagined Spanish direction words) to test a small, closed vocabulary. Isolate imagination periods; check stimulus timing and EOG/EMG artifacts; use within-subject and session-held-out evaluation. Fit every preprocessing transform on training data only, and compare simple LDA/logistic regression/SVM against shuffled labels and majority baselines.

Report balanced accuracy, macro-F1, confusion matrix, confidence/abstention and failure cases. If classes are balanced, uninformed four-way guessing yields 25% expected accuracy. A correct four-class output **does not** establish open-ended inner speech transcription.

## NPF-01: software privacy-state simulation

Implement states HARD_OFF, LOCKED, ARMED, DECODING, REVIEW and SEND. Simulate false wake triggers, timeouts, bad data, cancellation, power/network loss and repeated commands. Verify that **no raw EEG or unapproved text can leave the local system** and that failures lock the output.

This tests software behavior, not whether a neural wake word can truly be detected.

## NPF-02: future intent-gating research

The Nieto2022 dataset does **not** distinguish private thoughts from deliberately addressed mental speech. Testing that distinction requires newly designed, appropriately reviewed data collection and long negative-control periods.

Report false unlocks per hour, missed genuine activation, latency and any unauthorized transmissions. Prefer an independent external confirmation control until neural-only intention gates have been validated.

[Firewall](neural-privacy-firewall.md) · [Datasets](../research/inner-speech-datasets.md).
