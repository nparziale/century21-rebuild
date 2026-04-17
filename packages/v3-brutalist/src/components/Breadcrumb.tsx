import { Link } from 'react-router-dom';
import type { Listing } from '@c21/shared';

type Props = { listing: Listing };

export function Breadcrumb({ listing }: Props) {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Venta', href: '/?op=venta' },
    { label: listing.address.province, href: `/?op=venta&ubicacion=bsas-prov` },
    { label: listing.address.neighborhood, href: `/?op=venta&ubicacion=gba-oeste` },
    { label: `Ref. ${listing.id}`, href: `/propiedad/${listing.id}` },
  ];

  return (
    <nav
      data-section="breadcrumb"
      aria-label="breadcrumb"
      className="border-b border-black"
    >
      <div className="mx-auto max-w-[1920px] px-4 md:px-6 xl:px-10 h-11 flex items-center gap-3 overflow-x-auto">
        <ol className="flex items-center gap-3 min-w-max text-[11px] uppercase tracking-widest">
          {items.map((it, i) => (
            <li key={`${it.href}-${it.label}`} className="flex items-center gap-3">
              {i === items.length - 1 ? (
                <span
                  className="mono"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-ink-mute)',
                  }}
                  aria-current="page"
                >
                  {it.label}
                </span>
              ) : (
                <Link
                  to={it.href}
                  className="hover:underline underline-offset-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {it.label}
                </Link>
              )}
              {i < items.length - 1 && (
                <span aria-hidden="true" style={{ color: 'var(--color-ink-mute)' }}>
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
        <span className="ml-auto mono text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          # {listing.id}
        </span>
      </div>
    </nav>
  );
}
