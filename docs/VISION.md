# Visión y alcance

## Motivación

Queremos investigar cómo conectar actividad neuronal humana con software de inteligencia artificial. El objetivo inmediato es que una persona **componga y envíe texto sin teclado ni voz**, mediante señales cerebrales detectadas por una interfaz no invasiva. Después queremos recibir respuestas de la IA con la menor fricción posible.

La conexión directa con Internet es una posibilidad futura: el núcleo científico es crear un canal de comunicación fiable.

## Tres fases acordadas

### Fase 1 — Cerebro → IA (prioridad máxima)

- Registrar EEG o reproducir EEG existente.
- Reconocer patrones vinculados a una acción voluntaria definida y medible.
- Traducir selecciones en caracteres, palabras y mensajes.
- Permitir editar, deshacer y confirmar un mensaje antes de enviarlo.
- Investigar *habla imaginada* en paralelo, sin venderla como capacidad ya resuelta.

Nuestro primer enfoque será P300 Speller: el participante atiende a estímulos que presentan letras u opciones; el sistema estima qué selección corresponde a su respuesta cerebral. **No es lectura libre de pensamientos.**

### Fase 2 — IA → persona (segunda prioridad)

**Etapa operativa:** mostrar o leer en voz alta las respuestas.  
**Etapa exploratoria:** codificar mensajes discretos en patrones táctiles mediante dispositivos externos, para estudiar la comprensión de un nuevo canal sensorial.  
**Investigación a largo plazo:** estudiar bibliografía sobre prótesis sensoriales y neuroestimulación clínica, sin implementarlas en personas fuera de entornos regulados.

### Fase 3 — Acceso a Internet (no prioritario)

Una vez que las fases anteriores funcionen, añadir herramientas web y otras fuentes de información, sujetas a permisos, confirmación y registros. Tener Internet integrado no mejora por sí solo la capacidad de decodificar pensamientos.

## Qué significará «bidireccional»

Hay dos interpretaciones distintas:

1. **Funcional:** cerebro → computadora → IA → pantalla/audio/tacto → sentidos → cerebro. Esta comunicación en bucle cerrado es abordable sin cirugía.
2. **Neuronal directa:** registrar actividad del sistema nervioso y producir sensaciones mediante estimulación neural. Hay demostraciones clínicas de percepciones sencillas, pero **no existe un método probado para escribir conocimientos complejos directamente en el cerebro**.

El proyecto no afirmará haber alcanzado la segunda interpretación cuando únicamente haya implementado la primera.

## Preguntas de investigación

- ¿Qué precisión de comunicación voluntaria conseguimos con EEG no invasivo?
- ¿Cuántos caracteres correctos por minuto pueden componerse de forma reproducible?
- ¿Cómo cambia el rendimiento entre sesiones y participantes?
- ¿Cuántos errores provienen del EEG y cuántos del corrector de lenguaje?
- ¿Qué tipo de retroalimentación mejora más el control y la comprensión: texto, audio o patrones táctiles?
- ¿Es posible diseñar un vocabulario sensorial sencillo que el usuario aprenda a interpretar?
- ¿Qué límites científicos, técnicos, éticos y de seguridad impiden una conexión neuronal directa general?

## Alcance excluido del MVP

- Implantar electrodos o modificar tejido neural.
- Aplicar estimulación cerebral eléctrica, magnética o ultrasónica en experimentos caseros.
- Diagnosticar o tratar condiciones médicas.
- Afirmar que EEG comercial descifra frases arbitrarias.
- Subir EEG bruto o datos identificables a servicios externos por defecto.
- Automatizar actos con consecuencias externas sin confirmación explícita.

## Criterio de éxito inicial

Un experimento **reproducible** con datos públicos donde un clasificador distingue eventos P300 y donde, utilizando la estructura correcta del paradigma, se pueden evaluar selecciones de caracteres. Después, una demo integrada debe mostrar la procedencia de cada letra y la confirmación voluntaria antes de consultar una IA.

La honestidad de la medición importa más que una demo espectacular.
