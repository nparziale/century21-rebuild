import {
  BRAND,
  FOOTER_COLUMNS,
  INTERNATIONAL_COUNTRIES,
  LEGAL_FOOTER,
  DESIGN_BUILD_DISCLAIMER,
  REGION_GROUPS,
  regionsByGroup,
  SOCIALS,
} from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

type FooterProps = { sectionNumber: number; total: number };

export function Footer({ sectionNumber, total }: FooterProps) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <footer data-section="footer" data-invert="true" className="relative">
      <FolioRule sectionNumber={sectionNumber} total={total} label="PIE" invert />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 pt-12 xl:pt-16 pb-4">
        {/* Logo + positioning — always visible */}
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-8">
          <div className="col-span-4 xl:col-span-3">
            <img
              src="/brand/c21-white.svg"
              alt="Century 21 Argentina"
              width={160}
              height={80}
              className="w-32 xl:w-40 h-auto block"
            />
            <p
              className="mt-4 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-concrete)' }}
            >
              {BRAND.positioning}.
            </p>
            <p
              className="mt-2 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-concrete)' }}
            >
              CEO Argentina · {BRAND.argentinaCEO}
              <br />
              Casa matriz · {BRAND.hq}
            </p>
          </div>

          {/* xl ≥1280: flat sitemap */}
          {(Object.keys(FOOTER_COLUMNS) as Array<keyof typeof FOOTER_COLUMNS>).map((key) => {
            const col = FOOTER_COLUMNS[key];
            return (
              <nav
                key={key}
                aria-label={col.label}
                className="col-span-2 xl:col-span-2 hidden xl:block"
              >
                <h3
                  className="uppercase tracking-widest text-xs mb-4"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
                >
                  {col.label}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <li key={`${key}-${l.href}-${l.label}`}>
                      <a
                        href={l.href}
                        className="text-sm hover:underline underline-offset-4"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            );
          })}
          <div className="col-span-4 xl:col-span-3 hidden xl:block">
            <h3
              className="uppercase tracking-widest text-xs mb-4"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Internacional
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {INTERNATIONAL_COUNTRIES.map((c) => (
                <li key={c.code}>
                  <a
                    href={`https://century21.${c.code.toLowerCase()}`}
                    className="text-sm mono"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {c.code} · {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* xl ≥1280: flat region grid */}
        <section className="mt-12 pt-8 border-t border-white/30 hidden xl:block">
          <h3
            className="uppercase tracking-widest text-xs mb-4"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            Buscá por provincia
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {REGION_GROUPS.map((group) => (
              <div key={group}>
                <h4
                  className="uppercase tracking-widest text-[11px] mb-2"
                  style={{ color: 'var(--color-concrete)', fontFamily: 'var(--font-body)' }}
                >
                  {group}
                </h4>
                <ul className="flex flex-col gap-1">
                  {regionsByGroup(group).map((r) => (
                    <li key={r.key}>
                      <a
                        href={`/?ubicacion=${r.key}`}
                        className="text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* <1280: native <details> accordions for sitemap, regions, international */}
        <div className="xl:hidden mt-8 border-t border-white/30">
          {(Object.keys(FOOTER_COLUMNS) as Array<keyof typeof FOOTER_COLUMNS>).map((key) => {
            const col = FOOTER_COLUMNS[key];
            return (
              <FootDetails key={key} label={col.label}>
                <ul className="flex flex-col gap-2 pb-3">
                  {col.links.map((l) => (
                    <li key={`${key}-${l.href}-${l.label}`}>
                      <a
                        href={l.href}
                        className="text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </FootDetails>
            );
          })}
          <FootDetails label="Buscá por provincia">
            <div className="space-y-4 pb-3">
              {REGION_GROUPS.map((group) => (
                <div key={group}>
                  <h4
                    className="uppercase tracking-widest text-[11px] mb-2"
                    style={{ color: 'var(--color-concrete)', fontFamily: 'var(--font-body)' }}
                  >
                    {group}
                  </h4>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {regionsByGroup(group).map((r) => (
                      <li key={r.key}>
                        <a
                          href={`/?ubicacion=${r.key}`}
                          className="text-sm"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {r.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FootDetails>
          <FootDetails label="Internacional">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 pb-3">
              {INTERNATIONAL_COUNTRIES.map((c) => (
                <li key={c.code}>
                  <a
                    href={`https://century21.${c.code.toLowerCase()}`}
                    className="text-sm mono"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {c.code} · {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </FootDetails>
        </div>

        {/* Socials */}
        <section className="mt-10 flex items-center gap-4 flex-wrap">
          <span
            className="uppercase tracking-widest text-xs"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-concrete)' }}
          >
            Seguinos
          </span>
          <ul className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.network}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono text-xs uppercase tracking-widest px-2 py-1 border border-white"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  aria-label={`${s.network} · ${s.handle}`}
                >
                  {s.network}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Mega logo */}
        <div
          aria-hidden="true"
          className="mt-16 relative overflow-hidden"
          style={{ height: 'clamp(60px, 14vw, 220px)' }}
        >
          <span
            className="absolute left-0 bottom-0 font-display leading-none uppercase whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 18vw, 18rem)',
              letterSpacing: '-0.02em',
              transform: 'translateY(18%)',
            }}
          >
            CENTURY 21
          </span>
          <span
            className="absolute right-0 bottom-2 mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {pad(sectionNumber)} / {pad(total)}
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-white/30 text-xs space-y-3">
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-concrete)' }}>
            {LEGAL_FOOTER}
          </p>
          <p
            className="italic"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-concrete)' }}
          >
            {DESIGN_BUILD_DISCLAIMER}
          </p>
          <p
            className="mono text-[11px] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            © {new Date().getFullYear()} CENTURY 21 Argentina · {BRAND.phone}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FootDetails({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-white/30">
      <summary
        className="flex cursor-pointer list-none items-center justify-between py-4 text-xs uppercase tracking-widest"
        style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
      >
        <span>{label}</span>
        <span aria-hidden className="grid h-7 w-7 place-items-center border border-white/40 transition-transform group-open:rotate-45">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </span>
      </summary>
      <div className="pl-1">{children}</div>
    </details>
  );
}
