import type { Listing } from '@c21/shared';
import { AMENITY_LABELS } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

type Props = { listing: Listing };

// Group amenities into logical clusters so they can be rule-separated.
const GROUPS: Array<{ label: string; keys: string[] }> = [
  {
    label: 'Exterior',
    keys: ['pileta', 'parrilla', 'quincho', 'jardin', 'patio', 'cochera-doble'],
  },
  {
    label: 'Servicios',
    keys: [
      'lavadero',
      'dependencia-servicio',
      'termotanque-gas',
      'calefaccion-radiadores',
      'aire-acondicionado',
      'tendedero',
    ],
  },
  {
    label: 'Seguridad',
    keys: ['alarma', 'seguridad-barrio', 'portón-automatizado'],
  },
  {
    label: 'Terminaciones',
    keys: [
      'pisos-madera',
      'ventanas-dvh',
      'toilette',
      'placares-empotrados',
      'cocina-integrada',
    ],
  },
];

export function Amenities({ listing }: Props) {
  const present = new Set(listing.amenities);
  return (
    <section data-section="amenities">
      <FolioRule sectionNumber={7} label="AMENITIES" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Servicios y amenities
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            07 / 15 · {listing.amenities.length} items
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-0 border border-black">
          {GROUPS.map((g, i) => (
            <div
              key={g.label}
              className={`p-5 border-black ${i < GROUPS.length - 1 ? 'border-b md:border-b-0 xl:border-r' : ''} ${i % 2 === 1 ? 'md:border-l xl:border-l-0' : ''}`}
            >
              <h3
                className="uppercase tracking-widest text-[11px] mb-3"
                style={{ color: 'var(--color-ink-mute)', fontFamily: 'var(--font-body)' }}
              >
                {g.label}
              </h3>
              <dl className="space-y-2">
                {g.keys.map((k) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 text-sm">
                    <dt style={{ fontFamily: 'var(--font-body)' }}>
                      {AMENITY_LABELS[k] ?? k}
                    </dt>
                    <dd
                      className="mono uppercase text-[11px] tracking-widest"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: present.has(k) ? 'var(--color-ink)' : 'var(--color-ink-mute)',
                      }}
                    >
                      {present.has(k) ? '✓ SÍ' : '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
