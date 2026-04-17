import type { Agent, Office } from '@c21/shared';
import { unsplashUrl } from '@c21/shared';
import { Mail, MessageCircle, Phone } from 'lucide-react';

/**
 * Sticky agent card. Shown in the right column from the description downward.
 * Renders portrait, name, title, office, phone, email, WhatsApp deep-link.
 */
export function AgentCard({ agent, office }: { agent: Agent; office?: Office }) {
  const waHref = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
    'Hola, vi una propiedad en Century 21 y me gustaría más información.',
  )}`;
  return (
    <aside
      data-section="agent-card"
      aria-label="Asesor de la propiedad"
      className="border border-[color:var(--color-divider)] bg-[color:var(--color-bg)] p-5 md:p-6"
    >
      <div className="mb-4 flex items-center gap-4">
        <img
          src={unsplashUrl(agent.photoUnsplashId, 240)}
          alt={`Retrato de ${agent.name}`}
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="font-display text-lg leading-tight">{agent.name}</p>
          <p className="font-italic text-sm text-[color:var(--color-ink-mute)]">{agent.title}</p>
          {office && (
            <p className="font-mono text-[11px] text-[color:var(--color-ink-mute)]">
              {office.name}
            </p>
          )}
        </div>
      </div>
      <p className="mb-5 text-sm leading-[1.6] text-[color:var(--color-ink)]">{agent.bio}</p>
      <div className="flex flex-col gap-2">
        <a
          href={`tel:${agent.phone.replace(/\s/g, '')}`}
          className="btn btn-ghost w-full justify-center"
        >
          <Phone size={14} aria-hidden />
          Llamar
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-olive w-full justify-center"
        >
          <MessageCircle size={14} aria-hidden />
          WhatsApp
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="link-bronze mt-1 inline-flex items-center justify-center gap-2 text-sm"
        >
          <Mail size={13} aria-hidden />
          {agent.email}
        </a>
      </div>
    </aside>
  );
}
