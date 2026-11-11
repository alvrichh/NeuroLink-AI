# Front-end analógico de EEG

## Por qué es necesario

El EEG superficial mide diferencias de potencial muy pequeñas con un ruido eléctrico y fisiológico significativo. No basta con conectar cables a entradas digitales: hace falta instrumentación analógica diseñada para biopotenciales.

Un **AFE** suele concentrar amplificación de bajo ruido, gestión de referencia, multiplexado y conversión analógico-digital. La calidad de la adquisición depende del circuito completo, el cableado, el entorno electromagnético y la seguridad de la interfaz física.

## Caso de estudio: Texas Instruments ADS1299

Según [TI](https://www.ti.com/product/ADS1299), el ADS1299 integra:

- Hasta 8 canales de adquisición simultánea de biopotenciales.
- Convertidores delta-sigma de **24 bits nominales** y amplificadores de ganancia programable.
- Interfaz digital **SPI**.
- Tasa de adquisición configurable entre **250 y 16 000 muestras/segundo**.
- Opciones internas de referencia, detección de electrodos y señales de prueba.

Las prestaciones publicadas son del **componente**, no de una placa o sistema humano final. Su esquema, layout, interfaz de entrada y alimentación requieren diseño experto. Es posible usar señales de prueba del propio chip para evaluar funciones electrónicas, **sin personas conectadas**.

## Qué estudiar en el futuro esquemático

1. Arquitectura funcional y requisitos de medida.
2. Integridad analógica, interferencias y ruido.
3. Referencias, impedancias y trazabilidad metrológica.
4. Digitalización, temporización e integridad de la comunicación.
5. Aislamiento, corriente de fuga, fallos previsibles y EMC.
6. Separación entre demostración electrónica de laboratorio y dispositivo apto para humanos.

**No se incluyen valores ni cableado para una interfaz corporal DIY.** Un esquema ilustrativo no cumpliría los requisitos de seguridad.

## Importante: kits de evaluación

El manual del **ADS1299EEG-FE Evaluation Module** advierte expresamente que es solo para evaluación en laboratorio y **no está destinado a interfaz directa con pacientes**. No considerar una EVM como un producto EEG seguro para ponerse.

Referencias:  
- https://www.ti.com/product/ADS1299  
- https://www.ti.com/lit/ug/slau443b/slau443b.pdf  
- https://docs.openbci.com/ForDevelopers/HardwareDevelopment/
