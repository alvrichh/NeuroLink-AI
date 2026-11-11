# Proposed software architecture

[Español](../../technical/architecture.md)

## Design principle

Keep five concerns independent: **signal provenance, signal processing, event decoding, character selection and feedback**. This lets us compare datasets, classifiers and hardware sources without hiding what has or has not been demonstrated.

[Open the editable pipeline diagram](../../../diagrams/arquitectura-software.md).

## Modules

| Component | Responsibility |
| --- | --- |
| `data-sources` | Load MOABB/MNE EEG, stimulus timestamps, BrainFlow device streams or synthetic test inputs |
| `signal-processing` | Reference, filter, reject artifacts, segment event-related epochs, normalise with training-only fit |
| `event-decoder` | Estimate P300 Target/NonTarget confidence; validate against held-out data |
| `character-decoder` | Aggregate scores with the original stimulation sequence into character candidates |
| `speller-ui` | Show provenance, candidate, uncertainty, correction and confirmation controls |
| `assistant-api` | Receive **confirmed text only** and return a traceable response |
| `feedback` | Render text/audio and optionally later external tactile encoding |
| `audit` | Preserve experiment version, source type, timing and minimal confirmation metadata |

A `BNCI2014-009` MAT file cannot simply be treated as an already formatted BrainFlow Playback Board capture. Use a dataset adapter and explicit stimulus metadata.

## Planned stack

Python 3.12, MNE-Python, MOABB, scikit-learn and BrainFlow where relevant; FastAPI/Pydantic for the API; React/TypeScript for the UI. PyTorch should only be adopted if cross-validated evidence justifies the added complexity. The assistant can start as a deterministic local stub; an external LLM is optional.

## Proposed contracts — not implemented yet

```text
SignalWindow:
  source_type, session_id, sampling_rate, channels, timestamps,
  samples, stimulus_events

EventPrediction:
  event_id, target_probability, classifier_version

CharacterCandidate:
  character, confidence, repetitions, supporting_event_ids, source_mode

ConfirmedMessage:
  text, confirmation_id, timestamp, provenance

AssistantResponse:
  text, model_id, sources, proposed_external_actions

FeedbackEvent:
  modality, payload_id, delivery_status
```

## State and failure handling

```text
Idle -> Acquire/Replay -> Event Decode -> Character Candidate
     -> Edit/Confirm/Cancel -> (confirmed only) Send -> Response -> Idle
```

A missing signal, insufficient confidence, cancelled selection or lost device connection must not trigger any external action.

## Security invariants

- Process identifiable EEG locally by default; only confirmed user text reaches an external model.
- Credentials stay out of the frontend and public repository.
- Web tools disabled by default; read-only tools first.
- Language-model autocompletion is explicitly distinguished from decoded characters.
- No brain-stimulation API or patient-contact experimental hardware in the software pipeline.

[Hardware acquisition architecture (ES)](../../../hardware/architecture.md) · [Safety and privacy](safety-privacy.md).
