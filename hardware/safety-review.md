# Seguridad del hardware: requisitos antes de cualquier contacto humano

**Estado: sin revisión aprobada.** Ningún prototipo electrónico propio de NeuroLink AI está autorizado para conectarse a una persona.

## Por qué importa

Una electrónica de adquisición biopotencial puede estar conectada a electrodos sobre el cuerpo. Incluso si funciona con niveles de señal diminutos, una fuente, fallo de aislamiento, electrodo, USB, instrumento de medida o conexión externa puede introducir riesgos. **No es suficiente decir «usa baterías» o «tiene ADS1299» para considerarla segura.**

## Restricciones iniciales

- No conectar una breadboard/protoboard, PCB propia, kit ADS1299EEG-FE ni circuito de evaluación directamente a una persona.
- No diseñar ni probar estimulación neural eléctrica, magnética o ultrasónica de uso casero.
- Pruebas de banco solo con señales electrónicas sintéticas y equipos adecuados.
- Un equipo EEG comercial debe utilizarse conforme a instrucciones, finalidad prevista y limitaciones del fabricante.
- Para estudios con voluntarios se requiere revisión ética, protección de datos, análisis de riesgos y revisión eléctrica competente según corresponda.

## Puntos que debe revisar ingeniería profesional

| Área | Verificación requerida |
| --- | --- |
| Contacto corporal | Corriente de fuga, aislamiento, límites de fallo |
| Alimentación | Fuentes, baterías, accesorios y rutas hacia tierra |
| Protección de entrada | ESD, fallos, transitorios y comportamiento seguro |
| EMC | Susceptibilidad y emisiones, rechazo de interferencias |
| Software/firmware | Pérdida de muestras, watchdog, seguridad de datos |
| Estímulos visuales | Riesgo de fotosensibilidad, fatiga y cancelación |
| Sistema completo | Ordenador, radio, cargador, instrumentación y entorno |
| Ética/privacidad | Consentimiento, acceso y retención de señales |

## Normativa que merece análisis (según finalidad/clasificación)

- IEC 60601-1, seguridad básica y rendimiento esencial.
- IEC 60601-1-2, compatibilidad electromagnética.
- IEC 80601-2-26:2019, requisitos particulares para electroencefalógrafos.

**Estas referencias no significan que el prototipo esté certificado.** Un profesional deberá evaluar qué normativas y obligaciones se aplican en Irlanda/UE en función del uso previsto.

Referencia TI: https://www.ti.com/lit/ug/slau443b/slau443b.pdf  
Referencia ISO: https://www.iso.org/standard/77773.html

## Puerta de decisión

Hasta que se complete esa revisión, la única cadena de trabajo autorizada es **dataset público / señal sintética / equipo de laboratorio aislado de personas → software de análisis**.
