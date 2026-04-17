import { SIMILAR_LISTINGS, unsplashSrcSet, unsplashUrl } from '@c21/shared';
import type { FeaturedCard } from '@c21/shared';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../lib/format';

/**
 * Three similar properties at the bottom of a listing detail page. Italic
 * captions per spec. Desktop 3-up; mobile snap track.
 */
export function SimilarListings() {
  return (
    <section
      data-section="similar"
      aria-label="Propiedades similares"
      className="bg-[color:var(--color-bg)] py-16 lg:py-24"
    >
      <div className="container-ed">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Relacionadas</p>
            <h2
              className="mt-2 font-display leading-[1]"
              style={{
                fontSize: 'var(--text-h2)',
                fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
              }}
            >
              Otras casas similares.
            </h2>
          </div>
          <a href="/?op=venta&tipo=casa" className="link-bronze text-sm">
            Ver más casas
          </a>
        </div>
        <ul className="hidden md:grid md:grid-cols-3 md:gap-8">
          {SIMILAR_LISTINGS.map((l) => (
            <li key={l.id}>
              <Card l={l} />
            </li>
          ))}
        </ul>
        <ul className="snap-track md:hidden">
          {SIMILAR_LISTINGS.map((l) => (
            <li key={l.id} className="w-[85vw]">
              <Card l={l} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Card({ l }: { l: FeaturedCard }) {
  return (
    <Link to={`/propiedad/${l.id}`} className="group flex flex-col gap-3">
      <div className="overflow-hidden bg-[color:var(--color-surface)]">
        <picture>
          <source srcSet={unsplashSrcSet(l.photoUnsplashId)} sizes="(min-width: 768px) 30vw, 85vw" />
          <img
            src={unsplashUrl(l.photoUnsplashId, 1280)}
            alt={l.photoAlt}
            loading="lazy"
            decoding="async"
            width={1280}
            height={960}
            className="block aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </picture>
      </div>
      <p className="font-italic text-lg leading-tight text-[color:var(--color-ink)]">{l.title}</p>
      <p className="text-xs text-[color:var(--color-ink-mute)]">
        {l.neighborhood}, {l.province}
      </p>
      <p className="font-mono text-sm text-[color:var(--color-ink)]">{formatMoney(l.price)}</p>
      <span className="link-bronze inline-flex items-center gap-1 text-xs">
        Ver propiedad <ArrowRight size={11} aria-hidden />
      </span>
    </Link>
  );
}
