import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Franchise CTA. Cool-zone full-bleed. Large Switzer 700 tight H2, form nudges
 * in from right on intersection. Single-accent rule: no orange in this frame.
 */
export function FranchiseCta() {
  return (
    <section data-section="franchise-cta" className="zone-blue relative isolate overflow-hidden py-20 md:py-28">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-white/95">
            Licencias CENTURY 21
          </p>
          <h2 className="mt-4 text-[var(--text-h2)] font-[700] leading-[0.92] tracking-[-0.02em] text-white">
            Adquiere una licencia{' '}
            <span className="italic font-[300]">CENTURY 21</span>
          </h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-[1.55] text-white/95">
            Soporte regional, sistema 21 Online, formación continua y marca internacional.
            Solicitamos la entrevista de factibilidad en un plazo estándar de 14 días.
          </p>
          <ul className="v2-mono mt-8 grid grid-cols-2 gap-x-6 gap-y-2 text-[0.78rem] uppercase tracking-[0.18em] text-white/95">
            <li>· Marca global</li>
            <li>· 21 Online CRM</li>
            <li>· Formación continua</li>
            <li>· Territorio reservado</li>
          </ul>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Recibimos tu interés. Te contactaremos para la entrevista de factibilidad.');
          }}
        >
          <div className="border border-white/20 bg-white p-5 text-[var(--color-ink)] md:p-6">
            <h3 className="text-[1.25rem] font-[700]">Entrevista de factibilidad</h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              <FrField label="Nombre" name="nombre" required />
              <FrField label="Email" name="email" type="email" required />
              <FrField label="Ciudad" name="ciudad" required />
              <FrField label="Experiencia en inmuebles" name="exp" placeholder="Opcional" />
            </div>
            <button
              type="submit"
              className="v2-tap mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-ink)] px-5 py-3.5 text-[0.92rem] font-[600] text-white hover:opacity-90"
            >
              Enviar
              <ArrowRight size={16} aria-hidden />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function FrField({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-[0.85rem]">
      <span className="v2-mono block text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
        {label}
        {required && ' *'}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full border-b border-[var(--color-divider)] bg-transparent py-2 text-[0.95rem] outline-none transition-[transform,border-color] duration-200 focus:-translate-y-[2px] focus:border-[var(--color-accent-cool)]"
      />
    </label>
  );
}
