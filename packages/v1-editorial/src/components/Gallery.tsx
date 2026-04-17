import type { Photo } from '@c21/shared';
import { unsplashSrcSet, LQIP_NEUTRAL } from '@c21/shared';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Listing gallery. Main image + right rail thumbnails on desktop; edge-swipe
 * with mono counter on mobile. Clicking a photo opens a full-screen lightbox
 * with keyboard arrow navigation, Esc to close, and focus trap inside the dialog.
 */
export function Gallery({ photos }: { photos: readonly Photo[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const photoCount = photos.length;

  const prev = useCallback(
    () => setActive((a) => (a - 1 + photoCount) % photoCount),
    [photoCount],
  );
  const next = useCallback(() => setActive((a) => (a + 1) % photoCount), [photoCount]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(false);
      } else if (e.key === 'ArrowRight') {
        next();
      } else if (e.key === 'ArrowLeft') {
        prev();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // focus the close button when lightbox opens
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      openerRef.current?.focus();
    };
  }, [lightbox, next, prev]);

  const current = photos[active];
  if (!current) return null;

  return (
    <section
      data-section="gallery"
      aria-label="Galería de imágenes"
      className="bg-[color:var(--color-bg)]"
    >
      <div className="container-ed py-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_110px] lg:gap-4">
          <button
            type="button"
            ref={(el) => {
              openerRef.current = el;
            }}
            onClick={() => setLightbox(true)}
            aria-label={`Abrir galería en pantalla completa — imagen ${active + 1} de ${photoCount}`}
            className="relative block aspect-[4/3] w-full overflow-hidden bg-[color:var(--color-surface)] outline-offset-2 md:aspect-[3/2]"
          >
            <picture>
              <source srcSet={unsplashSrcSet(extractId(current.src))} sizes="(min-width: 1024px) 60vw, 100vw" />
              <img
                src={current.src}
                alt={current.alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="block h-full w-full object-cover"
                style={{ backgroundImage: `url('${LQIP_NEUTRAL}')`, backgroundSize: 'cover' }}
              />
            </picture>
            <span className="absolute bottom-3 left-3 rounded-full bg-[color:var(--color-ink)]/80 px-2 py-1 font-mono text-[11px] text-[color:var(--color-bg)]">
              {String(active + 1).padStart(2, '0')} / {String(photoCount).padStart(2, '0')}
            </span>
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 items-center justify-start pl-2 md:flex">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Imagen anterior"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-bg)]/80 text-[color:var(--color-ink)]"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 items-center justify-end pr-2 md:flex">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Imagen siguiente"
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-bg)]/80 text-[color:var(--color-ink)]"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </div>
          </button>
          <ul className="hidden flex-col gap-3 lg:flex">
            {photos.slice(0, 3).map((p, i) => (
              <li key={p.src}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Mostrar imagen ${i + 1}`}
                  aria-current={active === i}
                  className={[
                    'block aspect-square w-full overflow-hidden bg-[color:var(--color-surface)] outline-offset-2',
                    active === i ? 'ring-1 ring-[color:var(--color-accent-deep)]' : '',
                  ].join(' ')}
                >
                  <img
                    src={p.src}
                    alt=""
                    role="presentation"
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile thumbs strip */}
        <ul className="mt-3 flex gap-2 overflow-x-auto no-scrollbar lg:hidden">
          {photos.map((p, i) => (
            <li key={p.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Mostrar imagen ${i + 1}`}
                aria-current={active === i}
                className={[
                  'h-16 w-24 shrink-0 overflow-hidden bg-[color:var(--color-surface)]',
                  active === i ? 'ring-1 ring-[color:var(--color-accent-deep)]' : '',
                ].join(' ')}
              >
                <img
                  src={p.src}
                  alt=""
                  role="presentation"
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ${active + 1} de ${photoCount} — ${current.alt}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(false);
          }}
        >
          <button
            type="button"
            ref={closeBtnRef}
            onClick={() => setLightbox(false)}
            aria-label="Cerrar galería"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-bg)]/10 text-[color:var(--color-bg)] hover:bg-[color:var(--color-bg)]/20"
          >
            <X size={22} aria-hidden />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-bg)]/10 text-[color:var(--color-bg)] hover:bg-[color:var(--color-bg)]/20"
          >
            <ChevronLeft size={22} aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-bg)]/10 text-[color:var(--color-bg)] hover:bg-[color:var(--color-bg)]/20"
          >
            <ChevronRight size={22} aria-hidden />
          </button>
          <figure className="max-h-[90vh] max-w-[min(90vw,1400px)]">
            <img
              src={current.src}
              alt={current.alt}
              className="block max-h-[84vh] w-auto max-w-full"
            />
            <figcaption className="mt-3 text-center font-mono text-xs text-[color:var(--color-bg)]/70">
              {String(active + 1).padStart(2, '0')} / {String(photoCount).padStart(2, '0')} — {current.caption ?? current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/** Extract the Unsplash photo ID from a composed URL. */
function extractId(url: string): string {
  const m = url.match(/photo-([a-z0-9-]+)\?/);
  return m?.[1] ?? '';
}
