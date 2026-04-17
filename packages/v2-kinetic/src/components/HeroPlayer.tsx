import { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { HeroLoop, HERO_LOOP_CONFIG } from '../remotion/HeroLoop.tsx';

/**
 * Wraps the Remotion <Player> for V2's hero. Lazy-loaded from Hero.tsx so the
 * ~200 KB gzipped player bundle stays out of the initial paint.
 *
 * <Player> by default letterboxes the composition (fit: contain). Our hero
 * section is almost never 16:9 — mobile is portrait, desktop is closer to
 * 2:1 — so that default lets the plate's background-image bleed through.
 * To get "object-fit: cover" behavior we render the Player at its fixed
 * compositionWidth × compositionHeight and scale it from the outside with
 * a ResizeObserver-driven transform. Largest-of scale guarantees both axes
 * meet the container; overflow:hidden on the parent clips the excess.
 */
export function HeroPlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Cover-fit: scale so both dimensions of the 1920×1080 composition meet or
  // exceed the host. No aspect mismatch -> no pillarbox -> plate never leaks.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const update = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      const next = Math.max(
        w / HERO_LOOP_CONFIG.width,
        h / HERO_LOOP_CONFIG.height,
      );
      setScale(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  // Pause playback when the hero leaves the viewport — CPU quiet while the
  // user is scrolled deeper on the page.
  useEffect(() => {
    const host = hostRef.current;
    const player = playerRef.current;
    if (!host || !player) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            try {
              player.play();
            } catch {
              /* Player auto-retries on first mount */
            }
          } else {
            try {
              player.pause();
            } catch {
              /* idem */
            }
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ pointerEvents: 'none' }}
    >
      {/* Fixed-size stage that the Player fills natively; the outer transform
          scales it to cover the host.  left/top 50% + translate(-50%, -50%)
          keeps the composition centered as the scale changes. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: HERO_LOOP_CONFIG.width,
          height: HERO_LOOP_CONFIG.height,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <Player
          ref={playerRef}
          component={HeroLoop}
          durationInFrames={HERO_LOOP_CONFIG.durationInFrames}
          fps={HERO_LOOP_CONFIG.fps}
          compositionWidth={HERO_LOOP_CONFIG.width}
          compositionHeight={HERO_LOOP_CONFIG.height}
          loop
          autoPlay
          clickToPlay={false}
          showVolumeControls={false}
          controls={false}
          initiallyShowControls={false}
          style={{
            width: HERO_LOOP_CONFIG.width,
            height: HERO_LOOP_CONFIG.height,
          }}
        />
      </div>
    </div>
  );
}
