import type { Listing, Agent } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { formatDate } from '../lib/format.ts';

type Props = { listing: Listing; agent?: Agent };

export function DescriptionBlock({ listing, agent }: Props) {
  const paragraphs = listing.description
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/)
    .reduce<string[]>((acc, sentence) => {
      if (acc.length === 0) acc.push(sentence);
      else if (acc[acc.length - 1]!.length > 220) acc.push(sentence);
      else acc[acc.length - 1] = `${acc[acc.length - 1]} ${sentence}`;
      return acc;
    }, []);

  return (
    <section data-section="description">
      <FolioRule sectionNumber={6} label="DESCRIPCIÓN" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-10 xl:py-14">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-10">
          <div className="xl:col-start-2 xl:col-span-7">
            <h2
              className="uppercase"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-h3)' }}
            >
              Descripción
            </h2>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-body)' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside className="xl:col-span-3 xl:col-start-10 border-t xl:border-t-0 xl:border-l border-black pt-6 xl:pt-0 xl:pl-6">
            <h3
              className="uppercase tracking-widest text-xs"
              style={{ color: 'var(--color-ink-mute)', fontFamily: 'var(--font-body)' }}
            >
              Ficha editorial
            </h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt
                  className="uppercase text-[11px] tracking-widest"
                  style={{ color: 'var(--color-ink-mute)' }}
                >
                  Publicado
                </dt>
                <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatDate(listing.publishedAt)}
                </dd>
              </div>
              <div>
                <dt
                  className="uppercase text-[11px] tracking-widest"
                  style={{ color: 'var(--color-ink-mute)' }}
                >
                  Última actualización
                </dt>
                <dd className="mono" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatDate(listing.updatedAt)}
                </dd>
              </div>
              <div>
                <dt
                  className="uppercase text-[11px] tracking-widest"
                  style={{ color: 'var(--color-ink-mute)' }}
                >
                  Asesor
                </dt>
                <dd style={{ fontFamily: 'var(--font-body)' }}>
                  {agent?.name ?? '—'}
                </dd>
              </div>
              <div>
                <dt
                  className="uppercase text-[11px] tracking-widest"
                  style={{ color: 'var(--color-ink-mute)' }}
                >
                  Referencia
                </dt>
                <dd
                  className="mono"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  #{listing.id}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
