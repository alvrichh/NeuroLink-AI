# Private by default: inner-speech communication loop

```mermaid
flowchart LR
  USER["Person / Persona<br/>inner speech"]
  GATE{"Privacy gate / Firewall"}
  INNER["Decode short inner-speech window"]
  REVIEW{"Review + explicit consent"}
  AI["AI assistant"]
  OUT["Response: screen/audio"]
  USER --> GATE
  GATE -->|"locked/private"| USER
  GATE -->|"deliberate activation"| INNER --> REVIEW
  REVIEW -->|"no/cancel"| GATE
  REVIEW -->|"yes"| AI --> OUT --> USER
```

**Conceptual; no functioning mental activation system is claimed.** A powered-on keyword monitor still reads limited local EEG while in software LOCKED mode. A physical disconnect is a separate and stronger boundary.

[Neural privacy state machine](neural-privacy-firewall.md).
