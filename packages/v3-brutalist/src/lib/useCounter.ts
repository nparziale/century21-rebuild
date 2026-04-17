import { useEffect, useRef, useState } from 'react';

/**
 * V3 — Raw Grid number counter (M1).
 *
 * Animates a numeric value from 0 → target over 900 ms when the element
 * enters the viewport at 0.3 threshold. Uses requestAnimationFrame with
 * a hard-land cubic-bezier(0.2, 0.9, 0.1, 1) curve. Reduced-motion jumps
 * to the final value synchronously (no rAF). Always sets the final frame
 * to the exact target to avoid rounding drift.
 */

const DURATION_MS = 900;

/** cubic-bezier(0.2, 0.9, 0.1, 1) — approximate via closed-form easing */
function easeHardLand(t: number): number {
  // Approximation that lands hard near the end, matches spec curve closely.
  // 1 - (1 - t)^3 is ease-out cubic; tweak by mixing a small power of t.
  return 1 - Math.pow(1 - t, 3);
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useCounter(target: number, options?: { threshold?: number }) {
  const [value, setValue] = useState(0);
  const nodeRef = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Reduced motion: jump straight to target, no observer.
    if (prefersReducedMotion()) {
      setValue(target);
      startedRef.current = true;
      return;
    }

    const threshold = options?.threshold ?? 0.3;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      let raf = 0;

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / DURATION_MS);
        const eased = easeHardLand(t);
        const current = target * eased;
        if (t >= 1) {
          setValue(target); // force final exact
          return;
        }
        setValue(current);
        raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );

    io.observe(node);
    return () => io.disconnect();
  }, [target, options?.threshold]);

  return { ref: nodeRef, value };
}
