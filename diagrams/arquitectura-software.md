# EEG-to-AI pipeline / Arquitectura de software

**Type:** CONCEPTUAL DATAFLOW. No decoder, trained model or measured accuracy is implied.

```mermaid
flowchart TD
  subgraph SOURCE["Acquisition / Adquisición"]
    DATA["Public EEG dataset / Dataset público"]
    LIVE["Verified EEG SDK / SDK EEG verificado"]
    SYN["Synthetic test stream / Flujo sintético"]
  end
  subgraph PROCESS["Signal processing / Procesado"]
    INGEST["Samples + clock + stimulus events"]
    QC["Quality / artifacts / rejected epochs"]
    ERP["P300 features and classifier"]
    SEL["Stimulus aggregation<br/>character candidates + confidence"]
  end
  subgraph USER["Human control / Control humano"]
    UI["Candidate speller view"]
    ACK{"Explicitly confirmed?<br/>¿Confirmado?"}
  end
  subgraph APP["Application / Aplicación"]
    API["FastAPI / validated text"]
    AI["LLM or deterministic test stub"]
    FEED["Text / audio feedback"]
  end
  DATA --> INGEST
  LIVE --> INGEST
  SYN --> INGEST
  INGEST --> QC --> ERP --> SEL --> UI --> ACK
  ACK -->|"no / edit / cancel"| UI
  ACK -->|"confirmed text / texto confirmado"| API --> AI --> FEED
  TOOL["Web read-only tools / Internet (later)"] -.-> AI
```

## Invariants / Invariantes

- Every experimental result has a **source mode:** recorded EEG, live EEG or synthetic.
- Fit preprocessing on training data only; keep independent session/test partitions.
- `P300 target/non-target` metrics are not character-level spelling metrics.
- User corrections and LLM autocomplete are **not decoded neural data**.
- Confidence and abstention are shown to the user; false positives must never trigger web actions.
- Use versioned protocol metadata and an audit record for signal → selection → confirmation.

[Phase 1](../docs/technical/phase-1-eeg-to-text.md) · [Experimental protocol](../docs/technical/research-protocol.md).
