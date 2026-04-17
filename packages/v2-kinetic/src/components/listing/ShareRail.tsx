import { Share2, Link2, Mail, Printer, Heart, MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFavorite } from '../../lib/favorites.ts';
import type { Listing } from '@c21/shared';

/**
 * Share rail. Mobile: bottom-sheet trigger. Desktop: floating right rail with
 * copy/email/print/whatsapp/favorite. Icon press 120 ms. Writes favorite id
 * to c21:favorites via useFavorite.
 */
export function ShareRail({ listing }: { listing: Listing }) {
  const { isFavorite, toggle } = useFavorite(listing.id);
  const [sheet, setSheet] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${listing.title} — ${url}`)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(url)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const actions = [
    { icon: Link2, label: 'Copiar link', onClick: copy },
    { icon: MessageCircle, label: 'WhatsApp', href: whatsappHref, external: true },
    { icon: Mail, label: 'Email', href: mailHref },
    { icon: Printer, label: 'Imprimir', onClick: () => window.print() },
    {
      icon: Heart,
      label: isFavorite ? 'Quitar favorito' : 'Guardar favorito',
      onClick: toggle,
      active: isFavorite,
      testid: 'favorite-toggle',
    },
  ];

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheet]);

  return (
    <aside data-section="share-actions">
      {/* Desktop floating rail */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {actions.map((a) => {
          const Icon = a.icon;
          const commonCls = `v2-tap pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-sm transition-transform duration-[120ms] active:scale-90 hover:-translate-y-0.5 ${('active' in a && a.active) ? 'border-[var(--color-accent-warm)] text-[var(--color-accent-warm)]' : 'border-[var(--color-divider)] text-[var(--color-ink)]'}`;
          return 'href' in a && a.href ? (
            <a
              key={a.label}
              href={a.href}
              target={'external' in a && a.external ? '_blank' : undefined}
              rel="noreferrer noopener"
              className={commonCls}
              title={a.label}
              aria-label={a.label}
            >
              <Icon size={16} aria-hidden />
            </a>
          ) : (
            <button
              key={a.label}
              type="button"
              data-testid={'testid' in a ? a.testid : undefined}
              onClick={a.onClick}
              className={commonCls}
              aria-label={a.label}
              aria-pressed={'active' in a ? a.active : undefined}
              title={a.label}
            >
              <Icon size={16} aria-hidden />
            </button>
          );
        })}
        {copied && (
          <span className="v2-mono pointer-events-none absolute -left-[140px] top-0 rounded bg-[var(--color-ink)] px-2 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-white">
            Link copiado
          </span>
        )}
      </div>

      {/* Mobile trigger */}
      <div className="fixed bottom-4 right-4 z-30 lg:hidden">
        <button
          type="button"
          onClick={() => setSheet(true)}
          className="v2-tap inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-ink)] text-white shadow-lg"
          aria-label="Compartir y acciones"
        >
          <Share2 size={18} aria-hidden />
        </button>
        <button
          type="button"
          data-testid="favorite-toggle"
          onClick={toggle}
          className={`v2-tap absolute -top-14 right-0 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white shadow border ${isFavorite ? 'border-[var(--color-accent-warm)] text-[var(--color-accent-warm)]' : 'border-[var(--color-divider)]'}`}
          aria-label={isFavorite ? 'Quitar favorito' : 'Guardar favorito'}
          aria-pressed={isFavorite}
        >
          <Heart size={16} aria-hidden fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {sheet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Acciones"
          className="fixed inset-0 z-40 flex items-end bg-black/50 lg:hidden"
          onClick={() => setSheet(false)}
        >
          <div
            className="w-full bg-[var(--color-bg)] p-5"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'v2-sheet-in 260ms var(--ease-spring) both' }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="v2-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
                Acciones
              </p>
              <button
                type="button"
                onClick={() => setSheet(false)}
                className="v2-tap inline-flex h-11 w-11 items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="divide-y divide-[var(--color-divider)]">
              {actions.map((a) => {
                const Icon = a.icon;
                return (
                  <li key={a.label}>
                    {'href' in a && a.href ? (
                      <a
                        href={a.href}
                        target={'external' in a && a.external ? '_blank' : undefined}
                        rel="noreferrer noopener"
                        className="flex items-center gap-3 py-3 text-[0.95rem] font-[500]"
                      >
                        <Icon size={18} aria-hidden />
                        {a.label}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          a.onClick?.();
                        }}
                        className="flex w-full items-center gap-3 py-3 text-left text-[0.95rem] font-[500]"
                      >
                        <Icon size={18} aria-hidden />
                        {a.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}
