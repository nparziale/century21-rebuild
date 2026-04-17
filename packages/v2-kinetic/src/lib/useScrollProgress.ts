import { useEffect, useRef, useState } from 'react';

/**
 * Tracks a scroll-progress value 0..1 for the given element as it moves
 * through the viewport. 0 = element top at viewport bottom, 1 = element top
 * at viewport top. Uses rAF + scroll listener.
 */
export function useScrollProgress<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  progress: number;
  velocity: number;
} {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh;
      const end = 0;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));
      setProgress(p);

      const y = window.scrollY;
      const t = performance.now();
      const dy = y - lastY.current;
      const dt = t - lastT.current || 16;
      setVelocity(dy / dt);
      lastY.current = y;
      lastT.current = t;
      raf.current = null;
    };

    const onScroll = () => {
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return { ref, progress, velocity };
}
