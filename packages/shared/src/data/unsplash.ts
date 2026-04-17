/**
 * Compose an Unsplash image URL from a photo ID + target width.
 *
 * Uses Unsplash's on-the-fly image pipeline (fm=webp, auto=format, q=80) so
 * bytes stay small out of the box. Every call takes a stable photo ID — no
 * random "?random=1" URLs that drift between requests.
 *
 * When local generated assets arrive (nanobanana / Seedance), swap listings
 * to local paths and add vite-imagetools for AVIF/WebP at build time.
 */
export function unsplashUrl(photoId: string, width: number): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&q=80&fm=webp`;
}

/** Generate a <picture>-friendly srcset at the 5 design widths. */
export function unsplashSrcSet(photoId: string): string {
  return [360, 768, 1280, 1920, 2400]
    .map((w) => `${unsplashUrl(photoId, w)} ${w}w`)
    .join(', ');
}

/**
 * Tiny base64 blurred placeholder for CSS background-image zero-CLS paint.
 * This is a uniform warm-gray LQIP; for true per-image LQIP we'd generate one
 * at build time. Good enough for placeholders.
 */
export const LQIP_NEUTRAL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">' +
      '<filter id="b" color-interpolation-filters="sRGB">' +
      '<feGaussianBlur stdDeviation="2"/></filter>' +
      '<rect width="20" height="20" fill="#c9bda8"/>' +
      '</svg>',
  );
