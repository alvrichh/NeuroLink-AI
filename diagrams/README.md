# Engineering diagrams / Diagramas de ingeniería

These diagrams are **editable Mermaid source** rendered by GitHub. They describe proposed modules, data interfaces and control flow; they do not pretend to be validated measurements or finished PCB schematics.

Los siguientes diagramas son **fuentes Mermaid editables**. Documentan interfaces, flujo de datos y límites de diseño. No son esquemas eléctricos certificados ni pruebas experimentales.

| Figure / Figura | Description / Descripción | Type |
| --- | --- | --- |
| [Acquisition hardware / Cadena de adquisición](hardware-signal-chain.md) | Electrodes, analog front-end, ADC, MCU and host | CONCEPTUAL |
| [Software/data pipeline](arquitectura-software.md) | EEG, inner-speech hypotheses, privacy gate, confirmation, assistant | CONCEPTUAL |
| [Neural Privacy Firewall / Firewall neuronal](neural-privacy-firewall.md) | Fail-closed state machine | CONCEPTUAL |
| [Research roadmap / Hoja de ruta](tres-fases.md) | Workstreams and phase gates | PLANNED |
| [Bidirectional loop / Circuito bidireccional](ciclo-bidireccional.md) | Voluntary input and sensory output, not brain stimulation | CONCEPTUAL |

## Conventions / Convenciones

1. Default neutral Mermaid styling; no ornamental gradients, neon icons or pretend oscilloscope plots.
2. Indicate information types (µV, digital samples, events, text) and boundaries.
3. Show an explicit confirmation and cancellation path before any external action.
4. Clearly distinguish optional FPGA hardware from required AFE/ADC functions.
5. Use photographs only with source and license verification; see [real reference photos](../assets/real/README.md).
6. Old infographic-style assets still linked by legacy pages in `assets/diagrams/` and `assets/examples/` are **illustrative only**, not engineering results. Replacement will be tracked separately.

[Visual audit](../docs/VISUAL_AUDIT.md) · [Hardware safety](../hardware/safety-review.md).
