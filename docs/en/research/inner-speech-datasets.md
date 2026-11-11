# Inner speech datasets and privacy evidence

[Español](../../research/inner-speech-datasets.md)

## First reproducible EEG target: Nieto et al. (2022)

- **10 participants**, **3 sessions**, **5,640 trials**.
- Four imagined Spanish directions: *arriba, abajo, derecha, izquierda*.
- Three conditions: **inner speech**, pronounced speech and visualized movement.
- BioSemi ActiveTwo setup: **128 EEG + 8 external EOG/EMG channels**, sampling at 1,024 Hz.
- Data: [Scientific Data paper](https://www.nature.com/articles/s41597-022-01147-2) · [OpenNeuro/NEMAR](https://nemar.org/dataset/on003626) (NEMAR advertises **CC0**) · [MOABB Nieto2022 loader](https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html).

**This is not a free-form thought transcript.** It supports a four-class prompted imagined-word experiment with careful testing against visual and muscular confounds.

## Separate questions, separate evidence

**IS-01 — linguistic decoding:** can recorded EEG predict a small closed set of internally imagined words on independent trials/sessions?

**NPF-01 — safety invariant:** can software reliably remain locked, discard private inputs and prevent external transmission without explicit confirmation? This can be verified using synthetic state events.

**NPF-02 — intention to communicate:** can EEG distinguish deliberately addressed inner speech from ordinary private inner speech? **The Nieto dataset does not contain the needed intent/private labels**; a separate ethically reviewed dataset and protocol are required.

## Implanted neural privacy study

Kunz et al., *Cell* (2025), demonstrated implanted-device inner-speech decoding and a password-like mental activation technique. **98.75%** was a *real-time keyword detection accuracy in a participant*, **not** a result for scalp EEG or proof of perfect thought privacy.

Study: https://pmc.ncbi.nlm.nih.gov/articles/PMC12360486/  
NIH overview: https://www.nih.gov/news-events/nih-research-matters/decoding-inner-speech-brain-signals

[Neural firewall](../technical/neural-privacy-firewall.md) · [Spanish experimental protocol](../../technical/inner-speech-protocol.md).
