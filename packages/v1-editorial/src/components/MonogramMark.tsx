import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

/**
 * Small "21" monogram that draws its stroke on load (900ms ease-out).
 * Reduced-motion: renders static. No JSON Lottie file — pure SVG/CSS.
 */
export function MonogramMark({ className = '' }: { className?: string }) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const paths = pathRefs.current.filter((p): p is SVGPathElement => !!p);
    for (const p of paths) {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = 'stroke-dashoffset 900ms cubic-bezier(0.2, 0.7, 0.2, 1)';
      // Kick animation after paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          p.style.strokeDashoffset = '0';
        });
      });
    }
  }, [reduced]);

  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      role="presentation"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* '2' */}
        <path
          ref={(el) => {
            pathRefs.current[0] = el;
          }}
          d="M18 22 C 18 12, 28 8, 38 12 C 50 18, 48 32, 34 42 L 18 60 L 52 60"
        />
        {/* '1' */}
        <path
          ref={(el) => {
            pathRefs.current[1] = el;
          }}
          d="M72 14 L 82 10 L 82 60"
        />
        {/* baseline rule */}
        <path
          ref={(el) => {
            pathRefs.current[2] = el;
          }}
          d="M14 70 L 106 70"
          strokeWidth="0.75"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
