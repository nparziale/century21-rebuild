import type { Listing } from '@c21/shared';
import { FolioRule } from './FolioRule.tsx';
import { Counter } from './Counter.tsx';
import { formatMoney } from '../lib/format.ts';

type Props = { listing: Listing };

export function PriceBlock({ listing }: Props) {
  return (
    <section data-section="price">
      <FolioRule sectionNumber={3} total={11} label="PRECIO" />
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 py-8">
        <dl className="grid grid-cols-1 md:grid-cols-3 border border-black">
          <div className="p-5 border-b md:border-b-0 md:border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Precio USD
            </dt>
            <dd>
              <Counter
                as="div"
                value={listing.price.amount}
                kind="currencyUsd"
                className="text-3xl xl:text-4xl"
              />
            </dd>
          </div>
          <div className="p-5 border-b md:border-b-0 md:border-r border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Expensas
            </dt>
            <dd
              className="mono text-xl xl:text-2xl mt-1"
              style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}
            >
              {listing.expensas && listing.expensas.amount > 0
                ? formatMoney(listing.expensas)
                : 'Sin expensas'}
            </dd>
          </div>
          <div className="p-5 border-black">
            <dt
              className="uppercase text-[11px] tracking-widest"
              style={{ color: 'var(--color-ink-mute)' }}
            >
              Operación
            </dt>
            <dd
              className="uppercase text-xl xl:text-2xl mt-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {listing.operation === 'venta' ? 'Venta directa' : 'Alquiler'}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
