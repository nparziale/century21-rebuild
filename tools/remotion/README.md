# tools/remotion — V2 hero video

V2's hero uses a **runtime Remotion composition** (`@remotion/player`) —
no MP4 download at page load. The composition lives inside the package at
`packages/v2-kinetic/src/remotion/HeroLoop.tsx` and is mounted via
`HeroPlayer.tsx`, which is code-split so the ~200 KB gzipped player bundle
only loads when the hero section is about to show it.

## Why runtime Remotion, not a pre-rendered MP4

- Zero video bytes to download — the five Unsplash stills (which are cached
  by the browser anyway) double as the only media assets.
- The composition is plain React + CSS transforms, so it plays at exactly the
  fps/size the browser needs and stays sharp on retina displays.
- Iterating on motion is a `Vite HMR` reload, not an ffmpeg re-render.

Trade-off: +~200 KB gzipped JS. Offset by removing ~3 MB of landscape MP4
and ~1 MB portrait MP4 from the initial load. Lighthouse mobile perf is
unchanged; the plan's V2 budget of 85 stays honored.

## Reduced-motion + Data Saver

`Hero.tsx` checks `matchMedia('(prefers-reduced-motion: reduce)')` and
`navigator.connection.saveData`. When either is true, `<HeroPlayer />` is
never imported or mounted — the page simply paints the first-still poster
(`<div style="backgroundImage: url(...)" />`) as a static hero. No JS
animation cost at all.

## Optional — bake to MP4 for pre-production export

If you ever want to ship a pre-rendered MP4 instead (e.g. for a CDN that
doesn't serve JS, or a case study export), `render.sh` in this folder
renders the same 5-still concept via ffmpeg Ken-Burns:

```bash
bash tools/remotion/render.sh
# → packages/v2-kinetic/public/hero/{hero-landscape.mp4, hero-portrait.mp4,
#                                    hero-landscape.webm, hero-portrait.webm,
#                                    hero-poster.jpg}
```

To switch V2 runtime back to `<video>` playback you would also need to
revert `Hero.tsx` / `HeroPlayer.tsx` to the previous `<video>` variant.
Not wired to any npm script by default — runtime Remotion is the shipped
path.

## Seedance 2.0 / higher-fidelity alternative

If you'd rather feed the composition idea to a video model, the exact
Seedance prompt lives in `media-todo.md` § 7. The model's output drops
into the same `packages/v2-kinetic/public/hero/` paths the ffmpeg renderer
writes to.
