import {
  BRAND,
  DESIGN_BUILD_DISCLAIMER,
  FOOTER_COLUMNS,
  INTERNATIONAL_COUNTRIES,
  LEGAL_FOOTER,
  REGION_GROUPS,
  SOCIALS,
  regionsByGroup,
} from '@c21/shared';
import { ChevronDown, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useState } from 'react';

/**
 * Editorial footer. Mobile: accordion sections. Desktop: 5-col sitemap.
 * Always renders LEGAL_FOOTER verbatim. Folio italic line above legal row.
 */
export function Footer() {
  return (
    <footer
      data-section="footer"
      className="bg-[color:var(--color-ink)] text-[color:var(--color-bg)]"
    >
      <div className="container-ed py-16 lg:py-24">
        <div className="mb-12 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <img src="/brand/c21-gold.svg" alt="CENTURY 21 Argentina" className="h-8 w-auto lg:h-10" />
          <p className="font-italic text-sm text-[color:var(--color-brand-gold)]/80">
            Century 21 Argentina — Edición 2026
          </p>
        </div>

        <div className="hidden grid-cols-5 gap-8 lg:grid">
          <FooterColumn label={FOOTER_COLUMNS.nosotros.label} links={[...FOOTER_COLUMNS.nosotros.links]} />
          <FooterColumn label={FOOTER_COLUMNS.explora.label} links={[...FOOTER_COLUMNS.explora.links]} />
          <FooterColumn label={FOOTER_COLUMNS.contacto.label} links={[...FOOTER_COLUMNS.contacto.links]} />
          <RegionsColumn />
          <InternationalColumn />
        </div>

        {/* Mobile accordion */}
        <div className="flex flex-col divide-y divide-[color:var(--color-brand-gold)]/20 lg:hidden">
          <AccordionCol label={FOOTER_COLUMNS.nosotros.label}>
            <SimpleLinks links={[...FOOTER_COLUMNS.nosotros.links]} />
          </AccordionCol>
          <AccordionCol label={FOOTER_COLUMNS.explora.label}>
            <SimpleLinks links={[...FOOTER_COLUMNS.explora.links]} />
          </AccordionCol>
          <AccordionCol label={FOOTER_COLUMNS.contacto.label}>
            <SimpleLinks links={[...FOOTER_COLUMNS.contacto.links]} />
          </AccordionCol>
          <AccordionCol label="Regiones">
            <RegionsInner />
          </AccordionCol>
          <AccordionCol label="Internacional">
            <InternationalInner />
          </AccordionCol>
        </div>

        <hr className="my-12 h-px w-full border-0 bg-[color:var(--color-brand-gold)]/20" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-[70ch] text-xs text-[color:var(--color-bg)]/70">{LEGAL_FOOTER}</p>
          <ul className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.network}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.network} — ${s.handle}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-brand-gold)]/40 text-[color:var(--color-brand-gold)] hover:bg-[color:var(--color-brand-gold)]/10"
                >
                  {s.network === 'instagram' && <Instagram size={14} aria-hidden />}
                  {s.network === 'facebook' && <Facebook size={14} aria-hidden />}
                  {s.network === 'linkedin' && <Linkedin size={14} aria-hidden />}
                  {s.network === 'x' && <span className="text-xs font-semibold" aria-hidden>X</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-[11px] leading-relaxed text-[color:var(--color-bg)]/50">
          {DESIGN_BUILD_DISCLAIMER}
        </p>

        <p className="mt-6 font-mono text-[11px] text-[color:var(--color-bg)]/50">
          {BRAND.name} · {BRAND.phone} · desde 2017
        </p>
      </div>
    </footer>
  );
}

type FooterLink = { label: string; href: string };

function FooterColumn({ label, links }: { label: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-brand-gold)]">
        {label}
      </h3>
      <SimpleLinks links={links} />
    </div>
  );
}

function SimpleLinks({ links }: { links: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            className="text-sm text-[color:var(--color-bg)]/85 hover:text-[color:var(--color-brand-gold)]"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function RegionsColumn() {
  return (
    <div>
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-brand-gold)]">
        Regiones
      </h3>
      <RegionsInner />
    </div>
  );
}

function RegionsInner() {
  return (
    <div className="flex flex-col gap-4">
      {REGION_GROUPS.map((g) => (
        <div key={g}>
          <p className="mb-1 font-italic text-xs text-[color:var(--color-brand-gold)]/70">{g}</p>
          <ul className="grid grid-cols-1 gap-1">
            {regionsByGroup(g).map((r) => (
              <li key={r.key}>
                <a
                  href={`/?zona=${r.key}`}
                  className="text-[13px] text-[color:var(--color-bg)]/80 hover:text-[color:var(--color-brand-gold)]"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function InternationalColumn() {
  return (
    <div>
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-brand-gold)]">
        Internacional
      </h3>
      <InternationalInner />
    </div>
  );
}

function InternationalInner() {
  return (
    <ul className="flex flex-col gap-1">
      {INTERNATIONAL_COUNTRIES.map((c) => (
        <li key={c.code}>
          <a
            href={`https://century21global.com/${c.code.toLowerCase()}`}
            className="text-[13px] text-[color:var(--color-bg)]/80 hover:text-[color:var(--color-brand-gold)]"
          >
            {c.name}
          </a>
        </li>
      ))}
      <li className="mt-2 border-t border-[color:var(--color-brand-gold)]/20 pt-2">
        <a
          href="/?op=venta&comercial=1"
          className="text-[13px] text-[color:var(--color-bg)]/80 hover:text-[color:var(--color-brand-gold)]"
        >
          C21 Comercial
        </a>
      </li>
    </ul>
  );
}

function AccordionCol({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <details
      className="py-3"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-brand-gold)]">
        {label}
        <ChevronDown
          size={14}
          aria-hidden
          className={['transition-transform', open ? 'rotate-180' : ''].join(' ')}
        />
      </summary>
      <div className="pt-4 pb-2">{children}</div>
    </details>
  );
}
