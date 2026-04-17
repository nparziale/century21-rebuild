import { Instagram, Facebook, Linkedin } from 'lucide-react';
import {
  BRAND,
  FOOTER_COLUMNS,
  LEGAL_FOOTER,
  REGION_GROUPS,
  regionsByGroup,
  INTERNATIONAL_COUNTRIES,
  SOCIALS,
} from '@c21/shared';

/**
 * Footer. Ink zone. 5 columns: Nosotros, Explora, Contacto, Regiones
 * (28 grouped), Internacional (11 + Comercial). SOCIALS row (no YouTube).
 * LEGAL_FOOTER verbatim. Logo in gold on ink.
 */
export function Footer() {
  return (
    <footer data-section="footer" className="zone-ink pt-16 pb-10 md:pt-20">
      <div className="mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <img src="/brand/c21-gold.svg" alt="CENTURY 21 Argentina" className="h-10 w-auto" />
            <p className="v2-mono mt-3 text-[0.75rem] uppercase tracking-[0.2em] text-white/95">
              {BRAND.tagline} · {BRAND.taglineSub}
            </p>
          </div>
          <ul className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.network}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${s.network} — ${s.handle}`}
                  className="v2-tap inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-white hover:text-[var(--color-brand-gold)]"
                >
                  {socialIcon(s.network)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-3 lg:grid-cols-5">
          <FooterColumn label={FOOTER_COLUMNS.nosotros.label} links={FOOTER_COLUMNS.nosotros.links} />
          <FooterColumn label={FOOTER_COLUMNS.explora.label} links={FOOTER_COLUMNS.explora.links} />
          <FooterColumn label={FOOTER_COLUMNS.contacto.label} links={FOOTER_COLUMNS.contacto.links} />

          {/* Regiones — 28 grouped */}
          <div>
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-brand-gold)]">
              Regiones
            </p>
            <div className="mt-4 space-y-4">
              {REGION_GROUPS.map((g) => (
                <div key={g}>
                  <p className="text-[0.78rem] font-[600] text-white/95">{g}</p>
                  <ul className="mt-1 space-y-1">
                    {regionsByGroup(g).map((r) => (
                      <li key={r.key}>
                        <a
                          href={`/?region=${r.key}`}
                          className="text-[0.82rem] text-white/95 hover:text-white"
                        >
                          {r.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-brand-gold)]">
              Internacional
            </p>
            <ul className="mt-4 space-y-1">
              {INTERNATIONAL_COUNTRIES.map((c) => (
                <li key={c.code}>
                  <a
                    href={`https://century21global.com/${c.code.toLowerCase()}`}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-[0.82rem] text-white/95 hover:text-white"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/comercial"
                  className="text-[0.82rem] font-[600] text-white hover:text-[var(--color-brand-gold)]"
                >
                  CENTURY 21 Comercial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-white/10 pt-8 text-[0.76rem] leading-[1.6] text-white/55">
          {LEGAL_FOOTER}
        </p>
        <p className="v2-mono mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-white/95">
          © {new Date().getFullYear()} CENTURY 21 Argentina · HQ {BRAND.hq}
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ label, links }: { label: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-brand-gold)]">{label}</p>
      <ul className="mt-4 space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-[0.85rem] text-white/65 hover:text-white">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function socialIcon(network: string) {
  switch (network) {
    case 'instagram':
      return <Instagram size={18} aria-hidden />;
    case 'facebook':
      return <Facebook size={18} aria-hidden />;
    case 'linkedin':
      return <Linkedin size={18} aria-hidden />;
    case 'x':
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2H21l-6.55 7.49L22 22h-6.828l-4.78-6.26L4.86 22H2.1l7.02-8.02L2 2h7.01l4.33 5.73L18.244 2Zm-1.2 18.2h1.884L7.04 3.69H5.018l12.026 16.51Z" />
        </svg>
      );
    default:
      return null;
  }
}
