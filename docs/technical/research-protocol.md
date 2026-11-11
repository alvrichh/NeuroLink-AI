# Protocolo de experimentación y evaluación (borrador)

Este documento define cómo evitar conclusiones falsas antes de ejecutar un experimento. Se actualizará con parámetros, decisiones y resultados reales cuando exista código.

## Hipótesis primarias

- **H1:** un clasificador entrenado sobre EEG P300 distingue estímulos Target/NonTarget mejor que modelos triviales o etiquetado permutado en evaluación reservada.
- **H2:** al acumular predicciones conforme al protocolo de estimulación, se puede estimar la selección de caracteres en datos que contienen esa información.
- **H3:** una aplicación puede enviar selecciones confirmadas a una IA sin atribuir al EEG texto inferido por el LLM.

## Fuente de datos inicial

BNCI2014-009, a través del adaptador MOABB. Documentar versión, licencia, modo de descarga y preprocesamiento original. No distribuir copias de señales ni datos personales en GitHub.

## Separación experimental

- Registrar explícitamente qué datos corresponden a cada participante, sesión, ensayo y secuencia de estímulos.
- Entrenar primero un baseline con validación dentro de sesión; reservar después sesiones independientes para evaluar generalización temporal.
- Nunca separar al azar ventanas o épocas correlacionadas de un mismo ensayo entre entrenamiento y test de forma que se produzca fuga.
- Ajustar escalado, selección de variables, calibración y umbrales **únicamente en entrenamiento**, con validación separada.
- No usar datos de prueba para rediseñar repetidamente el modelo sin informar de ese proceso.

## Mediciones

**Clasificación por evento:** ROC-AUC, PR-AUC (importante por desbalance), recall de Target, especificidad de NonTarget, matrices de confusión, calibración y latencia.

**Comunicación:** exactitud por carácter, caracteres correctos por minuto, tiempo hasta mensaje confirmado, cancelaciones, errores de inserción/eliminación y falsos positivos cuando no hay intención de seleccionar.

**Comparaciones:** baseline mayoritario, etiquetas permutadas, modelo simple, distintos números de repeticiones y, si procede, análisis por sesión y participante.

**Límites de las métricas:** ROC-AUC del evento P300 NO equivale a exactitud por letra. Texto autocompletado por LLM NO equivale a texto decodificado.

## Pruebas de control

1. Repetición del experimento con la misma semilla, dependencias y particiones.
2. Etiquetas aleatorizadas: el modelo no debería mantener la misma ventaja al destruir la asociación.
3. Comparación con baseline trivial y con no emitir comandos.
4. Revisión de artefactos EOG/EMG, señales periféricas y correlaciones no neurales.
5. Pruebas de desconexión, datos corruptos, puntuación baja y confirmación negativa.

## Modelo de informe

```text
Experimento:
Fecha/versión:
Dataset + licencia:
Participantes y sesiones:
Preprocesamiento:
Política de partición:
Modelo + hiperparámetros:
Métricas por evento:
Métricas por carácter (si existen):
Comparativas de control:
Datos externos usados:
Limitaciones:
Reproducible: sí/no
Enlace al código/resultados agregados:
```

## Hardware y experimentación humana

La fase inicial usa **únicamente registros existentes**. Antes de capturar señales de personas se requiere evaluar las obligaciones de consentimiento, revisión ética, seguridad de hardware, privacidad y exposición a estímulos visuales. Los paradigmas con destellos pueden no ser adecuados para participantes fotosensibles. No improvisar protocolos de destello ni asumir que un equipo de consumo convierte cualquier experimento en seguro.

Los participantes deben poder detener el experimento inmediatamente. No se hacen promesas médicas ni se experimenta con neuroestimulación.

## Interpretación pública

En cada demostración utilizar rótulos claros:

- **Datos reales previamente registrados**
- **EEG en vivo**
- **Señal sintética**
- **Caracteres confirmados**
- **Texto sugerido por IA**
- **Resultado reproducible / demostración de interfaz**

Hasta obtener métricas reales, ninguna tarea se marcará como «completada» en informes públicos.
