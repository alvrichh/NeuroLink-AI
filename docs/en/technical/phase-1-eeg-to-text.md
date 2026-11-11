# Phase 1 — Decoding inner speech

[Español](../../technical/phase-1-eeg-to-text.md) · [Experimental plan](inner-speech-protocol.md) · [Mental privacy](neural-privacy-firewall.md)

**GOAL:** study whether words spoken only in a person's mind can be decoded from brain recordings, without utterance or selecting letters. P300 spelling is now a [secondary BCI reference](p300-secondary-baseline.md), not the intended interface.

## Two different questions

1. **Content:** which internally imagined word was uttered? Begin with a small experimentally labelled vocabulary.
2. **Communicative intention:** does the person *want to share* that inner speech? Content classification alone is not permission. See the [Neural Privacy Firewall](neural-privacy-firewall.md).

## IS-01 — imagined-word classification

**Dataset:** Nieto et al. (2022), [*Thinking out loud*](https://www.nature.com/articles/s41597-022-01147-2), [NEMAR](https://nemar.org/dataset/on003626) and [MOABB Nieto2022 adapter](https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html).

- 10 participants, 3 sessions, 5,640 trials, 128 EEG channels plus 8 EOG/EMG.
- Four prompted imagined directions: *arriba*, *abajo*, *izquierda*, *derecha*.
- Spoken and visual-imagination control conditions.

### Planned pipeline

Check provenance, timing and conditions; isolate imagined-speech intervals; inspect EOG/EMG and potential visual artifacts; fit preprocessing only on training data; evaluate interpretable LDA/logistic regression/SVM baselines in appropriate held-out sessions/subjects; report balanced accuracy, macro-F1, confusion matrices, abstention and negative controls.

The experiment tests **four-class imagined-speech discrimination**, not free-form mental transcription. Language-model completion cannot be reported as neural decoding.

## NPF-01 — mental privacy

Build a **software privacy state-machine** before connecting a neural decoder: locked by default, explicitly unlocked, bounded decoding window, local review, independent confirmation and automatic relock. A mental wake-word requires separate evidence and its activation false-positive rate must be measured against **private thought**, not just silence.

## Further study

Explore larger vocabularies, temporal sequences and more natural self-generated language only when independently verified data support those claims. Implanted-language prosthesis results are relevant literature but do not imply scalp EEG will match them.

[Roadmap](../research/roadmap.md) · [Scientific limitations](../research/state-of-the-science.md).
