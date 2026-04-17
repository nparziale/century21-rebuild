import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { AMENITY_LABELS, type Listing } from '@c21/shared';

/**
 * Amenities. Mobile collapsible list. Desktop 3-col check grid. Uses
 * AMENITY_LABELS to render friendly strings.
 */
export function Amenities({ listing }: { listing: Listing }) {
  const [open, setOpen] = useState(false);
  const items = listing.amenities.map((k) => AMENITY_LABELS[k] ?? k);
  const visible = open ? items : items.slice(0, 6);
  return (
    <section data-section="amenities" className="zone-neutral border-t border-[var(--color-divider)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 md:px-6 md:py-16">
        <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Comodidades
        </p>
        <h2 className="mt-2 text-[var(--text-h3)] font-[700] leading-[1.05] tracking-[-0.01em]">
          {items.length} comodidades.
        </h2>

        {/* Mobile collapsible */}
        <div className="md:hidden">
          <ul className="mt-5 grid grid-cols-2 gap-y-2">
            {visible.map((label) => (
              <li key={label} className="flex items-center gap-2 text-[0.9rem]">
                <Check size={14} className="text-[var(--color-accent-cool)]" aria-hidden />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          {items.length > 6 && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="v2-tap mt-4 inline-flex items-center gap-1 text-[0.82rem] font-[600]"
            >
              {open ? 'Ver menos' : `Ver las ${items.length}`}
              <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          )}
        </div>

        {/* Desktop 3-col grid */}
        <ul className="mt-6 hidden grid-cols-3 gap-y-3 md:grid">
          {items.map((label) => (
            <li key={label} className="flex items-center gap-2 text-[0.95rem]">
              <Check size={16} className="text-[var(--color-accent-cool)]" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
