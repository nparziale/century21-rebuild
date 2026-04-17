#!/usr/bin/env bash
# Render the V2 hero loop as MP4 H.264 + WebM VP9, landscape + portrait +
# poster JPG. Uses ffmpeg + five Unsplash property stills with a Ken-Burns
# pan/zoom per clip and xfade transitions between clips. The last transition
# wraps back to clip #1 for a seamless loop.
#
# Usage:  pnpm render:hero   (from repo root)
# Output: packages/v2-kinetic/public/hero/{hero-landscape.mp4, hero-landscape.webm,
#                                           hero-portrait.mp4, hero-portrait.webm,
#                                           hero-poster.jpg}
#
# No AI video generation is invoked — that's what nanobanana / Seedance do
# offline. This is the zero-dep default so v2-kinetic always has a real video
# on `pnpm dev`. See media-todo.md § 7 for the Seedance prompt that replaces
# these files one-for-one when higher-fidelity footage is authored.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$HERE/../../packages/v2-kinetic/public/hero"
TMP="$(mktemp -d -t c21-hero-XXXXXX)"
trap 'rm -rf "$TMP"' EXIT

mkdir -p "$OUT"

echo "→ workdir $TMP"
echo "→ output  $OUT"

# Five stills — IDs from the shared featured-listings set, so they're already
# verified live on Unsplash.
STILLS=(
  "1564013799919-ab600027ffc6"  # 1 — exterior front, golden hour
  "1600585154340-be6161a56a0c"  # 2 — living room
  "1556912173-3bb406ef7e77"     # 3 — kitchen with island
  "1600596542815-ffad4c1539a9"  # 4 — pool + deck
  "1613490493576-7fde63acd811"  # 5 — exterior dusk
)

# Per-clip duration in seconds (at 24 fps). With 4 crossfades of 0.6s between
# 5 clips plus one loop-back crossfade of 0.6s to the first, total output
# duration = sum(durations) - 5 * 0.6 = 10.0 - 3.0 = 7.0 s of loop content,
# trimmed to 8.0 s by duplicating the first clip at tail.
DURS=(2.0 2.0 2.0 2.0 2.0)
XFADE=0.6
FPS=24

echo "→ downloading five stills at 2880×1920"
for i in "${!STILLS[@]}"; do
  idx=$((i + 1))
  url="https://images.unsplash.com/photo-${STILLS[$i]}?auto=format&fit=crop&w=2880&h=1920&q=90&fm=jpg"
  curl -sSL -o "$TMP/s${idx}.jpg" "$url"
  echo "   [$idx] $(stat -f%z "$TMP/s${idx}.jpg") bytes"
done

# Zoompan formula per clip. Each clip slowly zooms in from 1.0 → 1.12 over its
# frames — that's the "Ken Burns" motion. iw/ih are the input still dims.
# We render every clip at 1920×1080 (landscape master); portrait is cropped
# later from the same master so motion stays continuous.
zoompan_filter() {
  local seconds=$1
  local frames
  frames=$(awk "BEGIN{printf \"%d\", $seconds * $FPS}")
  # Slight random x/y drift per clip so every still moves differently. We use
  # the clip index baked in via $2 to offset the drift direction.
  local idx=$2
  case $idx in
    1) pan_x="iw*0.02"; pan_y="ih*0.02" ;;  # push in, slight SE drift
    2) pan_x="-iw*0.03"; pan_y="0" ;;       # push in + drift left
    3) pan_x="0"; pan_y="-ih*0.03" ;;       # push in + drift up
    4) pan_x="iw*0.03"; pan_y="ih*0.02" ;;  # push in + drift right-down
    5) pan_x="-iw*0.02"; pan_y="-ih*0.02" ;; # push in + drift NW
  esac
  echo "scale=2880:1920:force_original_aspect_ratio=increase,crop=2880:1920,zoompan=z='min(zoom+0.0006,1.12)':d=$frames:s=1920x1080:x='(iw-iw/zoom)/2+($pan_x)*on/$frames':y='(ih-ih/zoom)/2+($pan_y)*on/$frames':fps=$FPS"
}

echo "→ encoding per-clip Ken-Burns masters"
for i in "${!STILLS[@]}"; do
  idx=$((i + 1))
  dur=${DURS[$i]}
  filter=$(zoompan_filter "$dur" "$idx")
  ffmpeg -y -loglevel error -loop 1 -framerate $FPS -i "$TMP/s${idx}.jpg" \
    -vf "$filter" -t "$dur" -c:v libx264 -pix_fmt yuv420p -crf 20 -preset veryfast \
    "$TMP/c${idx}.mp4"
  echo "   [$idx] ${dur}s"
done

echo "→ concatenating with xfade transitions"
# Build the xfade chain:  c1 --xfade--> c2 --xfade--> c3 --xfade--> c4 --xfade--> c5 --xfade--> c1
# Each offset = cumulative length of previous clips minus (k-1)*XFADE.
# Using ffmpeg -filter_complex; inputs 0..5 (c1, c2, c3, c4, c5, c1-again).
ffmpeg -y -loglevel error \
  -i "$TMP/c1.mp4" -i "$TMP/c2.mp4" -i "$TMP/c3.mp4" -i "$TMP/c4.mp4" -i "$TMP/c5.mp4" -i "$TMP/c1.mp4" \
  -filter_complex "\
    [0:v][1:v]xfade=transition=fade:duration=${XFADE}:offset=1.4[v12];\
    [v12][2:v]xfade=transition=fade:duration=${XFADE}:offset=2.8[v123];\
    [v123][3:v]xfade=transition=fade:duration=${XFADE}:offset=4.2[v1234];\
    [v1234][4:v]xfade=transition=fade:duration=${XFADE}:offset=5.6[v12345];\
    [v12345][5:v]xfade=transition=fade:duration=${XFADE}:offset=7.0[loop];\
    [loop]trim=0:8,setpts=PTS-STARTPTS,fps=${FPS},format=yuv420p[outv]\
  " \
  -map "[outv]" -c:v libx264 -crf 18 -preset slow -movflags +faststart \
  "$TMP/hero-landscape-pre.mp4"

echo "→ encoding landscape MP4 + WebM"
# CRF tuned to hit the plan's per-device budgets at 8-second loop length:
#   landscape target ≤ 4.5 Mbps  (8 s ≈ 4.5 MB)
#   portrait  target ≤ 1.6 MB on mobile (per plan's risk register)
# The Ken-Burns content is smooth (no high-frequency detail) so higher CRFs
# stay visually clean. Poster JPG uses q:v 5 → ~80-180 KB.
ffmpeg -y -loglevel error -i "$TMP/hero-landscape-pre.mp4" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -maxrate 4500k -bufsize 9000k -movflags +faststart \
  -an "$OUT/hero-landscape.mp4"

ffmpeg -y -loglevel error -i "$TMP/hero-landscape-pre.mp4" \
  -c:v libvpx-vp9 -crf 44 -b:v 0 \
  -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 \
  -an "$OUT/hero-landscape.webm"

echo "→ encoding portrait MP4 + WebM (crop 9:16 from the 16:9 master)"
# Crop center 1080×1920 slice.  Source 1920×1080 — we scale up 1.8× to get
# 3456×1944 and crop to 1080×1920, which keeps the same Ken-Burns motion but
# cropped to portrait. Tighter CRF to hit the mobile bytes budget.
ffmpeg -y -loglevel error -i "$TMP/hero-landscape-pre.mp4" \
  -vf "scale=3456:1944,crop=1080:1920:1188:12" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p \
  -maxrate 1600k -bufsize 3200k -movflags +faststart \
  -an "$OUT/hero-portrait.mp4"

ffmpeg -y -loglevel error -i "$TMP/hero-landscape-pre.mp4" \
  -vf "scale=3456:1944,crop=1080:1920:1188:12" \
  -c:v libvpx-vp9 -crf 48 -b:v 0 \
  -row-mt 1 -tile-columns 2 -deadline good -cpu-used 1 \
  -an "$OUT/hero-portrait.webm"

echo "→ poster JPG (first frame, progressive, ≤ 180 KB target)"
ffmpeg -y -loglevel error -i "$TMP/hero-landscape-pre.mp4" \
  -ss 0.1 -frames:v 1 -q:v 5 -vf "scale=1600:-1" "$OUT/hero-poster.jpg"

# Retire the placeholder SVG if present — the real JPG supersedes it.
rm -f "$OUT/hero-poster.jpg.svg"

echo
echo "✓ done. outputs:"
ls -lh "$OUT"/hero-* | awk '{print "  " $5 "  " $NF}'
