import { BRAND, tenureYearsInArgentina, tenureYearsGlobal } from '@c21/shared';
import { Counter } from './Counter.tsx';
import { FolioRule } from './FolioRule.tsx';

/**
 * V3 Brand story — oversize Anton bleeds into left margin at ≥1280.
 * 4-col stat row: DESDE 1971 · 79 PAÍSES · DESDE 2017 EN ARGENTINA · 28 PROVINCIAS.
 * Counters on scroll-in (M1). Copy includes brand tagline "Dando el 121%".
 */
export function BrandStory() {
  const argYears = tenureYearsInArgentina();
  const globalYears = tenureYearsGlobal();
  return (
    <section data-section="brand-story">
      <FolioRule sectionNumber={5} total={10} label="HISTORIA" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-12 xl:py-24 overflow-x-clip">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-6">
          <p
            className="mono text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-ink-mute)' }}
          >
            05 / 10 · Quiénes somos
          </p>
        </div>
        <h2
          className="uppercase font-display"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 2rem + 12vw, 12rem)',
            lineHeight: 0.85,
            letterSpacing: '-0.01em',
          }}
        >
          <span className="block xl:-ml-10">UNA RED</span>
          <span className="block xl:-ml-20">DE CONFIANZA.</span>
        </h2>

        <div className="mt-10 grid grid-cols-4 xl:grid-cols-12 gap-4 xl:gap-6">
          <div className="col-span-4 xl:col-span-7">
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              CENTURY 21 opera desde 1971 y es una de las redes inmobiliarias más extensas
              del mundo. En Argentina abrió en 2017 bajo la conducción local de {BRAND.argentinaCEO}.
              La casa matriz está en {BRAND.hq}, dentro de {BRAND.parent}. Trabajamos con
              oficinas propietarias independientes en {BRAND.provinciasCubiertas} provincias.
            </p>
            <p
              className="mt-6 text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Nuestra marca tiene una frase corta. “<strong>Dando el 121%</strong>.
              Desafiando la mediocridad.” No es un slogan publicitario: es el estándar de
              servicio que exige la franquicia a cada oficina y a cada asesor.
            </p>
          </div>

          <dl className="col-span-4 xl:col-span-5 grid grid-cols-2 xl:grid-cols-2 gap-0 border border-black self-start">
            <div className="p-5 border-b border-r border-black">
              <dt
                className="uppercase text-[11px] tracking-widest mb-2"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Desde
              </dt>
              <dd
                className="font-display leading-none text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter value={BRAND.globalFoundedYear} kind="int" />
              </dd>
              <dd className="mt-2 text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                fundación global ({globalYears} años)
              </dd>
            </div>
            <div className="p-5 border-b border-black">
              <dt
                className="uppercase text-[11px] tracking-widest mb-2"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Países
              </dt>
              <dd
                className="font-display leading-none text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter value={BRAND.countriesOperated} kind="int" />
              </dd>
              <dd className="mt-2 text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                red global
              </dd>
            </div>
            <div className="p-5 border-r border-black">
              <dt
                className="uppercase text-[11px] tracking-widest mb-2"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                En Argentina
              </dt>
              <dd
                className="font-display leading-none text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter value={2017} kind="int" />
              </dd>
              <dd className="mt-2 text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                desde {argYears} años
              </dd>
            </div>
            <div className="p-5">
              <dt
                className="uppercase text-[11px] tracking-widest mb-2"
                style={{ color: 'var(--color-ink-mute)' }}
              >
                Provincias
              </dt>
              <dd
                className="font-display leading-none text-5xl xl:text-6xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <Counter value={BRAND.provinciasCubiertas} kind="int" />
              </dd>
              <dd className="mt-2 text-xs" style={{ color: 'var(--color-ink-mute)' }}>
                cobertura Argentina
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
