import { REGIONS, type Region } from '@c21/shared';

/**
 * Stylised Argentina map. Not geographically precise — a schematic grouping of
 * 24 province paths laid out roughly north-to-south. Each path is focusable
 * and hoverable; the active key is lifted to the parent for the side panel.
 *
 * Layout groups: Noroeste & Noreste across the top; Centro + Cuyo in the
 * middle; Buenos Aires cluster on the east; Patagonia ranged down the bottom.
 */
export function ArgentinaMap({
  activeKey,
  onActivate,
}: {
  activeKey: string | null;
  onActivate: (key: string) => void;
}) {
  // Position map: each region gets a rectangle-ish path on the 1000x1200 canvas.
  const POSITIONS: Record<string, [number, number, number, number]> = {
    // Noroeste (top band)
    jujuy: [380, 30, 120, 130],
    salta: [380, 170, 160, 140],
    'la-rioja': [300, 320, 130, 140],
    catamarca: [350, 460, 130, 120],
    tucuman: [460, 320, 90, 140],
    // Noreste (top right)
    formosa: [580, 40, 180, 120],
    chaco: [560, 170, 180, 120],
    corrientes: [720, 200, 150, 150],
    misiones: [870, 120, 110, 160],
    // Centro + Cuyo
    'santiago': [500, 460, 130, 120],
    'san-juan': [300, 470, 130, 140],
    cordoba: [440, 580, 150, 160],
    'santa-fe': [600, 360, 140, 250],
    'entre-rios': [720, 370, 120, 180],
    'san-luis': [300, 610, 130, 130],
    'la-pampa': [300, 740, 280, 120],
    // Buenos Aires cluster (east)
    caba: [770, 580, 40, 40],
    'bsas-prov': [600, 620, 240, 180],
    'gba-norte': [750, 560, 60, 25],
    'gba-oeste': [735, 600, 30, 30],
    'gba-sur': [755, 625, 40, 30],
    'bsas-costa': [820, 680, 30, 110],
    // Patagonia
    neuquen: [300, 860, 200, 90],
    'rio-negro': [300, 950, 360, 70],
    chubut: [300, 1020, 380, 80],
    'santa-cruz': [300, 1100, 360, 80],
    'tierra-del-fuego': [300, 1180, 180, 20],
  };

  return (
    <div className="relative w-full" role="group" aria-label="Mapa de Argentina por provincia">
      <svg
        viewBox="0 0 1000 1220"
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={false}
      >
        {/* Ocean / Chile outline hint */}
        <rect x="0" y="0" width="1000" height="1220" fill="transparent" />
        <defs>
          <linearGradient id="ocean" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-surface)" />
            <stop offset="1" stopColor="var(--color-bg)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1000" height="1220" fill="url(#ocean)" />

        {/* Argentina outline hint (just a faint box to hold the schematic) */}
        <rect
          x="260"
          y="20"
          width="740"
          height="1190"
          fill="none"
          stroke="var(--color-divider)"
          strokeDasharray="4 6"
          strokeWidth="1"
        />

        {REGIONS.map((r: Region) => {
          const pos = POSITIONS[r.key];
          if (!pos) return null;
          const [x, y, w, h] = pos;
          const active = r.key === activeKey;
          return (
            <g key={r.key}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={6}
                className="v2-province cursor-pointer"
                data-active={active}
                role="button"
                aria-label={`${r.label} — ${r.group}`}
                tabIndex={0}
                onClick={() => onActivate(r.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onActivate(r.key);
                  }
                }}
              />
              {w > 80 && h > 50 && (
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 4}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="var(--font-mono)"
                  className={active ? 'fill-white' : 'fill-[color:var(--color-ink-mute)]'}
                  style={{ pointerEvents: 'none', letterSpacing: '0.04em' }}
                >
                  {shortLabel(r.label)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function shortLabel(label: string): string {
  return label
    .replace('Buenos Aires ', 'BA ')
    .replace('Capital Federal', 'CABA')
    .replace('Santiago del Estero', 'Sgo. del Estero')
    .replace('Tierra del Fuego', 'T. del Fuego')
    .replace('Buenos Aires (provincia)', 'Bs. As.');
}
