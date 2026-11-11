# Diseños de referencia, fuentes oficiales y advertencias

Este documento reúne ejemplos **que podemos estudiar**, no esquemas que sea seguro copiar y conectar a una persona.

## Texas Instruments

- [ADS1299](https://www.ti.com/product/ADS1299): datasheet, especificaciones eléctricas, SPI y recursos de diseño del AFE EEG.
- [ADS1299EEG-FE User Guide (TI)](https://www.ti.com/lit/ug/slau443b/slau443b.pdf): guía de equipo de evaluación. **Prohíbe su uso como interfaz directa con pacientes**; solo evaluación electrónica de laboratorio.

## OpenBCI

- [Hardware Development](https://docs.openbci.com/ForDevelopers/HardwareDevelopment/): enlaces a esquemáticos y diseños de placas Cyton/Ganglion y otros elementos.
- [Cyton Specifications](https://docs.openbci.com/Cyton/CytonSpecs/): ejemplo de adquisición con ADS1299, MCU PIC32 y comunicación.
- [Cyton Programming](https://docs.openbci.com/Cyton/CytonProgram/): firmware de las placas; viene preprogramado y se recomienda no modificarlo sin necesidad.
- [Setting up EEG](https://docs.openbci.com/GettingStarted/Biosensing-Setups/EEGSetup/): documentación de uso del equipo de adquisición comercial.

## Estándares de referencia (verificar pertinencia profesionalmente)

- [IEC 60601-1 (consolidada, con enmiendas hasta 2020)](https://webstore.iec.ch/en/publication/67497): seguridad básica y funcionamiento esencial.
- [IEC 60601-1-2 (consolidada, con enmienda 2020)](https://webstore.iec.ch/en/publication/67554): compatibilidad electromagnética.
- [IEC 80601-2-26:2019 (ISO)](https://www.iso.org/standard/77773.html): requisitos particulares de electroencefalógrafos, **vigente**, revisado y confirmado en 2024.

No confundir la norma anterior **IEC 60601-2-26:2002**, retirada, con IEC 80601-2-26:2019.

## Cómo usar estas referencias

1. Tomar notas sobre funciones, bloques y límites del diseño.
2. Contrastar siempre con documentos vigentes del fabricante.
3. Respetar las licencias y las restricciones sobre los archivos CAD.
4. No suponer que la seguridad de un componente equivale a la del equipo final.
5. Simular y verificar en banco antes de proponer aplicaciones con personas.
