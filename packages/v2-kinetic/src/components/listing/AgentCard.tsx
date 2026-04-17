import { useState } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import type { Agent, Office } from '@c21/shared';
import { unsplashUrl } from '@c21/shared';

/**
 * Agent card. Mobile: sticky bottom CTA sheet. Desktop: in the right sidebar.
 * Hover reveals 280 px bio peek panel with "28 operaciones cerradas" count.
 */
export function AgentCard({ agent, office }: { agent: Agent; office?: Office }) {
  const [peek, setPeek] = useState(false);
  const whatsappHref = `https://wa.me/${agent.whatsapp}`;
  const phoneHref = `tel:${agent.phone.replace(/\s/g, '')}`;
  const mailHref = `mailto:${agent.email}`;

  return (
    <aside data-section="agent-card" className="relative">
      <div
        onMouseEnter={() => setPeek(true)}
        onMouseLeave={() => setPeek(false)}
        className="relative border border-[var(--color-divider)] bg-white p-5"
      >
        <div className="flex items-center gap-4">
          <img
            src={unsplashUrl(agent.photoUnsplashId, 160)}
            alt={`Retrato de ${agent.name}`}
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="text-[1rem] font-[700] leading-tight">{agent.name}</p>
            <p className="v2-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
              {agent.title}
            </p>
            <p className="v2-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-accent-cool)]">
              28 operaciones cerradas
            </p>
          </div>
        </div>

        {office && (
          <p className="mt-4 text-[0.82rem] text-[var(--color-ink-mute)]">
            {office.name} · {office.address}
          </p>
        )}

        <div className="mt-5 grid grid-cols-3 gap-2">
          <a
            href={phoneHref}
            className="v2-tap inline-flex items-center justify-center gap-1 border border-[var(--color-divider)] px-3 py-2.5 text-[0.8rem] font-[600] hover:border-[var(--color-ink)]"
          >
            <Phone size={14} aria-hidden /> Llamar
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer noopener"
            className="v2-tap inline-flex items-center justify-center gap-1 border border-[var(--color-divider)] bg-[var(--color-accent-cool)] px-3 py-2.5 text-[0.8rem] font-[600] text-white"
          >
            <MessageCircle size={14} aria-hidden /> WhatsApp
          </a>
          <a
            href={mailHref}
            className="v2-tap inline-flex items-center justify-center gap-1 border border-[var(--color-divider)] px-3 py-2.5 text-[0.8rem] font-[600] hover:border-[var(--color-ink)]"
          >
            <Mail size={14} aria-hidden /> Mail
          </a>
        </div>

        {peek && (
          <div
            role="note"
            className="v2-mono pointer-events-none absolute left-full top-0 ml-3 hidden w-[280px] border border-[var(--color-divider)] bg-[var(--color-ink)] p-4 text-[0.82rem] leading-[1.5] text-white lg:block"
            style={{ transform: 'translateX(-4px)', transitionDuration: '260ms' }}
          >
            <p className="v2-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--color-brand-gold)]">
              Perfil
            </p>
            <p className="mt-2 text-[0.9rem] normal-case tracking-normal text-white/95 font-sans">
              {agent.bio}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
