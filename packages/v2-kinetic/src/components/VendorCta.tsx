import { motion, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { unsplashUrl, unsplashSrcSet } from '@c21/shared';
import { Link } from 'react-router-dom';

/**
 * Vendor CTA. Mobile: stacked headline + image. Desktop: 7/5 split. Headline
 * morphs wght on intersection. Image gets subtle 4 px chromatic aberration on
 * pointer-move (desktop ≥1024). Zone: warm.
 */
export function VendorCta() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [ab, setAb] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--hero-wght', inView ? '700' : '300');
  }, [inView]);

  const onMove = (e: React.PointerEvent) => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return;
    const el = imgWrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    setAb({ x: cx * 4, y: cy * 4 });
  };
  const onLeave = () => setAb({ x: 0, y: 0 });

  return (
    <section data-section="vendor-cta" className="zone-warm bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink)]">
            Confíanos tu propiedad
          </p>
          <motion.h2
            ref={ref}
            className="v2-hero-h1 mt-4 text-[var(--text-h2)] leading-[0.94] tracking-[-0.015em]"
            style={{ ['--hero-wght' as string]: 300 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Tasación gratuita.
            <br />
            <span className="italic">Publicación en 48 horas.</span>
          </motion.h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-[1.55] text-[var(--color-ink-mute)]">
            Un asesor visita la propiedad, releva documentación, compara cierres recientes del barrio
            y deja una tasación escrita. Sin exclusividad forzada.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/confianos-tu-propiedad"
              className="v2-tap inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-[0.92rem] font-[600] text-white hover:opacity-90"
            >
              Solicitar tasación
              <ArrowUpRight size={16} aria-hidden />
            </Link>
            <Link
              to="/confianos-tu-propiedad#promover"
              className="v2-mono inline-block text-[0.8rem] uppercase tracking-[0.22em] underline decoration-[var(--color-accent-warm)] underline-offset-4 hover:text-[var(--color-accent-warm)]"
            >
              Cómo promovemos
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            ref={imgWrapRef}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-surface)]"
          >
            <img
              src={unsplashUrl('1512917774080-9991f1c4c750', 1280)}
              srcSet={unsplashSrcSet('1512917774080-9991f1c4c750')}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Casa con parque — operación de venta"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* Chromatic aberration overlays */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[color:var(--color-accent-cool)] mix-blend-screen opacity-[0.12]"
              style={{ transform: `translate3d(${ab.x}px, ${ab.y}px, 0)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[color:var(--color-accent-warm)] mix-blend-multiply opacity-[0.08]"
              style={{ transform: `translate3d(${-ab.x}px, ${-ab.y}px, 0)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
