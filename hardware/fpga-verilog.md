# ¿Necesitamos puertas lógicas, Verilog o una FPGA?

## Diferencia fundamental

- **Analógico:** señales físicas continuas (electrodos, amplificación, ruido, ADC). Esto se diseña con esquemáticos electrónicos, simulación analógica, PCB y verificación.
- **Digital:** bits, contadores, buffers, lógica de control y protocolos. Puede implementarse en un microcontrolador con firmware.
- **FPGA/Verilog/SystemVerilog:** descripción de circuitos digitales reconfigurables, útil para pipelines deterministas, filtros especiales, interfaces de alta velocidad y paralelismo.

**Verilog no sirve para diseñar por sí solo el amplificador de señal EEG.** Tampoco convierte una entrada analógica en datos digitales sin un ADC.

## Decisión para NeuroLink AI

| Versión | Decisión | Motivo |
| --- | --- | --- |
| PoC 0.1 | Software + datasets | Validar decodificación antes de comprar |
| PoC 0.2 | Adquisición comercial y MCU integrado | Reutilizar plataforma y software existentes |
| Exploratoria | FPGA/Verilog opcional | Solo si una limitación medida lo justifica |
| Futuro hardware propio | PCB/AFE + MCU, FPGA si procede | Exige diseño y revisión rigurosa |

## Primer ejemplo digital aislado

`hdl/sample_register.sv` demuestra una única etapa de canalización de **palabras digitales sintéticas de 24 bits** con interfaz `valid/ready`. La idea es aprender handshake, buffer y *backpressure*. No incluye electrodos, ADC, SPI ni circuitos aplicados al cuerpo.

`hdl/tb_sample_register.sv` verifica un caso básico y una situación en la que el receptor se bloquea temporalmente. **No es una implementación de EEG ni hay pruebas físicas.**

## Si en el futuro incorporamos FPGA

- Justificarlo con latencia y consumo observados.
- Definir contratos de reset/clock, timing, formato, pérdida de muestras y recuperación.
- Simular testbenches, formalizar requisitos y realizar revisión del hardware.
- Separar siempre el bloque FPGA digital del subsistema de seguridad del paciente.
- Mantener un MCU o FPGA incapaz de emitir estimulación al cuerpo: **adquisición pasiva exclusivamente**.

[Ejemplo HDL](hdl/sample_register.sv) · [Arquitectura física](architecture.md) · [Seguridad](safety-review.md).
