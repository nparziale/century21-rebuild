/**
 * V3 — stylised Argentina SVG. Not geographically precise: a brutalist
 * 10-rectangle stacking that suggests the silhouette with province labels.
 * Caller passes pins (by province name) — we place them on rough cells.
 *
 * Open item for main Claude: swap this with a mapshaper-processed
 * simplified provincias boundary SVG for visual accuracy.
 */

type Pin = { province: string; label: string };

type Props = {
  pins: readonly Pin[];
  highlight?: string;
};

// Rough cell positions (percent units in a 100x140 viewBox) per province.
const CELLS: Record<string, { x: number; y: number }> = {
  Jujuy: { x: 22, y: 8 },
  Salta: { x: 28, y: 18 },
  Formosa: { x: 60, y: 16 },
  Chaco: { x: 58, y: 28 },
  Tucumán: { x: 32, y: 28 },
  Catamarca: { x: 26, y: 38 },
  'La Rioja': { x: 24, y: 48 },
  'Santiago del Estero': { x: 44, y: 36 },
  Misiones: { x: 78, y: 24 },
  Corrientes: { x: 68, y: 34 },
  'Entre Ríos': { x: 66, y: 50 },
  'Santa Fe': { x: 54, y: 48 },
  Córdoba: { x: 40, y: 54 },
  'San Juan': { x: 20, y: 56 },
  Mendoza: { x: 18, y: 68 },
  'San Luis': { x: 32, y: 64 },
  'La Pampa': { x: 38, y: 74 },
  'Buenos Aires': { x: 54, y: 70 },
  'Capital Federal': { x: 60, y: 66 },
  Neuquén: { x: 24, y: 82 },
  'Río Negro': { x: 32, y: 90 },
  Chubut: { x: 34, y: 102 },
  'Santa Cruz': { x: 30, y: 118 },
  'Tierra del Fuego': { x: 34, y: 132 },
};

export function ArgentinaMap({ pins, highlight }: Props) {
  return (
    <svg
      viewBox="0 0 100 140"
      role="img"
      aria-label="Mapa estilizado de Argentina con oficinas Century 21"
      className="w-full h-auto block border border-black bg-white"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Outline — crude silhouette */}
      <path
        d="M30 4 L40 2 L52 6 L62 10 L68 14 L72 20 L66 28 L72 34 L80 36 L82 44 L76 52 L70 60 L66 72 L58 82 L50 90 L44 100 L40 112 L36 122 L34 134 L30 138 L26 134 L24 124 L22 112 L20 100 L22 88 L20 76 L14 68 L18 56 L16 46 L22 36 L18 26 L20 16 L24 10 Z"
        fill="#f5f5f5"
        stroke="#0a0a0a"
        strokeWidth="0.5"
      />
      {Object.entries(CELLS).map(([name, cell]) => {
        const active = pins.some((p) => p.province === name) || highlight === name;
        return (
          <g key={name}>
            <circle
              cx={cell.x}
              cy={cell.y}
              r={active ? 1.6 : 0.8}
              fill={active ? '#FF3B1F' : '#0a0a0a'}
              data-accent={active ? 'tango' : undefined}
            />
          </g>
        );
      })}
      {pins.map((p) => {
        const cell = CELLS[p.province];
        if (!cell) return null;
        return (
          <g key={p.label}>
            <line
              x1={cell.x}
              y1={cell.y}
              x2={cell.x + 6}
              y2={cell.y - 4}
              stroke="#0a0a0a"
              strokeWidth="0.3"
            />
            <text
              x={cell.x + 6.5}
              y={cell.y - 3.5}
              fontSize="2.6"
              fontFamily="JetBrains Mono, monospace"
              fill="#0a0a0a"
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
