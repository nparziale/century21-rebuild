import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { FEATURED_LISTINGS, unsplashUrl, unsplashSrcSet, type FeaturedCard } from '@c21/shared';
import { formatMoney } from '../lib/format.ts';
import { useReducedMotion } from '../lib/useReducedMotion.ts';

/**
 * Marquee row. Mobile: 1 row 18 px/s. Desktop: configurable rows @ 24 px/s in
 * opposing directions. 320x200 thumbnails + neighborhood label + mono price.
 * Visible Pausar control satisfies WCAG 2.2.2. Reduced-motion → static grid.
 */
export function Marquee({
  items = FEATURED_LISTINGS,
  direction = 'left',
  speed = 24,
}: {
  items?: readonly FeaturedCard[];
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Figure out duration based on width at mount/resize.
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const setDur = () => {
      const width = track.scrollWidth / 2; // duplicated
      const dur = width / speed;
      track.style.setProperty('--marquee-dur', `${dur}s`);
    };
    setDur();
    const ro = new ResizeObserver(setDur);
    ro.observe(track);
    return () => ro.disconnect();
  }, [speed]);

  if (reduced) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.slice(0, 4).map((i) => (
          <MarqueeCard key={i.id} item={i} />
        ))}
        <a
          href="/"
          className="col-span-2 md:col-span-4 v2-mono inline-block text-[0.8rem] uppercase tracking-[0.18em] text-[var(--color-accent-cool)] underline"
        >
          Ver todas las propiedades
        </a>
      </div>
    );
  }

  // Duplicate for seamless loop
  const dup = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`v2-marquee relative overflow-x-auto md:overflow-hidden v2-edge-fade ${paused ? 'v2-marquee-paused' : ''}`}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          setPaused((p) => !p);
        }
      }}
    >
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Reanudar marquesina' : 'Pausar marquesina'}
        className="v2-tap absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-divider)] bg-white/95 text-[var(--color-ink)] shadow"
      >
        {paused ? <Play size={14} /> : <Pause size={14} />}
      </button>
      <div
        ref={trackRef}
        className="v2-marquee-track"
        data-dir={direction === 'right' ? 'right' : 'left'}
      >
        {dup.map((item, idx) => (
          <MarqueeCard
            key={`${item.id}-${idx}`}
            item={item}
            onFocus={() => setPaused(true)}
            onBlur={() => setTimeout(() => setPaused(false), 800)}
          />
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({
  item,
  onFocus,
  onBlur,
}: {
  item: FeaturedCard;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <a
      href={item.id === '286194' ? `/propiedad/${item.id}` : `/?id=${item.id}`}
      className="group relative block w-[320px] shrink-0 border border-[var(--color-divider)] bg-white hover:border-[var(--color-ink)]"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface)]">
        <img
          src={unsplashUrl(item.photoUnsplashId, 640)}
          srcSet={unsplashSrcSet(item.photoUnsplashId)}
          sizes="320px"
          alt={item.photoAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-3 py-2.5">
        <div>
          <p className="v2-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
            {item.neighborhood} · {item.province}
          </p>
          <p className="text-[0.88rem] font-[600] leading-tight line-clamp-1">{item.title}</p>
        </div>
        <p className="v2-mono text-[0.85rem] font-[600]">{formatMoney(item.price, { compact: true })}</p>
      </div>
    </a>
  );
}
