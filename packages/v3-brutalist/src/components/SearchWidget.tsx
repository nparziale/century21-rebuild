import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { REGIONS } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

/**
 * V3 SearchWidget — stacked dropdowns on mobile, 12-col horizontal bar on
 * desktop. Rules between fields. Tango submit. Submits to useSearchParams —
 * triggers featured/similar FLIP reflow (M2).
 */
export function SearchWidget() {
  const [params, setParams] = useSearchParams();
  const [operacion, setOperacion] = useState(params.get('op') ?? 'venta');
  const [tipo, setTipo] = useState(params.get('tipo') ?? '');
  const [ubicacion, setUbicacion] = useState(params.get('ubicacion') ?? '');
  const [precio, setPrecio] = useState(params.get('precio') ?? '');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    next.set('op', operacion);
    if (tipo) next.set('tipo', tipo);
    else next.delete('tipo');
    if (ubicacion) next.set('ubicacion', ubicacion);
    else next.delete('ubicacion');
    if (precio) next.set('precio', precio);
    else next.delete('precio');
    setParams(next, { replace: false });
    const el = document.querySelector('[data-section="featured"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="search" data-section="search">
      <FolioRule sectionNumber={2} total={10} label="BUSCAR" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h2)' }}
          >
            Buscar propiedad
          </h2>
          <span
            className="mono uppercase text-xs tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            02 / 10
          </span>
        </div>
        <form
          onSubmit={onSubmit}
          className="border border-black"
          aria-label="Buscar propiedad"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_2fr_3fr_2fr_auto] divide-y md:divide-y-0 md:divide-x divide-black">
            <label className="flex flex-col p-4">
              <span
                className="uppercase tracking-widest text-[11px] mb-1"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Operación
              </span>
              <select
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
                className="bg-transparent text-base py-2"
                style={{ fontFamily: 'var(--font-body)', minHeight: 44 }}
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </label>
            <label className="flex flex-col p-4">
              <span
                className="uppercase tracking-widest text-[11px] mb-1"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Tipo
              </span>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="bg-transparent text-base py-2"
                style={{ fontFamily: 'var(--font-body)', minHeight: 44 }}
              >
                <option value="">Cualquiera</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="ph">PH</option>
                <option value="terreno">Terreno</option>
                <option value="local">Local</option>
                <option value="oficina">Oficina</option>
              </select>
            </label>
            <label className="flex flex-col p-4">
              <span
                className="uppercase tracking-widest text-[11px] mb-1"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Ubicación
              </span>
              <select
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="bg-transparent text-base py-2"
                style={{ fontFamily: 'var(--font-body)', minHeight: 44 }}
              >
                <option value="">Cualquiera</option>
                {REGIONS.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.label} · {r.group}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col p-4">
              <span
                className="uppercase tracking-widest text-[11px] mb-1"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Precio máx. (USD)
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                step={10000}
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Sin tope"
                className="bg-transparent text-base py-2 mono"
                style={{
                  fontFamily: 'var(--font-mono)',
                  minHeight: 44,
                  fontVariantNumeric: 'tabular-nums',
                }}
              />
            </label>
            <button
              type="submit"
              className="cta-primary w-full md:w-auto"
              data-accent="tango"
              style={{ borderLeft: '1px solid var(--color-ink)' }}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
