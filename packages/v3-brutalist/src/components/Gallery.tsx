import { useCallback, useEffect, useRef, useState } from 'react';
import { unsplashSrcSet, unsplashUrl, LQIP_NEUTRAL, type Photo } from '@c21/shared';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { FolioRule } from './FolioRule.tsx';

type Props = { photos: readonly Photo[]; listingId: string };

export function Gallery({ photos, listingId }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + photos.length) % photos.length),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, next, prev]);

  if (photos.length === 0) return null;

  const first = photos[0]!;
  const rest = photos.slice(1);

  return (
    <section data-section="gallery">
      <FolioRule sectionNumber={3} label="GALERÍA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-8 xl:py-12">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <h2
            className="uppercase"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
          >
            Galería · {photos.length} fotos
          </h2>
          <span
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            #{listingId}
          </span>
        </div>

        {/* Mobile: horizontal scroll snap */}
        <div className="xl:hidden -mx-4 md:-mx-6 overflow-x-auto snap-x snap-mandatory flex gap-0">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => openAt(i)}
              className="snap-start shrink-0 w-[85vw] border border-black"
              style={{ aspectRatio: '4 / 3' }}
              aria-label={`Ver foto ${i + 1} en tamaño completo`}
            >
              <img
                src={unsplashUrl(p.src.replace(/^.*photo-/, '').split('?')[0] ?? '', 1280)}
                srcSet={unsplashSrcSet(p.src.replace(/^.*photo-/, '').split('?')[0] ?? '')}
                sizes="85vw"
                alt={p.alt}
                width={1280}
                height={960}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="block w-full h-full object-cover"
                style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
              />
            </button>
          ))}
        </div>

        {/* Desktop: 2×2 asymmetric grid cols 1-8 + thumbs cols 9-12 */}
        <div className="hidden xl:grid xl:grid-cols-12 xl:gap-4">
          <div className="col-span-8 grid grid-cols-2 grid-rows-2 gap-4">
            <button
              type="button"
              onClick={() => openAt(0)}
              className="col-span-2 row-span-1 border border-black bg-white"
              aria-label="Ver foto 1 en tamaño completo"
            >
              <img
                src={first.src}
                alt={first.alt}
                width={2400}
                height={1600}
                loading="eager"
                decoding="async"
                className="block w-full h-full object-cover aspect-[2/1]"
                style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
              />
            </button>
            {rest.slice(0, 2).map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => openAt(i + 1)}
                className="border border-black bg-white"
                aria-label={`Ver foto ${i + 2} en tamaño completo`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-full object-cover aspect-[4/3]"
                  style={{ backgroundImage: `url(${LQIP_NEUTRAL})`, backgroundSize: 'cover' }}
                />
              </button>
            ))}
          </div>
          <ol className="col-span-4 grid grid-cols-2 gap-3 auto-rows-min content-start">
            {rest.slice(2).map((p, i) => (
              <li key={p.src}>
                <button
                  type="button"
                  onClick={() => openAt(i + 3)}
                  className="border border-black block w-full"
                  aria-label={`Ver foto ${i + 4} en tamaño completo`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="block w-full aspect-[4/3] object-cover"
                    style={{
                      backgroundImage: `url(${LQIP_NEUTRAL})`,
                      backgroundSize: 'cover',
                    }}
                  />
                </button>
                <div
                  className="mono text-[11px] uppercase tracking-widest mt-1 px-1 flex items-center justify-between"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
                >
                  <span>{String(i + 4).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
                  <span>#{listingId}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería ampliada"
          className="fixed inset-0 z-50 bg-black text-white flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <span
              className="mono text-xs uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar galería"
              className="inline-flex items-center justify-center w-11 h-11 border border-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-4 inline-flex items-center justify-center w-11 h-11 border border-white bg-black"
            >
              <ChevronLeft size={20} />
            </button>
            <img
              src={photos[index]!.src}
              alt={photos[index]!.alt}
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-4 inline-flex items-center justify-center w-11 h-11 border border-white bg-black"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="p-4 border-t border-white/20 text-sm">
            <p style={{ fontFamily: 'var(--font-body)' }}>{photos[index]!.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
