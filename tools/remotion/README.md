# tools/remotion — V2 hero video authoring

V2 ships a static `<video autoplay muted loop playsinline>` with a JPG poster. The MP4 /
WebM files are authored **offline** here and committed to
`packages/v2-kinetic/public/hero/`. Remotion is not a runtime dependency of V2.

## Why Remotion lives here, not in v2-kinetic

Remotion's rendering toolchain (Chromium, ffmpeg) is heavy. Shipping it inside v2-kinetic
would drag those deps through a regular `pnpm install`. Keeping it under `tools/` scopes the
weight to people who actually render the hero.

## One-time setup

```bash
cd tools/remotion
pnpm init -y
pnpm add remotion @remotion/cli @remotion/renderer react react-dom
```

(Or use the Seedance 2.0 prompt in `media-todo.md` § 7 instead of Remotion — same output
paths, zero code in this folder.)

## Render

```bash
pnpm render:hero   # from repo root
```

Produces (into `packages/v2-kinetic/public/hero/`):

- `hero-portrait.mp4` + `.webm` (1080×1920, for < 768 px)
- `hero-landscape.mp4` + `.webm` (1920×1080, for ≥ 768 px)
- `hero-poster.jpg` (progressive, ≤ 180 KB, first frame)

All four files are git-committed after render. They're build-time artifacts, not generated
by `pnpm build`.

## Composition: `HeroLoop.tsx` (to be authored)

8-second loop, 24 fps, seamless (last frame crossfades into first). Five locked-dolly cuts
per the `media-todo.md` prompt. Luminance delta under 10 % per 100 ms to pass WCAG 2.3.1 by
construction.

Alternative (easier + more cinematic): feed the Seedance prompt to an external model, then
run the `ffmpeg` post-encode chain at the bottom of `media-todo.md` § 7 to produce the four
output files at the correct paths.
