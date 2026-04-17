# CENTURY 21 Argentina — three design directions

Reconstruction of [century21.com.ar](https://century21.com.ar/) (home) and the listing
[286194 — Casa en Ramos Mejía](https://century21.com.ar/propiedad/286194_casa-de-4-ambientes-en-venta-ramos-mejia-con-pileta-y-cochera)
in three distinct design directions. Static mockup data, real Century 21 brand (logo,
palette, taglines, legal, phone, socials), Spanish es-AR copy, mobile-first with exceptional
desktop support. See `PLAN.md` for the full spec and `century21-rebuild/showcase.html` for the side-by-side
explainer.

## Layout

```
century21-test/
├── PLAN.md                  — full approved build plan
├── century21-rebuild/
│   ├── showcase.html / .css — side-by-side explainer (standalone, no framework)
│   └── dist-showcase/       — built output (gitignored; produced by pnpm build:showcase)
├── media-todo.md            — nanobanana / Seedance prompts for real asset replacement
├── pnpm-workspace.yaml
├── package.json             — root orchestrator
└── packages/
    ├── shared/              — @c21/shared: types, brand constants, mock data, mortgage math
    │   └── public/brand/    — official Century 21 logo SVGs
    ├── verify/              — @c21/verify: Playwright + axe + Lighthouse harness
    ├── v1-editorial/        — V1 Editorial Pampas · Fraunces + Satoshi + JetBrains Mono · :5173
    ├── v2-kinetic/          — V2 Kinetic Marquee · Switzer + Geist Mono · :5174
    └── v3-brutalist/        — V3 Raw Grid · Anton + IBM Plex Sans + JetBrains Mono · :5175
```

## Quick start

Prerequisites: Node 20+, pnpm 10.33+.

```bash
# Install all workspaces
pnpm install

# Run all three versions in parallel on their own ports
pnpm dev
# → v1-editorial  http://localhost:5173
# → v2-kinetic    http://localhost:5174
# → v3-brutalist  http://localhost:5175

# Or just one
pnpm dev:v1      # V1 only
pnpm dev:v2      # V2 only
pnpm dev:v3      # V3 only
```

Open `century21-rebuild/showcase.html` directly in a browser (or serve with `pnpm preview:showcase` after
building) to see the side-by-side explainer with rationale and direct links to each version.

## Build + showcase

```bash
# Build all three versions
pnpm build

# Orchestrate the showcase: copies each version's dist/ into century21-rebuild/dist-showcase/v{1,2,3}/
# and rewrites showcase.html links to the built paths
pnpm build:showcase

# Preview the built showcase locally
pnpm preview:showcase
```

## Verification harness

A first-class workspace at `packages/verify/` runs Playwright, axe, and Lighthouse against
the three versions at six viewports (360 / 414 / 768 / 1024 / 1440 / 1920) × two pages × three
versions = 36 coverage cells.

```bash
# Requires dev servers running (pnpm dev in another terminal) OR a built+served showcase

# Full gate: section presence, layout, a11y, smoke, visual regression, Lighthouse
pnpm verify

# Fast subset (sections + layout + smoke, < 60s, no Lighthouse or visual)
pnpm verify:fast

# Visual regression alone (use --update-snapshots to refresh baselines)
pnpm verify:visual

# Lighthouse perf only
pnpm verify:lighthouse

# HTML report from the latest Playwright run
pnpm verify:report
```

What the harness gates on:

- **Sections**: every one of the 13 home + 15 listing `data-section` keys is present in the
  rendered DOM at every viewport. A missing section fails with a named error.
- **Layout**: zero horizontal page scroll; tap targets ≥ 44×44 below 1024 px; no element
  overflows its parent; no `<14 px` computed text on mobile.
- **Accessibility**: zero serious/critical axe violations against WCAG 2.2 AA. Runs at
  mobile-sm + laptop.
- **Smoke**: mortgage calc matches the shared reference value (USD 1 668.69 at 285k / 30 % /
  20yr / 8 %); contact form blocks empty submit; favorite toggle persists via localStorage;
  mobile nav sheet opens + Esc closes.
- **Visual regression**: Playwright screenshots per cell. First run writes baselines under
  `packages/verify/snapshots/`; subsequent runs diff with `maxDiffPixelRatio: 0.01`.
- **Lighthouse**: perf ≥ 90 mobile / 95 desktop (V2 gets 85 mobile due to hero video);
  accessibility ≥ 100; best-practices ≥ 95; SEO ≥ 95.

## V2 hero video render

V2's hero loops an 8-second MP4. The MP4 is authored offline (not a runtime dep).

```bash
pnpm render:hero
```

The renderer lives in `tools/remotion/` and outputs to `packages/v2-kinetic/public/hero/`.
Until rendered, V2 falls back to the poster JPG and a still scrim — no broken `<video>`. See
`media-todo.md` for the Seedance 2.0 prompt if you'd prefer generating the loop with a video
model instead of authoring in Remotion.

## Brand truth

All stats + tokens were verified against primary public sources; see `PLAN.md` § "Brand
truth". Never invent a C21 Argentina office count — it's not publicly disclosed. Verified:

| Fact | Value |
|---|---|
| Founded globally | 1971 |
| Argentina launch | 12 June 2017 |
| Countries | 79 |
| Provinces covered (AR) | 28 |
| Phone | (011) 3070 5043 |
| Parent | Compass International Holdings |
| Brand gold | #BEAF88 (Relentless Gold, Pantone 2324 C) |

## Disclaimer

Properties, agents, testimonials, and blog posts are design mockups — not real CENTURY 21
Argentina inventory. The brand identity (logo, palette, taglines, legal disclaimer, phone,
socials, provinces, international list) is real and verified.
