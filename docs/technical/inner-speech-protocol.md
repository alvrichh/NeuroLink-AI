# Protocolo IS-01 / NPF-01

**Estado IS-01 (2026-11-12):** piloto ejecutado con EEG real de un participante y tres sesiones (200 ensayos de habla interna). Balanced accuracy agrupada 26,5 %, macro-F1 0,2637; permutación de la media por sesión p=0,46 (199 permutaciones). Sin evidencia de mejora sobre el azar. Generalización entre participantes y validación del firewall neuronal pendientes.

[Implementación reproducible](../../experiments/is01/README.md) · [Resultados y limitaciones](../../experiments/is01/reports/pilot-sub01.md).
[English](../en/technical/inner-speech-protocol.md)

## IS-01: clasificación de habla imaginada

1. Revisar la versión/licencia y metadatos del dataset Nieto2022 antes de descargar.
2. Usar únicamente los **ensayos de habla interna** y seleccionar las ventanas temporales del periodo de imaginación; controlar pistas y estímulos visuales.
3. Controlar EOG/EMG, actividad motora, preprocesamiento y filtrado. Comparar con las otras condiciones para detectar atajos del clasificador.
4. Evaluar LDA / regresión logística / SVM antes de redes profundas, con *balanced accuracy*, macro-F1, matriz de confusión y calibración.
5. Separar sesiones y sujetos en evaluación; no filtrar entrenamiento hacia test mediante transformación o ventanas correlacionadas.
6. Comparar con el azar, baseline mayoritario y permutación de etiquetas.
7. Registrar abstenciones y falsos positivos, nunca completar palabras con LLM para mejorar artificialmente resultados.

**Salida científica esperada:** clasificación de cuatro palabras en una tarea de laboratorio, no decodificación del lenguaje natural espontáneo.

## NPF-01: firewall software

Usar una máquina de estados aislada (HARD_OFF, LOCKED, ARMED, DECODING, REVIEW, SEND y AUTOLOCK). Simular entradas de activación legítima, falsa palabra clave, fallo de detector, desconexión, timeout, cancelación y caída de red.

Invariantes de aceptación:
- Ningún dato EEG ni texto sin aprobar sale del dispositivo.
- Ninguna transición LOCKED → SEND directa.
- Sin confirmación explícita no hay envío.
- Error, timeout o cancelación producen bloqueo y borrado del buffer temporal.
- Se puede interrumpir inmediatamente sin conexión a Internet.
- Pruebas del firewall no se presentarán como prueba de detector mental ya disponible.

## NPF-02: intención de comunicar, investigación futura

Requerirá datos expresamente etiquetados para comparar pensamiento privado vs activación voluntaria, además de reposo, artefactos y periodos negativos prolongados. La exactitud de cuatro palabras de Nieto2022 **no mide esta distinción**.

Métricas esenciales: **falsas activaciones por hora**, sensibilidad de activación, tiempo de reacción, intentos de envío no autorizados, funcionamiento con incertidumbre y tasa de cancelación. El protocolo con personas exigiría revisión ética y seguridad del dispositivo.

No existe aún una contraseña mental EEG validada para nuestro dispositivo.
