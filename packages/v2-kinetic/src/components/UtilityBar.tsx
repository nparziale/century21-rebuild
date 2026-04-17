import { Phone, LogIn, Globe2 } from 'lucide-react';
import { BRAND } from '@c21/shared';
import { useState } from 'react';

/**
 * Top utility strip: locale toggle (static), franchise login, phone with
 * country-dial hover-reveal. Ink zone — neutral. 3 tap-targets ≥ 44 px on
 * mobile.
 */
export function UtilityBar() {
  const [dialOpen, setDialOpen] = useState(false);
  const telHref = `tel:+54${BRAND.phone.replace(/\D/g, '').slice(1)}`;

  return (
    <section
      data-section="utility-bar"
      className="zone-ink border-b border-white/10 text-[0.78rem]"
    >
      <div className="mx-auto flex h-10 max-w-[var(--container-max)] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 text-white/80">
          <Globe2 size={14} aria-hidden />
          <span className="v2-mono uppercase tracking-[0.14em]">ES&nbsp;·&nbsp;AR</span>
          <span aria-hidden className="mx-1 h-3 w-px bg-white/20" />
          <span className="hidden sm:inline text-white/60">Desde 2017 en Argentina</span>
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="https://21online.century21.com"
            className="v2-tap hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white"
            rel="noreferrer noopener"
            target="_blank"
          >
            <LogIn size={14} aria-hidden />
            <span>Franquiciados</span>
          </a>
          <a
            href={telHref}
            className="v2-tap relative inline-flex items-center gap-1.5 text-white"
            onMouseEnter={() => setDialOpen(true)}
            onMouseLeave={() => setDialOpen(false)}
            onFocus={() => setDialOpen(true)}
            onBlur={() => setDialOpen(false)}
          >
            <Phone size={14} aria-hidden />
            <span className="v2-mono tabular-nums">{BRAND.phone}</span>
            <span
              aria-hidden
              className={`v2-mono pointer-events-none absolute left-5 top-full mt-1 rounded-sm bg-[var(--color-bg)] px-2 py-1 text-[0.72rem] text-[var(--color-ink)] transition-opacity duration-200 ${dialOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              +54 · Argentina
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
