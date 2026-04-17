import { BRAND } from '@c21/shared';

/**
 * V3 utility bar — 32 px phone + language; office count right. No motion.
 * Never uses tango. Uses only verified BRAND values (no invented counts).
 */
export function UtilityBar() {
  const today = new Date();
  const dateLabel = today.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <section
      data-section="utility-bar"
      className="border-b border-black text-[11px] uppercase tracking-widest"
      style={{ height: 'var(--utility-height)' }}
    >
      <div className="h-full mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <a
            href={`tel:+54${BRAND.phone.replace(/\D/g, '').slice(1)}`}
            className="mono flex items-center gap-2 underline-offset-2 hover:underline"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-label="Teléfono Century 21 Argentina"
          >
            TEL {BRAND.phone}
          </a>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline mono" style={{ fontFamily: 'var(--font-mono)' }}>
            ES / EN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="hidden md:inline mono"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-label="Red global Century 21"
          >
            {BRAND.countriesOperated} PAÍSES · {BRAND.globalOfficesApprox.toUpperCase()} OFICINAS (GLOBAL)
          </span>
          <span
            className="mono"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {dateLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
