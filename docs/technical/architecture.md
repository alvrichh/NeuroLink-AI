# Arquitectura técnica propuesta

## Principio general

Separar rigurosamente el **origen de la señal**, la **decodificación**, la **selección de texto**, el **asistente** y la **salida de respuesta**. Así podremos sustituir datasets, algoritmos, sensores y modelos de lenguaje sin cambiar la lógica del resto.

```text
Dataset MOABB ─┐
BrainFlow EEG ─┼──> Fuente EEG + marcas de estímulo
Synthetic test ┘            |
                             v
                    Preprocesamiento MNE
                             |
                             v
                   Extracción de épocas ERP
                             |
                             v
               Clasificador P300 Target/NonTarget
                             |
                             v
           Agregación por secuencia de estímulos
                             |
                             v
              Candidato de letra + incertidumbre
                             |
                             v
                Editar / confirmar / cancelar
                             |
                             v
                Backend FastAPI: mensaje
                             |
                             v
                Pasarela al asistente LLM
                             |
                 ┌───────────┴─────────────┐
                 v                         v
          Respuesta texto/voz      Herramientas web (fase 3)
                 |
                 v
         Pantalla / audio / háptica externa
```

## Módulos

1. **data-sources**: adaptador para MOABB/MNE, eventos de estímulo, reproducción y BrainFlow. Los datos BNCI en formato MAT no son directamente archivos de Playback Board de BrainFlow: se necesita un adaptador.
2. **signal-processing**: referencia, filtrado documentado, eliminación de artefactos, segmentación temporal, normalización entrenada solo con los datos correspondientes.
3. **decoder**: clasificador con puntuación calibrada; baseline LDA/regresión logística y, si procede, métodos ERP especializados.
4. **speller**: transforma puntuaciones por evento en selección de caracteres conforme al protocolo de la matriz; manejo de espacios, borrado y confirmación.
5. **assistant-api**: recibe mensajes confirmados, invoca un modelo con salida trazable y gestiona estados y errores.
6. **feedback**: responde por pantalla/audio; salida háptica externa en una etapa posterior.
7. **audit**: conserva métricas de origen, latencia, versión de pipeline y confirmaciones sin registrar datos sensibles innecesarios.

## Stack sugerido

- **Python 3.12** para experimentación e integración.
- **MNE-Python / MOABB** para EEG y benchmarks; **scikit-learn** para el baseline.
- **PyTorch** solo si hay una hipótesis técnica y una mejora fuera de muestra.
- **BrainFlow** para equipos compatibles, archivos de reproducción y señales sintéticas de desarrollo.
- **FastAPI + Pydantic** para la interfaz de aplicación y validación.
- **React + TypeScript** para teclado y panel de señales/estado.
- **LLM** intercambiable: API externa autorizada o implementación local cuando sea posible.

## Contratos lógicos (borrador, no API implementada)

- **SignalWindow:** source_type, session_id, sampling_rate, channels, timestamps, samples y stimulus_events. Datos brutos solo localmente.
- **P300Prediction:** event_id, target_probability, model_version, validation_context.
- **CharacterCandidate:** character, confidence, repetitions, evidence_ids, selection_mode (real/replay/synthetic).
- **ConfirmedMessage:** text, confirmation_id, timestamp, source_summary.
- **AssistantResponse:** text, model_id, tools_used, external_actions_proposed.
- **FeedbackEvent:** modality (text/audio/haptic), payload_id, status.

El asistente jamás recibirá un carácter que no haya atravesado la etapa de confirmación del usuario. Si el modelo completa palabras o corrige errores, se indicará expresamente qué segmentos son inferidos por el LLM.

## Estados de la interfaz

**Idle → Acquire/Replay → Decode → Candidate → Confirm/Edit → Send → Respond → Idle**.

Ante señal insuficiente, baja confianza, desconexión, cancelación o anomalía: volver a **Idle** sin ejecutar acciones externas.

## Seguridad de arquitectura

- Procesado de EEG local por defecto.
- Ninguna credencial en frontend o repositorio.
- Herramientas web deshabilitadas por defecto.
- Límites de tasa y coste del LLM; auditoría mínima.
- Aislamiento de datasets experimentales y sesiones personales.
- Ninguna función de neuroestimulación conectada a este software.

## Diseño de proyecto esperado

```text
NeuroLink-AI/
  docs/
  experiments/         # notebooks/scripts reproducibles cuando existan
  src/neuralink_ai/
    data/
    processing/
    decoding/
    speller/
    integration/
  apps/api/
  apps/web/
  tests/
  results/              # SOLO agregados anonimizados, si se publican
```

Esta estructura es **propuesta futura**; no se debe asumir que las carpetas de código ya existen.


## Capa de adquisición física

El flujo de software depende de una cadena de adquisición segura: electrodos → entrada analógica de biopotenciales (AFE) → conversor ADC → microcontrolador/firmware → transporte → adaptador EEG. **Verilog no sustituye la electrónica analógica.** Ver [arquitectura de hardware](../../hardware/architecture.md) y el [diagrama del camino de señal](../../diagrams/hardware-signal-chain.md).
