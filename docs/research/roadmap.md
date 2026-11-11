# Hoja de ruta — lenguaje interior y privacidad mental

[English](../en/research/roadmap.md)

**Estado:** diseño documentado. No existen decodificadores entrenados ni dispositivos propios validados. Las fases originales de P300 quedan como [referencia secundaria](../technical/p300-secondary-baseline.md).

| Hito | Trabajo | Criterio de aceptación |
| --- | --- | --- |
| **IS-00** Fundamentos | Revisión bibliográfica, licencias y protocolo de lenguaje interior | Delimitación y datasets reproducibles |
| **NPF-01** Firewall software | Máquina de estados de privacidad, permisos y bloqueos | Sin envío de texto no autorizado en pruebas |
| **IS-01** EEG de cuatro palabras | Clasificador sobre Nieto2022 | Balanced accuracy/macro-F1, controles, sesiones reservadas |
| **IS-02** Generalización | Cambios entre sesiones y personas, control de artefactos | Resultados honestos por sujeto/sesión y fallos |
| **NPF-02** Detectar intención | Protocolo separado: activar vs pensar privadamente | Falsos desbloqueos/h, falsos negativos, revisión ética |
| **IS-03** Lenguaje más natural | Estudiar secuencias/vocabulario si es viable | Evidencia independiente antes de afirmaciones |
| **AI-01** Comunicación | Hipótesis lingüística local → confirmación → IA | Solo texto voluntariamente aprobado |
| **FB-01** Respuesta | Pantalla, voz, quizá patrones táctiles externos | Comprensión, latencia, ergonomía |
| **NET-01** Internet (opcional) | Herramientas de consulta con permisos mínimos | Confirmación y ausencia de acciones inesperadas |

## Pista paralela de electrónica

- **H0:** investigar la cadena EEG y los requisitos de seguridad con referencias de ADS1299/OpenBCI.
- **H1:** simulación digital y testbenches con muestras sintéticas.
- **H2:** estudiar un **interruptor físico de privacidad** que desconecte adquisición o comunicación y un indicador verificable; solo arquitectura, no PCB apto para personas.
- **H3:** evaluar sistemas EEG comerciales y ensayos de banco, antes de diseñar PCB propios.
- **H4 (opcional):** FPGA/Verilog únicamente si las pruebas justifican ese hardware.

## Prioridad de la primera iteración

1. Construir el núcleo software NPF con transiciones de privacidad y pruebas automáticas.
2. Preparar experimento IS-01 (Nieto2022), sin descargar datos masivos al repo.
3. Distinguir claramente **clasificar vocabulario cerrado** de **transcribir lenguaje interno libre**.
4. Diseñar la activación mental como hipótesis NPF-02, **no** como capacidad demostrada.
5. Integrar IA solo cuando exista confirmación independiente y cancelación.

## Reglas científicas y de seguridad

- Una señal de contenido no prueba intención comunicativa.
- «Bloqueado» con monitor de palabra clave activo **no** equivale a «ninguna señal recogida».
- El objetivo principal no es seleccionar letras ni leer pensamientos privados.
- La estimulación neural directa y el uso de circuitos de laboratorio conectados a personas quedan fuera del prototipado independiente.

[Protocolo](../technical/inner-speech-protocol.md) · [Firewall](../technical/neural-privacy-firewall.md).
