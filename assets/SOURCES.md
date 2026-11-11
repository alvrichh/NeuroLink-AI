# Media source and permission register
*Registro de fuentes y derechos de las imágenes / 2026-11-11*

**No third-party photos have been copied into this repository.** Candidates below are **references to investigate**, not permission to redistribute them.

| Planned asset | Official reference | Known licensing information | Present action / Acción actual | Status |
| --- | --- | --- | --- | --- |
| OpenBCI Cyton PCB photo | https://docs.openbci.com/GettingStarted/Boards/CytonGS/ | OpenBCI [hardware development page](https://docs.openbci.com/ForDevelopers/HardwareDevelopment/) states MIT for information there; **individual photo rights must still be verified** | Link to official page, no copied file | Pending photo-level rights |
| OpenBCI Cyton schematic | https://docs.openbci.com/ForDevelopers/HardwareDevelopment/ | Hardware development materials described as MIT; verify exact design files/license | Cite original hardware documents, do not imply our design | Reference only |
| TI ADS1299 / evaluation PCB photo | https://www.ti.com/product/ADS1299 | TI [copyright terms](https://www.ti.com/legal/terms-conditions/copyright.html) restrict redistribution and external display without permission | **Link only**; seek written permission before committing image | Redistribution not cleared |
| Genuine ERP trace | https://mne.tools/stable/auto_tutorials/evoked/30_eeg_erp.html | MNE tutorial code is BSD-3-Clause; **EEG dataset has separate license** | Generate our own plots from permitted EEG with reproducible code | Await experiment |
| EEG P300 speller screenshot | Original application in this repository (future) | We own screenshot when app is built, subject to any underlying assets | Current SVG is just MOCKUP | Await working app |
| HDL simulation waveform | Own SystemVerilog testbench | Own output if simulator is actually run | Capture real waveform and command/version | Await test run |
| KiCad EEG acquisition schematic | Own design, subject to engineering review | In-house, once authored; third-party symbols may carry license | Only prospective, not an approved design | Await design and safety review |

## Publish rules / Reglas de publicación

1. Every new asset entry must include **exact URL**, source owner, terms of reuse, date acquired, required attribution, modification note, status and purpose.
2. If permission is unclear, **link to the provider** rather than uploading or mirroring their image.
3. Mark *MEASURED* only when data and method really exist. Mark *SIMULATED* for synthetic data, *MOCKUP* for example screens and *CONCEPTUAL* for diagrams.
4. Do not use generated photorealistic images to masquerade as actual hardware or laboratory evidence.
5. Never commit participant-identifiable EEG traces, subject identifiers tied to personal data, consent records, API keys or private device logs.

See [editorial standards](../docs/VISUAL_STANDARDS.md) and [audit](../docs/VISUAL_AUDIT.md).
