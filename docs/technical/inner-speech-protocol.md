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

<a id="npf-02"></a>

## NPF-02: percepción, habla privada e intención de comunicar

**Propuesta de viabilidad (2026-11-13), sin ejecutar.** No es un detector implementado ni una ampliación retrospectiva de los resultados de IS-01. Nieto2022 no aporta las etiquetas de intención necesarias. Habla interna, imágenes mentales y percepción pueden coexistir; una tarea asignada y el autoinforme son etiquetas operativas imperfectas, no acceso directo al pensamiento ni prueba de consentimiento.

### Pregunta y condiciones

¿Puede un modelo distinguir habla imaginada dirigida al asistente de la misma habla imaginada privada en una persona no vista durante el entrenamiento? Reconocer cuatro palabras y reconocer intención son objetivos distintos.

| Condición | Tarea | Salida autorizada |
| --- | --- | --- |
| Escucha | Escuchar las cuatro palabras, sin repetirlas deliberadamente | Ninguna |
| Lectura | Leer las mismas palabras en silencio | Ninguna |
| Habla privada | Imaginar las palabras para uno mismo | Ninguna |
| Habla dirigida | Imaginar las mismas palabras para el asistente | Solo tras activación externa y confirmación |
| Imaginación visual | Imaginar desplazamientos sin verbalizarlos deliberadamente | Ninguna |
| Reposo | Sin tarea de comunicación | Ninguna |

Las palabras serán arriba, abajo, izquierda y derecha. Un bloque negativo naturalista incluirá lectura, escucha, escritura y pensamiento libre, sin registrar el contenido privado. Escribir introduce actividad motora: informar esa condición por separado. El olfato se deja para una extensión con presentación controlada; no inferir resultados olfativos de controles visuales o auditivos.

### Piloto manejable y datos necesarios

Propuesta: **12 participantes, dos días por persona**, 20 ensayos por condición y día (cinco por palabra cuando corresponda): 2.880 ensayos en total. Añadir 30 minutos negativos continuos por día/persona: **12 horas negativas**. Presupuestar 60–90 minutos por visita, 24–36 horas de participación, más preparación y análisis. La cifra es una decisión de viabilidad, no un cálculo de potencia ni validación para uso real; publicar pérdidas y tamaño final, sin sustituir participantes tras mirar resultados.

Antes de reclutar: revisión ética, hardware de investigación adecuado, consentimiento específico de adquisición, política de retirada/retención y protocolo prerregistrado. Adquirir EEG más EOG/EMG sincronizados. Registrar sujeto, día, bloque, ensayo, condición, palabra asignada, eventos, rechazos y autoinforme breve opcional, sin pedir una transcripción del pensamiento libre.

### Evitar atajos y fugas

- Emparejar palabras, duración y carga de tarea entre habla privada y dirigida. Contrabalancear orden y asignación de pistas; separar temporalmente instrucciones y ventana analizada. Usar varias pistas por condición y reservar identidades de pista para una prueba de sensibilidad.
- Mantener la misma pantalla y ausencia de pulsaciones dentro de las ventanas comparadas. La activación externa queda fuera de la ventana; no dar al modelo el estado del botón, marcador de condición, identidad de palabra o metadatos de estímulo. Un sistema seguro usa ese control, pero un clasificador no puede usarlo como prueba de intención neuronal.
- Evaluación externa **leave-one-subject-out**, reteniendo ambos días de cada persona. Validación interna agrupada por participante para elegir hiperparámetros, canales, umbral y abstención. Ajustar escalado, selección de características, ICA u otras transformaciones aprendidas solo con entrenamiento; no usar datos de test sin etiqueta para adaptar el modelo principal.
- Todas las ventanas de un ensayo/bloque permanecen juntas. No filtrar registros concatenados entre particiones. Congelar manifiesto de datos, hashes, versiones, semillas, exclusiones y particiones antes del análisis. No convertir ventanas correlacionadas en participantes independientes.
- Comparar EEG, EOG solo, EMG solo y un baseline de pistas/tiempos con las mismas particiones. Añadir ablación de canales periféricos. Las diferencias no prueban causalidad de artefactos; puede quedar confusión residual por atención, esfuerzo o demanda experimental.

### Métricas y decisión prerregistrada

Objetivo primario: habla dirigida frente a privada, misma palabra; balanced accuracy promediada por participante, intervalo mediante remuestreo de participantes y permutación restringida a unidades intercambiables según la aleatorización (bloques si la tarea se asignó por bloques). Repetir selección/ajuste dentro de cada permutación, con al menos 999 permutaciones. Nunca barajar ventanas correlacionadas como observaciones independientes.

Criterios propuestos para continuar, todos necesarios: balanced accuracy media ≥0,60, límite inferior del IC del 95 % >0,50 y p<0,05; sensibilidad de activación ≥80 % con umbral elegido solo en entrenamiento; límite superior unilateral del 95 % de falsas activaciones ≤1/h en negativos continuos. Son objetivos de investigación, no umbrales clínicos ni garantía de privacidad. Informar resultados por persona/condición, macro-F1, confusiones, abstenciones, latencia y todos los fallos, incluso si no se cumplen los criterios.

Definir un evento falso como el inicio de un episodio de activación, agrupando detecciones separadas por menos de dos segundos; fijar ventana y periodo refractario antes del test. Denominador: tiempo negativo completo elegible, con exclusiones declaradas; informar también ocupación/refractario para no ocultar alarmas. Con cero eventos en T horas, el límite Poisson unilateral aproximado es 3/T: 12 h darían 0,25/h **solo bajo ese modelo**. La variación entre personas y la agrupación temporal exigen intervalos por sujeto y cautela; no demuestra privacidad individual. Un objetivo de 0,1/h requeriría aproximadamente 30 h sin eventos, además de más participantes independientes.

### Pruebas verificables antes de recoger datos

Criterios de aceptación del futuro pipeline, todavía pendientes de implementación:

1. Aserciones de intersección vacía de sujetos, ensayos y ventanas entre entrenamiento y test; rechazo de IDs duplicados y épocas solapadas entre particiones.
2. Prueba de procedencia del ajuste: cada transformación y umbral registra únicamente IDs de entrenamiento. Cambiar etiquetas de test no cambia ajuste ni selección.
3. Excluir columnas de condición, pistas y activación de las entradas; comprobar que el esquema rechaza su inclusión accidental.
4. Repetir una ejecución congelada produce las mismas particiones y métricas dentro de la tolerancia declarada; un control con etiquetas permutadas recorre el pipeline completo.
5. Inyectar falsas detecciones, cancelaciones y timeouts en el firewall: **cero envíos sin confirmación explícita**. Esta invariante software se exige aunque el detector falle y no demuestra que el EEG reconozca intención.

### Evidencia y límites

[Alderson-Day et al., estudio fMRI de habla interna dialógica/monológica](https://pubmed.ncbi.nlm.nih.gov/26197805/) muestra que distintas tareas de habla interna no son intercambiables; no valida esta clasificación EEG. [Revisión sobre habla interna](https://pubmed.ncbi.nlm.nih.gov/26011789/) aporta contexto sobre diversidad y métodos. Son trabajos externos; los criterios y tamaños anteriores son propuestas propias. El resultado real de IS-01 sigue siendo 26,5 % y p=0,46, sin evidencia de mejora sobre azar. No hay una contraseña mental EEG validada para nuestro dispositivo.
