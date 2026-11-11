# Neural Privacy Firewall (NPF) — diseño de privacidad mental

**Estado:** arquitectura de investigación, NO hardware ni algoritmo validados.  
[English](../en/technical/neural-privacy-firewall.md)

## Qué problema resolvemos

Una persona puede hablar consigo misma sin querer comunicarse con un asistente. No basta con clasificar palabras del EEG: necesitamos diferenciar **intención de emitir un mensaje** de **lenguaje interior privado**. No existe una señal EEG general y fiable que resuelva automáticamente esa distinción.

**Política:** por defecto, ningún decodificador de lenguaje ni IA tiene acceso a una transmisión continua del monólogo interior.

## Estados propuestos

```text
HARD_OFF  — corte físico de adquisición o canal de datos; sin monitorización
LOCKED    — modo local mínimo, sin decodificador de lenguaje activo
ARMED     — palabra clave neural detectada (experimental) o acción voluntaria externa
DECODING  — ventana limitada de habla interna, únicamente procesamiento local
REVIEW    — propuesta de texto, posibilidad de borrar y cancelar
SEND      — se transmite SOLO el texto aprobado, nunca EEG bruto
AUTOLOCK  — cierre inmediato, descarte de buffers y vuelta a LOCKED
```

**Importante:** si permitimos una palabra clave mental con manos libres, un detector de activación tendrá que analizar alguna señal neuronal continuamente *mientras el dispositivo esté encendido*. Por tanto, LOCKED es una protección de **procesamiento y salida**, no equivale a ausencia total de registro. Solo HARD_OFF físico ofrece una separación de adquisición más fuerte.

## Capas del firewall

1. **Desconexión física verificable:** interruptor de energía/captura o de transmisión, diseñado y revisado profesionalmente en un futuro equipo; indicador independiente de modo.
2. **Detector local de activación:** si la ciencia lo permite, clasifica SOLO una palabra/gesto neural muy limitado; no ejecuta descifrado general del habla interna en reposo. No debe transmitir muestras crudas.
3. **Permisos y temporizador:** tras activación, breve ventana limitada, cancelación inmediata y autobloqueo por tiempo o desconexión.
4. **Separación de modelos y procesos:** wake detector aislado del decodificador de contenido; acceso a memoria con mínima retención y límites de seguridad.
5. **Confirmación explícita:** un mensaje propuesto nunca se envía por la sola confianza del clasificador. Se necesita un canal de confirmación independiente cuando sea posible.
6. **Control de red:** modo offline predeterminado, sin API de Internet mientras el sistema esté bloqueado; enviar únicamente texto consentido.
7. **Auditoría mínima:** conservar solo estados/transiciones y métricas agregadas no identificables, no un historial de pensamientos.

## Evidencia que respalda una parte

[Kunz et al., *Cell* (2025)](https://doi.org/10.1016/j.cell.2025.06.015) investigaron privacidad de lenguaje interior **mediante microelectrodos implantados**. Probaron un mecanismo de desbloqueo por palabra clave mental; el informe NIH indica reconocimiento correcto de la contraseña en más del 98% de los casos, y el artículo detalla **98,75%** de acierto en una prueba en tiempo real con un participante.

**No extrapolar** esta cifra a EEG externo ni confundir acierto del detector de palabra clave con seguridad de privacidad o transcripción sin errores. La investigación también distingue señales de habla intentada y lenguaje interior, pero eso no establece por sí mismo un detector universal de «quiero hablar con la IA».

- Artículo y pruebas: https://pmc.ncbi.nlm.nih.gov/articles/PMC12360486/
- NIH: https://www.nih.gov/news-events/nih-research-matters/decoding-inner-speech-brain-signals

## Validación obligatoria: dos tareas distintas

**Tarea A — habla interna:** clasificar las palabras imaginadas de un conjunto cerrado en periodos señalados.

**Tarea B — firewall:** detectar *activación deliberada vs pensamiento privado* en datos **específicamente etiquetados** para esa distinción. No basta con un dataset que contenga solo cuatro comandos voluntarios.

Métricas del firewall: falsas activaciones/hora, falsos desbloqueos, tiempo en estado erróneo, fuga de mensajes no aprobados (**objetivo cero en tests**) y capacidad de parada. También medir rechazos legítimos y latencia.

**Primera versión de software:** simular el estado y probarlo con eventos sintéticos, con una confirmación externa explícita; no fingir que una palabra mental se reconoce ya mediante EEG de consumo.

## Amenazas contempladas

- Falso positivo de palabra clave / activación involuntaria.
- Captura o subida de EEG durante estado privado.
- Modelo de lenguaje que complete/invente frases como si fueran pensamientos reales.
- Logs, telemetría, backups o herramientas que almacenen lenguaje privado.
- Fallos de firmware, actualización, pérdida de energía o red que dejen el sistema abierto.
- Usuario sin capacidad de cancelar/confirmar con comodidad.

**Si hay fallo, entrar en estado bloqueado y no transmitir.** La conexión a Internet nunca tendrá permiso de leer la memoria EEG.

[Diagrama de estados](../../diagrams/neural-privacy-firewall.md) · [Protocolo científico](inner-speech-protocol.md) · [Seguridad](safety-privacy.md).
