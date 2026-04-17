import { useState } from 'react';
import { Send } from 'lucide-react';
import type { Listing } from '@c21/shared';

/**
 * Contact form. Native required validation. Mono labels. Border-color + y -2
 * focus lift, 200 ms spring.
 */
export function ContactForm({ listing }: { listing: Listing }) {
  const [sent, setSent] = useState(false);
  return (
    <section data-section="contact-form" className="zone-neutral">
      <div className="border border-[var(--color-divider)] bg-white p-5">
        <p className="v2-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-ink-mute)]">
          Consultar
        </p>
        <h3 className="mt-2 text-[1.15rem] font-[700] leading-tight">
          Agendá una visita.
        </h3>
        <form
          className="mt-4 grid grid-cols-1 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input type="hidden" name="listingId" value={listing.id} />
          <Field label="Nombre" name="nombre" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Teléfono" name="telefono" type="tel" />
          <Field
            label="Mensaje"
            name="mensaje"
            textarea
            required
            placeholder={`Hola, me interesa la propiedad Ref. ${listing.id}.`}
          />
          <label className="v2-mono flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--color-ink-mute)]">
            <input type="checkbox" required className="h-4 w-4" />
            Acepto la política de privacidad
          </label>
          <button
            type="submit"
            className="v2-tap mt-1 inline-flex items-center justify-center gap-2 bg-[var(--color-ink)] px-4 py-3 text-[0.88rem] font-[600] text-white hover:opacity-90"
          >
            <Send size={14} aria-hidden /> Enviar consulta
          </button>
          {sent && (
            <p role="status" className="v2-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-accent-cool)]">
              Recibimos tu consulta. Te contactamos en menos de 2 h hábiles.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const common =
    'w-full border border-[var(--color-divider)] bg-transparent px-3 py-2.5 text-[0.95rem] outline-none transition-[transform,border-color] duration-200 focus:-translate-y-[2px] focus:border-[var(--color-accent-cool)]';
  return (
    <label className="block">
      <span className="v2-mono block text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
        {label}
        {required && ' *'}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={`${common} mt-1 resize-y`}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={`${common} mt-1`}
        />
      )}
    </label>
  );
}
