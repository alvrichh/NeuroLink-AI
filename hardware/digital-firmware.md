# Lógica digital y firmware

## Lo que hace el microcontrolador

Después de la conversión A/D, un microcontrolador puede:

- Configurar el AFE mediante SPI.
- Recibir muestras digitales en el momento apropiado.
- Añadir contadores, marcas temporales y estado de canales.
- Detectar pérdidas o desbordamientos de datos.
- Enviar paquetes a un receptor conocido y probado.
- Garantizar un modo de parada segura en caso de error.

El firmware de una plataforma validada es preferible a modificarlo sin necesidad. OpenBCI advierte que sus placas vienen programadas y que no es preciso reprogramarlas para empezar a adquirir datos.

## Contrato mínimo de paquetes (propuesta abstracta)

```text
Frame {
  protocol_version
  device_id
  frame_sequence
  monotonic_timestamp
  sample_rate
  channel_metadata
  sample_values
  event_marker
  integrity_status
}
```

El formato real dependerá del equipo comercial y de su SDK. No inventaremos un protocolo si BrainFlow ya tiene integración oficial.

## Diseño para pruebas de banco

- Fuente sintética o reproducción de muestras con etiqueta explícita.
- Prueba de muestras perdidas y duplicadas.
- Verificación de orden temporal, overflow y frecuencia efectiva.
- Medición del desfase entre eventos de estímulo y muestras.
- Registro de firmware/revisión de placa para repetir resultados.

## ¿Y FPGA?

El FPGA no es indispensable para leer un ADC EEG a través de SPI. Añade complejidad, consumo, herramientas y superficie de verificación. Solo lo consideraríamos si existen problemas medidos de latencia, paralelización, sincronía o procesamiento embebido que no pueda solucionar el MCU.

El [ejemplo SystemVerilog](hdl/sample_register.sv) es un registro de flujo válido/listo para simular muestras digitales, **sin contacto humano ni control de un AFE real**.

Fuentes: https://docs.openbci.com/Cyton/CytonProgram/ · https://www.ti.com/product/ADS1299
