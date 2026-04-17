import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { unsplashUrl } from '@c21/shared';

/**
 * V2 hero — a runtime Remotion composition.
 *
 * Five property stills, each with a Ken-Burns zoom (1.00 → 1.10) and a subtle
 * per-clip directional drift. Adjacent clips crossfade at their boundaries;
 * clip #1 re-appears at the tail so the loop wraps seamlessly when the
 * <Player loop> resets from frame (N-1) → 0.
 *
 * Rendered live in the browser — no ffmpeg pre-bake, no MP4 download. The
 * five Unsplash URLs load once and are re-rendered each frame via CSS
 * transforms, so bytes stay light.
 *
 * Default composition is 1920×1080 at 24 fps, 192 frames = 8 s. The Player
 * scales the composition to the container, so the landscape master also
 * drives portrait viewports (Hero.tsx crops via aspect-ratio + object-fit).
 */

const STILLS = [
  { id: '1564013799919-ab600027ffc6', driftX: 0.02, driftY: 0.02 },  // exterior front
  { id: '1600585154340-be6161a56a0c', driftX: -0.03, driftY: 0 },     // living room
  { id: '1556912173-3bb406ef7e77', driftX: 0, driftY: -0.03 },        // kitchen
  { id: '1600596542815-ffad4c1539a9', driftX: 0.03, driftY: 0.02 },   // pool + deck
  { id: '1613490493576-7fde63acd811', driftX: -0.02, driftY: -0.02 }, // exterior dusk
];

const XFADE_FRAMES = 14; // ~0.58 s at 24 fps

export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Six slots so the last slot is clip #1 again. When Player loops, the tail
  // (slot 6, clip A ending at scale 1.0) hands off to the head (slot 1, clip
  // A starting at scale 1.0) with no discontinuity.
  const slotCount = STILLS.length + 1;
  const slotDur = durationInFrames / slotCount;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0E0E0E' }}>
      {Array.from({ length: slotCount }).map((_, slot) => {
        const still = STILLS[slot % STILLS.length];
        if (!still) return null;

        const start = slot * slotDur;
        const end = start + slotDur;

        // Opacity: fade-in across xfade, hold, fade-out across xfade. First
        // and last slot clamp to edges so the composition starts/ends fully
        // visible.
        const opacity = interpolate(
          frame,
          [
            start - XFADE_FRAMES,
            start + XFADE_FRAMES,
            end - XFADE_FRAMES,
            end + XFADE_FRAMES,
          ],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );

        // Slot 6 reverses the Ken-Burns (1.12 → 1.0) so its end-state matches
        // slot 1's start-state when the Player loops.
        const isWrap = slot === STILLS.length;
        const scale = isWrap
          ? interpolate(frame, [start, end], [1.1, 1.0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : interpolate(frame, [start, end], [1.0, 1.1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

        const driftProgress = interpolate(frame, [start, end], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const translateX = (isWrap ? -still.driftX : still.driftX) * 40 * driftProgress;
        const translateY = (isWrap ? -still.driftY : still.driftY) * 40 * driftProgress;

        return (
          <AbsoluteFill
            key={`${still.id}-${slot}`}
            style={{
              opacity,
              transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
              transformOrigin: 'center',
              willChange: 'transform, opacity',
            }}
          >
            <Img
              src={unsplashUrl(still.id, 2400)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </AbsoluteFill>
        );
      })}
      {/* A subtle dark scrim so overlaid H1 stays readable against every still. */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(14,14,14,0.35) 0%, rgba(14,14,14,0.05) 40%, rgba(14,14,14,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

/** Exported metadata for the <Player /> mount in Hero.tsx. */
export const HERO_LOOP_CONFIG = {
  durationInFrames: 192,
  fps: 24,
  width: 1920,
  height: 1080,
} as const;
