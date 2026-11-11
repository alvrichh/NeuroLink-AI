# Visual audit — what to replace and why
*Auditoría de gráficos actuales / File-by-file replacement plan*  
**Audit based on repository contents on 2026-11-11.**

| Existing file | Current use | Problem | Replacement | Evidence required |
| --- | --- | --- | --- | --- |
| `assets/diagrams/roadmap.svg` | Three phases in colored panels | Promotional, not an engineering roadmap | Plain Gantt or phase/acceptance matrix maintained from actual GitHub issues | No photo required; cite issue links |
| `assets/diagrams/architecture.svg` | EEG → preprocessing → P300 → AI | Simplified decorative pipeline; lacks data contracts and error paths | Editable C4-style or dataflow diagram separating offline/live EEG, decoder, confirmation, tool gateway and response | Design revision and source diagram |
| `assets/diagrams/hardware.svg` | Electrodes → AFE/ADC → MCU → PC | Blocks are good but presentation resembles infographic and safety is too abstract | Two visuals: (1) actual hardware block diagram with timing/power/safety boundary; (2) **licensed** photograph of a reference PCB, credited separately | Parts documentation, safety notes and photo rights |
| `assets/examples/p300-keyboard.svg` | Fake keyboard UI showing “HOLA IA” | Easily mistaken for a working speller | Initially labeled **wireframe**; later a screenshot of our running application with source mode and log | Working app screenshot; EEG accuracy shown only if actually measured |
| `assets/examples/conversation.svg` | Fake conversation result | Looks like experimental achievement without the experiment | Written user journey + **mockup** until the assistant integration runs; then own UI screenshot with data provenance | Integration tests, confirmation flow, actual screenshot |

## Additional *real* figures to add later

- **OpenBCI board photo:** official hardware reference photo; only embed after checking **photo-specific** rights. Link meanwhile to [OpenBCI Cyton Getting Started](https://docs.openbci.com/GettingStarted/Boards/CytonGS/).
- **ADS1299 reference board:** official TI website or EVM as a link; **do not copy TI image without permission**, due to TI reproduction restrictions.
- **ERP/P300 plot:** generate locally from a licensed public EEG dataset using a reproducible MNE script; disclose if dataset is raw vs preprocessed, participant/session and filter.
- **Frequency/noise trace:** only from a trace actually recorded or from a clearly marked simulation.
- **KiCad schematic and PCB screenshot:** only after design exists; say “under review”, not “safe for human use”.
- **HDL waveform:** only after actually running the testbench and documenting command, simulator version and expected results.

## Replacement sequence

1. Remove decorative figures from the **main README** pending legitimate replacements. Keep conceptual source diagrams elsewhere explicitly labeled.
2. Redraw architecture and hardware diagrams with engineering naming and editable source.
3. Verify rights and register official hardware photos.
4. Generate genuine ERP/EEG plots from documented experiments.
5. Replace UI mockups with captures from the running prototype.
6. Keep source/caption/metadata synchronized in English and Spanish.

Reference material: [OpenBCI hardware documentation](https://docs.openbci.com/ForDevelopers/HardwareDevelopment/), [ADS1299 documentation](https://www.ti.com/product/ADS1299), [MNE ERP tutorial](https://mne.tools/stable/auto_tutorials/evoked/30_eeg_erp.html).

**Important:** screenshots of vendor pages and third-party lab setups are not equivalent to measured results from NeuroLink AI.
