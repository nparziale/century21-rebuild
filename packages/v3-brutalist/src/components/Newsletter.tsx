import { useState } from 'react';
import { FolioRule } from './FolioRule.tsx';

export function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [email, setEmail] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('ok');
    setEmail('');
  };

  return (
    <section data-section="newsletter" data-invert="true">
      <FolioRule sectionNumber={9} total={10} label="BOLETÍN" invert />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-12 xl:py-20">
        <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6 items-start">
          <div className="col-span-4 xl:col-span-6">
            <p
              className="mono text-xs uppercase tracking-widest mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-concrete)' }}
            >
              09 / 10 · Boletín
            </p>
            <h2
              className="uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-h2)',
                lineHeight: 0.92,
              }}
            >
              Informe semanal
              <br />
              del mercado.
            </h2>
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-body)',
                color: 'var(--color-concrete)',
              }}
            >
              Resúmenes, precios por m² y fichas destacadas. Un correo los miércoles.
              Podés desuscribirte en cualquier momento.
            </p>
          </div>
          <form
            onSubmit={onSubmit}
            aria-label="Suscripción al boletín"
            className="col-span-4 xl:col-span-6 flex flex-col gap-4"
          >
            <label className="field">
              <span>Correo electrónico</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="tunombre@ejemplo.com.ar"
                autoComplete="email"
              />
            </label>
            <button type="submit" className="cta-primary self-start" data-accent="tango">
              Suscribirme
            </button>
            <p
              aria-live="polite"
              role="status"
              className="mono text-xs uppercase tracking-widest min-h-[1.25rem]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {status === 'ok' && '✓ Gracias — te confirmaremos la suscripción por correo.'}
              {status === 'error' && 'Ingresá un correo válido.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
