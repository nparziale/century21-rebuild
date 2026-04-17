import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion, useDataSaver } from '../lib/useReducedMotion.ts';
import { useScrollProgress } from '../lib/useScrollProgress.ts';

/**
 * V2 hero. Switzer H1 morphs wght 200→800 on scroll 0..0.35; on ≥1280 px also
 * tracks scroll-velocity for a 180 ms spring overshoot to 860. Reduced-motion
 * → static 600 and poster-only (no <video>). Data Saver → poster-only.
 *
 * Referenced MP4 paths are not required to exist; the poster remains visible.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const saver = useDataSaver();
  const shouldVideo = !reduced && !saver;

  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const { ref: progRef, progress, velocity } = useScrollProgress<HTMLDivElement>();

  // Weight morph
  useEffect(() => {
    if (!h1Ref.current) return;
    let wght: number;
    if (reduced) {
      wght = 600;
    } else {
      const base = 200 + Math.min(progress, 0.35) / 0.35 * (800 - 200);
      const isXL = window.matchMedia('(min-width: 1280px)').matches;
      const overshoot = isXL ? Math.min(60, Math.max(0, velocity * 6)) : 0;
      wght = Math.min(860, base + overshoot);
    }
    h1Ref.current.style.setProperty('--hero-wght', String(Math.round(wght)));
  }, [progress, velocity, reduced]);

  // Cursor parallax on hero plate (desktop only, ≤8 px)
  useEffect(() => {
    if (reduced) return;
    const plate = plateRef.current;
    const hero = heroRef.current;
    if (!plate || !hero) return;
    const onMove = (e: PointerEvent) => {
      if (!window.matchMedia('(min-width: 1024px)').matches) return;
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      plate.style.transform = `translate3d(${cx * -8}px, ${cy * -8}px, 0)`;
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }, [reduced]);

  // Video play/pause on viewport + preload swap
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.preload = 'auto';
            void el.play().catch(() => {
              /* autoplay may fail; poster still shows */
            });
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldVideo]);

  const handlePauseVideo = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  };

  return (
    <section
      ref={heroRef}
      data-section="hero"
      className="zone-ink relative isolate overflow-hidden"
      aria-label="Presentación de CENTURY 21 Argentina"
    >
      <div ref={progRef} className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[82vh] xl:min-h-[86vh]">
        {/* Poster / video plate with parallax */}
        <div
          ref={plateRef}
          className="absolute inset-0 -z-10 will-change-transform"
          aria-hidden
          style={{
            backgroundImage: `url('/hero/hero-poster.jpg.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {shouldVideo && (
            <video
              ref={videoRef}
              className="h-full w-full object-cover opacity-95"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero/hero-poster.jpg.svg"
              aria-label="Secuencia promocional de propiedades"
            >
              <source src="/hero/hero-portrait.webm" type="video/webm" media="(max-width: 767px)" />
              <source src="/hero/hero-portrait.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/hero/hero-landscape.webm" type="video/webm" media="(min-width: 768px)" />
              <source src="/hero/hero-landscape.mp4" type="video/mp4" media="(min-width: 768px)" />
              <track kind="descriptions" src="/hero/descriptions.vtt" srcLang="es" label="Descripciones" default />
            </video>
          )}
          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-inherit max-w-[var(--container-max)] flex-col justify-end px-4 pb-10 pt-24 md:px-6 md:pb-16 md:pt-28 lg:min-h-[82vh] xl:min-h-[86vh]">
          <div className="mb-10 md:mb-14 flex items-end gap-6">
            <div className="max-w-5xl">
              <p className="v2-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-brand-gold)]">
                Bienes raíces · Argentina
              </p>
              <h1
                ref={h1Ref}
                className="v2-hero-h1 mt-6 text-[var(--text-h1)] leading-[0.9] tracking-[-0.02em]"
                style={{ ['--hero-wght' as string]: 200 }}
              >
                <span className="block">Encontrá</span>
                <span className="block italic">dónde vivir.</span>
              </h1>
              <p className="mt-8 max-w-xl text-[1rem] md:text-[1.1rem] text-white/80 leading-[1.45]">
                Presencia en 79 países. En Argentina desde 2017. Cobertura en 28 provincias.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              to="/propiedad/286194"
              className="v2-tap inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent-warm)] px-6 py-4 text-[0.95rem] font-[700] text-white hover:opacity-95 sm:w-auto"
            >
              Ver propiedades
              <ArrowRight size={18} aria-hidden />
            </Link>
            <a
              href="#search"
              className="v2-tap inline-flex w-full items-center justify-center rounded-full border border-white/40 px-6 py-4 text-[0.95rem] font-[500] text-white hover:bg-white/5 sm:w-auto"
            >
              Buscar por ubicación
            </a>
            {shouldVideo && (
              <button
                type="button"
                onClick={handlePauseVideo}
                className="v2-tap inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-3 text-[0.8rem] text-white/80 hover:bg-white/5"
                aria-label="Pausar o reanudar vídeo del hero"
              >
                Pausar vídeo
              </button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="v2-mono mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/60"
          >
            <span>79 países</span>
            <span>28 provincias</span>
            <span>Desde 2017</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
