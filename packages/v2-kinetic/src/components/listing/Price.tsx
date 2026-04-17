import { useEffect, useState } from 'react';
import type { Listing } from '@c21/shared';
import { formatMoney, formatDateISO } from '../../lib/format.ts';
import { useReducedMotion } from '../../lib/useReducedMotion.ts';

/**
 * Price block. Mobile stacked mono. Desktop 2-col. Digit slot-roll 500 ms on
 * load — each visible digit/char wrapped in .v2-slot-digit with staggered
 * animation-delay.
 */
export function Price({ listing }: { listing: Listing }) {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => setMounted(true), []);

  const usd = formatMoney(listing.price);
  const ars = listing.priceARS ? formatMoney(listing.priceARS) : null;

  return (
    <section data-section="price" className="zone-neutral border-t border-[var(--color-divider)]">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[1fr_1fr_auto] md:items-end md:px-6 md:py-10">
        <div>
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
            Precio — USD
          </p>
          <p className="v2-mono mt-2 text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] font-[700] leading-none tabular-nums">
            {mounted && !reduced ? <SlotText value={usd} /> : usd}
          </p>
        </div>
        {ars && (
          <div>
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
              Referencia ARS
            </p>
            <p className="v2-mono mt-2 text-[clamp(1.25rem,1rem+1.2vw,1.75rem)] font-[500] leading-none text-[var(--color-ink-mute)] tabular-nums">
              {ars}
            </p>
          </div>
        )}
        <p className="v2-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
          Última actualización{' '}
          <time dateTime={listing.updatedAt}>{formatDateISO(listing.updatedAt)}</time>
        </p>
      </div>
    </section>
  );
}

function SlotText({ value }: { value: string }) {
  return (
    <span aria-label={value}>
      {value.split('').map((c, i) => (
        <span key={i} className="v2-slot-digit" style={{ animationDelay: `${i * 28}ms` }}>
          {c}
        </span>
      ))}
    </span>
  );
}
