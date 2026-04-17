import { useState } from 'react';
import type { Listing } from '@c21/shared';
import { Share2, Copy, Mail, MessageSquare } from 'lucide-react';

type Props = { listing: Listing };

export function ShareActions({ listing }: Props) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const subject = encodeURIComponent(`Century 21 · Ref ${listing.id}`);
  const body = encodeURIComponent(`Mirá esta propiedad:\n${listing.title}\n${url}`);
  const wa = `https://wa.me/?text=${encodeURIComponent(`${listing.title}\n${url}`)}`;

  const copy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* Mobile: sticky bottom bar */}
      <aside
        data-section="share-actions"
        aria-label="Compartir propiedad"
        className="xl:hidden sticky bottom-0 z-30 bg-white border-t border-black"
      >
        <div className="grid grid-cols-4 divide-x divide-black">
          <button
            type="button"
            onClick={copy}
            className="h-12 flex items-center justify-center gap-1 text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
            aria-label="Copiar enlace"
          >
            <Copy size={14} aria-hidden="true" />
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <a
            href={`mailto:?subject=${subject}&body=${body}`}
            className="h-12 flex items-center justify-center gap-1 text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
            aria-label="Compartir por correo"
          >
            <Mail size={14} aria-hidden="true" /> Email
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 flex items-center justify-center gap-1 text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-body)' }}
            aria-label="Compartir por WhatsApp"
          >
            <MessageSquare size={14} aria-hidden="true" /> WA
          </a>
          <a
            href={`tel:${listing.id}`}
            className="cta-primary h-12 text-xs"
            data-accent="tango"
          >
            <Share2 size={14} aria-hidden="true" /> Contactar
          </a>
        </div>
      </aside>

      {/* Desktop: vertical right-margin strip (hidden mobile) */}
      <aside
        aria-label="Compartir propiedad"
        className="hidden xl:flex fixed right-[56px] top-1/2 -translate-y-1/2 z-20 flex-col gap-0 border border-black bg-white"
      >
        <button
          type="button"
          onClick={copy}
          className="h-12 w-12 flex items-center justify-center border-b border-black"
          aria-label="Copiar enlace"
          title={copied ? 'Enlace copiado' : 'Copiar enlace'}
        >
          <Copy size={18} aria-hidden="true" />
        </button>
        <a
          href={`mailto:?subject=${subject}&body=${body}`}
          className="h-12 w-12 flex items-center justify-center border-b border-black"
          aria-label="Compartir por correo"
        >
          <Mail size={18} aria-hidden="true" />
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="h-12 w-12 flex items-center justify-center"
          aria-label="Compartir por WhatsApp"
        >
          <MessageSquare size={18} aria-hidden="true" />
        </a>
      </aside>
    </>
  );
}
