import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_PRIMARY, REGION_GROUPS, regionsByGroup } from '@c21/shared';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Sticky nav. Mobile: hamburger opens full-screen sheet. Desktop: mega-panel
 * on hover/focus over "Propiedades" revealing a type × region matrix. Logo
 * re-weights Switzer 500 → 700 on sticky.
 */
export function Nav({ tone = 'ink' }: { tone?: 'ink' | 'light' }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Sticky detection via scroll position
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc closes mobile sheet
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  // Mega panel closes on outer click
  useEffect(() => {
    if (panel == null) return;
    const onClick = () => setPanel(null);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setPanel(null);
    });
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [panel]);

  const logoSrc = tone === 'ink' ? '/brand/c21-white.svg' : '/brand/c21-black.svg';

  return (
    <header
      data-section="nav"
      className={`sticky top-0 z-40 border-b ${tone === 'ink' ? 'zone-ink border-white/10' : 'border-[var(--color-divider)] bg-[var(--color-bg)]/90 backdrop-blur'}`}
    >
      <div className="mx-auto flex h-[64px] max-w-[var(--container-max)] items-center justify-between px-4 md:px-6">
        <Link to="/" aria-label="CENTURY 21 Argentina — inicio" className="v2-tap flex items-center">
          <img
            src={logoSrc}
            alt="CENTURY 21"
            className="h-6 md:h-7 w-auto transition-all duration-200"
            style={{ fontVariationSettings: `'wght' ${stuck ? 700 : 500}` }}
          />
        </Link>

        <nav aria-label="primary" className="hidden lg:flex items-center gap-7">
          {NAV_PRIMARY.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => item.key === 'comprar' && setPanel(item.key)}
              onMouseLeave={() => item.key === 'comprar' && setPanel(null)}
            >
              <Link
                to={item.href}
                className="inline-flex items-center gap-1 py-4 text-[0.93rem] font-[500] hover:opacity-80"
                aria-haspopup={item.children ? 'true' : undefined}
                aria-expanded={panel === item.key}
                onFocus={() => item.key === 'comprar' && setPanel(item.key)}
              >
                {item.label}
                {item.children && <ChevronDown size={14} aria-hidden />}
              </Link>

              {panel === item.key && item.key === 'comprar' && <MegaPanel />}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/propiedad/286194"
            className="v2-tap hidden md:inline-flex items-center rounded-full border border-current px-4 py-2 text-[0.85rem] font-[600] hover:bg-white/10"
          >
            Ver propiedades
          </Link>
          <button
            type="button"
            data-testid="mobile-nav-toggle"
            aria-label={sheetOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={sheetOpen}
            aria-controls="v2-mobile-sheet"
            className="v2-tap inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden"
            onClick={() => setSheetOpen((v) => !v)}
          >
            {sheetOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {sheetOpen && (
        <div
          id="v2-mobile-sheet"
          ref={sheetRef}
          data-testid="mobile-nav-sheet"
          className="fixed inset-0 top-0 z-50 flex flex-col zone-ink"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          style={{ animation: 'v2-sheet-in 260ms var(--ease-spring) both' }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <img src="/brand/c21-white.svg" alt="CENTURY 21" className="h-6" />
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setSheetOpen(false)}
              className="v2-tap inline-flex h-11 w-11 items-center justify-center"
            >
              <X size={22} />
            </button>
          </div>
          <nav aria-label="primary mobile" className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              {NAV_PRIMARY.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    onClick={() => setSheetOpen(false)}
                    className="block border-b border-white/10 py-4 text-[1.5rem] font-[600]"
                  >
                    {item.label}
                  </Link>
                  <ul className="ml-2 mb-2">
                    {item.children?.map((c) => (
                      <li key={c.href}>
                        <Link
                          to={c.href}
                          onClick={() => setSheetOpen(false)}
                          className="block py-2 text-[0.95rem] text-white/70"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

function MegaPanel() {
  const types: Array<{ key: string; label: string }> = [
    { key: 'casa', label: 'Casas' },
    { key: 'departamento', label: 'Departamentos' },
    { key: 'ph', label: 'PH' },
    { key: 'terreno', label: 'Terrenos' },
    { key: 'local', label: 'Locales' },
    { key: 'oficina', label: 'Oficinas' },
  ];

  return (
    <div
      role="menu"
      className="absolute left-1/2 top-full z-40 w-[min(98vw,1100px)] -translate-x-1/2 border border-[var(--color-divider)] bg-[var(--color-bg)] text-[var(--color-ink)] shadow-2xl"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-[220px_1fr] gap-0">
        <div className="border-r border-[var(--color-divider)] bg-[var(--color-surface)] p-6">
          <p className="v2-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">Tipo</p>
          <ul className="mt-3 space-y-2">
            {types.map((t) => (
              <li key={t.key}>
                <a
                  href={`/?tipo=${t.key}`}
                  className="block py-1.5 text-[0.95rem] font-[500] hover:text-[var(--color-accent-cool)]"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-5 gap-4 p-6">
          {REGION_GROUPS.map((g) => (
            <div key={g}>
              <p className="v2-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
                {g}
              </p>
              <ul className="mt-3 space-y-1.5">
                {regionsByGroup(g).map((r) => (
                  <li key={r.key}>
                    <a href={`/?region=${r.key}`} className="text-[0.86rem] hover:text-[var(--color-accent-cool)]">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
