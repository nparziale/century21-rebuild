import { Search, MapPin, Building2, DollarSign } from 'lucide-react';
import { REGION_GROUPS, regionsByGroup } from '@c21/shared';
import { useState } from 'react';

/**
 * Search widget. Mobile: single pill-input + operation tabs. Desktop: 4-field
 * grid on an off-white plank hovering over the hero with blue focus ring.
 * No real search — frontend demo, GET to "/" with querystring.
 */
export function SearchWidget() {
  const [op, setOp] = useState<'venta' | 'alquiler'>('venta');

  return (
    <section id="search" data-section="search" className="relative z-20 -mt-10 md:-mt-16">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <div className="border border-[var(--color-divider)] bg-[var(--color-bg)] p-4 shadow-[0_20px_60px_-20px_rgba(14,14,14,0.4)] md:p-6">
          <div role="tablist" aria-label="Operación" className="flex gap-2 text-[0.78rem]">
            {(['venta', 'alquiler'] as const).map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={op === k}
                onClick={() => setOp(k)}
                className={`v2-mono uppercase tracking-[0.16em] px-3 py-2 border ${op === k ? 'bg-[var(--color-ink)] text-[var(--color-bg)] border-[var(--color-ink)]' : 'border-[var(--color-divider)] text-[var(--color-ink-mute)] hover:text-[var(--color-ink)]'}`}
              >
                {k}
              </button>
            ))}
            <span className="ml-auto v2-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
              Búsqueda
            </span>
          </div>

          <form
            className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1.1fr_1fr_1fr_auto]"
            action="/"
            method="get"
            role="search"
          >
            <input type="hidden" name="op" value={op} />

            <Field icon={<MapPin size={16} />} label="Ubicación" htmlFor="s-loc">
              <select id="s-loc" name="region" className="v2-field-input">
                <option value="">Cualquiera</option>
                {REGION_GROUPS.map((g) => (
                  <optgroup key={g} label={g}>
                    {regionsByGroup(g).map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            <Field icon={<Building2 size={16} />} label="Tipo" htmlFor="s-type">
              <select id="s-type" name="tipo" className="v2-field-input">
                <option value="">Cualquier tipo</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="ph">PH</option>
                <option value="terreno">Terreno</option>
              </select>
            </Field>

            <Field icon={<DollarSign size={16} />} label="Precio (USD)" htmlFor="s-price">
              <select id="s-price" name="precio" className="v2-field-input">
                <option value="">Sin límite</option>
                <option value="0-150000">Hasta 150.000</option>
                <option value="150000-300000">150–300.000</option>
                <option value="300000-500000">300–500.000</option>
                <option value="500000+">Más de 500.000</option>
              </select>
            </Field>

            <button
              type="submit"
              className="v2-tap inline-flex items-center justify-center gap-2 bg-[var(--color-accent-warm)] px-5 py-3.5 text-[1.1875rem] font-[700] text-white hover:opacity-95"
              aria-label="Buscar"
            >
              <Search size={16} aria-hidden />
              Buscar
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .v2-field-input {
          width: 100%;
          background: transparent;
          border: 0;
          outline: none;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-ink);
        }
      `}</style>
    </section>
  );
}

function Field({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="relative block rounded-none border border-[var(--color-divider)] bg-white px-3 py-2.5 transition-transform focus-within:-translate-y-0.5 focus-within:border-[var(--color-accent-cool)]">
      <span className="v2-mono flex items-center gap-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
        <span aria-hidden>{icon}</span>
        {label}
      </span>
      <div className="mt-0.5">{children}</div>
    </label>
  );
}
