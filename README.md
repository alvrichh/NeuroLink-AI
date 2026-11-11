# NeuroLink AI

**Brain–computer interfaces, EEG acquisition and AI-assisted communication.**  
**Interfaces cerebro–ordenador, adquisición EEG y comunicación asistida por IA.**

[English](#english) · [Español](#español) · [Repository plan](docs/REPOSITORY_PLAN.md) · [Visual standards](docs/VISUAL_STANDARDS.md)

> **Status / Estado:** research planning and technical documentation. No validated EEG decoder, human study, custom EEG acquisition board or measured results are claimed.

## English

NeuroLink AI explores whether voluntary brain activity can become a practical input channel for communicating with an AI assistant.

Our order of priorities:

1. **Brain → AI:** use non-invasive EEG and a controlled paradigm (initially P300 character selection) to compose and confirm text.
2. **AI → person:** present responses using text or audio, with optional research into non-invasive tactile feedback. Direct neural stimulation belongs to clinical research and is outside the independent prototype.
3. **Internet tools:** optionally enable searching and retrieving information after reliable confirmation is established.

The first technical milestone is a **reproducible offline P300 baseline on a public dataset**. Classifying P300 events does not, by itself, prove reliable character spelling or unrestricted thought decoding.

[English overview](docs/en/README.md) · [Technical architecture](docs/technical/architecture.md) · [Electronic engineering](hardware/README.md)

## Español

NeuroLink AI investiga la comunicación voluntaria con una IA mediante actividad cerebral. Nuestro objetivo principal es **escribir mensajes sin teclado ni voz**.

Las tres fases son:

1. **Cerebro → IA:** seleccionar letras mediante EEG no invasivo (inicialmente P300), corregirlas y confirmar el mensaje.
2. **IA → persona:** recibir respuestas por pantalla o voz y estudiar, más adelante, códigos táctiles externos. La estimulación neuronal directa solo se contempla como investigación científica y clínica.
3. **Internet:** conectar herramientas de consulta de forma opcional y con permisos, una vez que el canal de comunicación sea fiable.

El primer hito consiste en evaluar un clasificador P300 sobre datos públicos y documentar correctamente sus errores, latencias y limitaciones. **No equivale a leer pensamientos arbitrarios.**

[Explicación sencilla](docs/simple/README.md) · [Documentación técnica](docs/technical/README.md) · [Investigación](docs/research/README.md)

## Repository map / Mapa

| Area | Content / Contenido |
| --- | --- |
| [`docs/simple/`](docs/simple/README.md) | Simple explanations / Explicaciones accesibles |
| [`docs/technical/`](docs/technical/README.md) | Signal processing, software and research protocol / Procesado, software y protocolo |
| [`docs/research/`](docs/research/README.md) | Evidence, references, roadmap / Evidencia, referencias, planificación |
| [`hardware/`](hardware/README.md) | Analog front-end, firmware, optional HDL / Electrónica analógica, firmware y HDL opcional |
| [`diagrams/`](diagrams/README.md) | Editable conceptual diagrams / Diagramas conceptuales editables |
| [`examples/`](examples/README.md) | Examples clearly identified as mockups / Ejemplos identificados como maquetas |
| [`assets/`](assets/SOURCES.md) | Source registry and current illustrations / Registro de fuentes e ilustraciones |
| [`docs/REPOSITORY_PLAN.md`](docs/REPOSITORY_PLAN.md) | Phased bilingual and visual reorganization / Plan bilingüe y visual |
| [`docs/VISUAL_AUDIT.md`](docs/VISUAL_AUDIT.md) | File-by-file visual replacements / Sustitución de figuras, archivo por archivo |

**Evidence rule / Regla de evidencia:** diagrams are conceptual unless explicitly identified as measured; screenshots and plots must name their source and processing method. Proprietary photographs are not copied into the repository without rights verification.

**Safety rule / Seguridad:** no DIY neural stimulation, no experimental electronics attached to people, no raw identifiable neural data in this public repository.

See [research protocol](docs/technical/research-protocol.md), [hardware safety](hardware/safety-review.md) and [image licensing](assets/SOURCES.md).
