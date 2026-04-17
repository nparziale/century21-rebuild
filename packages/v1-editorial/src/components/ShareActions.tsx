import { Copy, Heart, Printer, Share2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useLocalStorageArray } from '../lib/useLocalStorageArray';

/**
 * Share rail. Mobile: fixed bottom bar. Desktop: vertical rail in left marginalia.
 * Actions: copy link, favorite toggle (localStorage at `c21:favorites`), print,
 * WhatsApp share. Tooltips on hover at desktop.
 */
export function ShareActions({ listingId, title }: { listingId: string; title: string }) {
  const { has, toggle } = useLocalStorageArray('c21:favorites');
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore — no clipboard */
    }
  }, []);

  const printPage = useCallback(() => window.print(), []);

  const waShare = `https://wa.me/?text=${encodeURIComponent(`${title} — ${window.location.origin}/propiedad/${listingId}`)}`;
  const isFav = has(listingId);

  const actions: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;
    testId?: string;
    pressed?: boolean;
  }> = [
    {
      key: 'fav',
      label: isFav ? 'Quitar de favoritos' : 'Guardar en favoritos',
      icon: (
        <Heart
          size={16}
          aria-hidden
          className={isFav ? 'fill-[color:var(--color-accent)] text-[color:var(--color-accent)]' : ''}
        />
      ),
      onClick: () => toggle(listingId),
      testId: 'favorite-toggle',
      pressed: isFav,
    },
    {
      key: 'copy',
      label: copied ? 'Enlace copiado' : 'Copiar enlace',
      icon: <Copy size={16} aria-hidden />,
      onClick: copyLink,
    },
    {
      key: 'whatsapp',
      label: 'Compartir por WhatsApp',
      icon: <Share2 size={16} aria-hidden />,
      href: waShare,
    },
    {
      key: 'print',
      label: 'Imprimir',
      icon: <Printer size={16} aria-hidden />,
      onClick: printPage,
    },
  ];

  return (
    <aside
      data-section="share-actions"
      aria-label="Acciones de la propiedad"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[color:var(--color-divider)] bg-[color:var(--color-bg)]/95 backdrop-blur lg:static lg:inset-auto lg:border-0 lg:bg-transparent lg:backdrop-blur-none"
    >
      <ul className="container-ed flex items-center justify-around gap-2 py-2 lg:mx-0 lg:flex-col lg:items-start lg:justify-start lg:gap-3 lg:px-0">
        {actions.map((a) => {
          const content = (
            <>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-divider)] text-[color:var(--color-ink)] group-hover:border-[color:var(--color-accent-deep)]">
                {a.icon}
              </span>
              <span className="sr-only lg:not-sr-only lg:text-xs lg:text-[color:var(--color-ink-mute)]">
                {a.label}
              </span>
            </>
          );
          return (
            <li key={a.key} className="group relative">
              {a.href ? (
                <a
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={a.label}
                  className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3"
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={a.onClick}
                  aria-label={a.label}
                  aria-pressed={a.pressed}
                  data-testid={a.testId}
                  className="flex flex-col items-center gap-1 lg:flex-row lg:gap-3"
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {copied && (
        <span role="status" aria-live="polite" className="sr-only">
          Enlace copiado al portapapeles.
        </span>
      )}
    </aside>
  );
}
