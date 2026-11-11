# Scientific evidence and limits
*Evidence overview as of November 2026*

[Versión en español](../../research/state-of-the-science.md)

## What an EEG actually measures

Neurons communicate through electrochemical activity. Scalp EEG measures voltage differences produced by the combined activity of large neural populations. The signal is spatially mixed and susceptible to eye, muscle and environmental artifacts. EEG does not directly expose the firing of every neuron or decode arbitrary private thoughts.

## Evidence at a glance

| Research approach | Demonstrated research capability | What cannot be inferred |
| --- | --- | --- |
| Scalp EEG + P300 | Classify responses to attended stimuli, support spelling tasks | Unrestricted free-form thought reading |
| EEG + SSVEP | Select options associated with periodic visual stimuli | Direct interpretation of mental meaning |
| EEG + imagined speech | Restricted-task classification under experimental conditions | Universal speech-to-text by thought alone |
| Intracortical electrodes + attempted speech | Restore limited communication in specific implanted participants | Same performance through off-the-shelf scalp EEG |
| fMRI + semantic decoder | Approximate meaning from trained participants under constrained conditions | Portable EEG extracting spontaneous inner speech |
| Intracortical stimulation | Evoke specific artificial sensations in clinical experiments | Upload facts or complex AI answers directly into a brain |

## Representative primary research

**Attempted-speech neuroprosthesis (2025):** an implanted system with 256 microelectrodes allowed real-time speech synthesis from neural activity associated with attempted speech in a participant with ALS. This is not evidence of general EEG thought reading.  
[Wairagkar and colleagues, Nature (2025)](https://www.nature.com/articles/s41586-025-09127-3)

**Semantic reconstruction with fMRI (2023):** researchers reconstructed aspects of meaning from non-invasive *fMRI* measurements using individually trained decoders and participant cooperation. fMRI is not interchangeable with scalp EEG.  
[Tang and colleagues, Nature Neuroscience (2023)](https://www.nature.com/articles/s41593-023-01304-9)

**Artificial touch with implants (2025):** electrical stimulation applied through implanted cortical electrodes produced limited tactile perceptions such as form and motion in a clinical research setting. This does not demonstrate direct semantic knowledge transfer.  
[NIH research summary (2025)](https://www.nih.gov/news-events/nih-research-matters/creating-artificial-sense-touch)

## Core technical constraints

- **Resolution and artifacts:** scalp EEG signals are mixtures affected by many non-neural factors.
- **Protocol specificity:** detecting a P300 event says something about the attended stimulus, not about every imagined sentence.
- **Generalisation:** subjects, sessions, devices and task paradigms vary; successful training data are not automatically transferable.
- **Sensory information transfer:** a simple evoked sensation is not equivalent to comprehension of an arbitrary concept.

## Scientific vocabulary

**Recorded:** the data as acquired with identifiable provenance.  
**Decoded:** model output estimated from signal and task.  
**Suggested:** words supplied by an LLM, not necessarily present in neural data.  
**Simulated:** synthetic input with no claim of measured brain activity.  
**Demonstrated:** a result with a documented protocol, controls and reproducible evaluation.

[Research roadmap](roadmap.md) · [Original reference list (ES)](../../research/references.md).
