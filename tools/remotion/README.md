# tools/remotion — V2 hero video authoring

V2 ships a static `<video autoplay muted loop playsinline>` with a JPG poster.
The MP4 / WebM files are authored **offline** here and committed to
`packages/v2-kinetic/public/hero/`. Nothing in this folder is a runtime
dependency of V2.

## Default renderer: `render.sh` (ffmpeg only, zero-deps)

```bash
pnpm render:hero   # from repo root
```

Downloads five Unsplash property stills (the same IDs used by
`@c21/shared/featured-listings`) and chains them with a Ken-Burns zoom/pan
per clip plus 0.6 s xfade transitions — including a wrap-back to clip #1 so
the 8-second loop is seamless. Output bundle:

| File | Size | Purpose |
|---|---|---|
| `hero-landscape.mp4` | ~3.1 MB | ≥ 768 px browsers, H.264 CRF 26 + maxrate 4500k |
| `hero-landscape.webm` | ~2.6 MB | ≥ 768 px VP9 alternative |
| `hero-portrait.mp4` | ~1.1 MB | < 768 px mobile, H.264 CRF 30 + maxrate 1600k |
| `hero-portrait.webm` | ~1.1 MB | < 768 px VP9 alternative |
| `hero-poster.jpg` | ~210 KB | 1600 px wide JPG, first frame, LCP candidate |

Requires ffmpeg 7+ with `libx264` + `libvpx-vp9` (both ship with the stock
Homebrew ffmpeg on macOS).

## Alternate renderer: Remotion (optional)

If you want programmatic video with typography overlays, motion scripting,
or title cards — things ffmpeg's zoompan doesn't do gracefully — set up
Remotion in this folder:

```bash
cd tools/remotion
pnpm init -y
pnpm add remotion @remotion/cli @remotion/renderer react react-dom
# Author compositions in HeroLoop.tsx (to-be-created)
# Render frames via `npx remotion render HeroLoop out/hero-%04d.png`
# Then encode with ffmpeg as in render.sh (frames → mp4/webm)
```

Nothing in the shipped V2 package depends on this path. Remotion stays an
author-side upgrade, not a runtime import.

## Seedance 2.0 alternative

Cinematic video models produce more interesting motion than Ken-Burns stills.
`media-todo.md` § 7 has the Seedance prompt ready; outputs drop into the same
paths this script writes to, then re-encode through the ffmpeg commands
documented there.
