# Bidirectional communication / Comunicación bidireccional

**Type:** CONCEPTUAL CLOSED LOOP. The return path uses normal senses, not direct electrical stimulation of the brain.

```mermaid
flowchart LR
  U["Person / Persona<br/>voluntary attention"]
  C["EEG recording and classification"]
  M["Character candidate / Candidato"]
  V{"Confirm / Cancel?"}
  A["Assistant / Asistente"]
  O["Screen and speech / Pantalla y voz"]
  H["Optional external haptics / Tacto externo (research)"]
  U --> C --> M --> V
  V -->|"Yes / Sí"| A --> O --> U
  V -->|"No / No"| M
  A -.-> H -.-> U
```

**Scientific boundary:** direct intracortical stimulation can evoke some sensations in clinical research, but it has not been shown to deliver arbitrary semantic answers from an AI. We will not prototype neural stimulation in this independent repository.

[Phase 2 scientific details](../docs/technical/phase-2-bidirectional.md).
