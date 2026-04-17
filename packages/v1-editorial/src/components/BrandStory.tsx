import { BRAND } from '@c21/shared';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../lib/useCountUp';

/**
 * Two-column editorial long-form with a running italic marginalia note. Stats
 * render as a single horizontal rule line with mono figures. All numbers come
 * from BRAND — no invented Argentina office or agent counts.
 */
export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setEnabled(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const worldYear = useCountUp(BRAND.globalFoundedYear, enabled);
  const arYear = useCountUp(2017, enabled);
  const countries = useCountUp(BRAND.countriesOperated, enabled);
  const provinces = useCountUp(BRAND.provinciasCubiertas, enabled);

  return (
    <section
      data-section="brand-story"
      aria-label="Sobre Century 21 Argentina"
      className="bg-[color:var(--color-bg)] py-20 lg:py-28"
    >
      <div className="container-ed grid gap-10 lg:grid-cols-12 lg:gap-[var(--gutter-marginalia)]">
        <aside
          aria-hidden
          className="marginalia hidden lg:col-span-3 lg:block lg:pt-10"
        >
          <p className="max-w-[24ch]">
            Una oficina por barrio, un asesor por familia. La escala se hace lenta
            a propósito.
          </p>
        </aside>
        <div className="lg:col-span-9" ref={ref}>
          <p className="eyebrow mb-4">Nosotros</p>
          <h2
            className="mb-8 font-display leading-[1]"
            style={{
              fontSize: 'var(--text-h2)',
              fontVariationSettings: "'opsz' 72, 'SOFT' 60, 'WONK' 1",
            }}
          >
            {BRAND.tagline}.
          </h2>
          <div className="grid gap-8 text-[1.0625rem] leading-[1.75] text-[color:var(--color-ink)] md:grid-cols-2 md:gap-12">
            <p>
              {BRAND.positioning}. Trabajamos un mercado que no se apura — cada
              barrio con su tiempo, cada familia con su agenda. Desde 2017
              sumamos oficinas en las {BRAND.provinciasCubiertas} provincias del
              país, siempre bajo el modelo de franquicia independiente que la red
              mantiene desde {BRAND.globalFoundedYear}.
            </p>
            <p>
              La marca opera en {BRAND.countriesOperated} países y reúne{' '}
              {BRAND.globalOfficesApprox} oficinas a nivel global, pero nuestra
              unidad de medida sigue siendo la conversación que termina en una
              firma sin ruido. {BRAND.taglineSub}.
            </p>
          </div>

          <hr className="rule my-10" />

          <dl className="grid grid-cols-2 gap-6 font-mono text-[color:var(--color-ink)] sm:grid-cols-4">
            <Stat label="Mundo" value={worldYear.toString()} />
            <Stat label="Argentina" value={arYear.toString()} />
            <Stat label="Países" value={countries.toString()} />
            <Stat label="Provincias" value={provinces.toString()} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[color:var(--color-divider)] pt-3">
      <dt className="text-[0.6875rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-mute)]">
        {label}
      </dt>
      <dd className="font-mono text-2xl text-[color:var(--color-ink)] tabular">
        {value}
      </dd>
    </div>
  );
}
