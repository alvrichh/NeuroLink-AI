# Fase 1 — Decodificar el lenguaje interior (inner speech)

[English](../en/technical/phase-1-eeg-to-text.md) · [Protocolo experimental](inner-speech-protocol.md) · [Privacidad mental](neural-privacy-firewall.md)

**OBJETIVO:** investigar si podemos reconstruir palabras formuladas internamente, sin pronunciar ni seleccionar letras. Esto es distinto de escribir con P300, que pasa a [método secundario](p300-secondary-baseline.md).

## Dos problemas que no debemos confundir

1. **Contenido:** ¿qué palabra se ha imaginado pronunciar? Empezaremos clasificando un vocabulario pequeño, impuesto por un experimento.
2. **Intención comunicativa:** ¿quiere la persona compartir esa palabra con la IA? Un clasificador de contenido no puede decidir el consentimiento por sí mismo. Ver [Neural Privacy Firewall](neural-privacy-firewall.md).

## Investigación IS-01 — cuatro palabras imaginadas

**Dataset:** Nieto et al. (2022), [*Thinking out loud*](https://www.nature.com/articles/s41597-022-01147-2), [NEMAR/OpenNeuro](https://nemar.org/dataset/on003626), [adaptador MOABB](https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html).

- 10 personas, 3 sesiones, 5.640 ensayos, 128 canales EEG y 8 EOG/EMG.
- Palabras direccionales imaginadas: «arriba», «abajo», «izquierda», «derecha».
- Incluye condiciones de habla pronunciada e imaginación visual, útiles para controles.
- Trabajar con un subconjunto permitido y registrar la licencia antes de descargar o reutilizar.

## Método previsto

1. Revisar protocolos originales, etiquetas, segmentos temporales y canales.
2. Aislar únicamente el intervalo de imaginación y controlar pistas experimentales.
3. Eliminar o controlar artefactos oculares y musculares, evitando usar información futura del conjunto de prueba.
4. Crear baselines interpretables: LDA, regresión logística y SVM (sin redes complejas al principio).
5. Separar ensayos, sesiones y participantes en evaluaciones pertinentes; registrar balanced accuracy, macro-F1, matriz de confusión, intervalos y calibración.
6. Hacer controles con etiquetas permutadas, clase mayoritaria y condiciones visuales.
7. Marcar las predicciones como **hipótesis**, no transcripciones de pensamientos libres; reportar errores, incertidumbre y abstención.

**Límite fundamental:** distinguir cuatro palabras entrenadas no equivale a entender un monólogo mental ni una pregunta espontánea.

## Investigación NPF-01 — el canal de privacidad

Mientras no tengamos evidencia de reconocimiento de intención, crear un estado **LOCKED**, activación externa voluntaria de prueba, ventana local limitada, revisión de salida, confirmación explícita y auto-bloqueo. Una palabra clave mental será una **hipótesis a validar por separado**, no una función afirmada.

La fase 1 no se considerará lograda cuando solo haya un detector de palabras: necesitamos estudiar cómo formular voluntariamente un mensaje, distinguir intención de privacidad y medir la tasa de activaciones falsas.

## Pasos a más largo plazo

- Clasificación de secuencias controladas y vocabulario más amplio, si los resultados lo justifican.
- Estudios de generalización entre sesiones/personas y de atajos musculares o visuales.
- Investigación bibliográfica de prótesis de lenguaje interior implantadas; no extrapolar sus resultados a EEG superficial.
- Traducción de hipótesis de texto a interacción con IA **solo** después de autorización.

No se usarán implantes, neuromodulación ni prototipos conectados a personas sin la correspondiente investigación regulada y revisión de seguridad.

[Hoja de ruta](../research/roadmap.md) · [Estado de la ciencia](../research/state-of-the-science.md).
