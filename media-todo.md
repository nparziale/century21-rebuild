# Media TODO — nanobanana stills + Seedance 2.0 video

Every image and video slot shipped with a stable Unsplash placeholder so the project runs
out-of-the-box. This file pairs each slot with a concrete prompt you can feed to
nanobanana (stills) or Seedance 2.0 (video) when you're ready to replace the placeholders
with branded imagery.

After generating real assets:

1. Drop files into the path listed for each slot.
2. Swap the data entry in `packages/shared/src/data/*.ts` from `unsplashUrl(id, ...)` to a
   local path (e.g. `/listings/286194/hero.jpg`).
3. Add `vite-imagetools` for per-build AVIF/WebP/JPG derivatives at the 5 design widths
   (360 / 768 / 1280 / 1920 / 2400).

Delete a row from this file only after the real asset ships and the data entry is swapped.

---

## 0. Brand assets — done, reference only

| File | Source | Status |
|---|---|---|
| `packages/shared/public/brand/c21-gold.svg` | century21.com.ar/img/c21arg/c21ArgWebRGold.svg | Committed |
| `packages/shared/public/brand/c21-white.svg` | century21.com/images/logo/c21-logo-white.svg | Committed |
| `packages/shared/public/brand/c21-black.svg` | century21.com/images/logo/c21-logo-black.svg | Committed |

Duplicated into each `packages/v{1,2,3}-*/public/brand/` by the build subagents so each Vite
app serves its own logo from its own /public.

---

## 1. Listing 286194 — hero gallery (8 photos)

Path: `packages/shared/public/listings/286194/{slot}.jpg` (2400×1600, AVIF + WebP + JPG at build)

**Aesthetic direction:** warm late-afternoon Argentine suburban house, kidney-shaped pool,
light brick façade, eucalyptus trees, shot on Mamiya 7 film aesthetic, gentle grain, no people.

| Slot | Description | Nanobanana prompt |
|---|---|---|
| `hero.jpg` | Exterior front, dusk, calle arbolada | "warm late-afternoon exterior of a two-story suburban house in Ramos Mejía Buenos Aires with a kidney-shaped pool, parrilla, light brick façade, mature eucalyptus trees, shot on Mamiya 7, gentle film grain, no people, horizontal composition" |
| `pool.jpg` | Pool + quincho + wood deck | "backyard pool with wooden deck and parrilla corner, suburban Ramos Mejía backyard, low sun, eucalyptus leaves, no people, editorial architectural photography" |
| `living.jpg` | Living comedor amplio, opening to garden | "spacious living-dining room in Argentine suburban home, natural wood floor, large window onto garden with pool, late-afternoon sun, muted palette, no people" |
| `kitchen.jpg` | Kitchen with island + breakfast bar | "integrated kitchen with white island and pendant lights, suburban Argentine home, bright natural light, hardwood floor, minimal styling, no people" |
| `bedroom.jpg` | Master bedroom with fitted wardrobes | "principal bedroom with fitted wood wardrobes, linen bedding, morning light through curtains, Argentine suburban home, no people" |
| `bathroom.jpg` | Full bathroom with tub | "modern full bathroom with bathtub and shower niche, white subway tile, wood floor, suburban Argentine home, natural window light, no people" |
| `gallery.jpg` | Galería + parrilla open to garden | "covered gallery with brick parrilla, opening onto suburban backyard, terracotta tile floor, warm afternoon light, dinner-party ready, no people" |
| `cochera.jpg` | Double covered garage with automated gate | "double covered garage with automated gate, Argentine suburban house, soft morning light, empty, no people, architectural exterior" |

---

## 2. Featured listings grid — 9 cards (homepages)

Path: `packages/shared/public/listings/{id}/card.jpg` (1280×960)

Each card photo should read as a single postcard — one moment, no busy detail. Prompts below
align with each listing's neighborhood and property type (see `featured-listings.ts`).

| id | Neighborhood / type | Nanobanana prompt |
|---|---|---|
| 286194 | Casa · Ramos Mejía | (see row 1 hero) |
| 291044 | Depto · Palermo Soho | "modern 2-room apartment in Palermo Soho Buenos Aires, small french balcony with black iron railing, evening warm light, low-rise tree-lined street, no people" |
| 288312 | PH · Villa Crespo | "recycled PH patio in Villa Crespo porteño, interior courtyard with plants, exposed brick wall, clothes line, no people, editorial architectural photo" |
| 294882 | Depto · Belgrano R | "Belgrano R autumn street in Buenos Aires, tall trees with yellow leaves, elegant low building facade, sunlit, no people" |
| 297550 | Casa · Nordelta | "modern two-story house on a laguna in Nordelta Tigre, glass facade, private dock, late afternoon sun, no people" |
| 298120 | Monoambiente · Recoleta | "minimalist Paris-style studio apartment in Recoleta Buenos Aires, high ceilings, marble fireplace, wood floor, natural window light, no people" |
| 286033 | Depto · Vicente López | "balcony view over the Río de la Plata from a Vicente López tower, late-afternoon golden hour, no people" |
| 298777 | Casa · Caballito | "traditional Argentine porteño PH with internal patio and lemon tree, sunny winter morning, tiled floor, no people" |
| 299301 | Loft · San Telmo | "industrial loft in San Telmo Buenos Aires with exposed brick, double-height ceiling, steel beams, warm accent lighting, no people" |

---

## 3. Similar listings on detail page — 3 cards

Path: `packages/shared/public/listings/{id}/card.jpg` (1280×960)

| id | Description | Nanobanana prompt |
|---|---|---|
| 286702 | Casa · Haedo | "modest Haedo Buenos Aires suburban house with front garden and small gate, weekday light, no people" |
| 287884 | Casa · Castelar | "Castelar Norte Buenos Aires house with pool visible from the back, sunny, quiet street, no people" |
| 288050 | Casa · San Justo | "wide 5-room family home in San Justo La Matanza, corner lot, 1980s architecture with modern facelift, afternoon sun, no people" |

---

## 4. Agent portraits — 6 photos

Path: `packages/shared/public/agents/{slug}.jpg` (600×750 square-ish portrait)

Style: natural window light, neutral background, business-casual, subtle smile, shoulders up,
warm skin tones, no props, no stock-photo "thumbs up" cliches. Match the names in
`packages/shared/src/data/agents.ts`.

| Slot | Prompt |
|---|---|
| laura-mansilla.jpg | "portrait of a 38-year-old Argentine woman real estate agent, dark brown hair, warm smile, wearing a camel blazer over cream turtleneck, natural window light, neutral gray background, shoulders up, professional editorial portrait" |
| martin-salaberry.jpg | "portrait of a 45-year-old Argentine man real estate agent, short dark hair with grey at temples, neutral expression, wearing open-collar navy shirt, natural window light, neutral background, shoulders up" |
| carolina-dominguez.jpg | "portrait of a 55-year-old Argentine woman senior real estate broker, shoulder-length hair with highlights, warm smile, wearing a black turtleneck, indoor natural light, shoulders up, editorial portrait" |
| federico-rojas.jpg | "portrait of a 42-year-old Argentine man real estate agent, short beard, wearing a grey sweater, calm expression, natural morning window light, neutral background, shoulders up" |
| matias-dalessandro.jpg | "portrait of a 34-year-old Argentine man real estate broker, clean-shaven, short dark hair, wearing a light blue Oxford shirt, soft window light, neutral backdrop, shoulders up, editorial portrait" |
| ines-pagola.jpg | "portrait of a 40-year-old Argentine woman real estate agent from Córdoba, dark hair, warm smile, wearing a rust-colored blouse, natural afternoon light, neutral backdrop, shoulders up" |

---

## 5. Testimonial portraits — 5 photos

Path: `packages/shared/public/testimonials/{id}.jpg` (600×600 square, can be tight crop)

Softer and more candid than agent portraits — editorial candid, not commercial stock.

| id | Prompt |
|---|---|
| t1 (Inés y Pablo, Ramos Mejía) | "candid portrait of a 40-year-old Argentine couple in front of their newly bought suburban house in Ramos Mejía, holding keys, smiling at each other, late afternoon, natural light, no branding visible" |
| t2 (Martín Salaberry, broker) | (reuse agent portrait martin-salaberry.jpg) |
| t3 (Carolina D., Belgrano) | "candid portrait of a 50-year-old Argentine woman in a sunlit Belgrano apartment, bookshelves behind her, warm editorial light, no branding" |
| t4 (Laura M.) | (reuse agent laura-mansilla.jpg) |
| t5 (Franco B., franquiciado Córdoba) | "candid portrait of a 48-year-old Argentine man in a Córdoba CENTURY 21 office foyer, neutral professional expression, natural window light, no visible branding that would require clearance" |

---

## 6. Blog card covers — 3 photos

Path: `packages/shared/public/blog/{slug}.jpg` (1600×900)

| slug | Prompt |
|---|---|
| como-leer-una-escritura-antes-de-firmar | "still life of an Argentine escritura (property deed) on a wooden notary desk, a Mont Blanc pen and reading glasses, natural window light, soft shallow depth of field, editorial photograph" |
| ramos-mejia-el-oeste-que-volvio-a-mirarse | "aerial-ish wide shot of Ramos Mejía Buenos Aires residential street at golden hour, low suburban houses with trees, quiet, no traffic, no people, editorial" |
| expensas-en-caba-que-cubre-cada-categoria | "still life of a stack of building-expense invoices and a calculator on a desk, soft morning light, overhead composition, muted palette, editorial" |

---

## 7. V2 — Hero video (Seedance 2.0)

Path: `packages/v2-kinetic/public/hero/hero-{portrait,landscape}.{mp4,webm}` + `hero-poster.jpg`

**Spec:**
- 8 s seamless loop (final frame = first via 12-frame crossfade).
- Portrait 1080×1920 (serve < 768 px), landscape 1920×1080 (serve ≥ 768 px).
- Encode: MP4 H.264 + WebM VP9.
- Poster: progressive JPG ≤ 180 KB, matching first frame exactly (zero CLS).
- Luminance delta < 10 % per 100 ms (WCAG 2.3.1 safe by construction).
- No cuts to white, no flashes.

**Seedance 2.0 prompt (8-second composite, locked-dolly cinematography, no whip pans):**
> Cinematic architectural b-roll, 8 seconds, 24 fps, seamless loop. Five locked-dolly cuts:
> (1) 1.2 s aerial pan over residential Ramos Mejía rooftops at dusk, warm golden sun low,
> no traffic;
> (2) 1.6 s slow push-in toward a wrought-iron front gate with "CENTURY 21" nameplate barely
> visible, neighborhood ambient;
> (3) 1.1 s close-up of a brass "CENTURY 21" office plaque in natural side light, softly
> rotating dust motes;
> (4) 1.8 s sunlit living room rack focus across wood floor and linen sofa, no people;
> (5) 2.3 s exterior dusk wide shot of a quiet Buenos Aires street with an "Av. Rivadavia"
> signpost blurred in the foreground, handheld-steady, no traffic.
> Palette: warm ochre, cream, deep charcoal. Film grain gentle. No text overlays, no logos
> beyond the naturally occurring plaque. Final frame crossfades to the first frame.

Optional ffmpeg post-step (after Seedance export):

```
ffmpeg -i hero.mov -c:v libx264 -crf 22 -preset slow -movflags +faststart \
  -vf "scale=1920:1080" hero-landscape.mp4
ffmpeg -i hero.mov -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 \
  -vf "scale=1920:1080" hero-landscape.webm
ffmpeg -i hero.mov -c:v libx264 -crf 22 -preset slow -movflags +faststart \
  -vf "scale=1080:1920" hero-portrait.mp4
ffmpeg -i hero.mov -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 \
  -vf "scale=1080:1920" hero-portrait.webm
ffmpeg -i hero.mov -ss 00:00:00.2 -frames:v 1 -q:v 4 hero-poster.jpg
```

---

## 8. V1 — Lottie monogram draw-in (optional)

Path: `packages/v1-editorial/public/lottie/c21-monogram-draw.json`

Shipped as a stroke-animated inline SVG as fallback. To upgrade:

1. Import `c21-gold.svg` into LottieFiles / After Effects.
2. Animate stroke-dashoffset from 1 to 0 over 900 ms with an `ease-out` curve.
3. Export Lottie JSON.
4. Drop into the path above.
5. Switch the `HeroMonogram` component to `<DotLottieReact src="/lottie/c21-monogram-draw.json" />`.

---

## 9. Argentina map SVG (V2 office-locator)

Current: simplified 24-path SVG placeholder. Upgrade path for a geographically accurate map:

1. Download Natural Earth 10m admin-1 shapefile (`ne_10m_admin_1_states_provinces.shp`).
2. Filter to `admin == 'Argentina'`.
3. Run `mapshaper` to simplify:
   ```
   mapshaper ne_10m_admin_1_states_provinces.shp -filter 'admin=="Argentina"' \
     -simplify 4% -o format=svg id-field=name precision=0.0001 \
     packages/v2-kinetic/public/maps/argentina.svg
   ```
4. Post-process in Figma / SVGO to clean up, add `<path data-province="...">` attributes
   matching `REGION` keys.
