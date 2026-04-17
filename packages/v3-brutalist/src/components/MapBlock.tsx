import type { Listing } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

type Props = { listing: Listing };

const POIs = [
  { label: 'Estación Ramos Mejía (Sarmiento)', distance: '550 m', kind: 'Transporte' },
  { label: 'Av. de Mayo 100', distance: '300 m', kind: 'Comercial' },
  { label: 'Hospital Posadas', distance: '2,1 km', kind: 'Salud' },
  { label: 'Plaza Ramos Mejía', distance: '420 m', kind: 'Espacios verdes' },
  { label: 'Colegio Marín', distance: '900 m', kind: 'Educación' },
];

export function MapBlock({ listing }: Props) {
  return (
    <section data-section="map">
      <FolioRule sectionNumber={9} label="UBICACIÓN" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Ubicación y alrededores
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            09 / 15
          </span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
          <div className="xl:col-span-8 border border-black bg-white">
            <svg
              viewBox="0 0 400 240"
              role="img"
              aria-label={`Mapa esquemático de ${listing.address.neighborhood}`}
              className="w-full h-auto block"
            >
              {/* Street grid */}
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  x2={400}
                  y1={(i + 1) * 28}
                  y2={(i + 1) * 28}
                  stroke="#d9d9d9"
                  strokeWidth={0.7}
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={(i + 1) * 28}
                  x2={(i + 1) * 28}
                  y1={0}
                  y2={240}
                  stroke="#d9d9d9"
                  strokeWidth={0.7}
                />
              ))}
              {/* Avenida */}
              <line x1={0} x2={400} y1={112} y2={112} stroke="#0a0a0a" strokeWidth={2} />
              <text x={4} y={108} fontSize={8} fontFamily="JetBrains Mono" fill="#0a0a0a">
                AV. DE MAYO
              </text>
              {/* Rail */}
              <line
                x1={0}
                x2={400}
                y1={36}
                y2={36}
                stroke="#0a0a0a"
                strokeWidth={1}
                strokeDasharray="6 4"
              />
              <text x={4} y={32} fontSize={8} fontFamily="JetBrains Mono" fill="#0a0a0a">
                FFCC SARMIENTO
              </text>
              {/* Pin */}
              <g>
                <circle cx={196} cy={148} r={8} fill="#FF3B1F" />
                <circle cx={196} cy={148} r={2.5} fill="#ffffff" />
                <text
                  x={206}
                  y={146}
                  fontSize={9}
                  fontFamily="Anton, sans-serif"
                  fill="#0a0a0a"
                >
                  286194
                </text>
              </g>
            </svg>
            <p
              className="p-3 border-t border-black mono text-[11px] uppercase tracking-widest flex items-center justify-between"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>Mapa esquemático · no a escala</span>
              <span>
                LAT {listing.address.lat.toFixed(4)} · LNG {listing.address.lng.toFixed(4)}
              </span>
            </p>
          </div>
          <dl className="xl:col-span-4 border border-black divide-y divide-black">
            {POIs.map((p) => (
              <div key={p.label} className="p-4 flex items-baseline justify-between gap-4">
                <div>
                  <dt
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                  >
                    {p.label}
                  </dt>
                  <p
                    className="uppercase text-[10px] tracking-widest"
                    style={{ color: 'var(--color-ink-mute)' }}
                  >
                    {p.kind}
                  </p>
                </div>
                <dd
                  className="mono text-sm shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {p.distance}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
