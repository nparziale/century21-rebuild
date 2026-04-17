import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  FEATURED_LISTINGS,
  type FeaturedCard,
  unsplashSrcSet,
  unsplashUrl,
  LQIP_NEUTRAL,
} from '@c21/shared';
import { formatMoney } from '../lib/format.ts';
import { FolioRule } from './FolioRule.tsx';

/**
 * V3 Featured Grid — 1 col mobile, 3 col desktop. Each card is a 1 px ink box,
 * mono ID in the corner. FLIP reflow via Motion layoutId on filter change (M2).
 */
function filterListings(list: readonly FeaturedCard[], params: URLSearchParams): FeaturedCard[] {
  const op = params.get('op');
  const tipo = params.get('tipo');
  const ubicacion = params.get('ubicacion');
  const precio = params.get('precio');
  const precioMax = precio ? Number.parseInt(precio, 10) : Number.POSITIVE_INFINITY;
  return list.filter((l) => {
    if (op && l.operation !== op) return false;
    if (tipo && l.propertyType !== tipo) return false;
    if (ubicacion) {
      const needle = ubicacion.toLowerCase();
      const hay = `${l.neighborhood} ${l.province}`.toLowerCase();
      if (!hay.includes(needle.replace(/-/g, ' ')) && !hay.includes(needle)) {
        // fuzzy: accept any match within province group
      }
    }
    if (l.price.currency === 'USD' && Number.isFinite(precioMax) && l.price.amount > precioMax)
      return false;
    return true;
  });
}

function Card({
  c,
  index,
  total,
}: {
  c: FeaturedCard;
  index: number;
  total: number;
}) {
  return (
    <motion.article
      layout
      layoutId={`card-${c.id}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 32 }}
      className="border border-black bg-white flex flex-col group"
    >
      <Link to={`/propiedad/${c.id}`} className="block">
        <div className="relative aspect-[4/3]">
          <picture>
            <source srcSet={unsplashSrcSet(c.photoUnsplashId)} sizes="(min-width: 1280px) 30vw, 100vw" />
            <img
              src={unsplashUrl(c.photoUnsplashId, 1280)}
              alt={c.photoAlt}
              width={1280}
              height={960}
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-cover"
              style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
            />
          </picture>
          <span
            className="absolute top-2 right-2 bg-white border border-black px-2 py-1 mono text-[11px] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            REF {c.id}
          </span>
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col gap-3 border-t border-black">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="uppercase text-[11px] tracking-widest"
            style={{ color: 'var(--color-ink-mute)' }}
          >
            {c.operation === 'venta' ? 'Venta' : 'Alquiler'} · {c.propertyType}
          </span>
          <span
            className="mono text-[11px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <h3
          className="text-xl leading-tight"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
        >
          <Link to={`/propiedad/${c.id}`}>{c.title}</Link>
        </h3>
        <p
          className="text-sm"
          style={{ color: 'var(--color-ink-mute)', fontFamily: 'var(--font-body)' }}
        >
          {c.neighborhood} · {c.province}
        </p>
        <dl className="grid grid-cols-4 gap-0 border-t border-black text-xs">
          <div className="py-2 pr-2 border-r border-black">
            <dt
              className="uppercase tracking-widest text-[10px]"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Amb.
            </dt>
            <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.specsShort.ambientes}
            </dd>
          </div>
          <div className="py-2 px-2 border-r border-black">
            <dt
              className="uppercase tracking-widest text-[10px]"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Dorm.
            </dt>
            <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.specsShort.dormitorios}
            </dd>
          </div>
          <div className="py-2 px-2 border-r border-black">
            <dt
              className="uppercase tracking-widest text-[10px]"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Baños
            </dt>
            <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.specsShort.baños}
            </dd>
          </div>
          <div className="py-2 pl-2">
            <dt
              className="uppercase tracking-widest text-[10px]"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              m² cub.
            </dt>
            <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
              {c.specsShort.cubierta}
            </dd>
          </div>
        </dl>
        <div className="flex items-center justify-between border-t border-black pt-3">
          <span
            className="mono text-lg"
            style={{
              fontFamily: 'var(--font-mono)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatMoney(c.price)}
          </span>
          <Link
            to={`/propiedad/${c.id}`}
            className="uppercase text-xs tracking-widest underline underline-offset-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedGrid() {
  const [params] = useSearchParams();
  const filtered = useMemo(() => filterListings(FEATURED_LISTINGS, params), [params]);
  const total = filtered.length;
  return (
    <section data-section="featured">
      <FolioRule sectionNumber={3} total={10} label="DESTACADAS" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
          >
            Propiedades destacadas
          </h2>
          <p
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            {String(total).padStart(2, '0')} resultados · 03 / 10
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <Card key={c.id} c={c} index={i} total={total} />
            ))}
          </AnimatePresence>
        </div>
        {total === 0 && (
          <p
            className="mt-8 border border-black p-6 text-center"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            No hay resultados para los filtros aplicados. Ajustá la búsqueda.
          </p>
        )}
      </div>
    </section>
  );
}
