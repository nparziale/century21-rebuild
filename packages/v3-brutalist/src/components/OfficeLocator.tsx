import { useMemo, useState } from 'react';
import { OFFICES } from '@c21/shared';
import { ArgentinaMap } from './ArgentinaMap.tsx';
import { FolioRule } from './FolioRule.tsx';

export function OfficeLocator() {
  const provinces = useMemo(() => {
    const set = new Set<string>();
    OFFICES.forEach((o) => set.add(o.province));
    return Array.from(set).sort();
  }, []);
  const [filter, setFilter] = useState<string>('');

  const visible = filter ? OFFICES.filter((o) => o.province === filter) : OFFICES;

  const pins = visible.map((o) => ({ province: o.province, label: o.name.replace('CENTURY 21 ', '') }));

  return (
    <section data-section="office-locator">
      <FolioRule sectionNumber={6} label="OFICINAS" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
          >
            Directorio de oficinas
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            06 / 13
          </span>
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6">
          <div className="col-span-4 xl:col-span-7 order-2 xl:order-1">
            <ArgentinaMap pins={pins} highlight={filter || undefined} />
            <p
              className="mt-2 mono text-[11px] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
            >
              Mapa de referencia · no a escala
            </p>
          </div>
          <div className="col-span-4 xl:col-span-5 order-1 xl:order-2 flex flex-col gap-4">
            <label className="field">
              <span>Filtrar por provincia</span>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">Todas</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <ol className="border border-black divide-y divide-black">
              {visible.map((o, i) => (
                <li key={o.id} className="p-4 flex items-start gap-4">
                  <span
                    className="mono text-xs mt-1 w-10 shrink-0"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-ink-mute)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="text-base"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                    >
                      {o.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--color-ink-mute)' }}>
                      {o.address}
                    </p>
                    <p
                      className="mt-1 mono text-xs uppercase tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      <a href={`tel:${o.phone.replace(/\s/g, '')}`}>{o.phone}</a>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
