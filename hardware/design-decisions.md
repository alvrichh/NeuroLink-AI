# Decisiones y preguntas de hardware

## Decisiones aceptadas para la etapa documental

**HW-001 — No empezar por Verilog.** Hardware de EEG = adquisición analógica + digitalización + firmware; FPGA solo si una medición futura lo justifica.

**HW-002 — Usar referencias existentes.** ADS1299 y documentación de OpenBCI como base de investigación, no para presentar un clon como dispositivo probado.

**HW-003 — División por dominios.** Esquemáticos / PCB / electrónica en `hardware/`; diagramas editables en `diagrams/`; algoritmos EEG en `docs/technical/`.

**HW-004 — Prueba sin cuerpo.** Primera iteración únicamente con datos sintéticos y registros públicos; testbench HDL para aprender lógica digital sin sensores humanos.

**HW-005 — Seguridad como requisito inicial.** Revisión profesional obligatoria antes de plantear hardware propio en contacto humano.

## Opciones aún abiertas

- Sistema comercial para primeros experimentos, sin comprar hasta validar metodología.
- MCU, conexión inalámbrica y estrategia de sincronización de eventos.
- Selección de número de canales, rango de frecuencia y prestaciones reales.
- Diseño de PCB propia mediante KiCad **solo tras analizar objetivos y riesgos**.
- Si un FPGA mejoraría determinismo/consumo lo suficiente como para compensar coste y complejidad.

## Próximos artefactos de ingeniería

1. Documento de requisitos cuantificados (PRD de hardware).
2. Matriz de alternativas: adquisición comercial vs AFE+MCU diseñado por profesionales.
3. Pruebas de flujo digital con muestra simulada.
4. Modelo de ruido y tiempos de adquisición basado en datasets y fichas técnicas.
5. Plan de revisión/seguridad si alguna vez se desea un PCB físico.

Para cualquier fase humana: consultar primero [safety-review.md](safety-review.md).
