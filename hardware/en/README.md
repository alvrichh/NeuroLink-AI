# NeuroLink AI electronics — engineering overview

[Español](../README.md) · [Editable hardware block diagram](../../diagrams/hardware-signal-chain.md)

## The hardware problem

EEG measures very small analog voltage differences. The complete signal chain has distinct electrical and software functions:

```text
Electrodes -> patient-interface safety (requires professional design)
          -> analog front end (AFE) / ADC -> SPI digital samples
          -> microcontroller and timestamps -> transport -> host software
          -> preprocessing -> P300 classification -> character selection
```

**Verilog does not replace the analog front end.** A hardware description language describes digital logic, e.g. FPGA pipelines or deterministic acquisition control. An MCU is often sufficient for an initial data pipeline; FPGA is optional if measurements later justify its costs.

## Real hardware reference image

![OpenBCI 32-bit ChipKIT v3 board photographed in 2014](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Openbci-brain-computer-interface-by-omphalosskeptic.png/960px-Openbci-brain-computer-interface-by-omphalosskeptic.png)

*OpenBCI 32-bit ChipKIT v3, 2014. Photograph: Omphalosskeptic, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [source](https://commons.wikimedia.org/wiki/File:Openbci-brain-computer-interface-by-omphalosskeptic.png). Unmodified. This is a historical third-party board, not NeuroLink AI hardware.*

## Studied reference components

- **Texas Instruments ADS1299:** specialized EEG analog front end, multiple simultaneous biopotential channels, 24-bit nominal conversion, SPI. [Official product documentation](https://www.ti.com/product/ADS1299).
- **OpenBCI Cyton:** existing biosignal board showing a practical combination of an ADS1299, PIC32 microcontroller and radio. [Cyton specifications](https://docs.openbci.com/Cyton/CytonSpecs/), [hardware development information](https://docs.openbci.com/ForDevelopers/HardwareDevelopment/).
- **SystemVerilog sample register:** [teaching module](../hdl/sample_register.sv) and [testbench](../hdl/tb_sample_register.sv) demonstrate **only digital synthetic sample flow**. This is not an acquisition circuit and is not evidence of physical testing.

## Work packages

| Code | Planned engineering task | Evidence for completion |
| --- | --- | --- |
| H0 | Study requirements, vendor datasheets and risk boundaries | Traceable requirements and references |
| H1 | Simulate a synthetic sample interface and timestamp path | Actual passing testbench and simulator version |
| H2 | Evaluate documented commercial EEG acquisition | Bench data and measured timing, professionally reviewed |
| H3 | Consider custom schematic/PCB design | Appropriate safety and engineering review first |
| H4 | Consider FPGA/Verilog implementation | Documented performance need, synthesis and verification |

## Human safety

An ADS1299 evaluation module or self-built breadboard is **not automatically safe to connect to a person**, even with a battery. Before any participant study or body-contact circuit, professional safety assessment, applicable regulatory analysis, ethics review, protocol approval and informed consent would be essential. The current project does not implement neural stimulation.

## References and visuals

- [Hardware design (Spanish original)](../architecture.md)
- [Analog front-end (Spanish original)](../analog-front-end.md)
- [Digital firmware (Spanish original)](../digital-firmware.md)
- [Verilog/FPGA (Spanish original)](../fpga-verilog.md)
- [Hardware safety (Spanish original)](../safety-review.md)
- [Real EEG photographs with licenses](../../assets/real/README.md)
- [Source and image provenance](../../assets/SOURCES.md)

**Images of vendor boards are referenced from their official documentation, not copied and presented as NeuroLink AI hardware.**
