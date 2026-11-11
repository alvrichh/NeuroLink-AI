# Referencias científicas, datasets y herramientas

Listado de fuentes verificadas al preparar la propuesta inicial (11-11-2026). Los enlaces remiten a estudios/documentación primaria o de referencia. Se deberá comprobar cada licencia y nueva versión antes de reutilizar datos o software.

## Decodificación cerebro → texto/voz

1. **Wairagkar et al. (2025), An instantaneous voice-synthesis neuroprosthesis. Nature.** Demostración clínica de síntesis de voz por actividad neuronal captada con 256 microelectrodos implantados en participante con ELA.  
   https://www.nature.com/articles/s41586-025-09127-3

2. **Tang et al. (2023), Semantic reconstruction of continuous language from non-invasive brain recordings. Nature Neuroscience.** Reconstrucción de significado con fMRI y entrenamiento individual; no es EEG ni lectura mental universal.  
   https://www.nature.com/articles/s41593-023-01304-9

3. **Imagined Speech Brain–Computer Interface: A Task-Oriented Review of Neural Decoding (2026). Sensors.** Problemas de generalización, señal, variabilidad y diversidad de tareas de habla imaginada.  
   https://pmc.ncbi.nlm.nih.gov/articles/PMC13211074/

4. **Aricò et al. (2014), Influence of P300 latency jitter on event related potential-based brain–computer interface performance. Journal of Neural Engineering.** Investigación vinculada al dataset seleccionado.  
   https://doi.org/10.1088/1741-2560/11/3/035008

## Comunicación sensorial y bidireccionalidad

5. **NIH (25-02-2025), Creating an artificial sense of touch.** Resumen de investigación clínica con microestimulación intracortical y percepción de forma, orientación y movimiento.  
   https://www.nih.gov/news-events/nih-research-matters/creating-artificial-sense-touch

## Ética

6. **UNESCO, Recommendation on the Ethics of Neurotechnology (adoptada 11-11-2025).** Texto normativo internacional de referencia.  
   https://www.unesco.org/en/legal-affairs/recommendation-ethics-neurotechnology

## Dataset y documentación técnica

7. **MOABB BNCI2014-009.** 10 participantes, 3 sesiones expuestas por el cargador, 16 canales EEG, 256 Hz, P300 Target/NonTarget; incluye modalidad grid speller. Nota sobre diferencias entre sesiones descritas y sesiones efectivamente disponibles. **La documentación muestra CC BY-NC-ND 4.0**: revisar términos originales antes de uso y redistribución.  
   https://moabb.neurotechx.com/docs/generated/moabb.datasets.BNCI2014_009.html

8. **MOABB, ejemplos de evaluación intra/inter-sesión.**  
   https://moabb.neurotechx.com/docs/auto_examples/paradigm_examples/index.html

9. **MNE-Python, documentación.** Procesamiento EEG, épocas y visualización.  
   https://mne.tools/stable/index.html

10. **BrainFlow, documentación.** API para adquisición EEG y tableros de reproducción/síntesis. Un generador sintético es útil para probar software, pero no para validar decodificación de señales neuronales reales.  
    https://brainflow.readthedocs.io/en/stable/index.html

11. **BrainFlow, Supported Boards.** Listas y características de equipos y Playback/Synthetic Board.  
    https://github.com/brainflow-dev/brainflow/blob/master/docs/SupportedBoards.rst

## Nota sobre la evidencia

- «Demostrado en laboratorio» no implica disponibilidad como producto de consumo.
- No transferir cifras de precisión de una investigación invasiva a EEG externo.
- Un EEG que identifica letras por atención no comprende espontáneamente el lenguaje interno.
- La investigación sobre percepción inducida no equivale a inyectar contenido semántico al cerebro.
