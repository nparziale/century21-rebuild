import { NAV_PRIMARY } from '@c21/shared';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Primary navigation. Sticky at top; goes translucent-paper after 64px scroll.
 * Mobile: hamburger → full-screen sheet with inlined children.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close sheet on Escape, lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = '';
      };
    }
    return;
  }, [open]);

  return (
    <header
      data-section="nav"
      className={[
        'sticky top-0 z-40 border-b transition-colors duration-200',
        scrolled
          ? 'bg-[color:var(--color-bg)]/85 border-[color:var(--color-divider)] backdrop-blur-md'
          : 'bg-[color:var(--color-bg)] border-transparent',
      ].join(' ')}
    >
      <div className="container-ed flex h-16 items-center justify-between lg:h-20">
        <Link to="/" aria-label="CENTURY 21 Argentina — Inicio" className="flex items-center gap-2">
          <img
            src="/brand/c21-black.svg"
            alt=""
            aria-hidden
            className="h-5 w-auto md:h-6"
          />
          <span className="sr-only">CENTURY 21 Argentina</span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_PRIMARY.map((item) => (
              <li key={item.key} className="relative group">
                <a
                  href={item.href}
                  className="nav-link py-2 text-[color:var(--color-ink)] flex items-center gap-1"
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <ChevronDown size={12} aria-hidden className="opacity-60" />
                  )}
                </a>
                {item.children.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-10 min-w-[220px] bg-[color:var(--color-bg)] border border-[color:var(--color-divider)] p-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="flex flex-col gap-2">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a href={c.href} className="link-bronze text-sm">
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          data-testid="mobile-nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav-sheet"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav-sheet"
        data-testid="mobile-nav-sheet"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={[
          'fixed inset-0 z-50 lg:hidden bg-[color:var(--color-bg)]',
          open ? 'flex' : 'hidden',
          'flex-col',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between border-b border-[color:var(--color-divider)] px-[var(--container-pad)]">
          <img src="/brand/c21-black.svg" alt="" aria-hidden className="h-5" />
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <X size={22} aria-hidden />
          </button>
        </div>
        <nav
          aria-label="Navegación principal móvil"
          className="flex-1 overflow-y-auto px-[var(--container-pad)] py-6"
        >
          <ul className="flex flex-col divide-y divide-[color:var(--color-divider)]">
            {NAV_PRIMARY.map((item) => (
              <li key={item.key} className="py-4">
                <a
                  href={item.href}
                  className="font-display text-2xl text-[color:var(--color-ink)] block"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
                {item.children.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2 pl-1">
                    {item.children.map((c) => (
                      <li key={c.label}>
                        <a
                          href={c.href}
                          className="link-bronze text-sm"
                          onClick={() => setOpen(false)}
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
