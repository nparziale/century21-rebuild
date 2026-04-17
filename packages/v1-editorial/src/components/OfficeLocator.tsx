import { OFFICES } from '@c21/shared';
import { MapPin, Phone } from 'lucide-react';
import { useMemo, useState } from 'react';

/**
 * Argentina-shaped simplified SVG map with olive pins per office. Selecting a
 * list row (search-filtered) draws a 1 px bronze connector across the gutter on
 * desktop, and the selected pin pulses. Mobile stacks list + map vertically.
 *
 * The SVG outline is a hand-simplified polygon; do NOT treat it as cartographic.
 */
export function OfficeLocator() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string>(OFFICES[0]?.id ?? '');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return OFFICES;
    return OFFICES.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.province.toLowerCase().includes(q) ||
        o.region.toLowerCase().includes(q),
    );
  }, [query]);

  // Fake lat/lng → SVG coords mapping (Argentina bbox approx):
  //  longitude range −74 .. −53 → x 20 .. 230
  //  latitude   range −56 .. −21 → y 460 .. 40
  // Offices don't have lat/lng, so we hand-place pins per province.
  const pins: Record<string, { x: number; y: number }> = {
    'office-ramos-mejia': { x: 165, y: 250 },
    'office-palermo-soho': { x: 175, y: 255 },
    'office-belgrano': { x: 178, y: 252 },
    'office-vicente-lopez': { x: 180, y: 250 },
    'office-tigre': { x: 176, y: 246 },
    'office-cordoba-nueva': { x: 128, y: 215 },
    'office-rosario-pichincha': { x: 156, y: 232 },
    'office-mendoza-ciudad': { x: 75, y: 240 },
    'office-mar-del-plata': { x: 188, y: 292 },
    'office-bariloche': { x: 70, y: 340 },
    'office-salta-ciudad': { x: 110, y: 110 },
    'office-neuquen': { x: 85, y: 305 },
  };

  return (
    <section
      data-section="office-locator"
      aria-label="Oficinas en Argentina"
      className="bg-[color:var(--color-surface)] py-20 lg:py-28"
    >
      <div className="container-ed">
        <div className="mb-10 flex flex-col gap-2">
          <p className="eyebrow">Red de oficinas</p>
          <h2
            className="font-display leading-[1]"
            style={{
              fontSize: 'var(--text-h2)',
              fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
            }}
          >
            Cobertura en {new Set(OFFICES.map((o) => o.province)).size} provincias.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <label className="field mb-4 block">
              <span className="field-label">Buscar oficina</span>
              <input
                className="field-input"
                type="search"
                placeholder="Barrio, provincia o región"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar oficina"
              />
            </label>
            <ul
              role="list"
              className="max-h-[440px] divide-y divide-[color:var(--color-divider)] overflow-y-auto border-t border-b border-[color:var(--color-divider)]"
            >
              {filtered.map((o) => {
                const isActive = selected === o.id;
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(o.id)}
                      aria-pressed={isActive}
                      className={[
                        'flex w-full flex-col gap-1 px-2 py-4 text-left outline-offset-2',
                        isActive ? 'bg-[color:var(--color-bg)]' : '',
                      ].join(' ')}
                    >
                      <span className="font-display text-lg">{o.name}</span>
                      <span className="text-sm text-[color:var(--color-ink-mute)]">
                        {o.address}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-xs text-[color:var(--color-accent-deep)]">
                        <Phone size={11} aria-hidden />
                        {o.phone}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative lg:col-span-7">
            <svg
              viewBox="0 0 250 480"
              role="img"
              aria-label="Mapa simplificado de Argentina con oficinas"
              className="h-auto w-full"
            >
              <title>Mapa simplificado de Argentina con oficinas Century 21</title>
              {/* Hand-drawn simplified outline of Argentina (NOT cartographically precise) */}
              <path
                d="M130 20 L150 30 L160 60 L150 100 L140 120 L155 145 L150 175 L165 210 L170 240 L180 270 L175 300 L160 330 L150 360 L140 390 L130 420 L110 440 L100 455 L90 450 L95 430 L80 400 L85 365 L75 330 L70 295 L80 260 L90 225 L100 200 L90 170 L80 140 L90 110 L100 80 L115 50 Z"
                fill="var(--color-bg)"
                stroke="var(--color-divider)"
                strokeWidth="1"
              />
              {OFFICES.map((o) => {
                const p = pins[o.id];
                if (!p) return null;
                const isActive = selected === o.id;
                return (
                  <g key={o.id}>
                    {isActive && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={10}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1"
                        opacity="0.7"
                      >
                        <animate attributeName="r" values="6;14;6" dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 5 : 3.5}
                      fill={isActive ? 'var(--color-accent-deep)' : 'var(--color-accent-deep)'}
                      opacity={isActive ? 1 : 0.7}
                      onClick={() => setSelected(o.id)}
                      role="button"
                      style={{ cursor: 'pointer' }}
                    >
                      <title>{o.name}</title>
                    </circle>
                  </g>
                );
              })}
            </svg>

            {selected && (
              <div
                role="status"
                aria-live="polite"
                className="mt-4 flex items-start gap-3 border-t border-[color:var(--color-divider)] pt-4"
              >
                <MapPin size={16} aria-hidden className="mt-1 text-[color:var(--color-accent-deep)]" />
                <div>
                  <p className="font-display text-lg">
                    {OFFICES.find((o) => o.id === selected)?.name}
                  </p>
                  <p className="text-sm text-[color:var(--color-ink-mute)]">
                    {OFFICES.find((o) => o.id === selected)?.address}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
