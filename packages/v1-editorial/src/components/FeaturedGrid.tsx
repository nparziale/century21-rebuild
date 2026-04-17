import { FEATURED_LISTINGS, REGIONS, unsplashSrcSet, unsplashUrl } from '@c21/shared';
import type { FeaturedCard } from '@c21/shared';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { formatMoney } from '../lib/format';

/**
 * Three-up editorial grid on desktop with the middle card offset 48px low.
 * Horizontal snap track on mobile (85vw cards). Filters against URL search
 * params from SearchWidget. Labels are small-caps sans + Fraunces italic title.
 */
export function FeaturedGrid() {
  const [params] = useSearchParams();
  const op = params.get('op');
  const tipo = params.get('tipo');
  const zona = params.get('zona');
  const precioMax = params.get('precio');

  const zonaLabel = zona ? REGIONS.find((r) => r.key === zona)?.label : undefined;

  const filtered = FEATURED_LISTINGS.filter((l) => {
    if (op && l.operation !== op) return false;
    if (tipo && l.propertyType !== tipo) return false;
    if (zonaLabel) {
      const haystack = `${l.province} ${l.neighborhood}`.toLowerCase();
      if (!haystack.includes(zonaLabel.toLowerCase())) return false;
    }
    if (precioMax && l.price.amount > Number(precioMax)) return false;
    return true;
  });

  const list = filtered.length ? filtered : FEATURED_LISTINGS;
  const showingFiltered = filtered.length && filtered.length !== FEATURED_LISTINGS.length;

  return (
    <section
      id="featured"
      data-section="featured"
      aria-label="Selección editorial"
      className="bg-[color:var(--color-bg)] py-16 lg:py-24"
    >
      <div className="container-ed">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[48ch]">
            <p className="eyebrow">Selección del mes</p>
            <h2
              className="mt-2 font-display leading-[0.98]"
              style={{
                fontSize: 'var(--text-h2)',
                fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
              }}
            >
              Propiedades que elegimos mirar con detalle.
            </h2>
          </div>
          <p className="font-italic text-[color:var(--color-ink-mute)] text-sm md:max-w-[28ch]">
            {showingFiltered
              ? `${filtered.length} resultados para tu búsqueda.`
              : 'Curaduría editorial entre propiedades activas.'}
          </p>
        </div>

        {/* Desktop: 3-up editorial row, all cards top-aligned. Remaining cards
            live in a plainer 3-col block below so the page shows 6+ without
            feeling crowded. */}
        <ul className="hidden grid-cols-3 gap-x-8 gap-y-16 lg:grid">
          {list.slice(0, 3).map((l) => (
            <li key={l.id}>
              <Card l={l} featured />
            </li>
          ))}
        </ul>

        {list.length > 3 ? (
          <ul className="mt-16 hidden grid-cols-3 gap-x-8 gap-y-12 lg:grid">
            {list.slice(3, 6).map((l) => (
              <li key={l.id}>
                <Card l={l} />
              </li>
            ))}
          </ul>
        ) : null}

        {/* Mobile: vertical stack, max 4 cards, no carousel. */}
        <ul className="flex flex-col gap-12 lg:hidden">
          {list.slice(0, 4).map((l) => (
            <li key={l.id}>
              <Card l={l} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <a href="/?op=venta" className="link-bronze text-sm">
            Ver más propiedades
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({ l, featured = false }: { l: FeaturedCard; featured?: boolean }) {
  // Featured cards (the primary 3-up row) use a taller 3:4 portrait. The
  // secondary block uses a 4:3 landscape, which fills a wider-but-shorter
  // card without feeling lanky. Either way, no aspect-[4/5] (that read as
  // elongated postcards on a 3-col desktop grid).
  const imgAspect = featured ? 'aspect-[3/4]' : 'aspect-[4/3]';

  return (
    <Link
      to={`/propiedad/${l.id}`}
      className="group flex flex-col gap-4 outline-offset-4"
    >
      <div className="relative overflow-hidden bg-[color:var(--color-surface)]">
        <picture>
          <source
            srcSet={unsplashSrcSet(l.photoUnsplashId)}
            sizes="(min-width: 1024px) 30vw, 85vw"
          />
          <img
            src={unsplashUrl(l.photoUnsplashId, 1280)}
            alt={l.photoAlt}
            loading="lazy"
            decoding="async"
            className={`block ${imgAspect} w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]`}
          />
        </picture>
      </div>
      <div className="flex flex-col gap-2 border-t border-[color:var(--color-divider)] pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow">
            {l.operation === 'alquiler' ? 'Alquiler' : 'Venta'} · {l.propertyType}
          </p>
          <p className="font-mono text-sm text-[color:var(--color-ink)]">
            {formatMoney(l.price)}
            {l.operation === 'alquiler' ? ' /mes' : ''}
          </p>
        </div>
        <h3
          className="font-italic leading-[1.15] text-[color:var(--color-ink)]"
          style={{ fontSize: featured ? '1.5rem' : '1.25rem' }}
        >
          {l.title}
        </h3>
        <p className="text-sm text-[color:var(--color-ink-mute)]">
          {l.neighborhood}, {l.province}
        </p>
        <p className="font-mono text-xs text-[color:var(--color-ink-mute)]">
          {l.specsShort.ambientes} amb · {l.specsShort.dormitorios} dorm ·{' '}
          {l.specsShort.cubierta} m²
        </p>
        <span className="link-bronze mt-2 inline-flex items-center gap-1 text-sm">
          Ver propiedad
          <ArrowRight size={12} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
