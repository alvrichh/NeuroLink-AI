# NeuroLink AI — inner speech + privacy / lenguaje interior y privacidad

**Proposed architecture only.** No validated EEG intent detection, inner-speech transcription or patient-ready circuitry is claimed.

```mermaid
flowchart TD
  subgraph INPUT["Local acquisition / Captura local"]
    DATA["Recorded EEG / EEG grabado"]
    DEV["Evaluated EEG device / Equipo evaluado"]
    TEST["Synthetic input / Pruebas sintéticas"]
  end
  subgraph GUARD["Neural Privacy Firewall"]
    OFF["HARD_OFF: physical acquisition off"]
    GATE{"LOCKED / activation monitor"}
    KEY["Deliberate activation / Activación voluntaria"]
    DEC["Short decoding window / Ventana local"]
  end
  subgraph CONTENT["Language and consent / Lenguaje y consentimiento"]
    MODEL["Imagined-word decoder / Modelo de lenguaje interior"]
    REVIEW["Candidate + uncertainty / Propuesta"]
    OK{"Explicit approval? / ¿Confirma?"}
  end
  subgraph OUT["Assistant / Asistente"]
    API["API — approved text only"]
    AI["AI or deterministic stub"]
    RETURN["Text / audio feedback"]
  end
  DATA --> GATE
  DEV --> GATE
  TEST --> GATE
  GATE -->|"no activation"| OFF
  KEY --> GATE
  GATE -->|"authorized"| DEC --> MODEL --> REVIEW --> OK
  OK -->|"no / cancel"| GATE
  OK -->|"yes"| API --> AI --> RETURN
  RETURN --> GATE
```

**Interpretation:** HARD_OFF and a software LOCKED state are different. When a neural keyword detector is enabled, minimal signal acquisition is necessary even while language decoding is locked. OFF in the diagram represents intentionally disabled acquisition, not a state that a running wake detector can magically enter and still recognize thought.

The [firewall state machine](neural-privacy-firewall.md) has the authoritative behavior. The four-word dataset [Nieto2022](../docs/research/inner-speech-datasets.md) does **not** establish communicative intent; it only supports constrained content research.
