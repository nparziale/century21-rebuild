import type { HeadSnapshot } from './routeHead.ts';

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Prevent `</script>` breaking out of JSON-LD script tags. */
function safeJsonLdContent(json: string): string {
  return json.replace(/</g, '\\u003c');
}

/** Static HTML fragment for <head> from a snapshot (prerender). */
const MANAGED = 'data-c21-seo="1"';

export function headSnapshotToHtml(snap: HeadSnapshot): string {
  const lines: string[] = [];
  lines.push(`<title>${escapeText(snap.title)}</title>`);
  lines.push(`<meta name="description" content="${escapeAttr(snap.description)}" ${MANAGED} />`);
  lines.push(`<link rel="canonical" href="${escapeAttr(snap.canonical)}" ${MANAGED} />`);

  for (const [property, content] of Object.entries(snap.og)) {
    lines.push(`<meta property="${escapeAttr(property)}" content="${escapeAttr(content)}" ${MANAGED} />`);
  }
  for (const [name, content] of Object.entries(snap.twitter)) {
    lines.push(`<meta name="${escapeAttr(name)}" content="${escapeAttr(content)}" ${MANAGED} />`);
  }
  for (const json of snap.jsonLd) {
    lines.push(`<script type="application/ld+json" ${MANAGED}>${safeJsonLdContent(json)}</script>`);
  }

  return `${lines.join('\n    ')}\n    `;
}
