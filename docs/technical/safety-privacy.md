# Seguridad, ética y privacidad neuronal

## Restricción central

**NeuroLink AI es un proyecto de software e investigación no invasiva.** No contempla implantes, estimulación cerebral autoadministrada, experimentación clínica independiente, diagnóstico, tratamiento o mejora cognitiva garantizada.

La investigación de conexión neuronal directa es documental y, si avanzara, únicamente en colaboración con profesionales y centros autorizados.

## Riesgos y mitigaciones

| Riesgo | Mitigación de diseño |
| --- | --- |
| Falso comando causado por EEG | Umbral de confianza, opción «sin decisión», edición y confirmación |
| Fatiga por tareas de atención | Sesiones limitadas, pausas, evaluación de carga y parada inmediata |
| Destellos que puedan afectar a personas fotosensibles | No desplegar estímulos experimentales a participantes sin revisión de riesgos y protocolo aprobado; considerar alternativas de visualización |
| Privacidad de EEG y metadatos | Procesar localmente, minimizar datos, cifrar y restringir acceso |
| Datos identificables en repositorio público | Prohibir publicación de EEG individual, consentimientos, nombres, fechas identificables y claves |
| LLM inventa parte del texto | Separar señal/selección del autocompletado y registrar procedencia |
| Salida de IA causa acciones externas | Permisos mínimos y segunda confirmación para modificaciones |
| Conclusiones científicas incorrectas | Baselines, pruebas con sesiones separadas, controles y revisión documental |
| Neuroestimulación insegura | Fuera de alcance y sin conexión a sistemas que estimulen el cerebro |

## Reglas de datos

- El EEG es potencialmente sensible; tratarlo como información de máxima cautela.
- Consentimiento informado, granular, revocable y adecuado a cada estudio, cuando aplique.
- No publicar información que permita reidentificar a participantes.
- No enviar EEG bruto a API de modelos o analítica por defecto.
- Almacenar y transmitir de forma cifrada cuando sea necesario.
- Definir política de retención y eliminación antes de recoger datos propios.
- No entrenar modelos generales con registros de personas sin consentimiento explícito y base legal adecuada.
- Verificar términos de uso y licencias de cada dataset de terceros.
- Auditar quién puede exportar, borrar o compartir resultados.

**Si se investigan participantes en Irlanda/UE:** analizar GDPR y obligaciones de investigación con asesoramiento competente. Este repositorio no constituye asesoramiento jurídico ni aprobación ética.

## Principio de autonomía

La persona es responsable de iniciar, editar, confirmar y cancelar sus mensajes. La IA puede ofrecer sugerencias pero no debe atribuirles procedencia neural. Toda interacción debe permanecer voluntaria.

## Estimulación y bidireccionalidad

- Audio/pantalla/tacto externo son canales sensoriales ordinarios.
- La estimulación neural directa no se implementa con hardware casero.
- No diseñar instrucciones de montaje, intensidad o colocación de electrodos estimuladores para autoexperimentación.
- Las publicaciones sobre implantes clínicos no autorizan extrapolación al uso doméstico.

## Marcos orientadores

UNESCO adoptó su **Recomendación sobre la Ética de la Neurotecnología** el 11 de noviembre de 2025; pone énfasis en derechos, dignidad, privacidad y autonomía. Referencia primaria:
https://www.unesco.org/en/legal-affairs/recommendation-ethics-neurotechnology

## Checklist previo a cualquier sesión con personas

- [ ] Evaluación formal de riesgos y autorización ética cuando corresponda.
- [ ] Equipo no invasivo adecuado y condiciones de seguridad verificadas.
- [ ] Exposición visual evaluada (incluyendo fotosensibilidad) y posibilidad de evitar estímulos.
- [ ] Consentimiento comprensible y opción de retirada.
- [ ] Mínima recogida de datos y plan de borrado.
- [ ] Procedimiento de detención y respuesta ante molestias.
- [ ] Protocolos, métricas y análisis definidos antes del ensayo.
- [ ] Cualquier afirmación comunicada describe exactamente lo medido.


## Requisitos particulares de electrónica

- No conectar un AFE o protoboard de desarrollo sin evaluación independiente a una persona. Un chip diseñado para EEG o una evaluación de laboratorio **no convierten automáticamente** la placa en equipo de adquisición humana seguro.
- Antes de contacto humano, analizar gestión de riesgos, corrientes de fuga, aislamiento, protección de entradas, fallos previsibles, rutas a tierra, EMC y seguridad del conjunto (incluido ordenador y alimentador) por profesionales cualificados.
- Considerar, según el uso previsto y la clasificación del dispositivo, las normas **IEC 60601-1**, **IEC 60601-1-2** e **IEC 80601-2-26:2019**; estas referencias no equivalen a certificar un equipo.
- Seguir la advertencia de TI sobre la **ADS1299EEG-FE EVM**, que es exclusivamente para evaluación electrónica de laboratorio y no para conexión directa a pacientes.

Fuentes: https://www.iso.org/standard/77773.html · https://webstore.iec.ch/en/publication/67497 · https://webstore.iec.ch/en/publication/67554 · https://www.ti.com/lit/ug/slau443b/slau443b.pdf
