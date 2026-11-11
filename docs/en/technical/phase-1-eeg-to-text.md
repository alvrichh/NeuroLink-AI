# Phase 1 — EEG to confirmed text

[Español](../../technical/phase-1-eeg-to-text.md)

This is the project's **highest-priority research objective**.

## Different questions: P300 selection vs imagined speech

**P300 speller:** the person attends to a letter or option in a controlled stimulus sequence. An EEG event classifier estimates whether a stimulus was a target. A second algorithm combines event scores according to the stimulation design to choose a character. This is **selection under a protocol**, not arbitrary thought reading.

**Imagined speech:** the person mentally attempts words without producing audible speech. EEG decoding of an unrestricted vocabulary remains far harder and is a separate exploratory research direction, not the initial acceptance criterion.

## Initial dataset

[BNCI2014-009 documented in MOABB](https://moabb.neurotechx.com/docs/generated/moabb.datasets.BNCI2014_009.html) is a P300 dataset with 10 participants, 16 EEG channels, and 256 Hz sampling. MOABB exposes three sessions. Record which preprocessing has already been applied before training; do not treat the data as raw if it is not. Verify the original license and terms **before** redistribution or commercial reuse.

## E1 — Event classification

1. Freeze library versions, experiment configuration and random seeds.
2. Load subject, session, labels, channels and event metadata.
3. Divide train/validation/test by appropriate independent recording unit (e.g. held-out sessions/complete trials); do not leak correlated epochs across sets.
4. Epoch EEG around the stimuli, document reference, filters and artifact rejection.
5. Train regularised LDA or logistic regression before trying complex models.
6. Report ROC-AUC, PR-AUC, sensitivity, specificity, calibration, latency and class distribution.
7. Run majority and shuffled-label negative controls, and report by subject/session.

**Event-level classification performance must not be described as spelling accuracy.**

## E2 — Character reconstruction

For each spelling trial, preserve the correct stimulus order and attended row/column or grouping. Aggregate event evidence across repetitions, infer character candidates, and allow abstention, editing and cancellation. Compare against the *actual character target*, reporting character accuracy, correct characters/minute, selection latency and unintended selections.

If the chosen dataset loader lacks the original trial-to-character mapping, obtain a suitable dataset or explicitly mark the character experiment as **simulation**. Do not fabricate ground-truth letter labels.

## E3 — Assistant integration

The UI displays provenance (recorded/live/synthetic), candidate and uncertainty. A human confirmation gates all outgoing text. Initially connect to a deterministic local assistant for reproducible tests; an LLM can be introduced later, but any text it suggests is **model-generated**, not EEG-decoded.

The target demo of composing `HOLA IA` and receiving a response is an **illustrative goal**, not a result.

## Hardware gate

Do not buy or build hardware based on marketing claims. After validating offline methodology, evaluate documented commercial recording devices for electrode placement, timing synchronization, signal quality, safety and software interfaces. Custom breadboards/EVMs are not patient-ready.

[Experimental protocol (ES)](../../technical/research-protocol.md) · [Hardware engineering](../../../hardware/en/README.md).
