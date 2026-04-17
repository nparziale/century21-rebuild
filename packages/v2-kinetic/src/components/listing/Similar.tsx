import { Link } from 'react-router-dom';
import { BedDouble, Bath, Ruler } from 'lucide-react';
import { SIMILAR_LISTINGS, unsplashUrl, unsplashSrcSet } from '@c21/shared';
import { formatMoney } from '../../lib/format.ts';

/**
 * Similar. Mobile: horizontal snap scroll. Desktop: 4-col grid (no marquee).
 */
export function Similar() {
  return (
    <section data-section="similar" className="zone-neutral border-t border-[var(--color-divider)] bg-[var(--color-surface)] py-14 md:py-20">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Propiedades similares
        </p>
        <h2 className="mt-2 text-[var(--text-h3)] font-[700] leading-[1.05] tracking-[-0.01em]">
          En el corredor oeste.
        </h2>
      </div>

      {/* Mobile snap */}
      <div className="mt-8 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory md:hidden v2-edge-fade">
        <div className="flex gap-4 w-max pr-4">
          {SIMILAR_LISTINGS.map((x) => (
            <div key={x.id} className="w-[82vw] max-w-[360px] snap-start shrink-0">
              <Card item={x} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="mx-auto mt-8 hidden max-w-[var(--container-max)] px-4 md:block md:px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SIMILAR_LISTINGS.map((x) => (
            <Card key={x.id} item={x} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: (typeof SIMILAR_LISTINGS)[number] }) {
  return (
    <Link
      to={`/propiedad/${item.id}`}
      className="group block border border-[var(--color-divider)] bg-white transition-colors hover:border-[var(--color-ink)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]">
        <img
          src={unsplashUrl(item.photoUnsplashId, 960)}
          srcSet={unsplashSrcSet(item.photoUnsplashId)}
          sizes="(min-width: 1024px) 30vw, 50vw"
          alt={item.photoAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-4">
        <p className="v2-mono text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
          {item.neighborhood} · {item.province}
        </p>
        <p className="mt-1 text-[1rem] font-[600] leading-snug line-clamp-1">{item.title}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="v2-mono text-[1rem] font-[700]">{formatMoney(item.price, { compact: true })}</p>
          <ul className="flex gap-3 text-[0.72rem] text-[var(--color-ink-mute)]">
            <li className="inline-flex items-center gap-1"><BedDouble size={12} /> {item.specsShort.dormitorios}</li>
            <li className="inline-flex items-center gap-1"><Bath size={12} /> {item.specsShort.baños}</li>
            <li className="inline-flex items-center gap-1 v2-mono"><Ruler size={12} /> {item.specsShort.cubierta}m²</li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
