# Fase 1 — Escribir mediante actividad cerebral

**Prioridad principal del proyecto.**

## Separar dos problemas científicos

### A. Selección cerebral de caracteres: P300 Speller

Un EEG detecta respuestas relacionadas con la atención a estímulos visuales. El clasificador estima si un evento fue relevante para el participante (Target) o no (NonTarget). Un algoritmo específico del paradigma acumula evidencias hasta proponer una letra.

Esto permite desarrollar un teclado BCI experimental, **pero no significa que el sistema pueda interpretar cualquier frase pensada sin contexto**.

### B. Decodificación de habla imaginada

La persona imagina pronunciar palabras sin emitir sonido. Se estudia si la señal permite reconocer palabras o clases conocidas. Debemos exigir validación entre sesiones, control de artefactos y separación de la predicción de lenguaje. Esta línea queda como investigación posterior, no como dependencia del MVP.

## Dataset inicial: BNCI2014-009

Según la documentación de MOABB:

- 10 participantes, 16 canales EEG, muestreo de 256 Hz.
- 3 sesiones expuestas por el cargador; el estudio describe más grabaciones, pero el cargador utiliza las sesiones efectivamente disponibles.
- Paradigma P300 con clases **Target** y **NonTarget** y matriz de 36 caracteres.
- El cargador MOABB incorpora los datos de la modalidad de cuadrícula, no la modalidad GeoSpell.
- El dataset puede incluir datos ya preprocesados: registrar qué filtros se aplicaron antes de entrenar.

Referencias:
- https://moabb.neurotechx.com/docs/generated/moabb.datasets.BNCI2014_009.html
- https://doi.org/10.1088/1741-2560/11/3/035008

**Licencias:** verificar las condiciones del dataset en origen antes de descargar, redistribuir o utilizar con fines comerciales. No subir EEG bruto al repositorio público.

## Experimento E1: clasificación ERP

1. Fijar versiones de Python y librerías, semillas aleatorias y metadatos del conjunto.
2. Cargar EEG y etiquetas con MOABB; verificar sujeto, sesión, clases, forma y unidades.
3. Separar entrenamiento y evaluación por **sesión** cuando proceda, además de baselines dentro de sesión. Evitar mezclar eventos de una misma secuencia o prueba entre ambos grupos.
4. Crear épocas relativas a marcas de estímulo usando MNE; documentar ventana, referencia, filtros y rechazo de artefactos.
5. Entrenar baseline LDA regularizado o regresión logística con el desbalance de clases tratado correctamente.
6. Comparar con una estrategia trivial, un modelo con etiquetas permutadas y métricas apropiadas (ROC-AUC/PR-AUC, sensibilidad, especificidad, matriz de confusión y calibración).
7. Guardar resultados, configuración, versión y métricas por sujeto/sesión. No extrapolar promedios a usuarios nuevos.

**Advertencia:** clasificar Target/NonTarget en eventos aislados no certifica la precisión por carácter.

## Experimento E2: seleccionar letras

Para cada ensayo de escritura:

- Conservar el orden de los estímulos y el mapa de filas/columnas o grupos atendidos.
- Agregar probabilidades por repetición y alternativa.
- Elegir letra candidata solo tras un umbral de evidencia calibrado.
- Permitir «no estoy seguro», edición y cancelación.
- Comparar letra estimada con la letra objetivo original.
- Medir precisión por carácter, caracteres correctos/minuto, latencia y tasa de selección involuntaria.

Si faltan los metadatos necesarios para reconstrucción real de caracteres en la versión del dataset que utilizamos, **no simularlos como si fueran datos reales**: optar por otro conjunto con estructura completa o documentar E2 como simulación explícita.

## Experimento E3: teclado → IA

- Teclado visible muestra cada letra candidata y su fuente (EEG, replay o synthetic).
- Envío solo tras confirmación.
- Primer asistente será un stub local determinista que responda a un texto.
- Después podremos integrar un modelo LLM intercambiable; sus autocompletados nunca contarán como aciertos del decodificador.

Ejemplo de demostración deseada: componer «HOLA IA», enviarlo y leer «Hola, he recibido tu mensaje». **Es una meta ilustrativa, no un resultado obtenido.**

## Hardware: no comprar hasta tener baseline

Para un paso posterior, evaluar un EEG no invasivo compatible con BrainFlow según cantidad y colocación de electrodos, calidad de señal, frecuencia de muestreo, marcadores temporales sincronizados, compatibilidad de software, coste y seguridad del producto. No seleccionar hardware solo por marketing de «leer la mente».

## Criterio de salida de fase

Resultados reproducibles por sesión, selección de caracteres con trazabilidad, incertidumbre visible y envío voluntario de mensajes sin intervención manual en la fase de selección. La demo debe revelar cuándo usa datos grabados y cuándo señales en vivo.
