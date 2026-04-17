import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Tween an integer from 0 to `target` when `enabled` flips true.
 * Respects reduced-motion (snaps to final value immediately).
 */
export function useCountUp(target: number, enabled: boolean, duration = 500): number {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [target, enabled, duration, reduced]);

  return value;
}
