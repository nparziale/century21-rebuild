import type { Agent, Office } from '@c21/shared';
import { unsplashUrl, LQIP_NEUTRAL } from '@c21/shared';
import { Phone, Mail, MessageSquare } from 'lucide-react';

type Props = { agent: Agent; office?: Office };

export function AgentCard({ agent, office }: Props) {
  const photo = unsplashUrl(agent.photoUnsplashId, 480);
  return (
    <aside
      data-section="agent-card"
      className="border border-black bg-white xl:sticky xl:top-28 self-start"
      aria-label="Asesor inmobiliario"
    >
      <div className="p-5 flex items-center gap-4 border-b border-black">
        <img
          src={photo}
          alt={agent.name}
          width={96}
          height={96}
          loading="lazy"
          decoding="async"
          className="w-20 h-20 object-cover border border-black"
          style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
        />
        <div>
          <p
            className="mono text-[11px] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            {agent.title}
          </p>
          <h3
            className="text-lg"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            {agent.name}
          </h3>
          <p
            className="mono text-[11px] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Ref. Oficina RM-01
          </p>
        </div>
      </div>
      <p
        className="p-5 text-sm border-b border-black"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {agent.bio}
      </p>
      {office && (
        <dl className="p-5 border-b border-black text-sm space-y-2">
          <div>
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Oficina
            </dt>
            <dd style={{ fontFamily: 'var(--font-body)' }}>{office.name}</dd>
          </div>
          <div>
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Dirección
            </dt>
            <dd style={{ fontFamily: 'var(--font-body)' }}>{office.address}</dd>
          </div>
        </dl>
      )}
      <div className="p-5 flex flex-col gap-3">
        <a
          href={`tel:${agent.phone.replace(/\s/g, '')}`}
          className="cta-primary"
          data-accent="tango"
        >
          <Phone size={16} aria-hidden="true" /> Llamar
        </a>
        <a
          href={`https://wa.me/${agent.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-ghost"
        >
          <MessageSquare size={16} aria-hidden="true" /> WhatsApp
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="inline-flex items-center gap-2 mono text-xs uppercase tracking-widest underline underline-offset-4"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Mail size={14} aria-hidden="true" /> {agent.email}
        </a>
      </div>
    </aside>
  );
}
