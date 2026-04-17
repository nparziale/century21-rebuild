import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ trail }: { trail: Array<{ label: string; href?: string }> }) {
  return (
    <nav
      data-section="breadcrumb"
      aria-label="breadcrumb"
      className="mx-auto max-w-[var(--container-max)] px-4 pt-6 pb-2 md:px-6"
    >
      {/* Single-row scroller on mobile — no wrap, fade-mask on the right edge,
          last item truncates with ellipsis. Wraps normally on md+. */}
      <ol
        className="v2-mono flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)] [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:whitespace-normal md:overflow-visible [&::-webkit-scrollbar]:hidden"
        style={{
          maskImage: 'linear-gradient(90deg, #000 0, #000 calc(100% - 32px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, #000 0, #000 calc(100% - 32px), transparent 100%)',
        }}
      >
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex shrink-0 items-center gap-1.5 last:min-w-0 last:shrink">
              {i > 0 && <ChevronRight size={12} aria-hidden className="opacity-60 shrink-0" />}
              {item.href && !last ? (
                <a
                  href={item.href}
                  className="relative inline-block text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition-[color] duration-200"
                >
                  <span>{item.label}</span>
                  <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--color-accent-cool)] transition-transform duration-200 hover:scale-x-100" />
                </a>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="block truncate text-[var(--color-ink)]"
                  style={{ maxWidth: last ? '60ch' : undefined }}
                  title={last ? item.label : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
