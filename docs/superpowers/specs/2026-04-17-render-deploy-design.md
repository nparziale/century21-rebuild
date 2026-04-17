# Render static-site deploy — design

Deploy the composed showcase (`dist-showcase/`) to the existing Render static
site `century21-rebuild` so the side-by-side explainer and all three design
versions are reachable under one `*.onrender.com` hostname.

## Context

The repo already produces a deployable tree:

- `pnpm build` builds `packages/v{1,2,3}-*/dist/` (three Vite React apps).
- `pnpm build:showcase` (see `scripts/build-showcase.mjs`) composes
  `dist-showcase/` with `index.html` (from `showcase.html` with links
  rewritten), `showcase.css`, `showcase-assets/`, and `v1/`, `v2/`, `v3/`
  subdirectories — one full copy of each app's `dist/`.
- Every app's `vite.config.ts` sets `base: './'`, so assets resolve correctly
  from subpaths.
- The three apps use hash routing (e.g. `./v1/index.html#/propiedad/286194`),
  so no SPA rewrite rules are needed — deep links never hit the server.

A Render static site named `century21-rebuild` already exists in the user's
workspace and is the deploy target.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Config location | `render.yaml` blueprint at repo root | PR-reviewable, reproducible; Render syncs to existing service |
| Deploy target | Existing `century21-rebuild` static site | Already wired in user's Render workspace |
| Tracked branch | `main` | Auto-deploys on merge |
| Hostname | Default `*.onrender.com` | No custom domain requested |
| Package manager | pnpm 10.33 via `corepack enable` | Matches `packageManager` field in root `package.json` |
| Node version | 20 | Matches repo `engines.node` |
| SPA rewrite | None | Hash routing makes it unnecessary |
| Pull-request previews | Off (default) | Keep it simple; can be toggled later in the dashboard |

## Build and publish

- **Build command:**
  `corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm build:showcase`
- **Publish directory:** `dist-showcase`
- **Environment:** Node 20 (declared via `NODE_VERSION=20` env var in
  `render.yaml`)

## Headers

Cache-control rules plus two standard security headers. Paths are enumerated
explicitly rather than using nested globs, because Render's header
path-matching historically only reliably handles a single trailing `*`.

| Path pattern | Header | Value |
|---|---|---|
| `/v1/assets/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/v2/assets/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/v3/assets/*` | `Cache-Control` | `public, max-age=31536000, immutable` |
| `/index.html` | `Cache-Control` | `no-cache` |
| `/v1/index.html` | `Cache-Control` | `no-cache` |
| `/v2/index.html` | `Cache-Control` | `no-cache` |
| `/v3/index.html` | `Cache-Control` | `no-cache` |
| `/*` | `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `/*` | `X-Content-Type-Options` | `nosniff` |

The long-cache rules target Vite's hashed asset filenames
(`assets/<name>-<hash>.{js,css,...}`); these are safe to cache forever because
the filename changes when the content changes. The no-cache rule on HTML
entrypoints ensures new deploys are reflected on next page load.

## Files changed

1. **New file:** `render.yaml` at repo root. Single `services:` entry of
   `type: web`, `env: static`, with the build command, publish directory,
   env vars, and headers above.
2. **Optional: `README.md` update.** Add a short "Deploy" section pointing at
   `render.yaml` and the `*.onrender.com` URL (URL filled in after first
   deploy).

No changes to app code, Vite configs, or existing scripts.

## Wiring to the existing Render service

After the `render.yaml` lands on `main`:

1. In Render dashboard → `century21-rebuild` service → **Settings** →
   **Blueprint** → "Sync from repo" (or the equivalent current UI, which may
   be worded "Update from render.yaml").
2. Render reads `render.yaml`, applies build command / publish dir / headers
   / env vars to the existing service in place.
3. Trigger a manual deploy (or push any commit to `main`) to exercise the
   pipeline end-to-end.

No new service is created; the existing one is reconfigured.

## Verification (post-first-deploy)

On the `*.onrender.com` URL:

1. Showcase `index.html` renders (hero, phone frames, three "View V#" cards).
2. Each "View V1 / V2 / V3" link loads the corresponding app shell.
3. Hash deep-link works on each version:
   `…/v1/index.html#/propiedad/286194`,
   `…/v2/index.html#/propiedad/286194`,
   `…/v3/index.html#/propiedad/286194`.
4. No console 404s for assets (`/v*/assets/*`) or brand logos
   (`/v*/brand/*`).
5. Response headers on a hashed asset show the `immutable` cache directive;
   response headers on `index.html` show `no-cache`.

## Out of scope

- Custom domain and TLS (default hostname only).
- Preview environments for pull requests.
- CDN / edge rules beyond what Render's static sites provide by default.
- CI-side verification (the `packages/verify/` Playwright harness) running
  against the deployed URL — worth considering later but not part of this
  change.
- Render `autoDeploy: false` or branch filters — auto-deploy on every push
  to `main` is the intended behavior.

## Rollback

Render keeps prior deploys. If a bad build ships:

- Dashboard → **Deploys** → select a previous successful deploy →
  **Rollback**. Instant revert; no git action required.
- Or revert the offending commit on `main` and let the next deploy overwrite.
