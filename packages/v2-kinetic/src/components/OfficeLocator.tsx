import { useMemo, useState } from 'react';
import { REGIONS, OFFICES, AGENTS, unsplashUrl, type Region } from '@c21/shared';
import { ArgentinaMap } from './ArgentinaMap.tsx';

/**
 * Office locator. Mobile: dropdown + list. Desktop: interactive Argentina SVG
 * map — province hover reveals a right side panel with office count, 3 agent
 * avatars (overlap -8 px) and a mini listings sparkline. Zone: neutral.
 */
export function OfficeLocator() {
  const [activeKey, setActiveKey] = useState<string | null>('caba');
  const active: Region | null = useMemo(
    () => REGIONS.find((r) => r.key === activeKey) ?? null,
    [activeKey],
  );
  const offices = useMemo(() => {
    if (!active) return [];
    return OFFICES.filter(
      (o) =>
        o.province.toLowerCase() === active.label.toLowerCase() ||
        (active.key === 'caba' && o.region === 'Capital Federal') ||
        (active.key === 'cordoba' && o.province === 'Córdoba') ||
        (active.key === 'santa-fe' && o.province === 'Santa Fe') ||
        (active.key === 'neuquen' && o.province === 'Neuquén') ||
        (active.key === 'salta' && o.province === 'Salta') ||
        (active.key === 'rio-negro' && o.province === 'Río Negro') ||
        (active.key === 'bsas-prov' && o.province === 'Buenos Aires'),
    );
  }, [active]);

  const featuredAgents = AGENTS.slice(0, 3);

  return (
    <section data-section="office-locator" className="zone-neutral bg-[var(--color-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
              Directorio de oficinas
            </p>
            <h2 className="mt-2 text-[var(--text-h2)] font-[700] leading-[0.95] tracking-[-0.015em]">
              28 provincias cubiertas
            </h2>
          </div>
          <p className="max-w-md text-[0.92rem] text-[var(--color-ink-mute)]">
            Elegí una provincia para ver oficinas y asesores activos en la zona.
          </p>
        </div>

        {/* Mobile province dropdown */}
        <div className="mt-8 md:hidden">
          <label htmlFor="mobile-province" className="v2-mono block text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
            Provincia
          </label>
          <select
            id="mobile-province"
            value={activeKey ?? ''}
            onChange={(e) => setActiveKey(e.target.value || null)}
            className="mt-2 w-full border border-[var(--color-divider)] bg-white px-3 py-3 text-[0.95rem]"
          >
            {REGIONS.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          {/* SVG map (desktop-prominent, still visible on mobile small) */}
          <div className="order-2 lg:order-1">
            <ArgentinaMap activeKey={activeKey} onActivate={setActiveKey} />
          </div>

          {/* Right side panel */}
          <aside
            aria-live="polite"
            className="order-1 border border-[var(--color-divider)] bg-white p-5 lg:order-2 lg:p-6"
          >
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-accent-cool)]">
              {active?.group ?? '—'}
            </p>
            <h3 className="mt-2 text-[1.6rem] font-[700] leading-tight">{active?.label ?? 'Seleccioná una provincia'}</h3>

            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <dt className="v2-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                  Oficinas
                </dt>
                <dd className="v2-mono mt-1 text-[1.6rem] font-[700] tabular-nums">{offices.length}</dd>
              </div>
              <div>
                <dt className="v2-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                  Asesores activos
                </dt>
                <dd className="v2-mono mt-1 text-[1.6rem] font-[700] tabular-nums">{Math.max(3, offices.length * 4)}</dd>
              </div>
            </dl>

            {/* Agent avatars */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex">
                {featuredAgents.map((a, i) => (
                  <img
                    key={a.id}
                    src={unsplashUrl(a.photoUnsplashId, 96)}
                    alt={`Avatar de ${a.name}`}
                    className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    style={{ marginLeft: i === 0 ? 0 : -8 }}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
              <p className="text-[0.82rem] text-[var(--color-ink-mute)]">
                Equipo local coordinado por la oficina más cercana.
              </p>
            </div>

            {/* Mini listings sparkline */}
            <div className="mt-6">
              <p className="v2-mono text-[0.66rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                Volumen de listados (últimas 12 semanas)
              </p>
              <Sparkline seed={active?.key ?? 'x'} />
            </div>

            {/* Offices list */}
            <ul className="mt-6 divide-y divide-[var(--color-divider)] border-t border-[var(--color-divider)]">
              {(offices.length === 0
                ? [{ id: 'none', name: 'Consultá por correo a la central.', address: 'Atención nacional', phone: '', email: '' }]
                : offices
              ).map((o) => (
                <li key={o.id} className="py-3">
                  <p className="text-[0.92rem] font-[600]">{o.name}</p>
                  <p className="v2-mono text-[0.78rem] text-[var(--color-ink-mute)]">{o.address}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Sparkline({ seed }: { seed: string }) {
  // deterministic-ish faux data
  let s = 0;
  for (let i = 0; i < seed.length; i++) s += seed.charCodeAt(i);
  const points = Array.from({ length: 12 }, (_, i) => {
    const v = (Math.sin((s + i) * 0.7) + 1) / 2;
    return 20 + v * 60;
  });
  const d = points.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 32} ${100 - y}`).join(' ');

  return (
    <svg viewBox="0 0 352 100" className="mt-2 w-full" role="img" aria-label="Gráfico de volumen">
      <path d={d} fill="none" stroke="var(--color-accent-cool)" strokeWidth="2" />
      <path d={`${d} L 352 100 L 0 100 Z`} fill="var(--color-accent-cool)" fillOpacity="0.12" />
    </svg>
  );
}
