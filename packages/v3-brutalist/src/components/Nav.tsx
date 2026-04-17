import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_PRIMARY } from '@c21/shared';

/**
 * V3 top nav. Mobile: 56 px sticky with hamburger → full-screen sheet (Esc closes).
 * Desktop ≥1024: 72 px 12-col ruled strip. Active item has 2 px tango underline.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Close sheet on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-section="nav"
      className="sticky top-0 z-40 bg-white border-b border-black"
      style={{ minHeight: 'var(--nav-height-mobile)' }}
    >
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 h-14 lg:h-[72px] flex items-center justify-between gap-6">
        <Link to="/" aria-label="Century 21 Argentina — Inicio" className="flex items-center gap-2">
          <img
            src="./brand/c21-black.svg"
            alt=""
            width={48}
            height={32}
            className="h-8 w-auto"
          />
          <span
            className="hidden md:inline font-display text-lg tracking-widest"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CENTURY 21
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-8">
          {NAV_PRIMARY.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                to={item.href}
                className="relative py-5 uppercase tracking-widest text-sm font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
                data-active={isActive ? 'true' : undefined}
              >
                {item.label}
                <span
                  className="absolute left-0 right-0 bottom-3 h-0.5"
                  style={{ background: isActive ? 'var(--color-tango)' : 'transparent' }}
                  data-accent={isActive ? 'tango' : undefined}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center"
          style={{ width: 44, height: 44, border: '1px solid var(--color-ink)' }}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          data-testid="mobile-nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav-sheet"
          data-testid="mobile-nav-sheet"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación"
          className="fixed inset-0 z-50 bg-white flex flex-col"
        >
          <div className="h-14 flex items-center justify-between px-4 border-b border-black">
            <span
              className="font-display text-lg tracking-widest"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CENTURY 21
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              className="inline-flex items-center justify-center"
              style={{ width: 44, height: 44, border: '1px solid var(--color-ink)' }}
            >
              <X size={20} />
            </button>
          </div>
          <nav aria-label="Navegación principal" className="flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {NAV_PRIMARY.map((item) => (
                <li key={item.key} className="border-b border-black">
                  <Link
                    to={item.href}
                    className="block px-4 py-4 font-display text-2xl uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {item.label}
                  </Link>
                  <ul className="pb-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          to={c.href}
                          className="block px-4 py-2 text-base"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          — {c.label}
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
