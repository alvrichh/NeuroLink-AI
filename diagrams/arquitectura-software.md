# Arquitectura de software — fuente editable

```mermaid
flowchart LR
    A["Datos EEG: offline, vivo o sintético"] --> B["Preprocesamiento MNE"]
    B --> C["Clasificador P300"]
    C --> D["Selección candidata"]
    D --> E{"¿Confirmado?"}
    E -- No --> D
    E -- Sí --> F["API / Asistente IA"]
    F --> G["Pantalla / audio"]
    F -.-> H["Internet opcional"]
```

![Ilustración de arquitectura](../assets/diagrams/architecture.svg)

**Importante:** un clasificador de eventos P300 no se convierte automáticamente en decodificador de caracteres. Se necesita la estructura del paradigma y agregación de estímulos.
