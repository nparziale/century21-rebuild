import { BRAND, SOCIALS } from '@c21/shared';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

/**
 * Thin utility bar: phone + locale + quick links on the left, socials on the right.
 * On mobile collapses to just phone + socials (no filler links).
 */
export function UtilityBar() {
  return (
    <section
      data-section="utility-bar"
      aria-label="Barra de utilidad"
      className="border-b border-[color:var(--color-divider)] bg-[color:var(--color-bg)]"
    >
      <div className="container-ed flex h-9 items-center justify-between gap-4 whitespace-nowrap text-[11px] tracking-[0.02em] text-[color:var(--color-ink-mute)] lg:h-7">
        <div className="flex min-w-0 items-center gap-3 pipe-sep">
          <a
            href={`tel:+54${BRAND.phone.replace(/\D/g, '').slice(1)}`}
            className="link-bronze font-mono shrink-0"
          >
            {BRAND.phone}
          </a>
          <span className="hidden lg:inline">ES · AR</span>
          <a href="/directorio" className="nav-link hidden lg:inline-flex">
            Directorio
          </a>
          <a href="/21-online" className="nav-link hidden lg:inline-flex">
            21 Online
          </a>
        </div>
        <ul className="flex shrink-0 items-center gap-2 sm:gap-3">
          {SOCIALS.map((s) => (
            <li key={s.network}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${s.network} — ${s.handle}`}
                className="inline-flex h-7 w-7 items-center justify-center text-[color:var(--color-ink-mute)] hover:text-[color:var(--color-accent-deep)]"
              >
                {s.network === 'instagram' && <Instagram size={14} aria-hidden />}
                {s.network === 'facebook' && <Facebook size={14} aria-hidden />}
                {s.network === 'linkedin' && <Linkedin size={14} aria-hidden />}
                {s.network === 'x' && (
                  <span className="text-[11px] font-semibold" aria-hidden>
                    X
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
