# Hoja de ruta y criterios de aceptación

**Estado de todas las etapas:** planificadas, no implementadas.

## Secuencia de trabajo

| Hito | Entrega | Evidencia de finalización | Dependencia |
| --- | --- | --- | --- |
| **R0** Fundamentos | Fuentes, objetivos, dataset, protocolo y riesgos | Documentación revisada, límites de lenguaje científico explícitos | Ninguna |
| **R1** Baseline EEG | Pipeline reproducible de clasificación P300 | Métricas por sujeto/sesión, controles de fuga y baseline trivial | R0 |
| **R2** Speller offline | Reconstrucción de caracteres siguiendo metadatos del paradigma | Matriz de confusión por carácter, velocidad y errores | R1 |
| **R3** IA local | Interfaz + API + stub de respuesta | Conversación completa desde selecciones confirmadas; origen visible | R2 |
| **R4** EEG real no invasivo | Adaptador BrainFlow + dispositivo evaluado | Calidad de señales, sincronización, ensayos seguros y resultados documentados | R1–R3; evaluación de seguridad |
| **R5** Retorno sensorial | Audio y texto; estudio de patrones táctiles externos | Comprensión objetiva, tiempo, errores y consentimiento | R3 |
| **R6** Internet opcional | Consulta externa bajo permisos | Respuestas verificables, ninguna acción no consentida | R3–R5 |
| **R7** Investigación de estimulación neural | Revisión y alianzas académicas | Informe de evidencia, preguntas abiertas, riesgos y marcos éticos | Independiente; NO desarrollo casero |

## Iteración 0.1 — Tareas sugeridas

- [ ] Fijar estructura Python, entornos y bloqueo de dependencias.
- [ ] Documentar licencia y forma de adquisición de BNCI2014-009.
- [ ] Implementar cargador reproducible para una persona/sesión.
- [ ] Graficar distribución de clases y calidad del EEG.
- [ ] Pipeline P300 básico con entrenamiento y prueba separados.
- [ ] Comparar LDA y regresión logística contra trivial/permutación.
- [ ] Guardar configuración y resultados agregados reproducibles.
- [ ] Estudiar si es factible reconstruir caracteres con los metadatos disponibles.
- [ ] Crear interfaz de teclado **offline** con distinción real/replay/synthetic.
- [ ] API mock que solo reciba texto confirmado.
- [ ] Tests de cancelación, incertidumbre y no ejecución de acciones.
- [ ] Escribir informe honesto de aciertos, errores y limitaciones.

## Condiciones para declarar un hito

### R1 aprobado si
- El código permite repetir el experimento en una instalación limpia.
- Se conocen el número de ejemplos por clase y la estrategia de separación.
- No hay fuga entre entrenamiento/validación/evaluación.
- Se publican resultados por sujeto y sesión, no solo el promedio más favorable.
- Los resultados no proceden únicamente de datos sintéticos.

### R2 aprobado si
- Se identifica la verdad terreno de cada selección.
- Se informa la precisión **por carácter** y la tasa de comandos/selecciones falsas.
- El usuario puede cancelar; no hay envío automático de incertidumbre elevada.

### R3 aprobado si
- La IA nunca recibe información que no pase por confirmación.
- Puede explicarse qué caracteres proceden de señales y cuáles son correcciones propuestas por un LLM.
- Los tests no dependen de Internet ni de dinero para ejecutarse.

## No confundir «MVP» con producto comercial

Ningún prototipo es una interfaz médica certificada ni una demostración de lectura mental general. La calidad se mide con experimentos controlados y resultados verificables, no con la espectacularidad de una demo.

## Futuros hitos opcionales

- Comparativa P300 vs SSVEP (con evaluación de seguridad de estímulos).
- Experimentos exploratorios de habla imaginada de vocabulario cerrado.
- Evaluación cross-subject y transferencia entre sesiones.
- Adaptación por persona, abstención por baja confianza y sesiones de calibración.
- Estudio formal de aprendizaje de códigos táctiles externos.
