import { useEffect, useState } from 'react';

/**
 * Walks all `section[data-section]` elements in the main content, tracks
 * which is currently most in view, exposes the index + total for the
 * section-counter side-rail (M3). Uses rAF throttle on scroll.
 */
export function useSectionCounter() {
  const [active, setActive] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-section]:not([data-section="nav"]):not([data-section="utility-bar"])',
      ),
    );
    setTotal(sections.length);

    if (sections.length === 0) return;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const vh = window.innerHeight;
      let best = 0;
      let bestScore = -Infinity;
      sections.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        // Prefer the section whose top is nearest but above vh * 0.3
        const score =
          rect.top < vh * 0.3
            ? rect.top - (rect.top < 0 ? rect.top : 0)
            : -Math.abs(rect.top - vh * 0.3);
        if (score > bestScore) {
          bestScore = score;
          best = i;
        }
      });
      setActive(best + 1);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { active, total };
}
