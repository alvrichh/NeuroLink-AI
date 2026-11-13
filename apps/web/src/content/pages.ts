import type { Locale } from "./links";
import type { PageId } from "./routes";
type Article = { title: string; lead: string; tag: string; sections: {title: string; text: string}[]; columns: string[]; rows: string[][] };
export const articles: Record<Locale, Record<PageId, Article>> = {
  "es": {
    "experiments": {
      "title": "Experimentos y resultados",
      "lead": "Un registro de lo que hemos ejecutado, lo que los datos permiten afirmar y las preguntas que siguen abiertas.",
      "tag": "IS-01 · EEG real · piloto ejecutado",
      "sections": [
        {
          "title": "Qué evaluamos",
          "text": "Cuatro palabras imaginadas: arriba, abajo, derecha e izquierda. Un participante de Nieto2022, tres sesiones del mismo día y 200 ensayos equilibrados. Cada sesión se predijo usando un modelo ajustado con las otras dos. Es un análisis de registros públicos, no un nuevo ensayo con personas."
        },
        {
          "title": "Qué encontramos",
          "text": "La exactitud equilibrada agrupada fue 26,5 %, frente al 25 % esperado por azar. Macro-F1: 0,2637. La prueba de permutación dio p = 0,46: no hay evidencia de rendimiento superior al azar. El valor p corresponde a la media no ponderada de las sesiones (25,4167 %), no al resultado agrupado de 26,5 %."
        },
        {
          "title": "Qué significan los controles",
          "text": "EOG registra principalmente actividad ocular; EMG, muscular. Sus resultados son descriptivos: no se contrastaron estadísticamente sus diferencias con el EEG. Que puntúen algo más alto no demuestra que los artefactos causen el resultado. Tampoco el control de pista visual descarta efectos posteriores de atención o memoria visual."
        },
        {
          "title": "Límites que importan",
          "text": "Una persona y un día no permiten concluir que el modelo funcione en otros usuarios o días. Tres sesiones tampoco dan un intervalo poblacional fiable. La calibración de probabilidades fue peor que una predicción uniforme: no debemos utilizar su confianza para activar una comunicación. Este piloto no reconoce intención ni valida una contraseña mental."
        },
        {
          "title": "Siguiente experimento: entre participantes",
          "text": "Pendiente de ejecución. Ampliar el bloqueo de versiones y hashes del dataset; verificar eventos y correcciones documentadas del participante 3; reservar todos los registros de una persona en cada fold leave-one-subject-out. Seleccionar modelos y ajustar transformaciones solo con participantes de entrenamiento, manteniendo los controles EEG/EOG/EMG y publicando resultados por sujeto. El tamaño y los criterios definitivos deben fijarse antes de ejecutar esa evaluación."
        },
        {
          "title": "Cómo reproducirlo",
          "text": "La implementación enlazada fija dependencias, versión del dataset, tamaños y hashes de archivos, ventanas, semillas y pruebas de software. El informe conserva métricas agregadas y procedencia del código ejecutado. Los tests sintéticos verifican el software; no añaden evidencia de decodificación neuronal."
        }
      ],
      "columns": [
        "Análisis",
        "Balanced accuracy",
        "Macro-F1"
      ],
      "rows": [
        [
          "EEG · habla interna",
          "26,5 %",
          "0,2637"
        ],
        [
          "Baseline mayoritario",
          "25,0 %",
          "0,1000"
        ],
        [
          "EOG solo",
          "28,5 %",
          "0,2801"
        ],
        [
          "EMG solo",
          "27,5 %",
          "0,2624"
        ],
        [
          "EEG durante pista visual",
          "21,0 %",
          "0,2097"
        ]
      ]
    },
    "innerSpeech": {
      "title": "Hablar conmigo o hablar a la IA",
      "lead": "La misma palabra puede ser un pensamiento privado o un mensaje dirigido a alguien. Queremos investigar esa diferencia sin confundir reconocimiento con consentimiento.",
      "tag": "NPF-02 · propuesta · sin ejecutar",
      "sections": [
        {
          "title": "La pregunta central",
          "text": "¿Podemos distinguir «me digo arriba a mí mismo» de «le digo arriba a la IA»? La intención puede ser clara para la persona, pero eso no demuestra que el EEG permita detectarla. La tarea asignada y el autoinforme son etiquetas imperfectas; no son una lectura directa del pensamiento."
        },
        {
          "title": "Pensar no siempre es hablar por dentro",
          "text": "El habla interna puede acompañar la lectura, la escritura y la preparación de frases. También podemos imaginar escenas. Escuchar u oler algo puede provocar palabras o imágenes mentales: percepción e imaginación pueden mezclarse. No asumimos una señal EEG exclusiva para cada experiencia."
        },
        {
          "title": "Cómo lo comprobaríamos",
          "text": "Proponemos comparar las mismas cuatro palabras en habla privada y dirigida al asistente. Escucha, lectura silenciosa, imaginación visual y reposo serían controles; un bloque naturalista incluiría escritura y pensamiento libre. El olfato requeriría una extensión específica, no quedaría validado con esos controles."
        },
        {
          "title": "Un piloto manejable",
          "text": "Propuesta: 12 participantes, dos días, 20 ensayos por condición y día: 2.880 ensayos. Añadir 30 minutos negativos por visita suma 12 horas sin intención de comunicar. Es una estimación de viabilidad, no un cálculo de potencia ni una validación de privacidad. Requiere revisión ética, consentimiento de adquisición y hardware adecuado."
        },
        {
          "title": "Evitar que el modelo aprenda un atajo",
          "text": "El modelo no recibe el botón de activación ni los marcadores de tarea. Las pistas se contrabalancean y quedan fuera de la ventana analizada. La evaluación externa reserva participantes completos; las transformaciones, hiperparámetros y umbrales se ajustan únicamente con entrenamiento. EOG, EMG y pistas temporales tienen controles propios."
        },
        {
          "title": "Qué contaría como progreso",
          "text": "Criterios propuestos, todos necesarios: balanced accuracy media ≥0,60, límite inferior del IC del 95 % >0,50 y p<0,05; sensibilidad ≥80 % y límite superior unilateral del 95 % de falsas activaciones ≤1/h. Se informarán resultados por persona, abstenciones y fallos. Son criterios de investigación pendientes de prerregistro, no garantías de seguridad."
        },
        {
          "title": "Consentimiento en cada envío",
          "text": "Mientras se investiga, la activación es explícita y externa. El texto se revisa y confirma antes de salir del dispositivo; un fallo, cancelación o timeout bloquea el envío. Ningún buen resultado de clasificación sustituye ese permiso. El piloto IS-01 no ha evaluado esta distinción."
        }
      ],
      "columns": [
        "Situación",
        "Ejemplo",
        "Salida esperada"
      ],
      "rows": [
        [
          "Percepción",
          "Escuchar o leer «arriba»",
          "Ningún envío"
        ],
        [
          "Habla privada",
          "Decirme «arriba»",
          "Ningún envío"
        ],
        [
          "Habla dirigida",
          "Decir «arriba» a la IA",
          "Revisión y confirmación"
        ],
        [
          "Imaginación visual",
          "Imaginar un movimiento",
          "Ningún envío"
        ]
      ]
    },
    "dreams": {
      "title": "Sueños y consciencia",
      "lead": "Qué sabemos sobre experiencias generadas por el cerebro y qué falta para hablar de experiencias programables.",
      "tag": "Revisión de literatura · no es un resultado de NeuroLink AI",
      "sections": [],
      "columns": [],
      "rows": []
    }
  },
  "en": {
    "experiments": {
      "title": "Experiments and results",
      "lead": "A record of what we have run, what the data supports and which questions remain open.",
      "tag": "IS-01 · real EEG · completed pilot",
      "sections": [
        {
          "title": "What we evaluated",
          "text": "Four imagined Spanish words: arriba, abajo, derecha and izquierda. One Nieto2022 participant, three sessions on the same day and 200 balanced trials. Each session was predicted with a model fitted on the other two. This analyzes public recordings; it is not a newly conducted human study."
        },
        {
          "title": "What we found",
          "text": "Pooled balanced accuracy was 26.5%, against 25% expected by chance. Macro-F1: 0.2637. The permutation test returned p = 0.46: no evidence of above-chance performance. That p-value tests the unweighted session mean (25.4167%), not the pooled 26.5% score."
        },
        {
          "title": "What the controls mean",
          "text": "EOG mainly records ocular activity; EMG, muscular activity. Their results are descriptive: differences from EEG were not significance-tested. Slightly higher scores do not establish that artifacts caused the result. Nor does the visual-cue control rule out later attention or visual-memory effects."
        },
        {
          "title": "Limits that matter",
          "text": "One participant and one day cannot establish performance in new users or days. Three sessions cannot provide a reliable population interval either. Probability calibration was worse than uniform predictions: model confidence should not gate communication. This pilot does not recognize intent or validate a mental password."
        },
        {
          "title": "Next experiment: across participants",
          "text": "Not yet executed. Extend dataset version/hash locking; verify events and documented corrections for participant 3; hold out all records from one person in each leave-one-subject-out fold. Select models and fit transforms using training participants only, retain EEG/EOG/EMG controls and publish per-subject results. Final sample size and criteria must be fixed before this evaluation is run."
        },
        {
          "title": "How to reproduce it",
          "text": "The linked implementation fixes dependencies, dataset version, file sizes and hashes, windows, seeds and software tests. The report preserves aggregate metrics and provenance of the executed source. Synthetic tests verify software; they do not add evidence of neural decoding."
        }
      ],
      "columns": [
        "Analysis",
        "Balanced accuracy",
        "Macro-F1"
      ],
      "rows": [
        [
          "EEG · inner speech",
          "26.5%",
          "0.2637"
        ],
        [
          "Majority baseline",
          "25.0%",
          "0.1000"
        ],
        [
          "EOG only",
          "28.5%",
          "0.2801"
        ],
        [
          "EMG only",
          "27.5%",
          "0.2624"
        ],
        [
          "EEG during visual cue",
          "21.0%",
          "0.2097"
        ]
      ]
    },
    "innerSpeech": {
      "title": "Talking to myself or to an AI",
      "lead": "The same word can be a private thought or a message addressed to someone. We want to investigate that difference without confusing recognition with consent.",
      "tag": "NPF-02 · proposal · not executed",
      "sections": [
        {
          "title": "The central question",
          "text": "Can we distinguish “I say up to myself” from “I say up to the AI”? The person may know their intention clearly, but this does not establish EEG detectability. Assigned tasks and self-reports are imperfect labels, not direct access to thought."
        },
        {
          "title": "Thinking is not always inner speaking",
          "text": "Inner speech can accompany reading, writing and sentence preparation. We can also imagine scenes. Hearing or smelling something can prompt words or mental images: perception and imagination may overlap. We do not assume a unique EEG signal for each experience."
        },
        {
          "title": "How we would test it",
          "text": "We propose comparing the same four words in private and assistant-addressed inner speech. Listening, silent reading, visual imagery and rest are controls; a naturalistic block includes writing and free thought. Olfaction would require a specific extension and would not be validated by these controls."
        },
        {
          "title": "A manageable pilot",
          "text": "Proposal: 12 participants, two days, 20 trials per condition/day: 2,880 trials. Adding 30 negative minutes per visit gives 12 hours without communication intent. This is a feasibility estimate, not a power calculation or privacy validation. It requires ethics review, acquisition consent and suitable hardware."
        },
        {
          "title": "Preventing shortcut learning",
          "text": "The model receives neither the activation button nor task markers. Cues are counterbalanced and excluded from analyzed windows. Outer evaluation holds out entire participants; transforms, hyperparameters and thresholds are fitted on training data only. EOG, EMG and timing cues receive their own controls."
        },
        {
          "title": "What would count as progress",
          "text": "Proposed criteria, all required: mean balanced accuracy ≥0.60, lower 95% CI >0.50 and p<0.05; sensitivity ≥80% and one-sided 95% upper false-activation bound ≤1/hour. Per-person outcomes, abstentions and failures must be reported. These research criteria await preregistration; they are not safety guarantees."
        },
        {
          "title": "Consent for every transmission",
          "text": "During research, activation is explicit and external. Text is reviewed and confirmed before leaving the device; errors, cancellation or timeout block transmission. No classification result substitutes for permission. The IS-01 pilot has not evaluated this distinction."
        }
      ],
      "columns": [
        "Situation",
        "Example",
        "Expected output"
      ],
      "rows": [
        [
          "Perception",
          "Hearing or reading “up”",
          "No transmission"
        ],
        [
          "Private speech",
          "Saying “up” to myself",
          "No transmission"
        ],
        [
          "Addressed speech",
          "Saying “up” to the AI",
          "Review and confirmation"
        ],
        [
          "Visual imagery",
          "Imagining movement",
          "No transmission"
        ]
      ]
    },
    "dreams": {
      "title": "Dreams and consciousness",
      "lead": "What we know about brain-generated experiences and what remains unproven about programmable experiences.",
      "tag": "Literature review · not a NeuroLink AI result",
      "sections": [],
      "columns": [],
      "rows": []
    }
  }
};
