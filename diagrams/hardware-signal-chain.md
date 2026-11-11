# Bloques de hardware — fuente editable

```mermaid
flowchart LR
    A["Electrodos de registro"] --> B["Interfaz de entrada<br/>(seguridad pendiente)"]
    B --> C["AFE EEG / ADC<br/>(ej. ADS1299)"]
    C -->|"SPI"| D["Microcontrolador<br/>timestamp y paquetes"]
    D --> E["Transporte"]
    E --> F["PC: BrainFlow / MNE"]
    F --> G["Clasificación e IA"]
    H["FPGA / Verilog<br/>opcional en futuro"] -.-> D
```

**No es un esquema eléctrico para construir ni conectar al cuerpo.** Las funciones de aislamiento, protección y alimentación requieren revisión profesional.

![Ilustración electrónica](../assets/diagrams/hardware.svg)

[Detalles de arquitectura física](../hardware/architecture.md).
