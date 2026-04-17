# Plan: Century21.com.ar rebuild — 3 distinct versions

## Context

Recreate [century21.com.ar](https://century21.com.ar/) (home) and the listing page [286194 — Casa en Ramos Mejía](https://century21.com.ar/propiedad/286194_casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera) from scratch in three distinct design directions. The current site is dated, JS-rendered, corporate-franchise real estate (Buenos Aires / Argentina). We want to show what modern, award-caliber craft would look like for the same brand — three cohesive aesthetic points of view, each including both pages, with static mockup data and restrained-but-lovable motion throughout.

The intended audience is a design-forward evaluator comparing the three directions side-by-side (hence the required explainer HTML). No backend: forms submit to a success state; all data ships from TypeScript mock files. Imagery uses Unsplash placeholders in-code plus a media-TODO markdown that captures nanobanana / Seedance 2.0 prompts for later replacement.

The brief explicitly requires: no missing sections vs. the source, best-practice UI/UX, inspiration from awarded real-estate sites without copying, motion that is present-lovable-minimalist (applies to **all three** versions — not just one motion-heavy variant), **mobile-first with desktop support and all three versions must look exceptional on mobile**, and optional use of Remotion + Lottie. The delivery is **one-shot** — ship all three versions in a single pass, so the plan includes a self-contained verification harness designed to catch regressions without human review.

## Decisions confirmed

- **Visual regression:** gated from run #2 — first `pnpm verify` writes baselines under `packages/verify/snapshots/` (committed); subsequent runs diff against them with a 1 % pixel-ratio threshold. First-run is non-gating for snapshots only; all other gates (sections, layout, a11y, Lighthouse, smoke) are active from run #1.
- **Imagery:** Unsplash placeholders pinned by photo ID ship in-code so the experience is complete on first `pnpm dev`. `media-todo.md` enumerates every slot with a nanobanana / Seedance 2.0 prompt for later replacement.
- **Deployment:** local only. `pnpm preview:showcase` builds and serves the three versions plus `showcase.html` under one local port. No platform config in-repo; `dist-showcase/` is portable to any static host.
- **Locale:** Spanish (es-AR) only across all three versions. No EN toggle. Sharper voice, no i18n layer to maintain or verify.
- **Brand = real Century 21.** We use the real Century 21 Argentina name, logo, palette tokens, taglines, legal copy, phone number, social handles, province list, and international presence. Only individual listings, agents, testimonials, blog posts are mockup content (clearly labelled as design-build in `showcase.html`). See "Brand truth" below for the verified source of truth.

## Brand truth (Century 21 real-world identity — verified from public sources)

Every fact in this section was verified by an explore agent against primary sources (century21.com.ar, century21.com, Anywhere / Compass corporate, Instagram / LinkedIn official accounts, PR Newswire). It is the single source of truth for `packages/shared/src/data/brand.ts` and supersedes any fabricated stats in the per-version refined specs below. Where a spec's copy used an invented number, the **Copy corrections** block at the bottom of this section gives the replacement.

### Logo assets (fetch and commit during foundation step)
- **Argentina gold wordmark:** `https://www.century21.com.ar/img/c21arg/c21ArgWebRGold.svg` → commit as `packages/shared/public/brand/c21-gold.svg`.
- **Global white wordmark:** from century21.com (`/images/logo/c21-logo-white.svg`) → `c21-white.svg`.
- **Global black wordmark:** from century21.com (`/images/logo/c21-logo-black.svg`) → `c21-black.svg`.
- **"21" seal alone:** not distributed officially; if needed, extract from the wordmark SVG at build or omit.
- URLs are to be fetched + verified during foundation; any 404 is flagged in `media-todo.md` with provenance notes. No embedding of third-party logo CDNs at runtime.

### Brand palette (official "Gold Standard" identity, 2018)
- **Relentless Gold:** `#BEAF88` — Pantone 2324 C.
- **Obsessed Grey:** `#252526` — Pantone Black 7 C.
- **White** — supporting.
- Hex values sourced from widely-cited brand-color databases. Official C21 brand guidelines portal requires authenticated access; we accept ±5 L\* drift if the canonical guideline value is later obtained.

### Brand-gold contrast constraint (important)
Relentless Gold `#BEAF88` on cream `#FAF7F2` is **2.07:1** — fails both AA body (4.5:1) and UI (3:1). On ink `#252526` it's **~6.2:1** — AA body. **Rule across all three versions:** the brand gold may only appear on ink or deep-olive backgrounds (logo lockups, brand signature moments). On cream/paper, each version continues to use its own warm accent (V1 bronze, V2 orange, V3 tango red — none are substitutes for the brand gold, they are the design accent layer).

### Logo usage per version
- **V1 Editorial Pampas:** gold wordmark renders on ink (`#1A1714`) or deep-olive (`#3D4A3A`) backdrops — nav pill, footer panel, hero vignette. On cream, the wordmark is rendered in ink (monochrome treatment that brand guidelines permit).
- **V2 Kinetic Marquee:** gold wordmark renders on the ink zones (hero video overlay, footer); in off-white zones the wordmark is ink-on-off-white.
- **V3 Raw Grid:** wordmark is always monochrome — black on paper, white on the few inverted black bars. V3 deliberately stays palette-pure; gold is not introduced.

### Founding + tenure (as of plan date 2026-04-17)
- **Global founding year:** **1971**. Century 21 Real Estate, LLC — currently owned by **Compass International Holdings** (merger completed 9 Jan 2026; previously Anywhere Real Estate).
- **Argentina launch:** **12 June 2017** (PR Newswire). Tenure **≈ 9 años** (we say "desde 2017" rather than compute a changing number in copy).
- **Global reach:** **79 países y territorios**. Global office count varies by counting methodology (sources report 11 000–14 250); copy uses the conservative **"más de 11.000 oficinas"** phrasing.
- **Argentina office count:** **NOT public** — the company publishes a directory but no aggregate. **We do not state an Argentina office count anywhere in copy.** We say "28 provincias cubiertas" instead.

### HQ + executive
- Global HQ: **175 Park Ave, Madison, NJ 07940**.
- Argentina CEO (per public LinkedIn): **María Verónica Pagola**. Referenced only if it appears on the source site in an analogous position; not forced into copy.

### Taglines (verbatim, no paraphrase)
- *"Dando el 121%"*
- *"Desafiando la mediocridad"*
- *"Tu Agencia de Bienes Raíces de Confianza en Argentina"* (full positioning line)
- Global English *"The Gold Standard"* — not used on Argentina copy.

### Legal footer (verbatim Spanish — render in every version's footer, every page)
> La marca y el logotipo CENTURY 21 son propiedad de CENTURY 21 Real Estate, LLC. Cada Oficina es de Propiedad y Operación Independiente. CENTURY 21 Argentina, no es responsable por la exactitud o complementos de la información de los Afiliados, de los corredores inmobiliarios y de las propiedades y de otra información provista por los usuarios de este sitio. La información puede cambiar sin previo aviso. La opinión de algunos artículos es responsabilidad de sus autores y han sido publicados solo para fines informativos y no expresa el punto de vista de CENTURY 21 Argentina.

### Contact
- Phone: **(011) 3070 5043** (from live footer — to be re-verified during foundation). Any agent-card phone numbers in individual listings are explicitly mockup.

### Social (verbatim URLs in `brand.ts`)
- Instagram — `https://www.instagram.com/century21arg` (handle `@century21arg`, ~16 K followers)
- Facebook — `https://www.facebook.com/century21arg`
- LinkedIn — `https://ar.linkedin.com/company/century21-argentina`
- X — `https://x.com/century21arg`
- YouTube — no dedicated Argentina channel → omit the icon entirely (don't link to the global channel).

### Provinces / regions (28 total — corrected from our earlier "24")
Grouped as the live site groups them:
- **Buenos Aires (6):** Capital Federal, Buenos Aires (provincia, fuera GBA), Buenos Aires Costa Atlántica, GBA Norte, GBA Oeste, GBA Sur.
- **Noroeste (5):** Catamarca, Jujuy, La Rioja, Salta, Tucumán.
- **Noreste (4):** Chaco, Corrientes, Formosa, Misiones.
- **Centro (7):** Córdoba, Entre Ríos, La Pampa, San Juan, San Luis, Santa Fe, Santiago del Estero.
- **Sur (5):** Chubut, Neuquén, Río Negro, Santa Cruz, Tierra del Fuego.

### International presence (11 Latin American countries + Comercial division)
Bolivia · Brasil · Chile · Colombia · Ecuador · Guyana · México · Paraguay · Perú · Uruguay · Venezuela · Century 21 Comercial.

### What stays mockup (everything not above)
- Specific property listings (featured grid + similar) — realistic-but-invented.
- Individual agent names, photos, bios — invented Spanish-Argentinian names.
- Testimonial quotes and attributions — invented, labelled as design copy in `showcase.html`.
- Blog post content — invented, labelled.
- Listing 286194 fields — base facts from the real URL (Ramos Mejía, 4 ambientes, pileta, cochera) but price, m², amenities, and description are plausibly reconstructed.
- Rule: no UI surface could be mistaken for live C21 Argentina operational data. No fabricated Argentina office count. No fabricated agent phone number shown as authoritative. `showcase.html` calls this out in plain language.

### Copy corrections (override the per-version specs below)
The three per-version specs were written before this brand verification and each invented some numbers. These overrides win where they conflict:

- **V1 — dek:** *"Propiedades seleccionadas en Argentina, acompañadas por asesores de Century 21 **desde 2017**."* (was "desde 2002" — wrong)
- **V1 — brand-story stats:** replace the four invented numbers with verified-only stats: *"Mundo · 1971"* · *"Argentina · 2017"* · *"Países · 79"* · *"Provincias · 28"*.
- **V2 — dek:** *"Presencia en **79 países**. En Argentina **desde 2017**. Cobertura en **28 provincias**."* (was "187 propiedades, 23 provincias, 48 años" — two wrong)
- **V2 — brand-story stat block:** *"**54 años** globalmente. **9 años** en Argentina. **79 países**. 1 red."* (was "48 años. 23 provincias. 187 oficinas. 1 red.")
- **V3 — hero H1:** *"CENTURY 21. EN ARGENTINA DESDE 2017. UNA RED EN 79 PAÍSES."* (was "PROPIEDADES EN ARGENTINA. 1971 OFICINAS. UNA RED." — 1971 is the founding year, not an office count)
- **V3 — dek:** *"Compra, venta y alquiler en **79 países**. En Argentina desde **2017**."* (was "82 países … desde 1997" — two wrong)
- **V3 — brand-story stat block:** *"DESDE 1971 · 79 PAÍSES · DESDE 2017 EN ARGENTINA · 28 PROVINCIAS"* (was "1971 OFICINAS · 86 PAÍSES · 29 AÑOS · +12.000 OPERACIONES" — four wrong / not public)

All other copy (testimonials, blog titles, CTA labels, headline H1 for V1/V2) was invented-but-reasonable and stands unchanged.

## Three aesthetic directions

All three share restrained motion and ship the same set of sections, but each commits to a wholly distinct visual POV. No overlap in typography, palette, or signature interaction.

### V1 — "Editorial Pampas"
Quiet-luxury editorial, as if a travel magazine ran a feature on living in Argentina. Generous whitespace, large architectural photography, two-column long-form feel. Nods to Argentine modernist design (Maldonado, Carlos Méndez Mosquera) via restraint and warm cream/bronze palette.
- **Type (all free for commercial use):** Display **Fraunces** (Google, variable serif — soft / wonky axes give it editorial warmth). Body **Satoshi** (Fontshare, free). Data **JetBrains Mono** (Google, free).
- **Palette:** `#FAF7F2` cream paper, `#1A1714` near-black ink, `#9E7B4D` weathered bronze, `#3D4A3A` deep olive accent.
- **Signature motion (minimalist):** On-scroll photo crop-reveal (single 400ms threshold per image, CSS only); caret-style letter-swap on nav hover; **one** Lottie moment — the C21 monogram drawing itself on page load.
- **Listing treatment:** 60/40 editorial split — full-bleed photography column left, stacked metadata + neighborhood story right. Gallery is a full-screen lightbox with keyboard nav.

### V2 — "Kinetic Marquee"
Swiss/International-style poster meets property-tech. A continuously scrolling marquee of new listings, a hero with weight-shifting type, and a restrained Argentina map that highlights operating provinces. Motion is deliberate and tactile, never decorative.
- **Type (all free for commercial use):** Display and UI **Switzer** (Fontshare, free — Helvetica-adjacent with broader weight range). Mono for prices **Geist Mono** (Vercel, free / OFL).
- **Palette:** `#0E0E0E` deep black, `#F6F4EF` off-white, `#E64A19` torched orange (Argentine sun), `#2B6CB0` Río de la Plata blue accent.
- **Signature motion (minimalist):** Infinite horizontal marquee of fresh listings; 300ms Motion-spring stagger on card reveal; cursor-follow parallax on hero photo (subtle, <8px); **pre-rendered MP4 hero b-roll** (8-second loop) served via `<video autoplay muted loop playsinline>` with a JPG poster — no Remotion runtime, no client JS cost.
- **Listing treatment:** Full-bleed hero photo with metadata pinned bottom-right, horizontal-strip gallery below, agent card + contact in right sidebar.

### V3 — "Raw Grid"
Brutalist, grid-honest, typography-dense. Rejects luxury softness; reads as the property-truth counterpoint. Concrete-texture background, heavy display type, flat edges. Motion is almost invisible but present as a polish pass.
- **Type (all free for commercial use):** Display **Anton** (Google, ultra-condensed sans — does the "heavy editorial poster" job Migra would have done). Body **IBM Plex Sans** (IBM, OFL). Numerals **JetBrains Mono** (Google, free).
- **Palette:** `#0A0A0A` black, `#FFFFFF` paper, `#FF3B1F` tango red, `#D9D9D9` concrete gray, subtle SVG grain overlay.
- **Signature motion (minimalist):** Price/sqm number counters animate on mount; grid reflow (FLIP) when filters change; a viewport-synced section counter ("03 / 08") that slides as you scroll. No decorative animation.
- **Listing treatment:** Poster layout — massive photo with typographic overlay, spec data rendered as a brutalist definition-list table, no rounded corners anywhere.

## Tech stack

Same base across all three (to keep cognitive load low and make comparison fair), with per-version additions where the aesthetic demands them:

- **Base:** Vite 6 + React 19 + TypeScript + Tailwind v4 (Vite plugin) + Motion 12 + react-router-dom 7 + `lucide-react` (amenity + UI icons).
- **V1 additions:** `@lottiefiles/dotlottie-react` (one logo Lottie).
- **V2 additions:** GSAP only if marquee physics need it (prefer CSS `animation` keyframes first). The hero MP4 is authored separately in a `tools/remotion/` folder (Remotion as a render-time author tool, not a runtime dep); the rendered MP4 and its poster JPG are committed under `packages/v2-kinetic/public/hero-*`.
- **V3 additions:** grain texture via inline SVG; no extra runtime dep.
- **Icons:** `lucide-react` everywhere (free, tree-shakeable). Currency and brand glyphs are hand-SVG.
- **Fonts:** loaded via `@fontsource-variable/*` packages (no third-party CDN) with `font-display: swap` and a preload tag only for each version's display font at its primary weight. `size-adjust` declared to minimise CLS during swap.
- **Package manager:** pnpm 10.33 (already in `package.json`), workspaces for the monorepo.
- **Node:** 20+.

Why not Astro / Next.js: all three sites are two routes each and ship mostly static content with one interactive mortgage calculator and one search widget. Vite + React keeps all three builds near-identical and independently deployable.

## Repo structure

```
century21-test/
├── package.json                    (root orchestrator, pnpm workspaces)
├── pnpm-workspace.yaml
├── .gitignore                      (node_modules, dist, .worktrees, .DS_Store)
├── README.md                       (dev instructions)
├── showcase.html                   ◄── the required explainer HTML
├── showcase.css
├── media-todo.md                   ◄── nanobanana / Seedance prompts + placeholders
├── packages/
│   ├── shared/
│   │   ├── package.json
│   │   └── src/
│   │       ├── types.ts            (Listing, Agent, Office, Testimonial)
│   │       ├── brand.ts            (nav items, footer structure, legal copy)
│   │       └── data/
│   │           ├── listing-286194.ts       (the Ramos Mejía detail page)
│   │           ├── featured-listings.ts    (9 cards for homepages)
│   │           ├── regions.ts              (28 provinces/regions — real, grouped)
│   │           ├── agents.ts               (6 profiles)
│   │           ├── testimonials.ts         (5 quotes)
│   │           └── similar-listings.ts     (3 cards for listing page)
│   ├── v1-editorial/
│   │   ├── src/
│   │   │   ├── main.tsx, App.tsx, router.tsx
│   │   │   ├── routes/Home.tsx, routes/Listing.tsx
│   │   │   ├── components/ (Nav, Hero, SearchWidget, FeaturedGrid, OfficeLocator, Testimonials, BlogTeaser, Newsletter, Footer, Gallery, MortgageCalc, ContactForm, …)
│   │   │   ├── motion/ (reveal.ts, letterSwap.ts)
│   │   │   └── styles/tokens.css, global.css
│   │   ├── public/ (logo, Lottie JSON, placeholder images or manifest)
│   │   ├── index.html, vite.config.ts, tsconfig.json, tailwind.config.ts
│   │   └── package.json
│   ├── v2-kinetic/                 (same shape; adds Remotion composition in src/remotion/)
│   └── v3-brutalist/               (same shape; adds grain.svg)
└── .worktrees/                     (gitignored; for isolated feature branches if needed)
```

## Shared data model (drives all three versions)

**`types.ts`** — the authoritative shape:

```ts
export type Money = { amount: number; currency: 'USD' | 'ARS' };
export type Listing = {
  id: string;                       // "286194"
  slug: string;                     // "casa-de-4-ambientes-..."
  operation: 'venta' | 'alquiler';
  propertyType: 'casa' | 'departamento' | 'ph' | 'terreno' | 'local' | 'oficina';
  title: string;                    // Spanish
  price: Money;
  priceARS?: Money;                 // secondary display
  expensas?: Money;
  address: { street: string; neighborhood: string; city: string; province: string; lat: number; lng: number };
  specs: { ambientes: number; dormitorios: number; baños: number; cocheras: number; antiguedad: number; orientacion: string; estado: string };
  areas: { cubierta: number; semicubierta: number; descubierta: number; total: number };
  amenities: string[];              // ~20 for listing page
  description: string;              // long-form Spanish
  gallery: { src: string; alt: string; caption?: string }[];
  agent: Agent;
  office: Office;
  videoTourUrl?: string;
  floorPlanUrl?: string;
};
```

`listing-286194.ts` is a realistic mock for Ramos Mejía (La Matanza, Buenos Aires): 4 ambientes, pool, garage, ~180 m² cubiertos / 300 m² totales, USD 285 000, realistic expenses, amenities typical of that zone (parrilla, quincho, jardín, etc.), Spanish description matching the title.

## Page section inventory (must not miss)

### Home — every version renders all 13 sections (visual expression differs):
1. Utility bar — language toggle, social icons (Facebook, Instagram, LinkedIn, X/Twitter)
2. Primary nav — logo + **Encuentra una propiedad / Confíanos tu propiedad / Únete a C21 / Contáctanos** with dropdowns (Casas en Venta, Deptos en Venta, Alquileres, Inmuebles en el Extranjero; Directorio de Oficinas, Promover, Licencias, Acerca de C21, 21 Online)
3. Hero — brand promise "**Dando el 121% · Desafiando la mediocridad**" + primary CTA (search) + secondary CTA (Únete al equipo)
4. Search widget — Operación, Tipo de propiedad, Ubicación (provincia + barrio), Ambientes, Rango de precio (USD)
5. Featured properties — 9 cards
6. Vendor promo — "Confíanos tu propiedad" with illustrated CTA
7. Brand story — "Dando el 121%" editorial block with stats (oficinas, propiedades, años en Argentina — mock counts)
8. Office locator — Argentina map, provinces highlighted, "Ver directorio" CTA
9. Franchise CTA — "Adquiere una licencia Century 21" with benefits list
10. Testimonials — 3 quotes (2 clients + 1 broker/licensee)
11. Blog teaser — 3 insight cards (Informe del mercado 2026, Guía de escrituración, Barrios emergentes del AMBA)
12. Newsletter — static signup with success state
13. Footer — 5 columns per source (Nosotros, Explora, Contacto [(011) 3070 5043], Regiones [28 provincias/regiones — see "Brand truth"], Internacional [11 países LATAM + Comercial]), **verbatim legal disclaimer** (see "Brand truth" for exact Spanish), social row (Instagram, Facebook, LinkedIn, X — no YouTube, no fabrication)

### Listing (Ramos Mejía 286194) — every version renders all 15 sections:
1. Breadcrumb — Inicio › Casas en Venta › Buenos Aires › Ramos Mejía › 286194
2. Title + reference code
3. Photo gallery — hero + thumbnail strip, full-screen lightbox modal, keyboard nav
4. Price block — USD primary, ARS secondary, expensas
5. Quick-facts bar — m² cubiertos, m² totales, ambientes, dormitorios, baños, cocheras, antigüedad, orientación
6. Long description (Spanish)
7. Amenities grid (~20 items with icons)
8. Neighborhood profile — Ramos Mejía context (transport, schools, commerce)
9. Static map — SVG/static image, no live Google embed
10. Agent + office card — names, phone, email, WhatsApp deep-link
11. Contact form — name, email, phone, message, privacy checkbox → client-side success state
12. Mortgage calculator — loan amount, down payment %, term years, rate % → monthly payment (pure client-side)
13. Similar properties — 3 cards
14. Share / save / print — clipboard copy, localStorage favorite toggle, `window.print()`
15. Footer (same as home)

## Responsive / mobile-first strategy

All three versions are **designed at 360 px first**, then enhanced at `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`. "Mobile great" is a primary deliverable, not a fallback. Tailwind's default breakpoint scale; fluid type via `clamp()` for display headings; `container-type: inline-size` container queries where a component's breakpoints diverge from the page's.

Global rules enforced by verification:
- **No horizontal scroll at any viewport** (`document.documentElement.scrollWidth === window.innerWidth`), except for intentionally horizontal-scrolling strips (marquee, gallery), which must use `overflow-x: auto; overscroll-behavior-x: contain` on an isolated track so the page itself never scrolls horizontally.
- **Tap targets ≥ 44×44 px** on any interactive element below 1024 px.
- **One primary action per viewport on mobile** (e.g., "Buscar" on the search widget pinned to a sticky CTA).
- **Mobile nav** is a full-screen menu sheet on every version (no cramped dropdowns). Hamburger → sheet with the dropdown sections inlined.
- **Photo-heavy hero sections** serve an aspect-ratio-appropriate crop via `<picture>` + `srcset` (portrait 4:5 on mobile, landscape 16:9 on desktop).
- **Type scaling** uses `clamp(min, preferred-vw, max)` — never fixed px for display type.
- **Form fields** stack single-column on mobile with `inputmode` and `autocomplete` set.
- **Gallery lightbox** on mobile uses swipe (pointer events) with snap + pinch-to-zoom where supported.

Per-version mobile specifics:
- **V1 Editorial Pampas** — hero becomes a full-viewport photo with title/dek pinned to the bottom third (magazine cover feel); 60/40 listing split stacks to photo-first then story; search widget becomes a sticky bottom drawer that expands to a bottom-sheet on tap.
- **V2 Kinetic Marquee** — Remotion hero composition ships a 1080×1920 portrait render for < 768 px and a 1920×1080 landscape render above; cursor-follow parallax is disabled on touch and replaced with a subtle scroll-linked tilt; listing metadata pins top-of-gallery on mobile instead of bottom-right.
- **V3 Raw Grid** — 6-col grid → 2-col at sm → 1-col at 360 px with display type getting larger as columns collapse (the design philosophy is: cramped screen = bolder type); spec table stays as `<dl>` key/value pairs on mobile, never collapses to a single stack; section-counter label moves from side-rail to a sticky top-right tab.

## Motion strategy (applies everywhere)

Guardrails: every motion ≤ 500 ms, springs preferred, `prefers-reduced-motion` respected globally (via Tailwind `motion-reduce:` utilities and a Motion `MotionConfig reducedMotion="user"` at the root). One signature motion per section max — no stacking. All three versions must pass Lighthouse performance ≥ 90 on the listing page.

- **Lottie** — one per version, hand-picked to align with the aesthetic (v1: logo draw-in, v2: compass marker, v3: price counter flip).
- **Remotion** — v2 only, an 8-second looping hero composition (architectural b-roll montage + address-in-motion type). Shipped as a pre-rendered MP4 fallback for browsers that can't run `@remotion/player`; the Player is used only when `prefers-reduced-motion` is off.
- **Motion (Framer)** — card staggers, gallery transitions, nav reveals.

## Media strategy

Every image slot has two layers of fallback so the project runs out-of-the-box.

### Phase 1 — Unsplash placeholders (default, ships with the build)
A shared `unsplashUrl(id, width)` helper composes URLs with Unsplash's `images.unsplash.com/photo-<id>?auto=format&fit=crop&w=<width>&q=80&fm=webp` params. Every image slot in data is `{ unsplashId, alt, focalPoint }`. Components emit responsive `<picture>` with `srcset` at 360/768/1280/1920/2400 widths and `sizes` tuned per layout. The LCP image on each page gets `fetchpriority="high"` + preload; below-the-fold images use `loading="lazy" decoding="async"`. A 20×20 base64 blur generated once per unsplashId (committed) is the `background-image` behind each `<img>` for zero-CLS paint.

### Phase 2 — Local generated assets (when user runs nanobanana / Seedance)
When real assets land, the plan is to swap the data entries to local paths and add `vite-imagetools` for build-time AVIF + WebP derivatives at the same widths. Srcset URLs become virtual imports (`?w=360;768;1280;1920;2400&format=avif;webp;jpg&as=picture`). No component code changes.

### `media-todo.md`
For each image and video slot: the file path, intended dimensions, aesthetic direction, and a nanobanana (stills) or Seedance 2.0 (video) prompt the user can run later to replace the placeholder. Includes the V2 hero video as the single video entry (authored in `tools/remotion/`, rendered to MP4 H.264 + WebM VP9 variants and committed to `packages/v2-kinetic/public/`).

Example entries:
```
packages/shared/public/listings/286194/hero.jpg  (2400×1600, AVIF+WebP+JPG)
  Direction: editorial / architectural
  LCP on listing page — treat as hero
  Nanobanana prompt: "warm late-afternoon exterior of a two-story suburban
  house in Ramos Mejía Buenos Aires with a kidney-shaped pool, parrilla,
  light brick façade, eucalyptus trees, shot on Mamiya 7, gentle film grain,
  no people"
```

## Showcase explainer (`showcase.html`)

Standalone HTML at repo root with a hand-written `showcase.css` (no Tailwind CDN — avoids the runtime-warning banner and a network dep). Renders:
- Project title + one-paragraph overview
- Three large cards, one per version, each with: thumbnail (a screenshot committed to `public/thumbs/`), concept line, type specimen, palette swatches, signature motion note, and two buttons ("Open home" / "Open listing") linking to the dev port or built path.
- Rationale section for each: why this direction, which awarded sites inspired it, what's specifically Argentine about the choice.
- Decisions log (tech stack, shared data, accessibility, motion guardrails).
- Gaps / follow-ups (which sections were reconstructed vs. sourced, media-TODO reference).

Two modes:
- **Dev mode** — links point to `http://localhost:5173 / 5174 / 5175` (ports differ per version via Vite config).
- **Build mode** — `pnpm build:showcase` copies each package's `dist/` into `dist-showcase/v1 | v2 | v3` and rewrites links to `./v1/index.html` etc. Single command serves the whole thing with `pnpm preview:showcase`.

## Accessibility (non-negotiable, all versions)

- Semantic landmarks (`header`, `nav`, `main`, `aside`, `footer`), skip-link, heading order, visible focus rings, keyboard nav (esp. gallery lightbox), `aria-label` on icon-only buttons, `aria-live="polite"` on form success states, `prefers-reduced-motion` honored, color-contrast AA minimum (palettes audited above clear that bar), Spanish `lang="es-AR"`.

## Verification harness (built-in, automated, one-shot gate)

Because we're delivering all three versions in a single pass, verification is a first-class workspace package — not a checklist to run by hand. It lives at `packages/verify/` and is the gate before declaring done.

### Stack
- **Playwright** (Chromium + Mobile Safari emulation) for cross-viewport DOM + visual checks.
- **@axe-core/playwright** for WCAG 2.2 AA violations.
- **lighthouse** CLI (via `playwright-lighthouse`) for performance/a11y/best-practices/SEO per page per form-factor.
- **Zod** to validate the mock data at build-time (catches bad shapes before they hit the UI).

### The 6 matrix viewports
`360×780` (small phone), `414×896` (large phone), `768×1024` (tablet portrait), `1024×768` (tablet landscape), `1440×900` (laptop), `1920×1080` (desktop). Two pages × three versions × six viewports = **36 coverage cells**.

### Section-presence assertions (the anti-"missing-section" gate)
Every section in each page carries a stable `data-section="<key>"` attribute. The verification script has a manifest:

```ts
const HOME_SECTIONS = ['utility-bar','nav','hero','search','featured','vendor-cta',
  'brand-story','office-locator','franchise-cta','testimonials','blog','newsletter','footer'];
const LISTING_SECTIONS = ['breadcrumb','title','gallery','price','quick-facts','description',
  'amenities','neighborhood','map','agent-card','contact-form','mortgage-calc',
  'similar','share-actions','footer'];
```

Per version per page: the script asserts every key is present in the rendered DOM at every viewport. A missing section fails the gate with a named error (e.g., `v2-kinetic /propiedad/286194 @ 360×780 — missing data-section="mortgage-calc"`). This directly prevents the "nothing is missing" requirement from slipping.

### Layout correctness gates
At every viewport for every page of every version:
- `document.documentElement.scrollWidth <= window.innerWidth` — **zero horizontal page scroll**.
- Every interactive element (`a, button, [role=button], input, select, textarea`) below 1024 px has bounding box ≥ 44×44 px.
- No element overflows its parent by > 2 px (detected via `getBoundingClientRect` vs. parent).
- No text is < 14 px computed on mobile or < 12 px mono below 360 px.
- No overlapping interactive elements (z-index + intersection check).

### Accessibility gates
- `axe-core` tag set: `wcag2a`, `wcag2aa`, `wcag22aa`, `best-practice`.
- Zero violations of severity `serious` or `critical`. `moderate` budget: ≤ 2 per page, logged.
- Heading order checked (`h1` exactly once per page, no `h3` without preceding `h2`, etc.).
- Keyboard-only walkthrough: tab order reaches every interactive element and skip-link works.
- `prefers-reduced-motion: reduce` emulation — script asserts marquees stop, Remotion Player swaps to poster, all Motion `animate` props are skipped.
- Contrast audit against each version's palette (already AA-audited in the direction specs).

### Performance gates (Lighthouse, per page × per version × mobile+desktop)
- Performance ≥ **90 mobile**, ≥ **95 desktop** for V1 and V3.
- Performance ≥ **85 mobile**, ≥ **95 desktop** for V2 (the 5-point allowance accounts for the MP4 hero video; mitigated by `preload="metadata"`, lazy-mount below fold, poster served synchronously, and an in-viewport `IntersectionObserver` guard).
- Accessibility ≥ **100** everywhere.
- Best Practices ≥ **95**.
- SEO ≥ **95**.
- CLS < 0.05, LCP < 2.5 s on Moto G Power profile. LCP target is the hero photo (V1, V3) or the poster JPG (V2 — poster paints before the video decodes).

### Visual regression
Playwright screenshots at every cell. First run generates baselines committed under `packages/verify/snapshots/`; subsequent runs diff. Threshold: `maxDiffPixelRatio: 0.01`. This catches layout drift during the one-shot build across versions.

### Interaction smoke tests
Per version:
- Gallery lightbox: open on thumb click, close on Esc, arrow-nav between photos, swipe on mobile.
- Mortgage calc: fixed inputs (USD 285 000 price, 30 % down, 20 yr, 8 %) produce **USD 1 668.69 / month** (asserted ±0.01 from a shared `mortgage.ts` util that all three versions and the verify test import).
- Contact form: empty submit blocked, valid submit shows success state, privacy checkbox required, email validation works.
- Favorite toggle: click persists across reload via localStorage.
- Mobile nav: hamburger opens sheet, Esc closes, backdrop click closes, body scroll locked while open.
- Search widget: all selects populate from shared data, URL reflects state on submit.
- Marquee (v2): pauses on `prefers-reduced-motion`.
- Number counters (v3): settle to the correct final value, not an off-by-rounding value.

### Scripts (root `package.json`)
```
pnpm verify               — full gate: runs build, then sections + layout + a11y + visual + lighthouse + smoke
pnpm verify:fast          — sections + layout + smoke only (dev-loop, < 60 s)
pnpm verify:visual        — visual regression alone (with --update-snapshots flag to refresh baselines)
pnpm verify:lighthouse    — perf only
pnpm verify:report        — generates packages/verify/report/index.html with all findings linked
```

`pnpm verify` is the one-shot pass/fail. If it fails, the plan is not done.

### Per-page/version manual checks that complement the harness
- `showcase.html` renders on file:// and built paths; all six links resolve; rationale matches plan.
- `media-todo.md` enumerates every image/video slot with a concrete nanobanana / Seedance prompt.
- Spanish copy reviewed for `es-AR` correctness (voseo not required — the source uses tuteo — but regional vocabulary like "cochera", "ambientes", "expensas" is used correctly).

## Critical files to create (execution reference)

- `package.json` (root) — workspaces, scripts: `dev`, `build`, `preview:showcase`, `build:showcase`, `verify`, `verify:fast`, `verify:visual`, `verify:lighthouse`, `verify:report`
- `pnpm-workspace.yaml`
- `.gitignore`
- `showcase.html`, `showcase.css`
- `media-todo.md`
- `packages/shared/src/types.ts` + `brand.ts` + `data/*.ts` (6 files) + `shared/src/math/mortgage.ts` (used by all three versions + tested by verify)
- `packages/v{1,2,3}-*/` — each a Vite React TS app with `routes/Home.tsx`, `routes/Listing.tsx`, component tree, tokens, motion utilities
- Per-version `vite.config.ts` with unique `server.port` (5173 / 5174 / 5175)
- `tools/remotion/HeroLoop.tsx` + `tools/remotion/render.mjs` (author-time only — **not a runtime dep**; run `pnpm render:hero` once, committed outputs go to `packages/v2-kinetic/public/hero-portrait.{mp4,webm}` + `hero-landscape.{mp4,webm}` + `hero-poster.jpg`)
- `packages/verify/` — `playwright.config.ts`, `tests/sections.spec.ts`, `tests/layout.spec.ts`, `tests/a11y.spec.ts`, `tests/smoke.spec.ts`, `tests/visual.spec.ts`, `lighthouse/runner.ts`, `manifest.ts` (the section keys), `report/` (generated)

## Execution order (one-shot, parallelised across versions)

1. **Foundation** *(main Claude, serial)* — initial commit of current `package.json`, `.gitignore`, pnpm workspaces root, `shared` package with Zod-validated mock data + **`brand.ts`** (the verified real-brand constants from the "Brand truth" section — `BRAND`, `tenureYearsInArgentina()`, provinces array, international countries array, socials, legal footer copy), **logo fetch** (pull the 3 SVGs listed in "Brand truth" → commit to `packages/shared/public/brand/`; any 404 is documented in `media-todo.md` with a fallback note), `verify` package scaffolding (Playwright config, section manifest, axe runner, Lighthouse runner), empty per-version Vite+React+TS scaffolds with `data-section` markers stubbed on `routes/Home.tsx` and `routes/Listing.tsx`. Establishes the contract that build subagents will fill in.
2. **Design tokens per version** *(main Claude, serial)* — Tailwind v4 theme extensions + `tokens.css` emitted into each `packages/v{n}-*/src/styles/` straight from the specs above (type scales, color tokens, spacing). One file per version. Verified in isolation with a simple `pnpm --filter v{n} dev` smoke.
3. **Parallel build** *(three subagents, dispatched simultaneously — see next section)* — each subagent fills in their version's components, routes, motion, copy, imagery. Main Claude waits for all three to return, then commits each subagent's work as a separate commit.
4. **Integration + verify** *(main Claude, serial)* — runs `pnpm verify` (full gate). Catches section-presence gaps, layout issues, a11y violations, Lighthouse regressions, visual baselines. Fixes happen in main Claude's session to avoid subagent context lag. Re-runs until green.
5. **Hero video render** *(main Claude, one-off)* — `pnpm render:hero` via `tools/remotion/` — generates `hero-9x16.mp4/webm`, `hero-16x9.mp4/webm`, `hero-poster.jpg`. Committed to `packages/v2-kinetic/public/hero/`.
6. **Showcase + docs** *(main Claude, serial)* — `showcase.html` with thumbnails captured from Playwright snapshots, `media-todo.md` auto-generated from the verify script's slot report, README with dev + build + verify instructions.

Commits: one per numbered step on `feature/century21-rebuild`, rebased tidy before PR. Step 3 produces three commits (one per version). The verify step is a commit if the harness catches issues and fixes are needed; otherwise folded into the most-related commit.

## Execution with parallel build subagents (step 3 expanded)

### Why parallel is safe here
- Strict directory partitioning: each subagent writes only inside `packages/v{n}-*/` — zero file-level conflicts between them.
- Shared code is read-only from the build subagents' perspective: `packages/shared/` is frozen after step 1, typed entry points only.
- No shared runtime state — each version is an independent Vite app.
- Motion + design tokens are version-scoped (their own Tailwind config, their own `tokens.css`).

### Dispatch pattern
Main Claude sends **one message with three Agent tool calls** (run concurrently) using `subagent_type: general-purpose` (needs Write/Edit, which Explore and Plan agents lack). Each subagent receives a self-contained brief containing:
- The **full refined design spec** for their version (copied verbatim from the per-version appendix above — no session context inheritance).
- The **shared/ public API** — TypeScript types + data module names they may import (`@c21/shared/types`, `@c21/shared/data/listing-286194`, etc.) — listed explicitly so they don't reinvent types.
- The **section-manifest contract** — the exact `data-section` keys their routes must render (13 home, 15 listing) with the order. Verification uses these keys, so missing one = a failed gate and a re-dispatch.
- **Constraints**: mobile-first at 360 px, desktop excellent at 1440 px, Spanish es-AR, no paid fonts, no backend, Unsplash placeholders, reduced-motion honoured, lucide-react for icons.
- **File-write boundary**: write only inside `packages/v{n}-*/`. Do not touch `packages/shared/` or other versions. Do not run `git commit` — main Claude commits.
- **Expected output**: summary of files created/modified, any decisions that diverged from the spec (with rationale), any open questions that require main Claude's judgement before the verify pass.
- **Verification hooks they must satisfy** before declaring done: `pnpm --filter v{n} build` succeeds without errors; `pnpm --filter v{n} typecheck` clean; the version's routes render at 360 px and 1440 px (each subagent runs a Playwright smoke against their own dev server).

### The three briefs
Each subagent's prompt resembles:
```
You are building Version <N> of the Century 21 rebuild.
You own packages/v<n>-*/ ONLY. Do not modify other directories.

Design spec: [paste full V<n> appendix from the plan file]
Shared API: [paste types + data entry points]
Sections contract: [13 home keys + 15 listing keys with required order]
Constraints: [mobile-first, a11y, motion, fonts, icons, reduced-motion]
Output: [summary of files + decisions + open questions]
Verification you must satisfy: [build, typecheck, 360 + 1440 smoke]
```

Briefs are long on spec, short on rules. Each subagent has full authority inside their directory to make implementation choices consistent with their spec.

### Post-dispatch integration by main Claude
When all three return:
1. Read each subagent's summary; sanity-check divergences against the spec. If a divergence breaks the section manifest or the motion contract, roll back the specific file and re-dispatch a focused follow-up task rather than a full rebuild.
2. Commit each version's directory as its own commit: `feat(v1-editorial): build Editorial Pampas home + listing`, same for v2, v3.
3. Run `pnpm verify`. If gates fail and the fix is localised (e.g., missing `data-section` key, wrong focus color, axe violation), main Claude fixes in-session — not via another subagent round — to minimise context cost.
4. Any cross-version work (shared component missed in step 1, stat reconciliation, visual baselines) is main Claude's job.

### Fallback if a subagent goes off-spec
- Cap subagent scope at ~60 minutes of work. If the summary shows they wandered (rewriting shared/, adding third-party deps not in the plan, ignoring the section manifest), main Claude reverts the subagent's writes (`git checkout -- packages/v{n}-*/`) and re-dispatches with tighter constraints.
- Divergences that main Claude accepts get documented in the relevant commit body so reviewers understand why the shipped version departs from the spec.

### What main Claude keeps on its own plate (never delegates)
- Initial commit and branch creation.
- `packages/shared/` authorship — the single source of truth for data and types.
- Verify harness — complex, cross-cutting, easier in main session.
- Remotion offline render — single one-off command.
- Showcase HTML + README + media-todo.md — require holistic judgement across all three versions.
- Final `pnpm verify` triage and fixes.

## Scope tiers (cut-points if time pressure hits)

Ranked so we can descope from the bottom without breaking the deliverable:

**Core — must ship** (the build isn't complete without these):
- All 13 home + 15 listing sections rendered, with `data-section` keys, on all three versions.
- Mobile-first layouts verified at 360/414/768/1024/1440/1920.
- Spanish es-AR copy, semantic HTML, AA contrast, keyboard nav, skip link, focus rings.
- Section-presence + layout + a11y + smoke gates in `pnpm verify` — green.
- Unsplash placeholder imagery with `<picture>`/srcset + LQIP + `fetchpriority`.
- Gallery lightbox, mortgage calc (with the frozen expected value), contact form success state, favorite toggle, mobile nav sheet, search widget.
- `showcase.html` with rationale for each direction, `media-todo.md`, README.

**Enhanced — strong default** (land unless we hit a blocker):
- Lottie moment per version (1 each).
- Signature motion per version (editorial reveal, marquee + spring stagger, number counters + grid reflow).
- Visual regression baselines committed + gated on run #2.
- Lighthouse gates green per tier above.
- Neighborhood profile rich on listing (not a stub).
- Argentine map SVG with province interactivity on V1 / V2, typographic on V3.

**Stretch — land if time permits, drop first if time short**:
- Remotion-authored hero MP4 (fallback: licence-clean stock b-roll edited with ffmpeg filters and committed). Both paths produce the same runtime asset, so runtime experience is identical.
- Print stylesheet for listing page (single-page layout, no nav, no motion).
- `Content-Security-Policy` meta tag, Open Graph image per listing, `robots` + `sitemap.xml` (nice-to-have for static SEO pass).
- Neighborhood transport/schools/commerce data sourced from real public datasets instead of plausible mock.

## Per-version refined specs

Each section below is the output of a dedicated design subagent that owned one version end-to-end. The specs are locked inputs for the build subagents in the next phase. Where numbers conflict across versions (e.g., company stats), see the **Shared-data reconciliation** section below.

### V1 — Editorial Pampas: detailed spec

**Type scale** (Fraunces variable + Satoshi + JetBrains Mono; Fraunces axes `opsz` 9–144, `SOFT` 0–100, `WONK` 0/1 — WONK only ≥h2)

| Token | clamp() | Weight / LH / tracking | Fraunces axes |
|---|---|---|---|
| h1 | `clamp(2.5rem, 2rem + 4.2vw, 5.25rem)` | 340 / 0.92 / -0.02em | opsz 144, SOFT 30, WONK 1 |
| h2 | `clamp(2rem, 1.6rem + 2.8vw, 3.5rem)` | 360 / 0.98 / -0.015em | opsz 72, SOFT 20, WONK 1 |
| h3 | `clamp(1.5rem, 1.3rem + 1.2vw, 2.25rem)` | 420 / 1.08 / -0.01em | opsz 36, SOFT 10, WONK 0 |
| h4 | `clamp(1.25rem, 1.15rem + 0.6vw, 1.625rem)` | 480 / 1.2 / 0 | opsz 24, SOFT 0, WONK 0 |
| h5 / eyebrow | `0.8125rem` | Satoshi 500 / 1.3 / 0.14em UPPER | — |
| label | `0.75rem` | Satoshi 600 / 1.3 / 0.08em UPPER | — |
| body-lg (lede) | `clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)` | Satoshi 400 / 1.55 / -0.005em | — |
| body | `1rem` | Satoshi 400 / 1.65 / 0 | — |
| body-sm | `0.875rem` | Satoshi 400 / 1.55 / 0 | — |
| mono | `0.8125rem` | JetBrains Mono 500 / 1.4 / 0.02em, tabular-nums | — |

**Color tokens** — `--bg: #FAF7F2`, `--surface: #F3EEE5`, `--ink: #1A1714`, `--ink-mute: #5E574F`, `--accent: #9E7B4D` (bronze — design accent for display text + prices on cream; 3.6:1 on paper, restricted to ≥18.66 px bold / ≥24 px regular), `--accent-deep: #3D4A3A` (olive — CTAs, links, map pins, focus), `--brand-gold: #BEAF88` (Century 21 Relentless Gold — **logo lockup only**, rendered on ink or olive backgrounds since gold/cream is 2.07:1 and fails AA), `--divider: #E3DCCF`, `--focus: olive 2 px + 2 px paper halo`. Accent budget ≤ 15 % of any viewport (bronze + olive combined; the brand gold does not count since it's confined to the logo lockup). **Inline links use olive**, not bronze. Brand gold never appears as typography color on cream — gold appears only when the wordmark renders on a dark surface.

**Spacing + grid**
- Scale (rem): `0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 / 12 / 16`. Between-section rhythm only 1.5 / 3 / 6 / 12.
- 360: 4-col, 16 px gutter, 20 px margin · 640: 6-col · 768: 8-col · 1024: 12-col, 60/40 split activates · 1280+: 96–128 px margins with 64–96 px marginalia gutter reserved; 1920: content caps 1440 + 240 px marginalia.

**Home sections (13, mobile → desktop ≥1280)**
1. **utility-bar** — kebab-collapsed / thin 28 px band, pipe-separated, caret letter-swap — motion: `nav-caret`.
2. **nav** — hamburger sheet / horizontal, sticky translucent at 64 px — motion: `nav-caret`, `nav-condense`.
3. **hero** — full-bleed image + stacked H1 / 7-col image (5 px paper passepartout) + 5-col text with Fraunces italic folio "01", asymmetric 120 px top offset — motion: `crop-reveal`, `monogram-draw` once.
4. **search** — single input + bottom-sheet filters / four-field inline bar separated by 1 px olive hairlines — motion: `field-underline`.
5. **featured** — horizontal snap 85vw cards / 3-up editorial grid with middle card offset 48 px low, Fraunces italic captions + mono price — motion: `crop-reveal` 80 ms stagger.
6. **vendor-cta** — stacked headline + olive button / 50/50 with Fraunces italic drop-cap — motion: `caret-swap`.
7. **brand-story** — single column stacked stats / two-column long-form, running italic marginalia in 64 px gutter, stats as horizontal rule with mono figures — motion: `number-count-up` once.
8. **office-locator** — sucursal list + search / 5-col list + 7-col static map, olive pins, 1 px bronze connector across gutter on select — motion: `pin-pulse` on select.
9. **franchise-cta** — quiet panel / inset 10/12 cols, vertical spine label "OPORTUNIDAD 2026" rotated -90° — motion: `spine-fade`.
10. **testimonials** — one-per-screen swipe / 3-up with 8rem Fraunces open-quote in bronze — motion: `crop-reveal` on portrait.
11. **blog** — stacked cards / first post full-bleed 2-col, three as side-by-side index with mono dateline — motion: `underline-grow`.
12. **newsletter** — centered compact / shifted right 5 cols, left 5 cols hold italic editorial sentence, olive hairline separator — motion: `field-underline`.
13. **footer** — accordion / 4-col sitemap + Fraunces italic folio "Century 21 Argentina — Edición 2026" — motion: none.

**Listing sections (15)** — 60/40 split activates ≥1024; mobile stack order shown in parentheses.
1. breadcrumb (1) — mono truncate / top marginalia gutter, vertical stack.
2. title (2) — H2 two lines / spans left 60 cols, WONK on — motion: `crop-reveal` text mask.
3. gallery (3) — edge swipe with mono counter / full-bleed left + 3 vertical thumbs in right marginalia — motion: `lightbox-open`.
4. price (4) — mono USD + ARS stack / right column top with bronze hairline above.
5. quick-facts (5) — 2×2 mono grid / vertical list, small-caps Satoshi labels, mono right-aligned values.
6. description (6) — drop-cap first letter / right column with Fraunces italic drop-cap 3 lines — motion: `crop-reveal`.
7. amenities (7) — 2-col checks / 3-col grid with olive check icon.
8. neighborhood (8) — body + inline stats / right column with italic marginalia notes in gutter.
9. map (9) — 16:10 static tile / expands into left column replacing hero on scroll-pin — motion: `map-swap`.
10. agent-card (10) — portrait + name + phone / sticky in right column from description onward — motion: `sticky-settle`.
11. contact-form (11) — stacked inputs / right column, hairline-underline inputs, olive submit — motion: `field-underline`.
12. mortgage-calc (12) — sliders + mono readout / right column with olive progress bar — motion: `number-tween` 150 ms.
13. similar (13) — horizontal snap / 3-up captions italic — motion: `crop-reveal`.
14. share-actions (14) — fixed bottom bar / vertical rail in left marginalia with tooltip — motion: `caret-swap`.
15. footer (15).

**Motion choreography (8)**

| Name | Trigger | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|---|
| crop-reveal | IO 15 % | clip-path inset 8 → 0 | 400 ms | cubic-bezier(.2,.7,.2,1) | opacity fade |
| nav-caret | hover | content swap ::after | 180 ms | linear | disabled |
| monogram-draw | load once | stroke-dashoffset | 900 ms | ease-out | static SVG |
| field-underline | focus | scaleX 0→1 border-b | 220 ms | spring(260, 26) | instant |
| number-count-up | in-view once | innerText tween | 500 ms | ease-out | final value only |
| sticky-settle | scroll pin | translateY -4→0 + shadow | 300 ms | spring(200, 24) | disabled |
| lightbox-open | click | scale .96→1 + backdrop 0→1 | 260 ms | spring(220, 28) | opacity only |
| map-swap | scroll ≥ desc | crossfade + 4 px blur → 0 | 400 ms | ease-in-out | crossfade only |

**Copy (es-AR, restrained-editorial, no exclamations, no superlatives)**
- Hero H1: *"Una casa es un lugar donde el país se vuelve propio."*
- Dek: *"Propiedades seleccionadas en Argentina, acompañadas por asesores de Century 21 desde 2002."*
- CTA: *"Ver propiedades"* (bronze arrow)
- Testimonials: (1) *"Buscábamos en Ramos Mejía hacía dos años. Laura no nos apuró nunca. Firmamos en marzo."* — Inés y Pablo, Ramos Mejía. (2) *"Mostrar una casa es leer una familia. Recién después se habla de metros."* — Martín Salaberry, asesor, Palermo. (3) *"Entregamos las llaves de la casa de mis viejos con respeto. Eso lo valoré más que el precio."* — Carolina D., Belgrano.
- Blog titles: *"Cómo leer una escritura antes de firmarla"* · *"Ramos Mejía, el oeste que volvió a mirarse"* · *"Tasar sin apuro: una guía breve para propietarios"*.
- Stats: Oficinas 98 · Asesores 1 240 · Operaciones 2025: 6 812 · Años 23.
- Newsletter H: *"Una carta mensual, nada más."* Privacy: *"Tus datos quedan con nosotros. Baja en un clic, siempre."*

**Inspiration refs (verifiable, borrowing, not copying)**
1. NYT "Snow Fall" — scroll-synced crop-reveals; ours is single-threshold CSS-only, architectural photography, not reportage parallax.
2. Cereal Magazine — quiet-luxury restraint, small-caps eyebrows over serif H2s; we run warm cream + one olive accent vs. Cereal's cool grey.
3. Aesop — hairline-only form inputs, single-accent discipline; we push a variable serif display face, not a neutral sans.
4. Kinfolk / MANA — 60/40 splits, italic marginalia; we push interactive marginalia (sticky agent card, share rail) into the gutter.
5. Pentagram case studies — oversize folio numerals and vertical spine labels; we use them as editorial ornament, never sole wayfinding.

**Accessibility contracts**
- Focus ring: olive 2 px + 2 px paper halo, `outline-offset: 3px`. Never bronze.
- Hit targets: 44×44 CSS px, padding-enforced even where text is small.
- Fraunces legibility: WONK only ≥h2; SOFT capped at 30.
- Contrast: ink/paper 15.9:1 AAA; ink-mute/paper 6.8:1 AA; bronze/paper 3.6:1 **fails body**, restricted to ≥18.66 px bold / ≥24 px regular; olive/paper 8.9:1 AAA.

**Desktop-only flourishes (≥1280)**
1. Running marginalia gutter (64–96 px) holding Fraunces italic notes, breadcrumbs, share rail.
2. Oversize folio numerals per home section (01 — Búsqueda, …) in Fraunces 8rem italic at 12 % opacity.
3. Vertical spine label on franchise-CTA, rotated -90°, small-caps Satoshi.
4. 3-line Fraunces italic drop-cap in bronze on neighborhood story.
5. Asymmetric hero offset: text column starts 120 px lower than image column; flush below 1280.

**Risks + mitigations (V1-specific)**
- WONK at small sizes unreadable → gated to ≥h2 via CSS custom-property check.
- Bronze links fail AA body → inline links olive; bronze display-only.
- Accent budget drift → design QA checklist names every allowed bronze surface.
- "Stock-y" imagery → Unsplash picks biased to architectural interiors with strong horizontals (Bofill, Ruiz Diaz aesthetic).
- Crop-reveal stutter on slow devices → clip-path is GPU-friendly; fallback via `prefers-reduced-motion` AND `matchMedia("(update: slow)")`.
- Editorial voice drift → style rule: no `!`, no superlatives, CTA = verb + noun.
- Marginalia gutter collapse 1024–1279 → reflows into inline italic asides with left bronze hairline.
- Lottie blocks LCP → load after hero image `onload`; static SVG is the LCP element.

---

### V2 — Kinetic Marquee: detailed spec

**Type scale** (Switzer variable wght 100–900 + Geist Mono)

| Token | clamp() | Weight | LH | Tracking |
|---|---|---|---|---|
| h1 (hero) | `clamp(3.25rem, 2rem + 6.2vw, 8.5rem)` | **200 → 800 scroll-morph** | 0.92 | -0.04em |
| h2 | `clamp(2.25rem, 1.5rem + 3.4vw, 4.75rem)` | 600 | 0.98 | -0.03em |
| h3 | `clamp(1.625rem, 1.25rem + 1.6vw, 2.75rem)` | 600 | 1.05 | -0.02em |
| h4 | `clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)` | 500 | 1.15 | -0.01em |
| h5 | `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)` | 600 | 1.2 | 0 |
| label | `0.75rem` | 600 UPPER | 1 | +0.08em |
| body | `clamp(0.95rem, 0.9rem + 0.2vw, 1.0625rem)` | 400 | 1.55 | 0 |
| mono (Geist) | `clamp(0.875rem, 0.8rem + 0.4vw, 1.25rem)` | 500 tabular | 1.1 | -0.01em |

**Hero weight-shift:** H1 starts at wght 200; scroll progress 0→0.35 interpolates to 800 via rAF-linked `font-variation-settings`. Desktop ≥1280 additionally tracks scroll-velocity — fast scroll overshoots to 860 with 180 ms spring settle.

**Color tokens** — `--ink: #0E0E0E`, `--bg: #F6F4EF`, `--surface: #EEEBE3`, `--ink-mute: #5A5A58`, `--accent-warm: #E64A19` (orange), `--accent-cool: #2B6CB0` (blue), `--divider: #D7D3C8`, `--focus: #2B6CB0`. **Single-accent rule:** any viewport frame shows *either* warm *or* cool, never both. Sections carry a `zone: 'warm'|'cool'|'neutral'` flag; warm and cool never composed adjacent in a single viewport.

**Spacing + grid** — rem scale `0 / 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8 / 12 / 16`. 12-col fluid. Margins/gutters: 360 16/12 · 640 24/16 · 768 32/20 · 1024 48/24 · 1280 64/28 · 1440 96/32 cap 1312 · 1920 auto/32 cap 1536. Marquee breaks out via `grid-column: 1 / -1; margin-inline: calc(50% - 50vw); contain: paint; overflow-x: clip`.

**Home sections (13, mobile → desktop ≥1280)**
1. **utility-bar** — phone + locale / 3-zone including franchise login with dial hover-reveal — none.
2. **nav** — hamburger + logo-left sticky / mega-panel hover over "Propiedades" revealing type × province matrix; logo re-weights 500→700 on sticky — `sticky weight-morph` 150 ms.
3. **hero** — portrait 9:16 video + stacked H1 + full-width CTA / 16:9 video with cursor-parallax photo plate behind, H1 one line morphing wght by scroll-velocity — `hero-weight-shift` + 6 px cursor parallax.
4. **search** — single pill-input + type tabs / 4-field grid on floating plank, blue focus ring — `focus-lift` 200 ms.
5. **featured** — 1.2-up horizontal snap / 4-col grid with 8-card marquee row pinned above at half speed — `card-stagger` 300 ms spring.
6. **marquee (fresh listings)** — 1 row 20 px/s / 2 rows opposing directions; row 1 pauses on hover revealing 240 px preview card (agent + 3-photo strip) — infinite translate + hover-pause.
7. **vendor-cta** — stacked headline + image / 7/5 split, headline morphs wght on section-in, image with 4 px chromatic aberration on pointer-move — `wght-reveal`.
8. **brand-story** — stat block stacked / 3-col stat band with count-up on intersection, full-bleed editorial photo with tiny parallax — counter + 4 px parallax.
9. **office-locator** — province dropdown + office list / interactive Argentina SVG map; province hover reveals office count + 3 agent avatars in side panel — `map-fill-lerp` 250 ms.
10. **franchise-cta** — blue zone centered / blue zone full-bleed, large Switzer 700 tight H2, form nudges from right — slide-in 400 ms.
11. **testimonials** — 1-up slider / 3-up static with horizontal marquee of client names underneath — underline marquee.
12. **blog** — 2-col mini / 3-col with lead article 2×, dates Geist Mono tabular — image 1.02 on hover.
13. **newsletter + footer** — stacked / 2-band: newsletter blue zone, footer ink zone — input caret pulse.

**Listing sections (15)**
1. breadcrumb — truncate mid / hover underline-fill — 200 ms.
2. title — stacked H1 + address / H1 wght-reveal on intersect — `wght-reveal`.
3. gallery — edge-to-edge 1.1-up snap / full-bleed hero + metadata pinned bottom-right + 6-thumb strip auto-scrolling at 12 px/s — strip marquee.
4. price — ARS + USD stacked mono / 2-col mono with "última actualización" timestamp — digit slot-roll on load.
5. quick-facts — 2-col icon grid / single row of 6 facts, 20 px icons with stroke-draw — icon-draw on in.
6. description — full width / 8-col text + 4-col "Destacados" chip rail — chip stagger.
7. amenities — collapsible list / 3-col check grid — check 180 ms.
8. neighborhood — stat strip / 2-col text + walkability bars — bar-grow 300 ms.
9. map — static tile / interactive Leaflet, orange pin + blue 500/1000 m radius overlay; scroll-zoom disabled until click-to-activate — pin-drop spring.
10. agent-card — sticky bottom CTA sheet / right sidebar sticky; hover reveals bio peek with recent sales count — peek 260 ms.
11. contact-form — full-width inputs / sidebar-attached under agent card, mono labels — focus-lift.
12. mortgage-calc — stacked sliders / blue zone side-by-side inputs + mono payment readout with slot-roll — digit slot-roll.
13. similar — horizontal scroll / 4-col grid (no marquee here — marquee is home-only) — card stagger.
14. share-actions — bottom-sheet trigger / floating right rail: copy, WhatsApp, email, print — icon press 120 ms.
15. footer — standard 4-col sitemap.

**Hero video spec**
- Sources: `hero-9x16.mp4` (H.264 1080×1920 3.2 Mbps) + `.webm` (VP9 2.1 Mbps) < 768 px; `hero-16x9.mp4` (1920×1080 4.5 Mbps) + `.webm` ≥ 768 px; `hero-poster.jpg` (progressive, 180 KB budget) matching first frame to zero CLS.
- 8 s seamless loop (last frame = first via 12-frame crossfade authored offline).
- 5 cuts (aerial Ramos Mejía rooftops 1.2 s → wrought-iron gate push 1.6 s → brass "CENTURY 21" plaque 1.1 s → living-room sun rack 1.8 s → exterior dusk with "Av. Rivadavia" 2.3 s). Locked dolly only — no whip pans, luminance delta < 10 % between adjacent frames (WCAG 2.3.1 safe by construction).
- Mount guard: `<video preload="none" poster>` DOM-present; `IntersectionObserver(threshold 0.25)` swaps to `preload="auto"` + `.play()` when within 25 % viewport; pauses offscreen.
- Reduced-motion / Data-Saver (`navigator.connection.saveData`): video never mounts — poster JPG only with static scrim.
- Authoring offline (Remotion → frames → ffmpeg → 4 outputs). Runtime: zero Remotion.

**Marquee spec** — 1 row mobile, 2 rows desktop opposing. Item 320×200 thumb + label + Geist Mono price. Speed 24 px/s desktop / 18 px/s mobile. Gap 24 px × 32 px. Edge fades 64 px `mask-image`. Pause-on-hover ≥1024 via `animation-play-state`; focused item uses CSS `popover` API for top-layer preview. Touch: free snap scroll with 4 s resume delay. Reduced-motion: static grid, 4 items, "Ver todas" link. Focus resumes after 800 ms blur. WCAG 2.2.2 compliant.

**Motion choreography (10)**

| Trigger | Target | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|---|
| Scroll 0→35 % | hero H1 | wght axis | rAF | linear + velocity spring ≥1280 | static 600 |
| Pointer move | hero photo plate | translate ≤8 px | 300 ms | spring(120, 20) | off |
| Intersection | feature card | opacity + y 16→0 | 300 ms, 60 ms stagger | spring | opacity only |
| Loop | marquee track | translateX | ∞ | linear | stopped |
| Hover | marquee item | scale 1.02 + preview popover | 200 ms | ease-out | off |
| Click | map province | fill lerp + panel slide | 250 ms | ease-in-out | 0 ms fill |
| Intersection | stat counter | count-up | 900 ms | ease-out | jump |
| Focus | form field | border-color + y -2 px | 200 ms | spring | border only |
| Load | price digits | slot-roll | 500 ms | ease-out | instant |
| Hover | agent card | side-peek | 260 ms | spring | off |

**Copy (es-AR, declarative, numeric, cold-by-choice)**
- Hero H1 (three weight states at same glyphs): *"Encontrá donde vivir."*
- Dek: *"187 propiedades, 23 provincias, 48 años operando en Argentina."*
- CTA: *"Ver propiedades"*
- Testimonials: (1) *"Cerramos la operación en 11 días. La tasación fue exacta."* — Laura M., vendedora, Ramos Mejía. (2) *"Me mostraron seis casas en un sábado. La séptima fue la que compré."* — Diego S., comprador, Vicente López. (3) *"Mi franquicia creció 40 % el primer año con el soporte regional."* — Franco B., franquiciado, Córdoba.
- Blog: (1) *"El índice de m² en AMBA cerró marzo con una suba del 2,3 %"* (2) *"Cómo se escritura en CABA cuando el comprador vive afuera"* (3) *"Siete barrios porteños donde el alquiler bajó en 2026"*.
- Brand-story: *"48 años. 23 provincias. 187 oficinas. 1 red."*
- Newsletter: *"Precios, barrios, operaciones. Un correo por semana."* Privacy: *"No compartimos tu correo. Cancelás cuando quieras."*

**Inspiration refs**
1. Bureau Cool Brands — Swiss-grid poster + tabular mono pricing plank; ours is three flats + two accents with wght-morph display.
2. Locomotive — horizontal breakout marquee; ours is a supporting section (sixth down), not the hero.
3. Formafantasma — restrained editorial rhythm + label-cap micro-typography; ours commits to a single grotesque (Switzer) across all levels.
4. MSCHF — infinite list as navigation gesture; ours enforces single-accent rule and pauses on focus.
5. Kvell Agency — sticky agent sidebar; ours carries live contact + calculator + share in the same rail.

**Accessibility contracts**
- Focus ring: 2 px solid `#2B6CB0` with 2 px `box-shadow` offset (survives rounded corners); keyboard-only via `:focus-visible`.
- Hit targets: 44×44 minimum. Marquee cards 320×200; icon-only padded to 44.
- WCAG 2.2.2: visible "Pausar" control in marquee row; `Space` on focused item toggles; respects `prefers-reduced-motion`.
- WCAG 2.3.1: luminance delta < 10 % per 100 ms in video; zero cuts-to-white.
- Contrast: orange/ink 4.2:1 (pass UI/large); orange/bg 3.8:1 — orange-on-bg restricted to ≥24 px wght 600 text or ≥3 px icon strokes; blue/bg 5.4:1 (AA body); ink/bg 17.1:1.
- Video: `<track kind="descriptions">` with es-AR audio-description transcript (no dialogue), keyboard-reachable "Pausar video".

**Desktop-only flourishes (≥1280)**
1. Velocity-linked hero wght morph — fast scroll overshoots to 860 with 180 ms spring; position-only under 1280.
2. Map province hover panel — office count, 3 stacked avatars (-8 px overlap), mini listings sparkline.
3. Marquee hover-preview popover — 240 px with agent avatar, 3-photo strip, CTA (CSS `popover` API).
4. Agent side-peek — hover on sticky agent card slides a 280 px bio panel with "28 operaciones cerradas" + recent-sale thumbs.
5. Pointer-driven chromatic aberration on poster fallback — max 3 px R/B offset tied to pointer distance from center.

**Risks + mitigations**
- CLS from video mount → reserve aspect via CSS `aspect-ratio` on wrapper + poster preload.
- Mobile battery on marquee → IntersectionObserver gate, `visibilitychange` pause, 1 row / 18 px/s cap, transform-only.
- Reduced-motion coverage gaps → central `useReducedMotion()` hook; ESLint rule forbids raw `Motion` imports outside wrapper.
- Switzer variable file weight → Latin-subset wght-only WOFF2 ≈ 68 KB; Geist Mono subset ≈ 34 KB; total webfont ≤ 110 KB.
- Single-accent rule enforcement → section `zone` flag + build-time lint blocks adjacent warm+cool pairs.
- Hero video on 3G → WebM VP9 first, gate autoplay on `navigator.connection.effectiveType !== '2g'`; hero ≤ 1.6 MB mobile.

---

### V3 — Raw Grid: detailed spec

**Type scale** (Anton + IBM Plex Sans + JetBrains Mono; Anton has one weight 400 — hierarchy via size / tracking / case)

| Token | clamp() | Weight | LH | Tracking | Case |
|---|---|---|---|---|---|
| h1 (Anton) | `clamp(3.25rem, 2rem + 8vw, 8rem)` | 400 | 0.88 | -0.02em | UPPER |
| h2 (Anton) | `clamp(2.25rem, 1.5rem + 4vw, 5rem)` | 400 | 0.92 | -0.01em | UPPER |
| h3 (Anton) | `clamp(1.625rem, 1.25rem + 2vw, 3rem)` | 400 | 0.96 | 0 | Mixed |
| h4 (Plex) | `clamp(1.125rem, 1rem + 0.6vw, 1.375rem)` | 600 | 1.2 | -0.005em | Sentence |
| h5 / overline (Plex) | `clamp(0.6875rem, 0.65rem + 0.15vw, 0.8125rem)` | 500 | 1.3 | 0.16em | UPPER |
| label (Plex) | `0.75rem` | 500 | 1.25 | 0.08em | UPPER |
| body (Plex) | `clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)` | 400 | 1.55 | 0 | Sentence |
| mono (JetBrains) | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` | 400 / 500, tabular | 1.3 | 0 | as-is |

**Anton monotony defense** — h1 ≈ 3× h3 at wide viewports; h3 switches to mixed case to break UPPER cadence; Plex Sans handles every sub-head < 20 px. No surface may show two adjacent Anton sizes; if it would, one becomes Plex.

**Color tokens** — `--paper: #FFFFFF`, `--ink: #0A0A0A`, `--concrete: #D9D9D9` (dividers on paper, dd-values on inverted blocks), `--tango: #FF3B1F` (CTA fill + focus ring + section counter + hover underline only — **nowhere else**), `--ink-mute: #4A4A4A` (captions, meta), `--grain: rgba(10,10,10,0.04)` (tiled SVG on body, ceiling 4 %), `--focus: --tango` 3 px solid, 2 px offset.

**Spacing + grid** — 4 px base scale `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192`. 12-col grid with **visible** gutters: 1 px ink rules on paper, 1 px paper rules on black. Gutters are structural *and* visual. 360 4-col 16/16 · 640 6-col 20/24 · 768 8-col 24/32 · 1024 12-col 24/48 · 1280 12-col 32/64 + 80 px counter rail · 1440 12-col 32/96 + 120 px margin, folio numbers appear · 1920 cap content 1440.

**Home sections (13)**
1. Utility bar — 32 px phone + language / full-width rule + office count + weather/date marginalia — none.
2. Nav — 56 px sticky + hamburger / 72 px 12-col ruled, active item 2 px tango underline — none.
3. Hero — Anton H1 stacked over single photo / Anton H1 cols 1–8 + photo cols 9–12 + folio "01" top-left + dek on col-1 margin — none.
4. Search widget — stacked dropdowns / 12-col bar with 1 px rules + tango submit — **FLIP on submit** (M2).
5. Featured — card stack / 3-col card grid cols 1–12, bordered box, mono ID in corner — **FLIP reflow** (M2).
6. Vendor CTA — black block + inverted Anton / 12-col black bar, counter "2400+ ventas" right, rule-bracketed — counter on mount (M1).
7. Brand story — 2×2 dl stats / **oversize Anton bleeds into left margin** + 4-col mono stat row — counter on scroll-in (M1).
8. Office locator — dropdown + list / map cols 1–7 + list cols 8–12 with folio numbers per office — none.
9. Franchise CTA — paper block + Anton H2 + CTA / 6/6 split, tango CTA cols 1–3 — none.
10. Testimonials — 1-col Plex italic / 3-col grid, oversized Anton " marks, office ID in attribution — none.
11. Blog — stacked cards / 3-col + 4th-col metadata marginalia — none.
12. Newsletter — stacked / 12-col black strip, heading cols 1–6, form cols 7–12 — none.
13. Footer — stacked groups / 12-col, Anton mega-logo bleeds bottom, folio "13/13" bottom-right — none.

**Listing sections (15)**
1. Breadcrumb — horizontal scroll chips / inline ruled row, folio "286194" right — none.
2. Title — Anton H1 stacked + price below / Anton H1 overlaid on hero bottom-left, mono price top-right — none.
3. Gallery — horizontal swipe 1-up / 2×2 asymmetric grid cols 1–8 + thumbs cols 9–12 — none.
4. Price — mono big number / integrated into title poster; mono USD + ARS stack — counter on mount (M1).
5. Quick-facts — 2-col dl (dt above dd) / 6-col dl, left-aligned dt, right-aligned mono dd, 1 px rules between pairs — counter (m², rooms).
6. Description — single column Plex body / cols 2–8 + marginalia cols 9–12 (listing agent, publish date) — none.
7. Amenities — 2-col bullet dl / 4-col dl with category groupings, rule-separated — none.
8. Neighborhood — stacked stats / 3-col stat row with Anton numbers + Plex labels — counter.
9. Map — full-bleed / cols 1–8 + POI dl cols 9–12 — none.
10. Agent card — photo + contact stacked / cols 9–12 sticky, mono office ID, tango call CTA — none.
11. Contact form — stacked inputs / cols 1–8, 1 px-ruled fields, tango submit — none.
12. Mortgage calc — stacked sliders / cols 1–6 + result monolith cols 7–12 in Anton-mono composite — counter on slider.
13. Similar — 1-col stack / 3-col grid with mono IDs — **FLIP if filters**.
14. Share actions — sticky bottom bar / right-margin vertical strip, icon + Plex label — none.
15. Footer.

**Motion choreography (4 — intentionally sparse)**

| # | Trigger | Target | Property | Duration | Easing | Reduced-motion |
|---|---|---|---|---|---|---|
| M1 | IO 0.3 on mount/in-view | number counters | textContent 0→value | 900 ms | cubic-bezier(0.2, 0.9, 0.1, 1) (lands hard) | skip to final |
| M2 | URLSearchParams change | featured/similar cards | Motion `layout` (position + opacity) | 420 ms | spring(260, 32) | instant swap |
| M3 | Scroll (rAF 60 fps throttled) | section-counter "NN / 13" rail | translateY | continuous | linear | static position |
| M4 | Hover (`pointer: fine` only) | CTA buttons | 2 px tango underline scaleX 0→1 from left | 180 ms | ease-out | instant |

**Number counter spec** — animates hero stat block, featured prices, quick-facts (m² cubiertos/totales, ambientes, año, expensas), mortgage result, neighborhood stats. 900 ms, `cubic-bezier(0.2, 0.9, 0.1, 1)`. rAF with `Math.round(start + (end - start) * eased(t))`; final frame forces `textContent = String(end)` to eliminate rounding drift. Currency formatted per frame via `Intl.NumberFormat('es-AR')`. Reduced-motion short-circuit: final formatted string set synchronously. JetBrains Mono `font-variant-numeric: tabular-nums` prevents width jitter. Max 8 animated numerals per page.

**Grid reflow (FLIP) spec** — Motion `layout` prop, `layoutId = card-${listing.id}` stable across filter changes. Trigger: `useSearchParams()` commit. Enter: `initial={{ opacity: 0, y: 8 }}` → `animate={{ opacity: 1, y: 0 }}`. Exit via `AnimatePresence`: `exit={{ opacity: 0, y: -8 }}`. 420 ms spring (260 / 32). Reduced-motion: `<MotionConfig reducedMotion="always">` at route root → Motion swaps to instant. No staggering.

**Copy (es-AR, documentary, unvarnished)**
- Hero H1: *"PROPIEDADES EN ARGENTINA. 1971 OFICINAS. UNA RED."*
- Dek: *"Compra, venta y alquiler en 82 países. Operamos acá desde 1997."*
- CTA: *"Buscar propiedad"*
- Testimonials: (1) *"Vendí 14 departamentos en Palermo el año pasado. La red te respalda, el resto es trabajo."* — Laura M., Oficina Palermo Soho. (2) *"Firmamos en tres semanas. Sin vueltas."* — Federico R., comprador, Ramos Mejía. (3) *"Un inmueble no se vende con fotos. Se vende con datos."* — Matías D., Oficina Belgrano.
- Blog: (1) *"Ramos Mejía: precios por m² del primer trimestre 2026"* (2) *"Cómo leer una escritura antes de firmar"* (3) *"Expensas en CABA: qué cubre cada categoría"*.
- Stats: `1971` OFICINAS · `86` PAÍSES · `29` AÑOS EN ARGENTINA · `+12.000` OPERACIONES 2025.
- Newsletter: *"NOVEDADES. UNA VEZ POR SEMANA."* Privacy: *"Solo para el boletín. Nunca compartimos tu mail."*

**Inspiration refs**
1. Bloomberg Businessweek — oversized Anton-like display + news-headline tone; applied to real-estate listings with single sans body (Plex).
2. Rijksmuseum — definition-list metadata; ours is brutalist rules + Anton caps, not restrained serif.
3. OMA / Rem Koolhaas — grid-honest spatial rigor + monochrome; ours adds one saturated accent (tango).
4. Fraktur (Awwwards SOTY 2022) — folio numbers + section counter as structural content; applied to property navigation, not fashion editorial.
5. Base Design NYC — ultra-condensed display over paper with aggressive tracking; ours stays Anton + Plex only, no serif secondaries.

**Accessibility contracts**
- Focus ring: 3 px solid `--tango` + 2 px offset. Tango/paper 4.06:1 — above 3:1 non-text minimum. Never color-alone; always paired with 2 px underline on links.
- Hit targets: Anton condensed glyphs read small — every interactive element gets min 48 px tap zone via vertical padding (`12 px` + Anton 24 px = 48 px). Icon buttons: explicit `min-height: 44px; min-width: 44px`.
- Body contrast: Plex 400 at 16 px, ink/paper = 20.4:1 (AAA).
- Grain overlay: 4 % ceiling. Body contrast remains ~19.5:1. SVG noise served as inline data URI ≤ 2 KB with `pointer-events: none`. LCP-critical hero renders grain in a separate below-text layer.
- Skip link, semantic `<dl>`, `<section>`, `aria-label` on section counter ("Sección 3 de 13"), reduced-motion honored per M1–M4.

**Desktop-only flourishes (≥1280)**
1. Section-counter side-rail — right-margin strip, `writing-mode: vertical-rl`, `03 / 13` in Anton tango. Position tracked via IntersectionObserver; slides translateY as sections enter.
2. Full-page-width horizontal rules with folio numbers — every section boundary is a 1 px black rule spanning `100vw` with `§ 04` (Anton, left) and folio `04 / 13` (mono, right) straddling it.
3. Oversize Anton in brand-story — scales to 12rem, deliberately wraps into the 120 px left outer margin (negative margin).
4. Marginalia next to gallery photos — listing ID `#286194`, photographer credit, date, GPS in JetBrains Mono 12 px.
5. Cursor folio — `pointer: fine` only: hovering a card shows small fixed Anton caption near the cursor with card's sequence number (`↗ 02 / 06`). No trail, no animation.

**Risks + mitigations**
- Anton monotony → strict 3-level size delta; mixed case at h3; Plex Sans handles sub-heads < 20 px; max two Anton sizes adjacent (one swaps to Plex).
- Grain LCP cost → single 160×160 px tiled SVG on `<body>`, not per-section; data URI ≤ 2 KB; excluded from hero LCP layer via `::after`.
- "Bare as broken" → every form field visible 1 px ink border + 12 px padding + explicit placeholder; tango focus underline; tango-fill submit. Rules meet at right angles; no orphan rules.
- Counter gimmick creep → counters reserved for earned statistics (price, m², portfolio counts); max 8 animated numerals per page. Never UI chrome, dates, phone numbers, IDs.
- Tango over-use → `data-accent="cta|focus|counter"` attribute required; lint flags any other use.

## Shared-data reconciliation

The three refined specs were authored before brand verification and each invented fictional company stats. **Replaced entirely** by the verified "Brand truth" section above. `packages/shared/src/data/brand.ts` exposes **only verified facts**; any spec copy that conflicts is overridden by the "Copy corrections" block above.

Canonical constants to author in `brand.ts`:
```ts
export const BRAND = {
  globalFoundedYear: 1971,
  argentinaLaunchDate: '2017-06-12',
  countriesOperated: 79,
  globalOfficesApprox: 'más de 11.000',
  provinciasCubiertas: 28,
  phone: '(011) 3070 5043',
  hq: 'Madison, NJ, EE. UU.',
  parent: 'Compass International Holdings',
} as const;

export function tenureYearsInArgentina(today = new Date()): number {
  return Math.floor(
    (today.getTime() - new Date(BRAND.argentinaLaunchDate).getTime())
      / (365.25 * 24 * 60 * 60 * 1000),
  );
}
```

Rules for the build subagents:
- Every stat in on-page copy references `BRAND.*` by key — never a hard-coded number.
- Argentina office count, agent count, annual operations count are **forbidden** (not public; we do not invent).
- `tenureYearsInArgentina()` is called at render time; copy lines that prefer a frozen phrasing (e.g., "desde 2017") use the launch date directly.

Each version surfaces a subset:
- **V1** — `globalFoundedYear`, `argentinaLaunchDate` (rendered as "2017"), `countriesOperated`, `provinciasCubiertas`.
- **V2** — `countriesOperated`, `argentinaLaunchDate`, `provinciasCubiertas` in the dek; brand-story stats use `globalFoundedYear` (→ "54 años globalmente") + tenure + countries.
- **V3** — same four constants, presented as typographic poster ("DESDE 1971 · 79 PAÍSES · DESDE 2017 EN ARGENTINA · 28 PROVINCIAS").

## Risk register

- **Font-loading flicker** — display fonts are heavier; on slow networks a FOUT can show. Mitigations: `@fontsource-variable` subsetted to Latin + Latin-Ext, `font-display: swap`, `size-adjust` declared on `@font-face` to match fallback metrics, `preload` only the primary display face per version.
- **V2 Lighthouse mobile score with video** — Remotion-free static MP4 lessens the risk, but decoding still costs. Mitigations: `preload="metadata"`, `IntersectionObserver` to pause off-screen, poster is a true LCP candidate, 1080×1920 portrait variant served under 768 px. Budget set to 85 mobile for V2 already.
- **Visual regression flake from font race** — Playwright screenshots during font swap show layout shift. Mitigation: `await page.evaluate(() => document.fonts.ready)` + a 200 ms settle before every screenshot; `prefers-reduced-motion: reduce` set during visual runs to disable Motion entrances.
- **Argentina map SVG provenance** — using a derived-from-Wikimedia public-domain SVG (cite source in `media-todo.md`). If that's unclear, build provinces from Natural Earth 10 m admin-1 shapefile processed with `mapshaper` at setup time — output SVG committed.
- **pnpm workspace + Vite + TS paths flakiness** — Vite alias and `tsconfig.json` paths both declared explicitly, not just one; `vite-tsconfig-paths` plugin as belt-and-braces.
- **Unsplash URL drift** — photo IDs are frozen but Unsplash occasionally 404s on takedown. Mitigation: on first `pnpm verify`, a `fetch-check` step pings every placeholder once and fails the gate if any URL is dead — gives us time to swap before a demo.
- **Zod schema vs. realistic data divergence** — mock data is the single source; Zod validates shapes at build-time via a `shared` test suite so verify catches drift before the Lighthouse pass.
