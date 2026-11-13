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

<a id="npf-02"></a>

## NPF-02: perception, private speech and communication intent

**Feasibility proposal (2026-11-13), not executed.** This is not an implemented detector or a retrospective extension of IS-01 results. Nieto2022 does not provide the necessary intent labels. Inner speech, imagery and perception can coexist; assigned tasks and self-reports are imperfect operational labels, not direct access to thought or proof of consent.

### Question and conditions

Can a model distinguish imagined speech addressed to an assistant from the same privately imagined speech in a participant unseen during training? Four-word recognition and intent recognition are separate objectives.

| Condition | Task | Authorized output |
| --- | --- | --- |
| Listening | Hear the four words without deliberately repeating them | None |
| Reading | Read the same words silently | None |
| Private speech | Imagine the words for oneself | None |
| Addressed speech | Imagine the same words for the assistant | Only after external activation and confirmation |
| Visual imagery | Imagine movements without deliberately verbalizing them | None |
| Rest | No communication task | None |

Words: arriba, abajo, izquierda and derecha. A naturalistic negative block includes reading, listening, writing and free thought, without recording private content. Writing introduces motor activity: report it separately. Olfaction is deferred to a controlled-presentation extension; visual or auditory controls cannot establish olfactory performance.

### Manageable pilot and data needs

Proposal: **12 participants, two days each**, 20 trials per condition/day (five per word where applicable): 2,880 trials total. Add 30 continuous negative minutes per participant/day: **12 negative hours**. Budget 60–90 minutes per visit, 24–36 participant-hours, plus setup and analysis. This is a feasibility allocation, not a power calculation or real-world validation; publish exclusions and final sample size without replacing participants after inspecting outcomes.

Before recruitment: ethics review, suitable research hardware, acquisition-specific consent, withdrawal/retention policy and preregistration. Acquire synchronized EEG and EOG/EMG. Record subject, day, block, trial, condition, assigned word, events, exclusions and optional brief self-report, without requesting free-thought transcripts.

### Shortcuts and leakage prevention

- Match words, duration and task load between private and addressed speech. Counterbalance order and cue assignment; separate instructions from analyzed windows. Use multiple cues per condition and hold out cue identities for a sensitivity analysis.
- Keep the same display and no button presses inside compared windows. External activation occurs outside the window; do not supply button state, condition markers, word identity or stimulus metadata as model inputs. A safe system uses that control, but a classifier cannot use it as evidence of neural intent.
- Outer **leave-one-subject-out** evaluation holds out both days of each person. Inner participant-grouped validation selects hyperparameters, channels, threshold and abstention. Fit scaling, feature selection, ICA and other learned transforms on training data only; do not adapt the primary model using unlabeled test data.
- Keep all windows from a trial/block together. Do not filter recordings concatenated across splits. Freeze the data manifest, hashes, versions, seeds, exclusions and partitions before analysis. Correlated windows are not independent participants.
- Compare EEG, EOG-only, EMG-only and cue/timing baselines with identical splits; add peripheral-channel ablation. Differences do not establish artifact causality; attention, effort and task demand may still confound results.

### Preregistered metrics and decision

Primary objective: addressed versus private speech with matched words; participant-averaged balanced accuracy, participant-bootstrap interval and permutation restricted to exchangeable units under the randomization (blocks when tasks are block-assigned). Repeat selection/fitting inside each permutation, with at least 999 permutations. Never shuffle correlated windows as independent observations.

Proposed continuation criteria, all required: mean balanced accuracy ≥0.60, lower 95% CI >0.50 and p<0.05; activation sensitivity ≥80% with a training-only threshold; one-sided 95% upper false-activation bound ≤1/hour in continuous negatives. These are research goals, not clinical thresholds or privacy guarantees. Report per-person/condition outcomes, macro-F1, confusions, abstentions, latency and every failure, including when criteria are missed.

Define a false event as an activation episode onset, grouping detections less than two seconds apart; freeze window and refractory settings before testing. Denominator: all eligible negative time, with declared exclusions; also report occupancy/refractory time to avoid hiding alarms. With zero events in T hours, the approximate one-sided Poisson bound is 3/T: 12 h gives 0.25/hour **under that model only**. Between-person variation and temporal clustering require per-subject intervals and caution; this does not establish individual privacy. A 0.1/hour target needs approximately 30 event-free hours, as well as more independent participants.

### Verifiable tests before data collection

Acceptance criteria for the future pipeline, not yet implemented:

1. Assert disjoint subjects, trials and windows across train/test; reject duplicate IDs and epochs overlapping across partitions.
2. Fit-provenance test: each transform and threshold records training IDs only. Changing test labels cannot change fitting or selection.
3. Exclude condition, cue and activation columns from inputs; verify the schema rejects accidental inclusion.
4. A frozen rerun reproduces splits and metrics within a declared tolerance; a shuffled-label control traverses the entire pipeline.
5. Inject false detections, cancellations and timeouts into the firewall: **zero sends without explicit confirmation**. This software invariant applies even when the detector fails and does not demonstrate EEG intent recognition.

### Evidence and limits

[Alderson-Day et al., dialogic/monologic inner-speech fMRI study](https://pubmed.ncbi.nlm.nih.gov/26197805/) shows that different inner-speech tasks are not interchangeable; it does not validate this EEG classifier. The [inner-speech review](https://pubmed.ncbi.nlm.nih.gov/26011789/) provides context on diversity and methods. These are external studies; the criteria and sample sizes above are our proposals. The actual IS-01 result remains 26.5% and p=0.46, with no evidence of above-chance performance. There is no validated EEG mental password for our device.

[Firewall](neural-privacy-firewall.md) · [Datasets](../research/inner-speech-datasets.md).
