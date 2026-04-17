import { useEffect, useRef, useState } from 'react';
import type { Listing } from '@c21/shared';
import { BedDouble, Bath, Ruler, Car } from 'lucide-react';

/**
 * Full-bleed hero photo with metadata pinned bottom-right on desktop.
 * A 6-thumb strip below auto-scrolls at 12 px/s, pauses on pointer-in.
 */
export function Gallery({ listing }: { listing: Listing }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripPaused, setStripPaused] = useState(false);

  // Auto-scroll strip at 12 px/s
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (!stripPaused) {
        el.scrollLeft += (12 * dt) / 1000;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stripPaused]);

  const main = listing.gallery[activeIdx] ?? listing.gallery[0];
  if (!main) return null;

  return (
    <section data-section="gallery" className="zone-neutral">
      <div className="relative">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-[var(--color-surface)] md:aspect-[16/9]">
          <img
            src={main.src}
            alt={main.alt}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 right-4 rounded-sm bg-[var(--color-ink)] px-4 py-3 text-white md:bottom-6 md:right-6 md:px-5 md:py-4">
            <p className="v2-mono text-[0.66rem] uppercase tracking-[0.22em] text-white/95">
              {listing.address.neighborhood}
            </p>
            <p className="mt-1 text-[1.1rem] font-[700]">Ref. {listing.id}</p>
            <ul className="v2-mono mt-2 flex gap-3 text-[0.78rem] text-white/95">
              <li className="inline-flex items-center gap-1"><BedDouble size={12} /> {listing.specs.dormitorios}</li>
              <li className="inline-flex items-center gap-1"><Bath size={12} /> {listing.specs.baños}</li>
              <li className="inline-flex items-center gap-1"><Ruler size={12} /> {listing.areas.cubierta} m²</li>
              <li className="inline-flex items-center gap-1"><Car size={12} /> {listing.specs.cocheras}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div
        ref={stripRef}
        onPointerEnter={() => setStripPaused(true)}
        onPointerLeave={() => setStripPaused(false)}
        onFocus={() => setStripPaused(true)}
        onBlur={() => setStripPaused(false)}
        className="relative flex gap-2 overflow-x-auto border-t border-[var(--color-divider)] bg-[var(--color-surface)] p-2 v2-edge-fade"
      >
        {listing.gallery.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveIdx(i)}
            aria-label={`Ver foto ${i + 1}: ${p.caption ?? p.alt}`}
            className={`relative h-20 w-28 shrink-0 overflow-hidden border ${i === activeIdx ? 'border-[var(--color-accent-warm)]' : 'border-[var(--color-divider)]'} md:h-24 md:w-36`}
          >
            <img src={p.src} alt={p.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </section>
  );
}
