import { useState } from 'react';
import type { FormEvent } from 'react';

/**
 * Compact newsletter section. Field underline on focus (via .field-input).
 * On submit, shows a polite success state (aria-live) — client-side only.
 */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section
      data-section="newsletter"
      aria-label="Boletín"
      className="bg-[color:var(--color-surface)] py-20 lg:py-28"
    >
      <div className="container-ed grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-3">Boletín</p>
          <p className="font-display text-[1.75rem] leading-[1.2] italic text-[color:var(--color-ink)]">
            Una vez por mes, un correo con lo que se está mirando en el mercado
            argentino. Nada más.
          </p>
        </div>
        <div className="lg:col-span-2 hidden lg:block" aria-hidden>
          <hr className="h-px w-full bg-[color:var(--color-accent-deep)]/40" />
        </div>
        <div className="lg:col-span-5">
          {!sent ? (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <label className="field">
                <span className="field-label">Correo electrónico</span>
                <input
                  className="field-input"
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="flex items-start gap-3">
                <input id="nl-privacy" type="checkbox" required className="mt-1" />
                <label htmlFor="nl-privacy" className="text-xs text-[color:var(--color-ink-mute)]">
                  Acepto recibir comunicaciones de Century 21 Argentina.
                </label>
              </div>
              <button type="submit" className="btn btn-olive self-start">
                Suscribirme
              </button>
            </form>
          ) : (
            <p role="status" aria-live="polite" className="font-display text-xl">
              Te anotamos. Revisá tu correo para confirmar la suscripción.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
