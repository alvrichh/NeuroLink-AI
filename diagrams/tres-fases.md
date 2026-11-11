# Research phases / Fases de investigación

**Type:** PLANNED ROADMAP. These are milestones, not completed experimental outcomes.

```mermaid
flowchart LR
  R0["R0: Research design<br/>Documentation and safety"]
  R1["R1: Offline P300 classification<br/>Dataset + held-out evaluation"]
  R2["R2: Character spelling<br/>Event aggregation + metrics"]
  R3["R3: User-confirmed AI dialogue<br/>Local stub before external LLM"]
  R4["R4: Verified commercial EEG<br/>Human-study review if applicable"]
  R5["R5: Text/audio/tactile feedback<br/>External sensory channels"]
  R6["R6: Optional internet access<br/>Read-only tools first"]
  R0 --> R1 --> R2 --> R3 --> R4 --> R5 --> R6
```

| Track / Línea | First deliverable / Primera entrega | Gate / Criterio |
| --- | --- | --- |
| BCI algorithm | Offline ERP classifier | Reproducible, no test leakage |
| Spelling | Characters from actual paradigm events | Character-level accuracy, false commands |
| Human-computer interface | Confirm → send → receive | No action from unconfirmed input |
| Hardware | Architecture and digital simulation | Bench tests, then independent safety evaluation |
| Feedback | Text, audio, then external tactility | Comprehension and latency measured |
| Internet | Explicitly authorised retrieval | Controlled privileges, logged confirmation |

**Direct brain stimulation and semantic download are not milestones for home experimentation.** They remain literature-review / regulated clinical research topics only.

[Roadmap](../docs/research/roadmap.md) · [Safety](../docs/technical/safety-privacy.md).
