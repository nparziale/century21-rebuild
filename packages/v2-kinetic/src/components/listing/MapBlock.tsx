import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { Listing } from '@c21/shared';

/**
 * Static map pin + 500 m / 1000 m radius rings on an SVG placeholder. Click
 * to activate scroll/zoom behavior (per spec — we use an overlay prompt).
 * No Google Maps iframe.
 */
export function MapBlock({ listing }: { listing: Listing }) {
  const [active, setActive] = useState(false);
  const { lat, lng } = listing.address;

  return (
    <section data-section="map" className="zone-neutral border-t border-[var(--color-divider)]">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-10 md:px-6 md:py-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
              Ubicación (aproximada)
            </p>
            <h2 className="mt-2 text-[var(--text-h3)] font-[700] leading-[1.05] tracking-[-0.01em]">
              {listing.address.neighborhood}, {listing.address.province}
            </h2>
          </div>
          <p className="v2-mono hidden md:block text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)] tabular-nums">
            {lat.toFixed(4)}, {lng.toFixed(4)}
          </p>
        </div>

        <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden border border-[var(--color-divider)] bg-[var(--color-surface)]">
          <SchematicMap />
          {/* Pin */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="relative block">
              <span className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent-cool)] bg-[var(--color-accent-cool)]/10" />
              <span className="absolute left-1/2 top-1/2 h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent-cool)] bg-[var(--color-accent-cool)]/15" />
              <MapPin size={28} strokeWidth={2} className="relative text-[var(--color-accent-warm)] drop-shadow-sm" />
            </span>
          </div>

          {!active && (
            <button
              type="button"
              onClick={() => setActive(true)}
              className="v2-tap absolute inset-0 grid place-items-center bg-black/10 backdrop-blur-[1px] transition-opacity hover:bg-black/5"
              aria-label="Activar interacción del mapa"
            >
              <span className="v2-mono rounded-full bg-[var(--color-ink)] px-4 py-2 text-[0.78rem] uppercase tracking-[0.2em] text-white">
                Click para activar
              </span>
            </button>
          )}

          {/* Scale */}
          <div className="v2-mono pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
            <span className="inline-block h-[2px] w-10 bg-[var(--color-accent-cool)]" />
            500 m
            <span className="mx-1">·</span>
            <span className="inline-block h-[2px] w-14 bg-[var(--color-accent-cool)]/60" />
            1000 m
          </div>
        </div>
      </div>
    </section>
  );
}

function SchematicMap() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" aria-hidden>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-divider)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="var(--color-bg)" />
      <rect width="800" height="500" fill="url(#grid)" />
      {/* streets */}
      <line x1="0" y1="260" x2="800" y2="260" stroke="var(--color-ink-mute)" strokeWidth="2" strokeOpacity="0.3" />
      <line x1="400" y1="0" x2="400" y2="500" stroke="var(--color-ink-mute)" strokeWidth="2" strokeOpacity="0.3" />
      <line x1="0" y1="120" x2="800" y2="180" stroke="var(--color-ink-mute)" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="0" y1="380" x2="800" y2="340" stroke="var(--color-ink-mute)" strokeWidth="1.5" strokeOpacity="0.25" />
      <line x1="180" y1="0" x2="220" y2="500" stroke="var(--color-ink-mute)" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="580" y1="0" x2="620" y2="500" stroke="var(--color-ink-mute)" strokeWidth="1" strokeOpacity="0.2" />
      {/* parks */}
      <rect x="520" y="60" width="120" height="80" fill="#b7c7a0" opacity="0.45" rx="4" />
      <rect x="140" y="340" width="110" height="100" fill="#b7c7a0" opacity="0.45" rx="4" />
    </svg>
  );
}
