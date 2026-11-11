# NeuroLink AI — planned research milestones / hitos de investigación

```mermaid
flowchart LR
  A["IS-00: scientific protocol"]
  B["NPF-01: fail-closed software privacy"]
  C["IS-01: four imagined words in recorded EEG"]
  D["IS-02: held-out sessions and artifacts"]
  E["NPF-02: deliberate vs private thoughts"]
  F["AI-01: consented text → assistant"]
  G["FB-01: text/audio feedback"]
  H["NET-01: optional web tools"]
  A --> B
  A --> C --> D
  B --> E
  D --> E
  E --> F --> G --> H
```

| Track | Priority | Limitation |
| --- | --- | --- |
| Inner speech | Core | No free-form scalp EEG transcript demonstrated |
| Neural privacy firewall | Core | Intent gating requires a separate dataset and evaluation |
| Physical privacy switch | Hardware investigation | Requires professional electronic safety review |
| Feedback | After controlled decoding | Display and voice, not neural knowledge upload |
| Internet | Optional | Only approved text, no raw EEG |

**No milestone is automatically completed by the existence of this diagram.**

[Roadmap ES](../docs/research/roadmap.md) · [Roadmap EN](../docs/en/research/roadmap.md).
