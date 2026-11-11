# Datos y evidencia: decodificación del lenguaje interior

[English](../en/research/inner-speech-datasets.md)

## Dataset inicial: *Thinking out loud*, Nieto et al. (2022)

- 10 participantes, 3 sesiones, 5 640 ensayos.
- Cuatro órdenes imaginadas en español: **arriba, abajo, derecha, izquierda**.
- Tres condiciones: **lenguaje interior**, habla pronunciada e imaginación visual.
- Equipo BioSemi ActiveTwo con **128 canales EEG y 8 canales externos EOG/EMG**; muestreo publicado de 1 024 Hz.
- Los datos se describen en [Scientific Data](https://www.nature.com/articles/s41597-022-01147-2) y están disponibles en [OpenNeuro/NEMAR](https://nemar.org/dataset/on003626), con versión publicada y licencia **CC0** indicadas en NEMAR.
- MOABB tiene adaptador [Nieto2022](https://moabb.neurotechx.com/docs/generated/moabb.datasets.Nieto2022.html), útil para una primera carga reproducible.

No descargar todo el conjunto (~25 GB) antes de comprobar metadatos y reproducir un subconjunto. No subir datos de participantes a GitHub.

## Qué prueba y qué no

Permite estudiar **si se discriminan cuatro palabras imaginadas en una tarea impuesta**. No etiqueta de forma específica «hablo conmigo mismo» frente a «me dirijo voluntariamente a la IA» y, por tanto, **no permite validar el firewall neuronal**. Tampoco demuestra transcripción libre de frases.

## Evidencia sobre privacidad mental y palabra clave

[Kunz et al. (*Cell*, 2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12360486/) identificaron lenguaje interior y estudiaron un desbloqueo mediante contraseña mental en una BCI **implantada**. En una prueba en tiempo real, el detector de palabra clave alcanzó **98,75%** de precisión en un participante. No extrapolar esa métrica a EEG no invasivo ni a seguridad general.

Referencias: [NIH](https://www.nih.gov/news-events/nih-research-matters/decoding-inner-speech-brain-signals) · [estudio original](https://doi.org/10.1016/j.cell.2025.06.015).

## Objetivos experimentales separados

**IS-01:** clasificador de 4 palabras con controles de artefactos, condición visual y generalización entre sesiones. Línea de base: 25% de exactitud con clases equilibradas (informar desbalance).

**NPF-01:** simular la máquina de estados del firewall, comprobar que ninguna transición transmite contenido sin aprobación.

**NPF-02 (futuro):** protocolo éticamente revisado y datos específicos de **activación voluntaria vs pensamiento privado**, con periodos negativos extensos. Las falsas activaciones por hora son más importantes que una precisión agregada bonita.

[Protocolo EEG](../technical/inner-speech-protocol.md) · [Firewall](../technical/neural-privacy-firewall.md).
