# Visual audit / Auditoría visual
*Updated 2026-11-11*

## Implemented / Completado

- [x] Replace infographic-style visuals on the root README with an editable engineering pipeline and a **real, clearly licensed EEG electrode photo**.
- [x] Update four Mermaid diagrams with more precise data interfaces, user confirmation, stage boundaries and safety statements.
- [x] Add two **real, externally hosted** Commons photos of EEG equipment with attribution, source URLs and image-level licenses.
- [x] Separate experimental evidence from diagrams and user-interface mockups in the media provenance register.
- [x] Keep legacy images only to preserve existing links; mark them as illustrative and no longer promote them as project results.

## Remaining / Pendiente

| Old file | Problem | Real replacement | Done when |
| --- | --- | --- | --- |
| `assets/diagrams/roadmap.svg` | Decorative phase panels | Use the [editable milestone diagram](../diagrams/tres-fases.md) | All legacy consumers migrated |
| `assets/diagrams/architecture.svg` | Decorative general pipeline | Use [technical dataflow](../diagrams/arquitectura-software.md) with API contracts | Add actual implementation traces |
| `assets/diagrams/hardware.svg` | Stylised schematic-like artwork | Use [hardware block design](../diagrams/hardware-signal-chain.md); later an actual EDA schematic | Independently reviewed schematic exists |
| `assets/examples/p300-keyboard.svg` | Mock screen mistaken for real | Screenshot from a running speller app showing source type | Implementation/test reproduces it |
| `assets/examples/conversation.svg` | Mock transcript mistaken for measurement | Screenshot of real confirmed-text integration | Demo exists and is verified |

## Real laboratory evidence to add later / Evidencia de laboratorio futura

- ERP/P300 plots from publicly licensed EEG data, using MNE and reproducible scripts.
- Actual PCB and schematic images only when designed and reviewed.
- Real FPGA waveform screenshot only after a testbench genuinely passes.
- EEG headsets/board imagery with confirmed license per photo.
- Error metrics, throughput and plots with evaluation splits and uncertainty, not synthetic screenshots.

This audit does **not** claim any new experiment, human study, measured data or board prototype has been completed.
