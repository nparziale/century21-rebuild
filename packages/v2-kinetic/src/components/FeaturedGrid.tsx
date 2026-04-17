import { motion } from 'motion/react';
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react';
import { FEATURED_LISTINGS, unsplashUrl, unsplashSrcSet } from '@c21/shared';
import { formatMoney } from '../lib/format.ts';
import { Link } from 'react-router-dom';

/**
 * Featured section — responsive grid (1/2/4 cols). Stagger reveal on intersection.
 */
export function FeaturedGrid() {
  return (
    <section data-section="featured" className="zone-neutral bg-[var(--color-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <header className="mb-8 flex items-end justify-between md:mb-10">
          <div>
            <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
              Inventario seleccionado
            </p>
            <h2 className="mt-2 text-[var(--text-h2)] font-[700] leading-[0.95] tracking-[-0.015em]">
              Propiedades destacadas
            </h2>
          </div>
          <Link
            to="/propiedad/286194"
            className="v2-mono hidden md:inline-block text-[0.8rem] uppercase tracking-[0.2em] underline decoration-[var(--color-accent-warm)] decoration-2 underline-offset-4 hover:text-[var(--color-accent-warm)]"
          >
            Ver todas
          </Link>
        </header>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_LISTINGS.slice(0, 8).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item }: { item: (typeof FEATURED_LISTINGS)[number] }) {
  const isReal = item.id === '286194';
  return (
    <Link
      to={isReal ? `/propiedad/${item.id}` : `/propiedad/286194`}
      className="group block border border-[var(--color-divider)] bg-white transition-colors hover:border-[var(--color-ink)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-surface)]">
        <img
          src={unsplashUrl(item.photoUnsplashId, 960)}
          srcSet={unsplashSrcSet(item.photoUnsplashId)}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw"
          alt={item.photoAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 v2-mono bg-[var(--color-ink)] px-2 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-bg)]">
          {item.operation}
        </span>
      </div>
      <div className="p-4">
        <p className="v2-mono flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
          <MapPin size={12} aria-hidden />
          {item.neighborhood} · {item.province}
        </p>
        <h3 className="mt-2 text-[1rem] font-[600] leading-snug line-clamp-2">{item.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <p className="v2-mono text-[1.05rem] font-[700]">{formatMoney(item.price, { compact: true })}</p>
          <ul className="flex gap-3 text-[0.72rem] text-[var(--color-ink-mute)]">
            <li className="inline-flex items-center gap-1" title="Dormitorios">
              <BedDouble size={14} aria-hidden /> {item.specsShort.dormitorios}
            </li>
            <li className="inline-flex items-center gap-1" title="Baños">
              <Bath size={14} aria-hidden /> {item.specsShort.baños}
            </li>
            <li className="inline-flex items-center gap-1 v2-mono" title="Cubierta m²">
              <Ruler size={14} aria-hidden /> {item.specsShort.cubierta}m²
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
}
