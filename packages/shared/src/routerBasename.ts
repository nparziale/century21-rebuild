/**
 * When a build is served under `/v1`, `/v2`, or `/v3` (composed showcase),
 * React Router must use that path segment as `basename`. Local dev servers
 * mount at `/`, so basename stays empty.
 */
export function reactRouterBasename(): string {
  if (typeof window === 'undefined') return '';
  const m = window.location.pathname.match(/^\/(v[123])(?:\/|$)/);
  return m ? `/${m[1]}` : '';
}
