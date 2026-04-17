import { REGIONS } from '@c21/shared';
import { Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Home search: single pill input on mobile (opens a bottom-sheet filter),
 * four-field hairline-separated bar on desktop. Submitting updates the URL
 * search params and the FeaturedGrid consumes them to filter locally.
 */
export function SearchWidget() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [op, setOp] = useState(params.get('op') ?? '');
  const [tipo, setTipo] = useState(params.get('tipo') ?? '');
  const [zona, setZona] = useState(params.get('zona') ?? '');
  const [precio, setPrecio] = useState(params.get('precio') ?? '');
  const [sheetOpen, setSheetOpen] = useState(false);

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    const sp = new URLSearchParams();
    if (op) sp.set('op', op);
    if (tipo) sp.set('tipo', tipo);
    if (zona) sp.set('zona', zona);
    if (precio) sp.set('precio', precio);
    navigate({ pathname: '/', search: sp.toString() });
    setSheetOpen(false);
    // scroll to featured grid
    requestAnimationFrame(() => {
      document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section
      data-section="search"
      aria-label="Buscador de propiedades"
      className="border-y border-[color:var(--color-divider)] bg-[color:var(--color-surface)]"
    >
      <div className="container-ed py-6 lg:py-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <p className="eyebrow">Encontrar una propiedad</p>
          <span className="hidden font-italic text-sm text-[color:var(--color-ink-mute)] md:block">
            búsqueda editorial
          </span>
        </div>

        {/* Mobile: single pill + sheet */}
        <form onSubmit={submit} className="lg:hidden">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex h-14 w-full items-center justify-between gap-2 rounded-full border border-[color:var(--color-divider)] bg-[color:var(--color-bg)] px-5 text-left"
            aria-haspopup="dialog"
          >
            <span className="truncate text-sm text-[color:var(--color-ink-mute)]">
              {op || tipo || zona ? `${op || 'Venta/Alquiler'} · ${tipo || 'Tipo'} · ${zona || 'Ubicación'}` : 'Tipo, ubicación, precio…'}
            </span>
            <Search size={18} aria-hidden className="text-[color:var(--color-accent-deep)]" />
          </button>
        </form>

        {sheetOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filtros de búsqueda"
            className="fixed inset-0 z-50 flex flex-col bg-[color:var(--color-bg)] lg:hidden"
          >
            <header className="flex h-16 items-center justify-between border-b border-[color:var(--color-divider)] px-[var(--container-pad)]">
              <h2 className="font-display text-xl">Filtros</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="link-bronze text-sm"
                aria-label="Cerrar filtros"
              >
                Cerrar
              </button>
            </header>
            <form onSubmit={submit} className="flex-1 overflow-y-auto p-[var(--container-pad)]">
              <SearchFields
                op={op}
                setOp={setOp}
                tipo={tipo}
                setTipo={setTipo}
                zona={zona}
                setZona={setZona}
                precio={precio}
                setPrecio={setPrecio}
                stacked
              />
              <button type="submit" className="btn btn-olive mt-6 w-full justify-center">
                Buscar
              </button>
            </form>
          </div>
        )}

        {/* Desktop: inline hairline bar */}
        <form
          onSubmit={submit}
          className="hidden lg:grid lg:grid-cols-[1.1fr_1.2fr_1.6fr_1.3fr_auto] lg:items-end lg:gap-0 lg:border-t lg:border-b lg:border-[color:var(--color-accent-deep)]/30"
        >
          <SearchFields
            op={op}
            setOp={setOp}
            tipo={tipo}
            setTipo={setTipo}
            zona={zona}
            setZona={setZona}
            precio={precio}
            setPrecio={setPrecio}
          />
          <button
            type="submit"
            className="btn btn-olive h-full min-h-[72px] justify-center px-6"
          >
            <Search size={16} aria-hidden />
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}

type FieldsProps = {
  op: string;
  setOp: (v: string) => void;
  tipo: string;
  setTipo: (v: string) => void;
  zona: string;
  setZona: (v: string) => void;
  precio: string;
  setPrecio: (v: string) => void;
  stacked?: boolean;
};

function SearchFields({ op, setOp, tipo, setTipo, zona, setZona, precio, setPrecio, stacked = false }: FieldsProps) {
  const base = stacked
    ? 'flex flex-col gap-5'
    : 'contents';
  return (
    <div className={base}>
      <FieldCell label="Operación" stacked={stacked}>
        <select
          className="field-select"
          aria-label="Operación"
          value={op}
          onChange={(e) => setOp(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </FieldCell>
      <FieldCell label="Tipo" stacked={stacked}>
        <select
          className="field-select"
          aria-label="Tipo de propiedad"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="ph">PH</option>
          <option value="terreno">Terreno</option>
          <option value="local">Local</option>
          <option value="oficina">Oficina</option>
        </select>
      </FieldCell>
      <FieldCell label="Ubicación" stacked={stacked}>
        <select
          className="field-select"
          aria-label="Ubicación"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
        >
          <option value="">Todas las provincias</option>
          {REGIONS.map((r) => (
            <option key={r.key} value={r.key}>
              {r.label}
            </option>
          ))}
        </select>
      </FieldCell>
      <FieldCell label="Precio USD (máx.)" stacked={stacked}>
        <input
          className="field-input font-mono"
          type="number"
          inputMode="numeric"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="sin límite"
          min={0}
        />
      </FieldCell>
    </div>
  );
}

function FieldCell({
  label,
  children,
  stacked,
}: {
  label: string;
  children: React.ReactNode;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div className="field">
        <span className="field-label">{label}</span>
        {children}
      </div>
    );
  }
  return (
    <div className="field relative border-r border-[color:var(--color-accent-deep)]/30 px-4 py-3 last:border-r-0">
      <span className="field-label">{label}</span>
      {children}
    </div>
  );
}
