import { useState } from 'react';
import type { Listing } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';

type Props = { listing: Listing };

export function ContactForm({ listing }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section data-section="contact-form">
      <FolioRule sectionNumber={11} label="CONTACTO" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Consultá esta propiedad
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            11 / 15 · Ref. {listing.id}
          </span>
        </div>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6"
          aria-label="Formulario de contacto"
        >
          <label className="field xl:col-span-6">
            <span>Nombre completo</span>
            <input type="text" required autoComplete="name" />
          </label>
          <label className="field xl:col-span-6">
            <span>Correo electrónico</span>
            <input type="email" required autoComplete="email" />
          </label>
          <label className="field xl:col-span-6">
            <span>Teléfono</span>
            <input
              type="tel"
              required
              autoComplete="tel"
              pattern="[0-9 +()-]{6,}"
            />
          </label>
          <label className="field xl:col-span-6">
            <span>Tipo de consulta</span>
            <select defaultValue="visita" required>
              <option value="visita">Coordinar visita</option>
              <option value="info">Pedir más información</option>
              <option value="oferta">Hacer una oferta</option>
              <option value="tasacion">Tasar mi propiedad</option>
            </select>
          </label>
          <label className="field xl:col-span-12">
            <span>Mensaje</span>
            <textarea
              required
              defaultValue={`Hola, me interesa la propiedad de referencia ${listing.id} en ${listing.address.neighborhood}. ¿Cuándo puedo visitarla?`}
            />
          </label>
          <label className="xl:col-span-12 flex items-start gap-3 text-xs">
            <input type="checkbox" required className="mt-1" />
            <span style={{ color: 'var(--color-ink-mute)' }}>
              Acepto el uso de mis datos para coordinar la consulta. Podés ver la
              política de privacidad en el pie.
            </span>
          </label>
          <div className="xl:col-span-12 flex flex-col sm:flex-row items-start gap-4">
            <button type="submit" className="cta-primary" data-accent="tango">
              Enviar consulta
            </button>
            <p
              aria-live="polite"
              className="mono text-xs uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {submitted
                ? '✓ Consulta enviada — te vamos a contactar en 48 h hábiles.'
                : 'Respuesta dentro de las 48 h hábiles.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
