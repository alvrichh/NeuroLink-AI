# NeuroLink AI — Repository reorganization plan
*Plan de reorganización bilingüe y visual*  
**Status / Estado:** approved approach, phased migration; not all steps executed.  
**Revision:** 2026-11-11

## Objectives / Objetivos

- Separate accessible explanations, research, technical implementation, hardware design, diagrams and visual evidence.
- Make the project accessible in English and Spanish **without maintaining diverging claims**.
- Replace infographic-like placeholder drawings with reproducible engineering diagrams, traceable photos and authentic plots.
- Keep live links stable during migration; do not break existing reference paths without redirects.
- Never invent measurements, captures, PCB readiness or regulatory approvals.

## Current repository / Estado actual

- `docs/simple/`: non-technical explanations, in Spanish.
- `docs/technical/`: software, BCI phases, experimental protocol and data/privacy.
- `docs/research/`: scientific context, references, roadmap and decisions.
- `hardware/`: analog, acquisition, firmware, optional HDL plus **digital demonstration only**.
- `diagrams/`: Mermaid source diagrams.
- `assets/diagrams/` and `assets/examples/`: five conceptual SVG illustrations.
- `examples/`: explanations backed by those conceptual figures.
- `apps/web/`: bilingual public website (Next.js, static export). Presentation only; it draws its content from the documents above and adds no claims of its own.

**At this revision there are no verified hardware photos, measured ERP plots, KiCad circuit captures, PCB photos or oscilloscope traces in this repository.** They must not be represented as existing project outputs.

## Target structure / Estructura objetivo

```text
README.md                  # bilingual landing / portada bilingüe
docs/
  en/
    README.md              # English navigation (initial seed exists)
    simple/
    technical/
    research/
  es/
    README.md
    simple/
    technical/
    research/
  REPOSITORY_PLAN.md       # plan, bilingual summary
  VISUAL_STANDARDS.md      # visual and licensing policy
  VISUAL_AUDIT.md          # image replacement inventory
hardware/
  README.md                # bilingual entry point eventually
  design/                  # architecture, KiCad and design documentation (future)
  firmware/                # platform-dependent code (future)
  hdl/                     # HDL + testbench; currently one teaching example
diagrams/
  source/                  # topology-editable Mermaid/draw.io (future migration)
  en/                      # localized diagram labels when needed (future)
  es/                      # localized diagram labels when needed (future)
examples/
  en/                      # example descriptions in English (future)
  es/                      # example descriptions in Spanish (future)
assets/
  SOURCES.md               # sources, permissions and provenance registry
  photos/                  # licensed real photos only
  plots/                   # generated from identified real datasets
  screenshots/             # own UI and EDA captures
  figures/                 # sober explanatory or technical exports
```

**No duplicate pictures by language.** Share images; translate captions, alt text and source-diagram labels. Hardware source code and schematic topology remain language-neutral. The folders marked 'future' are proposed, **not claims they exist already**.

## Language workflow / Flujo de traducción

1. **Immediate / Ahora:** bilingual root README and English overview; Spanish existing documents remain authoritative for their current content. Distinguish an overview from a complete translation.
2. **First translations:** scientific limits, safety, roadmap, architecture and hardware overview.
3. **Mirror documentation:** migrate `docs/simple` → `docs/es/simple`, `docs/technical` → `docs/es/technical`, and `docs/research` → `docs/es/research`; add translated counterparts under `docs/en`. Keep compatibility stubs at prior paths until all links are migrated.
4. **Examples / diagrams:** translate example prose and visible labels. Asset images themselves remain shared.
5. **Editorial control:** each paired page has a corresponding translation reference, last reviewed date and content owner. A change to one locale flags the other for review.
6. **Long term:** use English as the working source for newly authored technical sections after translation parity is achieved. Until then, do not call untranslated pages English documentation.

## Visual migration / Migración de imágenes

See [visual audit](VISUAL_AUDIT.md) for individual files.

- **Roadmap:** replace decorative timeline SVG with plain milestone table/Gantt based on real issues; no photography needed.
- **Software architecture:** professional logical block diagram with concrete interfaces and verification state; diagram remains editable.
- **Hardware chain:** engineering block diagram with ADC/MCU boundaries; alongside it link or include real PCB photo when redistribution is explicitly permitted.
- **P300 keyboard:** show a wireframe *clearly labeled mockup* until we can capture an actual prototype; only after validation use genuine screenshot and metrics.
- **AI conversation:** replace decorative panel with a real screenshot of the implemented demo; before implementation link to an explicitly labeled textual user journey.

## Delivery steps / Entregas

| Step | Change | Done when |
| --- | --- | --- |
| V0 | Bilingual entry page, published plan, visual rules and source registry | Links open; claims are clearly scoped |
| V1 | Migrate existing ES docs with compatibility links; add complete EN mirrors | Every document has an EN/ES link and content-equivalent counterpart |
| V2 | Redraw 3 architecture/roadmap diagrams in neutral engineering style | Source files editable, labels accurate and no decorative claims |
| V3 | Real photos and instrument captures, only when licensed/available | Source/license/permission and exact depiction recorded |
| V4 | Replace example placeholders with screenshot/plots generated by actual code | Reproduction instructions, dataset and outputs linked |
| V5 | Automated CI checks for Markdown links and asset provenance | No broken internal links; no unlabeled images or fake results |

## Acceptance criteria / Criterios de aceptación

- README is readable and substantive in **both** languages.
- No translated page silently omits safety or scientific limitations.
- Source data and photographs have explicit provenance; licensing is checked per **specific asset**, not only by project name.
- Every figure says `conceptual`, `mockup`, `simulated`, `measured`, or `photo / licensed`.
- Scientific plots name dataset, subject/session when appropriate, processing code and software version.
- Diagrams are engineering artifacts, not illustrations imitating proven laboratory work.
- Experimental electronics are not described as safe for human use without professional validation.

## What we are NOT doing now

- We are not claiming bilingual parity for every file today.
- We are not redistributing Texas Instruments imagery.
- We are not fabricating photographs, ERP curves or test results.
- We are not refactoring paths before translation and redirects are ready.
