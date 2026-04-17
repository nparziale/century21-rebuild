import { ChevronRight } from 'lucide-react';

export function Breadcrumb({ trail }: { trail: Array<{ label: string; href?: string }> }) {
  return (
    <nav
      data-section="breadcrumb"
      aria-label="breadcrumb"
      className="mx-auto max-w-[var(--container-max)] px-4 pt-6 pb-2 md:px-6"
    >
      <ol className="v2-mono flex flex-wrap items-center gap-1 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-mute)]">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={12} aria-hidden className="opacity-60" />}
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
                  className="truncate text-[var(--color-ink)]"
                  style={{ maxWidth: last ? '60ch' : undefined }}
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
