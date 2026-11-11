# Visual and documentation standards
*Normas editoriales y visuales / Editorial and visual standards*

## English

**Preferred visual language:** engineering documentation, not promotional infographics. Use a neutral palette, consistent typography, black/white print readability, informative captions and actual circuit/signal terminology. Avoid decorative brains, fake glassmorphism, glowing arrows, stock neural backgrounds and staged synthetic screenshots.

**Evidence labels (mandatory for each visual):**
- `CONCEPTUAL`: topology or illustrative graphic, not tested.
- `MOCKUP`: UI design, no real processing result.
- `SIMULATED`: generated with software or synthetic test signals; name the simulation and code.
- `MEASURED`: generated from real recorded or lab data; record dataset, acquisition mode, environment, preprocessing and script.
- `PHOTOGRAPH / LICENSED`: real image, credited with original owner and reuse terms.

**Source requirements:** See [media registry](../assets/SOURCES.md). Every checked-in third-party photograph or figure must have the exact source URL, author/owner, license or explicit permission, attribution requirements, acquisition date and edits. An image being publicly visible does **not** mean it is reusable. Do not copy screenshots from restricted datasheets without authorization; link to the official document instead.

**Electrical schematics:** author in an EDA tool when a real hardware design exists. Use functional block diagrams until then. Do not show fictitious circuits as a working EEG interface, or imply that prototyping hardware is safe for human contact.

**Scientific figures:** export directly from experiment code using identified data. Include units, axes, experimental condition, evaluation split and uncertainty where meaningful. Never use AI-generated traces or plots as measurements.

**Translation:** source imagery can be shared. Localize human-facing diagram labels, alt text, captions and figure explanations; distinguish English overview from full translation.

## Español

**Estética:** documentación de ingeniería, no infografías publicitarias. Preferir fondos neutros, tipografía coherente, legibilidad en blanco y negro, pies de figura y nombres técnicos concretos. Evitar cerebros decorativos, flechas luminosas, fondos neuronales de stock o capturas simuladas que parezcan reales.

**Etiquetas de evidencia obligatorias:**
- `CONCEPTUAL`: esquema ilustrativo, aún no probado.
- `MOCKUP`: diseño de interfaz sin funcionamiento demostrado.
- `SIMULATED`: resultado sintético o simulado; indicar código y parámetros.
- `MEASURED`: resultado sobre señales registradas reales; identificar datos, condiciones y procesamiento.
- `PHOTOGRAPH / LICENSED`: fotografía real, autor y condiciones de licencia documentadas.

**Procedencia:** cada imagen ajena incluida debe indicar enlace exacto, autor/titular, licencia o permiso, atribución requerida, fecha de consulta y modificaciones. Que una imagen sea pública no permite copiarla libremente. No copiar figuras de datasheets restringidos: enlazarlos.

**Circuitos reales:** los esquemas electrónicos deben salir de herramientas EDA y de diseños revisados; hasta entonces mostrar diagramas funcionales. No presentar un montaje experimental como seguro para conectarlo a una persona.

**Gráficos científicos:** generar desde datos identificados y scripts reproducibles, con unidades, ejes, condiciones y particiones de evaluación. Nunca representar una curva inventada como medición.

**Traducción:** las fotografías y gráficos pueden compartirse; traducir etiquetas, leyendas, texto alternativo y explicaciones. Un resumen en inglés no equivale a documentación íntegra traducida.

## Caption pattern / Plantilla de pie de figura

```text
Figure ID:
Title (EN / ES):
Type: CONCEPTUAL | MOCKUP | SIMULATED | MEASURED | PHOTOGRAPH / LICENSED
Source (exact URL or original work):
Author/rights holder:
License/permission:
Date checked:
Methods / environment / script (for measured or simulated):
Modification notes:
What it does NOT demonstrate:
```

[Audit of current figures](VISUAL_AUDIT.md) · [Media registry](../assets/SOURCES.md)
