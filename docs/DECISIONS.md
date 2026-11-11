# Registro de decisiones y preguntas abiertas

## Decisiones confirmadas en la definición del proyecto

**D-001 — Objetivo principal**  
Comunicación con IA mediante el pensamiento, comenzando por la **escritura voluntaria**, no por consultar Internet.

**D-002 — Tres fases**  
1. Cerebro → IA. 2. Respuesta IA → persona. 3. Internet opcional.

**D-003 — Alcance técnico del primer MVP**  
EEG no invasivo, enfoque inicial P300 Speller, evaluación sobre registros científicos abiertos antes de comprar dispositivos.

**D-004 — Realismo científico**  
Diferenciar la selección de opciones controlada de una decodificación libre de pensamientos o de habla imaginada. La segunda se mantendrá como línea de investigación de mayor riesgo.

**D-005 — Enfoque bidireccional**  
Primero pantalla/voz, después codificación táctil externa si aporta valor. La estimulación neuronal directa será únicamente una línea de estudio científico con posible futura colaboración clínica.

**D-006 — Seguridad**  
No realizar autoimplantes, neuroestimulación casera ni acciones automáticas de Internet sin confirmación.

**D-007 — Evidencia antes que marketing**  
Informar procedencia, controles y métricas; no afirmar que una demo sintética prueba lectura cerebral.

## Propuestas técnicas todavía NO aprobadas ni implementadas

- Uso exacto de Python 3.12, FastAPI, React, MOABB/MNE, BrainFlow y scikit-learn.
- Método principal de clasificación: LDA regularizado frente a regresión logística.
- Diseño de interfaz y umbrales de confianza.
- Proveedor de LLM, modo local, costes y gestión de credenciales.
- Compra de hardware y arquitectura de adquisición en vivo.
- Definición precisa de códigos táctiles externos.

## Preguntas pendientes

1. ¿Se pretende trabajar siempre con un único usuario calibrado o investigar generalización entre personas?
2. ¿Qué preferimos inicialmente: P300 de matriz o interfaz de selección SSVEP, considerando los riesgos de estímulo y la disponibilidad de datasets?
3. ¿Qué velocidad de escritura y tasa de errores consideraríamos útiles para una conversación?
4. ¿Cómo diferenciaríamos una sugerencia de autocompletado del texto realmente seleccionado?
5. ¿Qué consentimiento, evaluación ética y protección de datos exigiríamos si se recopila EEG propio?
6. ¿Con qué institución académica o clínica convendría colaborar para estudiar la bidireccionalidad neuronal directa?

## Próxima acción

Implementar **R1: pipeline reproducible de clasificación P300**, con entradas BNCI2014-009 y evaluación documentada. No publicar resultados de precisión hasta haberlos medido.
