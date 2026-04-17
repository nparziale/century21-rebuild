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

export function Footer() {
  return (
    <footer data-section="footer" data-invert="true" className="relative">
      <FolioRule sectionNumber={13} label="PIE" invert />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 pt-12 xl:pt-16 pb-4">
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-6 xl:gap-8">
          <div className="col-span-4 xl:col-span-3">
            <img
              src="./brand/c21-white.svg"
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
          {(Object.keys(FOOTER_COLUMNS) as Array<keyof typeof FOOTER_COLUMNS>).map((key) => {
            const col = FOOTER_COLUMNS[key];
            return (
              <nav key={key} aria-label={col.label} className="col-span-2 xl:col-span-2">
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
          <div className="col-span-4 xl:col-span-3">
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

        {/* Regions — five groups */}
        <section className="mt-12 pt-8 border-t border-white/30">
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
            13 / 13
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
