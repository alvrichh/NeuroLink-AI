# Fase 3 — Internet y herramientas externas

**Prioridad secundaria.** La conexión con Internet es una integración de software que no sustituye la investigación de decodificación neuronal.

## Experiencia objetivo

1. El teclado cerebral produce un mensaje candidato.
2. El usuario puede corregir y confirmar.
3. FastAPI envía el texto confirmado al asistente.
4. El asistente responde con información local o propone una consulta web.
5. Las búsquedas de solo lectura se realizan conforme a los permisos de usuario.
6. Acciones con consecuencias (enviar, publicar, comprar, borrar, cambiar configuración) exigen **segunda confirmación explícita y legible**.

Ejemplo conceptual: el usuario construye «¿Qué tiempo hará mañana?»; el asistente consulta una fuente meteorológica autorizada y presenta el resultado por pantalla o audio. La información se recibe por vías sensoriales normales, no directamente como conocimiento neuronal.

## Riesgos específicos

- **Falsos positivos del decodificador:** un carácter o comando incorrecto no debe activar una acción externa.
- **Alucinaciones del LLM:** separar respuestas de fuentes de suposiciones del modelo, dar enlaces y mostrar incertidumbre.
- **Prompt injection en webs:** el contenido recuperado no adquiere autoridad para ejecutar instrucciones.
- **Privacidad:** enviar la pregunta confirmada, no el EEG completo, a los servicios externos.
- **Autorización:** restricciones de herramientas, listas permitidas, credenciales fuera del frontend, límites de gasto, tiempo y frecuencia.
- **Seguridad:** registro de acciones, cancelación, vista previa y confirmaciones visibles.

## Diseño modular

- Tool registry con permisos granulares.
- Search/read-only como primera integración.
- Sin acciones que modifiquen datos externos en la primera versión.
- Respuestas en formato estructurado: texto, procedencia, herramientas empleadas y posibles errores.
- Capacidad de ejecutar una prueba completa con web deshabilitada y un LLM local simulado.

## Criterio para incorporar Internet

No activar la fase hasta conseguir el circuito confiable **seleccionar → revisar → confirmar → enviar → recibir**, con tasas de error y latencia conocidas. Una función de Internet no debe ocultar limitaciones del decodificador.
