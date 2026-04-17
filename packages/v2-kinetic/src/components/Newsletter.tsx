import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

/**
 * Newsletter strip in blue zone, rendered adjacent to (but separate from)
 * the footer. Simple form with client-only feedback.
 */
export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'ok'>('idle');
  return (
    <section data-section="newsletter" className="zone-blue py-14 md:py-20">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/70">
            Newsletter mensual
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-[700] leading-[1.05] tracking-[-0.01em] text-white">
            Lecturas del mercado, una vez al mes.
          </h2>
          <p className="mt-3 text-[0.95rem] text-white/80">
            Sin spam, sin promos. Analizamos precios, barrios y cierres del trimestre.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus('ok');
          }}
          className="flex flex-col gap-3 sm:flex-row"
          aria-label="Formulario de newsletter"
        >
          <label className="relative flex-1">
            <span className="sr-only">Email</span>
            <input
              required
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full border border-white/30 bg-transparent px-4 py-3.5 text-white placeholder:text-white/50 outline-none transition-[transform,border-color] focus:-translate-y-[2px] focus:border-white"
            />
          </label>
          <button
            type="submit"
            className="v2-tap inline-flex items-center justify-center gap-2 bg-white px-5 py-3.5 text-[0.92rem] font-[700] text-[var(--color-accent-cool)] hover:opacity-90"
          >
            Suscribirme
            <ArrowRight size={16} aria-hidden />
          </button>
          {status === 'ok' && (
            <p role="status" className="v2-mono text-[0.75rem] uppercase tracking-[0.18em] text-white sm:self-center">
              Confirmá el correo que enviamos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
