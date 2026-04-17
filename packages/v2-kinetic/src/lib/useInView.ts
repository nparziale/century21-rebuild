import { useEffect, useRef, useState } from 'react';

/**
 * Simple IntersectionObserver hook. `once` unsubscribes after the first
 * intersection so count-ups and weight-reveals play exactly once.
 */
export function useInView<T extends Element>(options?: {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}): { ref: React.RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once) io.disconnect();
          } else if (!options?.once) {
            setInView(false);
          }
        }
      },
      { threshold: options?.threshold ?? 0.25, rootMargin: options?.rootMargin ?? '0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return { ref, inView };
}
