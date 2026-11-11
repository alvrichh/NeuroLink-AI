# Neural Privacy Firewall (NPF)

[Español](../../technical/neural-privacy-firewall.md)  
**Status: conceptual research architecture, not tested neural hardware or a proven EEG intent decoder.**

## Privacy goal

A person may silently talk to themselves without intending to communicate. **Inner speech is not consent.** The system must distinguish a deliberately opened communication channel from private thought, and must never forward arbitrary brain signals to an assistant.

## Proposed states

| State | Meaning |
| --- | --- |
| **HARD_OFF** | Physical acquisition/communication cutoff; strongest user control |
| **LOCKED** | Minimal local activation monitor only, no language decoding |
| **ARMED** | User deliberately activates via accessible external control or, *if independently validated*, a neural keyword |
| **DECODING** | Short, locally processed inner-speech window |
| **REVIEW** | Proposed words and uncertainty; edit, reject or cancel |
| **SEND** | Transmit explicitly approved text only, no raw neural data |
| **AUTOLOCK** | Timeout, fault, disconnect or cancellation closes the channel and clears transient buffers |

**Critical distinction:** a mental wake-word approach still requires a small local signal monitor while powered on. LOCKED does not mean the device acquires **no** electrical signal. Only a suitable physical off switch provides a stronger data-acquisition boundary.

## Defense in depth

1. Physical privacy disconnect with independent state indication (for a future professionally assessed device).
2. Wake detector running locally, restricted to a small activation task; no general inner-speech inference while locked.
3. Hard timeouts, immediate cancel, fail-closed behavior and state separation.
4. Separate activation and content decoders; use least privilege and ephemeral buffers.
5. Outgoing consent/confirmation independent from decoding-confidence scores.
6. Offline-first, prohibit raw EEG export and prevent web tools from reading neural buffers.
7. Minimal audit without recording private mental content.

## Scientific basis and limits

Kunz et al. demonstrated inner-speech decoding and a **mental keyword lock** in participants with implanted electrodes (*Cell*, 2025). A real-time test in one participant reported **98.75% keyword detection accuracy**, not a 98.75% privacy guarantee and not a demonstrated performance for non-invasive scalp EEG.

Sources: [full study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12360486/) · [NIH explanation](https://www.nih.gov/news-events/nih-research-matters/decoding-inner-speech-brain-signals).

A classifier distinguishing *attempted speech* from *inner speech* cannot automatically distinguish **private inner speech** from **inner speech intentionally addressed to the AI**.

## Experiments needed

- **Content decoding:** classify deliberately imagined words from a labelled EEG dataset.
- **Intention gating:** independently collect/obtain data with both deliberate-communication and private-thinking conditions. The four-class Nieto dataset is not a valid test of this firewall.
- Measure *false activations per hour*, miss rates, unlock latency, actual unapproved transmissions, and recovery after dropped signal/power/network.
- Start with a software state-machine simulation; do not market it as a working brain-controlled firewall.

[Editable architecture diagram](../../../diagrams/neural-privacy-firewall.md) · [Inner speech](phase-1-eeg-to-text.md).
