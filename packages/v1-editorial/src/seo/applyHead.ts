import type { HeadSnapshot } from './routeHead.ts';

const MARK = 'data-c21-seo';

function clearManagedHead(): void {
  document.head.querySelectorAll(`[${MARK}]`).forEach((el) => el.remove());
}

function upsertMetaName(name: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${CSS.escape(name)}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  el.setAttribute(MARK, '1');
}

function upsertLinkCanonical(href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  el.setAttribute(MARK, '1');
}

function appendMetaProperty(property: string, content: string): void {
  const el = document.createElement('meta');
  el.setAttribute('property', property);
  el.setAttribute('content', content);
  el.setAttribute(MARK, '1');
  document.head.appendChild(el);
}

function appendMetaName(name: string, content: string): void {
  const el = document.createElement('meta');
  el.setAttribute('name', name);
  el.setAttribute('content', content);
  el.setAttribute(MARK, '1');
  document.head.appendChild(el);
}

function appendJsonLd(json: string): void {
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.setAttribute(MARK, '1');
  el.textContent = json;
  document.head.appendChild(el);
}

export function applyHeadSnapshot(snap: HeadSnapshot): void {
  clearManagedHead();

  document.title = snap.title;
  upsertMetaName('description', snap.description);
  upsertLinkCanonical(snap.canonical);

  for (const [property, content] of Object.entries(snap.og)) {
    appendMetaProperty(property, content);
  }

  for (const [name, content] of Object.entries(snap.twitter)) {
    appendMetaName(name, content);
  }

  for (const json of snap.jsonLd) {
    appendJsonLd(json);
  }
}
