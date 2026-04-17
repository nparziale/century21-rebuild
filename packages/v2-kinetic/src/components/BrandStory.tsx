import { useEffect, useRef, useState } from 'react';
import { BRAND, tenureYearsGlobal, tenureYearsInArgentina, unsplashUrl, unsplashSrcSet } from '@c21/shared';
import { useInView } from '../lib/useInView.ts';
import { useReducedMotion } from '../lib/useReducedMotion.ts';

/**
 * Brand story / stat band. Counts up on intersection (900 ms). Full-bleed
 * editorial photo behind with tiny parallax. Numbers are derived only from
 * verified BRAND constants and tenure helpers. Zone: warm (small orange tick).
 */
export function BrandStory() {
  const argTenure = tenureYearsInArgentina();
  const globalTenure = tenureYearsGlobal();

  const stats: Array<{ value: number; label: string; suffix?: string }> = [
    { value: globalTenure, label: 'Años globalmente' },
    { value: argTenure, label: 'Años en Argentina' },
    { value: BRAND.countriesOperated, label: 'Países' },
    { value: BRAND.provinciasCubiertas, label: 'Provincias cubiertas' },
  ];

  return (
    <section
      data-section="brand-story"
      className="zone-warm relative isolate overflow-hidden py-20 md:py-28"
    >
      <ParallaxBg />
      <div className="relative mx-auto max-w-[var(--container-max)] px-4 md:px-6">
        <p className="v2-mono text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-ink)]">
          Marca global. Operación local.
        </p>
        <h2 className="mt-3 max-w-3xl text-[var(--text-h2)] font-[200] leading-[0.95] tracking-[-0.015em]">
          <span className="font-[700] italic">54 años</span> globalmente.{' '}
          <span className="font-[700] italic">9 años</span> en Argentina.{' '}
          <span className="font-[700]">79 países</span>.{' '}
          <span className="font-[700]">1 red</span>.
        </h2>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
          {stats.map((s) => (
            <StatBlock key={s.label} {...s} />
          ))}
        </dl>

        <p className="mt-10 max-w-2xl text-[0.95rem] text-[var(--color-ink-mute)]">
          Fundada en 1971 y con sede central en {BRAND.hq}, CENTURY 21 opera bajo licencias
          locales. {BRAND.parent} la integra hoy con más de 11.000 oficinas en todo el mundo.
        </p>
      </div>
    </section>
  );
}

function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${p * -20}px, 0)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10]">
      <div ref={ref} className="absolute inset-0 will-change-transform">
        <img
          src={unsplashUrl('1507089947368-19c1da9775ae', 2400)}
          srcSet={unsplashSrcSet('1507089947368-19c1da9775ae')}
          sizes="100vw"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function StatBlock({ value, label, suffix }: { value: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true, threshold: 0.3 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(value);
      return;
    }
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced]);

  return (
    <div ref={ref}>
      <dt className="v2-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
        {label}
      </dt>
      <dd className="v2-mono mt-2 text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] font-[700] leading-none tabular-nums">
        {n}
        {suffix ?? ''}
      </dd>
    </div>
  );
}
