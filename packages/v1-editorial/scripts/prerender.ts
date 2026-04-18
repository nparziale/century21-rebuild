/**
 * Post-build: inject SEO into dist/index.html and dist/propiedad/286194/index.html,
 * plus robots.txt and sitemap.xml. Run only after `vite build`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeHeadSnapshot } from '../src/seo/routeHead.ts';
import { headSnapshotToHtml } from '../src/seo/renderHeadHtml.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');
const INJECT = '<!-- c21-seo-inject -->';

function canonicalBaseForPrerender(): string {
  const env = process.env.VITE_CANONICAL_BASE_URL?.replace(/\/$/, '');
  return env ?? 'http://127.0.0.1:5173';
}

function rewriteAssetPaths(html: string, depth: number): string {
  if (depth === 0) return html;
  const prefix = '../'.repeat(depth);
  return html.replaceAll('./assets/', `${prefix}assets/`);
}

async function main(): Promise<void> {
  const base = canonicalBaseForPrerender();
  const indexPath = resolve(DIST, 'index.html');
  const rawTemplate = await readFile(indexPath, 'utf8');

  if (!rawTemplate.includes(INJECT)) {
    console.warn('prerender: missing <!-- c21-seo-inject --> in dist/index.html — skip SEO injection');
    return;
  }

  const homeSnap = computeHeadSnapshot('/', base);
  const listingSnap = computeHeadSnapshot('/propiedad/286194', base);

  const homeHead = headSnapshotToHtml(homeSnap);
  await writeFile(indexPath, rawTemplate.replace(INJECT, homeHead), 'utf8');
  console.log('prerender: wrote home SEO → dist/index.html');

  const listingDir = resolve(DIST, 'propiedad/286194');
  await mkdir(listingDir, { recursive: true });
  const listingHtml = rewriteAssetPaths(rawTemplate.replace(INJECT, headSnapshotToHtml(listingSnap)), 2);
  await writeFile(resolve(listingDir, 'index.html'), listingHtml, 'utf8');
  console.log('prerender: wrote listing SEO → dist/propiedad/286194/index.html');

  const origin = base;
  const robots = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');
  await writeFile(resolve(DIST, 'robots.txt'), robots, 'utf8');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${origin}/</loc><changefreq>weekly</changefreq></url>
  <url><loc>${origin}/propiedad/286194</loc><changefreq>weekly</changefreq></url>
</urlset>
`;
  await writeFile(resolve(DIST, 'sitemap.xml'), sitemap, 'utf8');
  console.log('prerender: wrote robots.txt + sitemap.xml');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
