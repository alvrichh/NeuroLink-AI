# Visión: lenguaje interior → IA

**Decisión de producto (11-11-2026):** NeuroLink AI pretende interpretar **habla interna voluntaria**, no construir un teclado neuronal de letras.

## Experiencia deseada

La persona se dice mentalmente: «Explícame cómo funciona un agujero negro». El sistema intenta traducir ese **lenguaje interior** en una propuesta de texto. Solo tras **activación y confirmación voluntarias**, la IA recibe un mensaje.

El término *inner speech* describe las palabras que nos decimos internamente. No todo pensamiento es verbal, y un sistema de decodificación no debe atribuir palabras a ideas no expresadas lingüísticamente.

```text
Pensamiento privado -> LOCKED / NO DECODIFICAR NI ENVIAR
Activación voluntaria -> ventana local de habla interna -> hipótesis lingüística
-> revisión/confirmación -> IA -> respuesta sensorial
-> bloqueo automático
```

## Tres fases

1. **Cerebro → IA:** primero reconocimiento de palabras imaginadas en EEG público; después estudiar vocabularios y secuencias más complejos si aparecen evidencias que lo permitan. La transcripción libre de monólogo interior es un objetivo de largo recorrido.
2. **IA → persona:** visual/audio primero, códigos táctiles externos opcionales; la estimulación neural directa solo se estudia científicamente.
3. **Internet opcional:** herramientas de lectura bajo autorización expresa y sin transmisión de datos neuronales.

## Cuarta exigencia transversal: privacidad mental

El **Neural Privacy Firewall** es condición previa a cualquier producto: bloqueo por defecto, activación voluntaria, tratamiento local, salida solo tras confirmación, parada inmediata y posibilidad de desconexión física. Una palabra clave neural es **investigación**, no garantía suficiente de consentimiento.

No buscamos lectura pasiva de pensamientos ni un «micrófono mental» siempre encendido. Para una activación exclusivamente cerebral, primero habrá que demostrar que el modelo reconoce una intención comunicativa con una tasa de falsas activaciones extremadamente baja; el dataset de cuatro palabras **no prueba esa capacidad**.

## Camino científico realista

El dataset *Thinking out loud* (Nieto et al., 2022) contiene cuatro palabras direccionales imaginadas, 10 participantes y controles con habla audible e imaginación visual. Un primer clasificador podría reconocer clases cerradas, no frases libres.

También debemos descartar que el modelo reconozca actividad visual o muscular asociada al ensayo en vez de lenguaje interno. La generalización entre sesiones/personas y los periodos sin deseo de comunicar son pruebas esenciales.

**El sistema queda en fase de investigación; no existe todavía un clasificador ni un firewall EEG validado.**

[Investigación y datos](inner-speech-datasets.md) · [Protocolo](../technical/inner-speech-protocol.md) · [Firewall](../technical/neural-privacy-firewall.md).
