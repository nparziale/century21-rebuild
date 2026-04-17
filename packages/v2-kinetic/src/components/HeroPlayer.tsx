import { useEffect, useRef } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { HeroLoop, HERO_LOOP_CONFIG } from '../remotion/HeroLoop.tsx';

/**
 * Wraps the Remotion <Player> for V2's hero. Lazy-loaded from Hero.tsx so the
 * ~200 KB gzipped player bundle stays out of the initial paint. Plays
 * automatically on mount, pauses when the section leaves the viewport, and is
 * fully suppressed when Hero.tsx detects reduced-motion or Data Saver.
 */
export function HeroPlayer() {
  const playerRef = useRef<PlayerRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pause when the hero scrolls out of view (transform calcs are the only JS
  // cost; pausing keeps CPU off while the user is deeper on the page).
  useEffect(() => {
    const host = containerRef.current;
    const player = playerRef.current;
    if (!host || !player) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            try {
              player.play();
            } catch {
              /* Player auto-retries; ignore race on first mount */
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
      ref={containerRef}
      className="absolute inset-0"
      aria-hidden
      style={{ pointerEvents: 'none' }}
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
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
