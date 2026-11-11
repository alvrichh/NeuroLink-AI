# P300 Speller — técnica secundaria / archivo de referencia

Este material se conserva para estudiar otras interfaces cerebro-ordenador, **pero ya no representa el objetivo principal de NeuroLink AI**.

## Qué es

Un teclado P300 detecta respuestas EEG a estímulos visuales e infiere selecciones de letras mediante agregación de eventos. Permite estudiar adquisición y clasificación EEG, pero obliga a **seleccionar caracteres**, no a descifrar directamente la voz interior.

## Dataset de referencia

[BNCI2014-009 (MOABB)](https://moabb.neurotechx.com/docs/generated/moabb.datasets.BNCI2014_009.html): 10 participantes, 16 canales, 256 Hz, clases Target/NonTarget, sesiones EEG. Comprobar condiciones de uso y preprocesamiento original.

## Experimentos archivados como opcionales

- Clasificar ERP Target/NonTarget con LDA o regresión logística; evaluar por ensayo/sesión sin fuga de datos.
- Reconstruir letras solo cuando existan metadatos originales completos del paradigma.
- Informar accuracy por carácter, caracteres/minuto, incertidumbre y selecciones no intencionadas.
- No atribuir autocompletado de IA a señales cerebrales.

**Nuevo experimento prioritario:** [habla interior de cuatro palabras](phase-1-eeg-to-text.md). La decisión de no utilizar un teclado mental como interacción primaria se documenta en [decisiones](../research/decisions.md).
