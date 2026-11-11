# Image provenance / Procedencia de imágenes

**Policy:** each visual must be labeled as **CONCEPTUAL**, **MOCKUP**, **SIMULATED**, **MEASURED** or **PHOTOGRAPH**. Third-party images must have an exact source and a license/permission record. Do not present third-party equipment as an original NeuroLink AI build.

## Verified, openly licensed photographs displayed via original source URLs

| Reference | Photographer | License | Source | Change | Status |
| --- | --- | --- | --- | --- | --- |
| EEG electrode | George Spilich / Gspilich2 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | [Commons](https://commons.wikimedia.org/wiki/File:EEG_electrode.jpg) | No modification | Embedded remotely with attribution; not copied |
| EEG cap on model | Sdwilli | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:EEG_Cap_on_melon.jpg) | No modification | Embedded remotely with attribution; not copied |
| Historical OpenBCI 32-bit ChipKIT v3 board (2014) | Omphalosskeptic | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Openbci-brain-computer-interface-by-omphalosskeptic.png) | No modification (Wikimedia thumbnail used) | Embedded remotely with attribution; not copied |
| Real 2013 EEG cursor-control study photograph | Laurens R. Krol | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Brain-computer_interface_experiment.jpg) | No modification (Wikimedia 960px preview) | Embedded remotely with attribution; not copied |

Rights checked 2026-11-11 against the individual Wikimedia Commons file pages. Original files are hosted by Wikimedia Commons; no photographic bytes are committed to this repository. **Attribution is retained next to each embed.**

## Reference-only vendor imagery (NOT cleared for local redistribution)

| Source | Reference URL | Decision |
| --- | --- | --- |
| Current OpenBCI Cyton board and circuit documentation | https://docs.openbci.com/ForDevelopers/HardwareDevelopment/ | Link to official source, verify each photo's license before copying |
| Texas Instruments ADS1299 AFE and evaluation board | https://www.ti.com/product/ADS1299 | Link only, verify TI permissions before copying |
| MNE EEG/ERP plots | https://mne.tools/stable/auto_tutorials/evoked/30_eeg_erp.html | Link to methods; create our own plots only when real licensed data have been processed |
| Our HDL simulator waveform | `hardware/hdl/` | Add actual capture only after testbench execution with simulator version and test result |
| Our future P300 demo UI | `examples/` | Replace placeholder mockups only after the app runs and has provenance |

## Legacy illustrations

The following were created as *conceptual mockups*, **not recordings, photos or validated results**:

- `assets/diagrams/roadmap.svg`
- `assets/diagrams/architecture.svg`
- `assets/diagrams/hardware.svg`
- `assets/examples/conversation.svg`
- `assets/examples/p300-keyboard.svg`

They remain to avoid breaking existing links. New entry pages link to the engineering Mermaid diagrams instead; those legacy images may be archived when all referencing documents are migrated.

## Website / Sitio web (`apps/web`)

| Visual | Label | Provenance |
| --- | --- | --- |
| Hero thread animation, interaction sequence, bidirectional diagram, speller matrix | CONCEPTUAL / MOCKUP | First-party code-drawn graphics. Labelled on the page as conceptual; no signal traces or plots |
| Neural Privacy Firewall demonstration | SIMULATED | First-party. Runs a TypeScript mirror of `src/neurolink_ai/privacy_gate.py` driven by button presses and timers; the candidate text is a fixed synthetic string. No EEG and no intent detection |
| EEG cap on model, OpenBCI 32-bit board, 2013 BCI experiment | PHOTOGRAPH / LICENSED | The three Wikimedia Commons photographs registered above, **embedded remotely with attribution next to each figure; not copied** |
| Logo and colours | Brand asset | Synced at build time from `assets/branding/`; not modified |

The website shows no measured data. The register of exact photo URLs used by the site is `apps/web/src/content/media.ts`; keep it consistent with this file.

## Publishing real measurements

For each plot: dataset or acquisition device, legal permission to reuse data, subject/session where not personally identifying, preprocessing steps, plotting code/version, axis labels, units, evaluation split, and whether generated from recorded or synthetic EEG. No invented ERP curves or fabricated scope traces.
