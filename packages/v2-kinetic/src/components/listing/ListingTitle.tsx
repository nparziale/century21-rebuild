import { useEffect, useRef } from 'react';
import { useInView } from '../../lib/useInView.ts';
import { useReducedMotion } from '../../lib/useReducedMotion.ts';
import type { Listing } from '@c21/shared';

/**
 * Listing H1 with wght-reveal on intersect (200 → 600, one-shot).
 */
export function ListingTitle({ listing }: { listing: Listing }) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, threshold: 0.5 });
  const h1 = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!h1.current) return;
    const target = reduced ? 600 : inView ? 600 : 200;
    h1.current.style.setProperty('--hero-wght', String(target));
  }, [inView, reduced]);

  return (
    <section ref={ref} data-section="title" className="zone-neutral">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-4 md:px-6 md:py-6">
        <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Ref. {listing.id} · {listing.operation === 'venta' ? 'Venta' : 'Alquiler'} ·{' '}
          {listing.propertyType}
        </p>
        <h1
          ref={h1}
          className="v2-hero-h1 mt-3 text-[clamp(1.85rem,1.2rem+2.8vw,3.75rem)] leading-[1.02] tracking-[-0.015em]"
          style={{ ['--hero-wght' as string]: 200, transitionDuration: '700ms' }}
        >
          {listing.title}
        </h1>
        <p className="mt-3 text-[0.95rem] text-[var(--color-ink-mute)]">
          {listing.address.street} · {listing.address.neighborhood} · {listing.address.city},{' '}
          {listing.address.province}
        </p>
      </div>
    </section>
  );
}
