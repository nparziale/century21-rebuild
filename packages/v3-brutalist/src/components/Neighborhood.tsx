import type { Listing } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { Counter } from './Counter.tsx';

type Props = { listing: Listing };

// Plausible, stable counts for Ramos Mejía — rendered as mockup data.
const NEIGHBORHOOD_STATS = {
  transporte: 14,
  escuelas: 22,
  comercios: 180,
  hospitales: 3,
  espaciosVerdes: 6,
};

export function Neighborhood({ listing }: Props) {
  return (
    <section data-section="neighborhood">
      <FolioRule sectionNumber={8} label="BARRIO" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            {listing.address.neighborhood}
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            08 / 15 · {listing.address.city}, {listing.address.province}
          </span>
        </div>
        <p
          className="max-w-[62ch] text-[17px]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Barrio residencial del oeste del Gran Buenos Aires. Línea Sarmiento, múltiples
          líneas de colectivo, Av. de Mayo como eje comercial. Arbolado maduro, casas
          sobre lote propio y edificios bajos. Cobertura de salud privada y pública.
        </p>
        <dl className="mt-8 grid grid-cols-2 xl:grid-cols-5 gap-0 border border-black">
          <div className="p-5 border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Transporte
            </dt>
            <dd>
              <Counter
                as="div"
                value={NEIGHBORHOOD_STATS.transporte}
                className="text-4xl font-display"
              />
              <span className="text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                líneas
              </span>
            </dd>
          </div>
          <div className="p-5 xl:border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Escuelas
            </dt>
            <dd>
              <Counter
                as="div"
                value={NEIGHBORHOOD_STATS.escuelas}
                className="text-4xl font-display"
              />
              <span className="text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                a 1 km
              </span>
            </dd>
          </div>
          <div className="p-5 border-t xl:border-t-0 border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Comercios
            </dt>
            <dd>
              <Counter
                as="div"
                value={NEIGHBORHOOD_STATS.comercios}
                className="text-4xl font-display"
              />
              <span className="text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                Av. de Mayo
              </span>
            </dd>
          </div>
          <div className="p-5 border-t xl:border-t-0 xl:border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Hospitales
            </dt>
            <dd>
              <Counter
                as="div"
                value={NEIGHBORHOOD_STATS.hospitales}
                className="text-4xl font-display"
              />
              <span className="text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                cercanos
              </span>
            </dd>
          </div>
          <div className="p-5 border-t xl:border-t-0 col-span-2 xl:col-span-1">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Plazas
            </dt>
            <dd>
              <Counter
                as="div"
                value={NEIGHBORHOOD_STATS.espaciosVerdes}
                className="text-4xl font-display"
              />
              <span className="text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                espacios verdes
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
