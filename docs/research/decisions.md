# Registro de decisiones — NeuroLink AI

[Visión actualizada](vision.md) · [Hoja de ruta](roadmap.md)

## Decisiones activas

**D-001 (revisada, 11-11-2026) — Objetivo principal.** Interpretar el **lenguaje interior** voluntario (lo que nos decimos mentalmente), no escribir seleccionando letras con un teclado P300. Nuestro primer alcance experimental es clasificación de palabras imaginadas, no transcripción de frases libres.

**D-002 — Tres fases.** (1) lenguaje interior → IA, (2) respuesta por canales sensoriales, (3) Internet opcional.

**D-003 (revisada) — Dataset prioritario.** Nieto2022 / *Thinking out loud*: cuatro palabras direccionales imaginadas. P300/BNCI2014-009 pasa a [referencia técnica secundaria](../technical/p300-secondary-baseline.md).

**D-004 — Limitaciones.** No atribuir frases inventadas por el modelo a señales neuronales. Reconocer palabras de una tarea no constituye un detector de pensamiento libre ni intención de compartir.

**D-005 — Retorno.** Primero pantalla/voz y, si aporta valor, códigos táctiles externos. Estimulación neural directa: bibliografía y posibles colaboradores clínicos, nunca autoexperimentación.

**D-006 — Seguridad.** No autoimplantes, neuroestimulación casera, ni protoboards de biopotenciales sobre personas. Revisión ética/profesional antes de ensayos humanos.

**D-007 — Evidencia antes que publicidad.** Separar simulación, señales registradas, predicciones, texto corregido por IA y métricas experimentales.

**D-008 — Electrónica diferenciada.** Front-end analógico/ADC + firmware/MCU y posible FPGA/Verilog, con esquemas y referencias separados del software.

**D-009 — Verilog no es requisito inicial.** Usar HDL cuando haya evidencia de necesidad de lógica dedicada; primero datos públicos y pruebas digitales sintéticas.

**D-010 — La seguridad del sistema completo se verifica.** Un AFE o kit de evaluación no equivale a un dispositivo seguro para contacto humano.

**D-011 (nueva) — Neural Privacy Firewall como requisito transversal.** Estado cerrado por defecto, activación voluntaria, local-first, revisión/confirmación, auto-bloqueo y desconexión física como objetivo de hardware futuro.

**D-012 (nueva) — Palabra clave mental como hipótesis, no control demostrado.** Requiere recogida/protocolo separado con pensamiento privado vs comunicación deliberada y estudio de falsas activaciones por hora. No extrapolar implantes a EEG superficial.

## Preguntas abiertas

- ¿Qué margen de error es aceptable para clasificar cuatro palabras imaginadas?
- ¿Hasta qué punto necesitamos adaptar el modelo a cada usuario?
- ¿Podrá existir una señal no invasiva fiable que indique **quiero hablar con la IA** sin leer pensamientos privados?
- ¿Qué mecanismo accesible, independiente y seguro proporcionaría la confirmación?
- ¿Cómo diseñar la barrera física de privacidad en una futura placa bajo revisión profesional?
- ¿Qué datasets y autorizaciones harán falta para evaluación con pensamiento privado, no solo tareas inducidas?

**Próximo desarrollo:** NPF-01 por software e IS-01 como experimento EEG, ambos claramente etiquetados.
