# Arquitectura de adquisición EEG (conceptual)

## Cadena de señal

```text
[Electrodos de registro]
          |
          v
[Protección/interfaz de entrada]     ← Diseño de seguridad pendiente
          |
          v
[AFE de biopotenciales]
  amplificación / referencia / conversión delta-sigma
          |
          | SPI (muestras digitales)
          v
[Microcontrolador + reloj + marcas de estímulos]
          |
          v
[Transporte de datos verificado]
  (p. ej. interfaz inalámbrica de plataforma documentada)
          |
          v
[PC: BrainFlow / adaptador EEG]
          |
          v
[MNE → P300 → teclado → confirmación → IA]
```

La cadena es un **diagrama de bloques, no un esquemático electrónico aprobado**. No especifica conexiones humanas, valores de protección, corrientes, vías a tierra, alimentación, ni garantiza aislamiento.

## Partición de responsabilidades

| Bloque | Dominio | Opciones conceptuales |
| --- | --- | --- |
| Electrodos y cableado | Bioseñal e interfaz paciente | Soluciones documentadas de sistema EEG apto para uso previsto |
| Protección y seguridad | Ingeniería eléctrica regulada | Requiere diseño y revisión profesional |
| AFE/ADC | Analógico/mixto | ADS1299, referencia habitual en EEG |
| MCU | Electrónica digital y firmware | Control SPI, timestamp y empaquetado |
| FPGA | Lógica digital reconfigurable | Opcional para procesamiento en hardware, no para sustituir el AFE |
| Transporte | Comunicaciones | Link documentado, con latencia y pérdidas medidas |
| Ordenador | Software | BrainFlow, MNE, API y UI |

## Necesidades del P300

- Sincronización precisa entre estímulo visual y datos EEG.
- Identificación de canales, frecuencia, escala, sesgos, artefactos y señales perdidas.
- Integridad de muestras y marcadores temporales.
- Latencia de captura, empaquetado, transporte y presentación, medida por separado.
- Detección de desconexión y estados «sin señal».

Las cifras concretas de requisitos (canales, tasa, jitter, ruido, consumo, autonomía) se cerrarán después de evaluar datasets, protocolos y hardware comercial. **No asumir que 24 bits de resolución nominal equivalen a 24 bits efectivos de información cerebral.**

## Ruta de hardware propio

Antes de abrir KiCad: requisitos → análisis de riesgos → simulación → revisión de esquemático → revisión PCB/EMC → verificación de banco → certificación/evaluación aplicable → autorización ética para cualquier contacto humano. No es razonable conectar una placa experimental de ADS1299 directamente a la cabeza.

Documentación de referencia: [ADS1299](https://www.ti.com/product/ADS1299) · [OpenBCI Hardware](https://docs.openbci.com/ForDevelopers/HardwareDevelopment/) · [seguridad](safety-review.md).
