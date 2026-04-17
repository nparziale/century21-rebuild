import type { Agent } from '@c21/shared';
import { useState } from 'react';
import type { FormEvent } from 'react';

/**
 * Listing contact form. Native required validation, hairline-underline inputs,
 * olive submit, polite success state after submit.
 */
export function ContactForm({ agent, listingId }: { agent?: Agent; listingId: string }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <section
        data-section="contact-form"
        aria-label="Formulario de contacto"
        className="border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] p-6 md:p-8"
      >
        <p
          role="status"
          aria-live="polite"
          className="font-display text-2xl leading-tight text-[color:var(--color-ink)]"
        >
          Recibimos tu consulta. Te respondemos en las próximas horas.
        </p>
        <p className="mt-3 font-italic text-sm text-[color:var(--color-ink-mute)]">
          Referencia — {listingId}
        </p>
      </section>
    );
  }

  return (
    <section
      data-section="contact-form"
      aria-label="Formulario de contacto"
      className="border border-[color:var(--color-divider)] bg-[color:var(--color-surface)] p-6 md:p-8"
    >
      <header className="mb-6">
        <p className="eyebrow">Consultar</p>
        <h3 className="font-display text-2xl leading-tight">
          Escribile {agent?.name ? `a ${agent.name}` : 'al asesor'}
        </h3>
      </header>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <label className="field">
          <span className="field-label">Nombre y apellido</span>
          <input className="field-input" type="text" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          <span className="field-label">Correo electrónico</span>
          <input className="field-input" type="email" name="email" required autoComplete="email" />
        </label>
        <label className="field">
          <span className="field-label">Teléfono</span>
          <input className="field-input" type="tel" name="phone" required autoComplete="tel" />
        </label>
        <label className="field">
          <span className="field-label">Mensaje</span>
          <textarea
            className="field-textarea"
            name="message"
            required
            defaultValue={`Hola, me interesa la propiedad ${listingId}. ¿Podemos coordinar una visita?`}
          />
        </label>
        <label className="flex items-start gap-3 text-xs text-[color:var(--color-ink-mute)]">
          <input type="checkbox" required className="mt-[2px]" />
          <span>
            Acepto el{' '}
            <a href="/privacidad" className="link-bronze">
              aviso de privacidad
            </a>{' '}
            y el tratamiento de mis datos.
          </span>
        </label>
        <button type="submit" className="btn btn-olive self-start">
          Enviar consulta
        </button>
      </form>
    </section>
  );
}
