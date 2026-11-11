# Research roadmap — inner speech and mental privacy

[Español](../../research/roadmap.md)

**Status: research design, no validated models or original neural electronics.** P300 spelling is retained as an [optional reference](../technical/p300-secondary-baseline.md).

| Milestone | Deliverable | Evidence gate |
| --- | --- | --- |
| **IS-00** | Literature, datasets, licences and protocol | Reproducible documented specification |
| **NPF-01** | Software privacy state-machine | No unapproved message output under tests |
| **IS-01** | Four-class imagined Spanish words using Nieto2022 | Subject/session-held-out balanced accuracy, macro-F1, controls |
| **IS-02** | Generalisation and artifact tests | Participant-level errors and negative controls |
| **NPF-02** | Distinguish intentional message activation from private thought | Separate ethically reviewed data, false unlocks/hour |
| **IS-03** | Explore natural-language sequences only with evidence | Independent controlled validation |
| **AI-01** | Confirmed candidate → local assistant | Provenance, user permission and cancellation tests |
| **FB-01** | Text/speech feedback, optional external tactility | Comprehension and timing metrics |
| **NET-01** | Optional web queries | Least-privilege read-only tools and confirmation |

## Hardware track

H0: EEG AFE/ADC/MCU signal acquisition requirements. H1: synthetic digital testbench. H2: evaluate a **physical privacy-off switch** and state indicator as a future independently reviewed design. H3: commercial EEG review and bench tests before custom patient-contact circuitry. H4: FPGA/Verilog only if measured requirements justify it.

## Scientific constraints

Four prompted imagined words are **not** arbitrary private inner speech. A decoder's word prediction cannot be treated as consent. A mental wake detector must be separately evaluated against real private-thought conditions. A software lock that monitors for a wake phrase still acquires some data; a verified physical power/acquisition cut is stronger.

[Inner speech protocol](../technical/inner-speech-protocol.md) · [Neural Privacy Firewall](../technical/neural-privacy-firewall.md).
