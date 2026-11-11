# NeuroLink AI — website

[Español más abajo](#español)

The public website of the NeuroLink AI research project: a single, bilingual (English / Spanish), statically exported page built with **Next.js (App Router), React, TypeScript and Tailwind CSS**.

It presents the project's research design — and is deliberately explicit about what has **not** been demonstrated. Everything it says is drawn from the documentation in this repository.

## Quick start

Requires Node.js ≥ 22.18.

```bash
cd apps/web
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server at `http://localhost:3000` |
| `npm run build` | Static export to `out/` (plain HTML, CSS and JS) |
| `npm run start` | Serve the exported `out/` folder locally |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Node's built-in test runner: privacy-gate state machine, EN/ES dictionary parity, repository link targets |
| `npm run check` | Lint, typecheck, tests and build — what CI runs |

`predev`, `prebuild` and `typecheck` first run `npm run sync:brand` (see *Brand tokens*).

## Structure

```text
apps/web/
  scripts/sync-brand.mjs    copies the official logo and tokens from /assets/branding
  src/
    app/(en)/               English root layout + page  →  /
    app/es/                 Spanish root layout + page  →  /es/
    components/             document shell, glass navigation, UI primitives, photo figure
    sections/               one file per page section (Hero … OpenResearch)
    viz/                    interactive visualisations (hero canvas, sequence, firewall, chain, exchange)
    content/                en.ts, es.ts (typed dictionaries), links.ts, media.ts
    lib/                    privacyGate.ts (state machine), theme, active-section hook, site helpers
    styles/                 globals.css (tokens, type scale), glass.css, motion.css, nav.css, hero.css, sections.css
```

Content, styles, motion and visualisations are kept in separate layers: sections are server components that receive copy from the dictionaries; only the interactive pieces are client components.

## Brand tokens

`/assets/branding` is the single source of truth. `scripts/sync-brand.mjs` copies the logo files (lockup, symbol, wordmark, and the favicon/app-icon set) and `tokens.css` verbatim into the app and generates a typed `tokens.ts` with the colour values (for canvas drawing) and each logo file's pixel size. It **fails the build** if `tokens.css` and `tokens.json` disagree. The copies are git-ignored.

`src/styles/globals.css` removes Tailwind's default colour palette and exposes only `white`, `navy`, `blue`, `cyan` plus neutrals derived from navy, so an off-brand blue or cyan cannot be introduced by accident. Cyan is used for accents only, never for text. The logo is never redrawn or recoloured: the navigation shows the symbol over the wordmark in the lockup's proportions, the footer and social preview use the full lockup, and the favicon, Apple touch icon and web manifest use the symbol on a white tile.

## Light and dark themes

The site is designed light-first; a dark theme is available from the sun/moon switch in the navigation.

- **Which theme loads:** the visitor's saved choice, otherwise their system preference. An inline script applies it before first paint, so there is no flash. To make light the default regardless of the system, change the fallback in `src/lib/themeConfig.ts`.
- **How it works:** components never use the brand constants for text or surfaces directly. They use semantic tokens (`--paper`, `--paper-raised`, `--ink`, `--ink-muted`, `--accent`, `--shadow`, glass tokens) defined in `src/styles/globals.css`, which `html[data-theme="dark"]` redefines. Tailwind exposes them as `ink`, `body`, `muted`, `accent` and `paper`.
- **Dark palette:** deep navy rather than black — the brand navy mixed toward black — with text in white mixed with navy. Brand blue is too dark for text on navy, so links and active states use a lightened brand blue; buttons keep the exact brand blue. No new hues are introduced.
- **Logo:** the official files sit on white, so in the dark theme they are shown on a white plate rather than recoloured.
- The hero canvas reads its colours from the theme (`--viz-*`) and redraws when the theme changes.

## Content and languages

- `src/content/en.ts` defines the content *and* the `Dictionary` type; `es.ts` must satisfy it, so a missing translation is a compile error. A test additionally checks both dictionaries have identical structure, no empty strings and no untranslated long strings.
- Every repository document linked from the site is listed in `links.ts` and verified to exist by `content.test.ts`.
- Routes: `/` (English, default) and `/es/` (Spanish). The language switch keeps the reader's current section.

**Editorial rule.** Follow [`docs/VISUAL_STANDARDS.md`](../../docs/VISUAL_STANDARDS.md): never present a planned or conceptual item as demonstrated. Figures quoted on the site (dataset sizes, published accuracies) belong to the cited authors and are labelled as such. Statuses shown in the roadmap and technology sections (`documented`, `software prototype`, `planned`, `optional`, `external reference`) must match the repository — update `sections/Roadmap.tsx` and `viz/SystemChain.tsx` only when the evidence exists.

## Visuals and evidence labels

| Visual | Type | Notes |
| --- | --- | --- |
| Hero threads (`viz/HeroThreads.tsx`) | CONCEPTUAL | Decorative canvas animation, labelled on the page as "not recorded data" |
| Interaction sequence, exchange diagram, speller matrix | CONCEPTUAL / MOCKUP | Schematic glyphs; no signal traces or plots |
| Privacy Firewall demo (`viz/FirewallSimulation.tsx`) | SIMULATED | Runs `lib/privacyGate.ts`, a TypeScript mirror of [`src/neurolink_ai/privacy_gate.py`](../../src/neurolink_ai/privacy_gate.py). Button presses and timers only; the candidate is a fixed synthetic string. No neural signal, no intent detection |
| Photographs (`content/media.ts`) | PHOTOGRAPH / LICENSED | Third-party Wikimedia Commons photographs, embedded from their original URLs with author, licence and source, per [`assets/SOURCES.md`](../../assets/SOURCES.md). None shows NeuroLink AI hardware or experiments |

The site contains no EEG plots, signal traces or experimental results, because the project has none to show yet.

## Motion and accessibility

- Motion is opt-in: an inline script sets `<html data-motion="on">` before first paint unless the visitor prefers reduced motion. Without JavaScript the page is static and fully visible. Only `opacity` and `transform` are animated; the hero canvas pauses when off screen or in a hidden tab.
- **Full-page captures:** append `?still` to the URL (for example `/?still` or `/es/?still`) to render every section in its final state with animation off — scroll-triggered reveals never fire in a full-page screenshot otherwise.
- Glass surfaces use a real `backdrop-filter` with fallbacks for unsupported browsers, `prefers-reduced-transparency` and forced-colours mode (`styles/glass.css`).
- Landmarks, a skip link, keyboard-operable tab interfaces (arrow keys, Home/End), visible focus, `aria-current` navigation tracking and a live region for the simulation state. Status marks differ by shape as well as colour.

## Deployment

`npm run build` writes a self-contained static site to `apps/web/out/`; any static host works.

- **Sub-path hosting** (for example GitHub Pages at `/<repository>/`): build with `NEXT_PUBLIC_BASE_PATH=/NeuroLink-AI`.
- **Canonical / social URLs:** set `NEXT_PUBLIC_SITE_URL=https://example.org` to emit absolute Open Graph image URLs.
- **Vercel:** import the repository, set **Root Directory** to `apps/web` and keep the Next.js preset — no other settings are needed. Leave "Include files outside the Root Directory" enabled (the default), because the build reads the logo and tokens from `/assets/branding`. Canonical and social URLs use the project's production domain automatically.
- **GitHub Pages:** the workflow [`.github/workflows/web.yml`](../../.github/workflows/web.yml) checks every pull request, and has a manually triggered *deploy* job. To use it, enable Pages with "GitHub Actions" as the source in the repository settings, then run the workflow from the Actions tab.

## Known limitations

- Photographs are hot-linked from Wikimedia Commons, as the repository's media policy currently requires. If Wikimedia is unreachable or rate-limits a visitor, the figure shows a labelled fallback with the source link. Self-hosting optimised copies is permitted by the licences (with attribution and share-alike) but would first require updating `assets/SOURCES.md`.
- Scroll-linked effects (navigation sheen, hero parallax, mobile progress line) use CSS scroll-driven animations and are a progressive enhancement; browsers without support simply omit them.

---

## Español

Sitio web público del proyecto de investigación NeuroLink AI: una sola página bilingüe (inglés / español), exportada como sitio estático, construida con **Next.js (App Router), React, TypeScript y Tailwind CSS**. Presenta el diseño de investigación y es deliberadamente explícita sobre lo que **no** se ha demostrado.

```bash
cd apps/web
npm install
npm run dev
```

- `npm run build` genera el sitio estático en `out/`; `npm run check` ejecuta lint, tipos, pruebas y compilación (lo mismo que la CI).
- **Marca:** `/assets/branding` es la única fuente de verdad. `scripts/sync-brand.mjs` copia el logotipo y los tokens sin modificarlos y falla si `tokens.css` y `tokens.json` no coinciden. Solo existen los cuatro colores oficiales y neutros derivados del azul marino; el cian nunca se usa para texto.
- **Contenido:** `src/content/en.ts` y `src/content/es.ts` son diccionarios tipados; una traducción ausente es un error de compilación. Rutas: `/` (inglés) y `/es/` (español).
- **Norma editorial:** no presentar como demostrado nada que solo esté planificado ([normas visuales](../../docs/VISUAL_STANDARDS.md)). La demostración del firewall es una **simulación** de la máquina de estados de software; no lee ninguna señal neuronal.
- **Tema claro y oscuro:** el diseño parte del tema claro; el oscuro se activa con el interruptor de sol y luna de la navegación. Se carga la elección guardada del visitante o, si no hay, la preferencia de su sistema. El tema oscuro usa azul marino profundo derivado del color de marca, y el logotipo se muestra sobre una pieza blanca en lugar de recolorearse.
- **Fotografías:** obras de terceros en Wikimedia Commons, enlazadas desde su URL original con autor, licencia y fuente ([registro](../../assets/SOURCES.md)). Ninguna muestra hardware ni experimentos de NeuroLink AI.
- **Capturas de página completa:** añade `?still` a la URL para mostrar todas las secciones sin animación.
- **Despliegue:** cualquier alojamiento estático. Para una subruta (GitHub Pages), compila con `NEXT_PUBLIC_BASE_PATH=/NeuroLink-AI`.

[README principal](../../README.md) · [Guía de estilo de la marca](../../assets/branding/STYLE_GUIDE.md)
