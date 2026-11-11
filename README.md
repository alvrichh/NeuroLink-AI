# NeuroLink AI
### Investigación sobre comunicación cerebro–inteligencia artificial

**Estado:** propuesta de investigación y diseño técnico (sin decodificador funcional ni pruebas humanas realizadas).  
**Inicio de la documentación:** 11 de noviembre de 2026.  
**Idioma principal:** español.

NeuroLink AI explora una pregunta: **¿podemos comunicarnos voluntariamente con una IA a través de señales cerebrales y, con el tiempo, construir un canal de respuesta cada vez más directo?**

La prioridad no es navegar por Internet, sino **escribir o comunicarnos con la IA mediante actividad cerebral**. La conexión a Internet es una extensión eventual, no el objetivo científico principal.

> ⚠️ Un EEG no lee pensamientos arbitrarios. Nuestro primer prototipo utilizará selección voluntaria de caracteres (P300) sobre registros reales, no supuesta interpretación libre de frases imaginadas. La comunicación neuronal invasiva y la estimulación cerebral quedan fuera del desarrollo independiente.

## Tres fases

| Fase | Objetivo | Alcance inicial | Madurez |
| --- | --- | --- | --- |
| **1. Cerebro → IA** | Producir texto mediante actividad cerebral | Selección P300, decodificación EEG, confirmación de caracteres, mensaje a IA | Construible como prototipo de investigación no invasivo |
| **2. IA → persona** | Recibir respuestas | Pantalla, audio y más adelante códigos hápticos externos; investigación documental sobre estimulación neuronal | Salida convencional viable; transferencia cerebral directa de contenido complejo no demostrada |
| **3. Internet** | Consultar fuentes y herramientas desde la interfaz BCI | Búsqueda, lectura, llamadas de herramientas bajo autorización explícita | Integración de software, dependiente de fases 1–2 |

## Primer hito: PoC 0.1 (sin comprar hardware)

1. Cargar un dataset público P300 con MOABB (BNCI2014-009).
2. Entrenar y evaluar un clasificador **Target vs NonTarget** con MNE/scikit-learn, incluyendo prueba independiente de sesión.
3. Reconstruir selecciones de caracteres cuando el protocolo y los metadatos lo permitan; **clasificar eventos P300 no equivale automáticamente a escribir letras**.
4. Construir una interfaz de teclado que distinga datos reales, reproducción offline y simulación.
5. Enviar **solo texto confirmado por la persona** a un asistente; representar la respuesta visualmente o por voz.

**No hemos implementado ni validado todavía estos componentes.** El repositorio establece el plan científico, el protocolo de evaluación y el perímetro de seguridad para implementarlos.

## Documentación

- [Visión, objetivos y límites](docs/VISION.md)
- [Estado de la ciencia y posibilidades reales](docs/SCIENCE.md)
- [Arquitectura técnica propuesta](docs/ARCHITECTURE.md)
- [Fase 1: escritura con EEG y P300](docs/PHASE_1_EEG_TO_TEXT.md)
- [Fase 2: respuesta bidireccional](docs/PHASE_2_BIDIRECTIONAL.md)
- [Fase 3: acceso a Internet](docs/PHASE_3_INTERNET.md)
- [Hoja de ruta, hitos y criterios de aceptación](docs/ROADMAP.md)
- [Protocolo experimental y evaluación](docs/RESEARCH_PROTOCOL.md)
- [Seguridad, ética y privacidad neuronal](docs/SAFETY_PRIVACY.md)
- [Fuentes científicas y herramientas](docs/REFERENCES.md)
- [Decisiones de producto y preguntas abiertas](docs/DECISIONS.md)

## Stack previsto

Python · MNE-Python · MOABB · scikit-learn (PyTorch solo si aporta valor demostrado) · BrainFlow · FastAPI · React/TypeScript · motor LLM con opción local · audio/háptica no invasiva.

**Límites:** nada de implantes, neuroestimulación casera ni claims de lectura de pensamientos. Sin datos sensibles en el repositorio público. La investigación con personas se planteará únicamente tras revisión ética y evaluación de seguridad pertinentes.

## Fuentes iniciales

- [P300 dataset BNCI2014-009 (MOABB)](https://moabb.neurotechx.com/docs/generated/moabb.datasets.BNCI2014_009.html)
- [Neuroprótesis de voz con 256 microelectrodos, Nature 2025](https://www.nature.com/articles/s41586-025-09127-3)
- [Reconstrucción semántica mediante fMRI, Nature Neuroscience 2023](https://www.nature.com/articles/s41593-023-01304-9)
- [Sensaciones táctiles artificiales con implantes, NIH 2025](https://www.nih.gov/news-events/nih-research-matters/creating-artificial-sense-touch)
- [Recomendación UNESCO sobre ética de la neurotecnología, 2025](https://www.unesco.org/en/legal-affairs/recommendation-ethics-neurotechnology)

> **Naturaleza del proyecto:** investigación y prototipado experimental, no dispositivo médico ni producto de lectura mental.
