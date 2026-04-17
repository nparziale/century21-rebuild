import { useSectionCounter } from '../lib/useSectionCounter.ts';

/**
 * Desktop-only section-counter side-rail (≥1280). Vertical-rl Anton text
 * with tango accent showing "03 / 13" of current section.
 */
export function SectionCounter() {
  const { active, total } = useSectionCounter();
  if (total === 0) return null;
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <aside
      className="section-rail"
      aria-label={`Sección ${active} de ${total}`}
      data-accent="tango"
    >
      <span className="section-rail__label" aria-hidden="true">
        {pad(active)} / {pad(total)}
      </span>
    </aside>
  );
}
