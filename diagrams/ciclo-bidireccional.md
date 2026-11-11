# Ciclo de comunicación bidireccional — fuente editable

```mermaid
flowchart TD
    A["Persona / intención voluntaria"] --> B["EEG: selección detectada"]
    B --> C["Caracteres + confirmación"]
    C --> D["IA"]
    D --> E["Respuesta por pantalla o voz"]
    E --> A
    D -.-> F["Código táctil externo<br/>(investigación futura)"]
    F -.-> A
```

Esta **bidireccionalidad funcional** utiliza sentidos naturales. No representa envío directo de conocimiento a neuronas.

[Conceptos de la fase 2](../docs/technical/phase-2-bidirectional.md).
