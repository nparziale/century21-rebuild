# Render Static-Site Deploy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the composed showcase tree (`dist-showcase/`) — one explainer `index.html` plus three Vite apps under `v1/`, `v2/`, `v3/` — to the existing `century21-rebuild` Render static site via a checked-in `render.yaml` blueprint that auto-deploys from `main`.

**Architecture:** One new file at the repo root (`render.yaml`). Render's Static Site service runs the existing `pnpm build && pnpm build:showcase` pipeline and publishes `dist-showcase/`. No SPA rewrites are needed because all three apps use hash routing. Long-cache headers target Vite's hashed asset filenames; HTML entrypoints are `no-cache`.

**Tech Stack:** Render Static Sites, `render.yaml` blueprint schema v1, pnpm 10.33 via corepack, Node 20, existing Vite build pipeline (`scripts/build-showcase.mjs`).

**Spec:** `docs/superpowers/specs/2026-04-17-render-deploy-design.md`

---

## File Structure

| Path | Change | Responsibility |
|---|---|---|
| `render.yaml` | **create** | Blueprint: service metadata, build command, publish directory, Node version, headers. |
| `README.md` | **modify** (optional) | Add a short "Deploy" section linking the `*.onrender.com` URL after first deploy. |

No app-code, Vite-config, or script changes. The existing `scripts/build-showcase.mjs` is already shaped exactly for a single-hostname deploy.

---

## Task 1: Verify the build pipeline locally end-to-end

Before committing any config that tells Render how to build, run the exact command Render will run and confirm the output tree is what we expect. This is our "test" — if it fails locally, it will fail on Render.

**Files:**
- Inspect (no write): `dist-showcase/`

- [ ] **Step 1: Clean any prior build output**

Run:
```bash
rm -rf dist-showcase packages/v1-editorial/dist packages/v2-kinetic/dist packages/v3-brutalist/dist
```

Expected: no errors (silent on success).

- [ ] **Step 2: Run the exact build command Render will run**

Run:
```bash
corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm build:showcase
```

Expected output (tail):
- `✓ v1 → dist-showcase/v1/`
- `✓ v2 → dist-showcase/v2/`
- `✓ v3 → dist-showcase/v3/`
- `✓ showcase.html + showcase.css + showcase-assets → dist-showcase/`
- `Showcase ready at /Users/nparziale/repos/century21-test/dist-showcase`

Exit code 0. If it fails, stop and debug — do NOT continue to writing `render.yaml`.

- [ ] **Step 3: Confirm the output tree**

Run:
```bash
ls dist-showcase && echo "---" && ls dist-showcase/v1 | head -5 && ls dist-showcase/v2 | head -5 && ls dist-showcase/v3 | head -5
```

Expected `ls dist-showcase`:
```
index.html
showcase-assets
showcase.css
v1
v2
v3
```

Each of `v1/`, `v2/`, `v3/` should contain at minimum `index.html` and `assets/`.

- [ ] **Step 4: Smoke-serve locally and eyeball the showcase**

Run:
```bash
pnpm preview:showcase
```

In a browser, open the URL printed in the terminal (typically `http://localhost:4173` or similar). Confirm:
1. Showcase `index.html` renders (hero, three version cards).
2. Click each "View V1 / V2 / V3" link — the corresponding app loads.
3. Navigate to a listing deep-link on each version (hash URL like `#/propiedad/286194`). Page renders without a console error.

Stop the preview server (Ctrl-C).

- [ ] **Step 5: No commit yet**

Task 1 produces no files to commit. `dist-showcase/` is gitignored (already covered in `.gitignore`). We're only validating that the build pipeline works before we write the YAML that depends on it.

---

## Task 2: Write `render.yaml`

Create the blueprint at the repo root. Uses Render's current schema (`runtime: static`). Headers are enumerated (no nested globs) per the spec.

**Files:**
- Create: `render.yaml`

- [ ] **Step 1: Write the blueprint**

Create `render.yaml` at the repo root with exactly this content:

```yaml
services:
  - type: web
    name: century21-rebuild
    runtime: static
    branch: main
    buildCommand: corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm build:showcase
    staticPublishPath: dist-showcase
    pullRequestPreviewsEnabled: false
    envVars:
      - key: NODE_VERSION
        value: "20"
    headers:
      - path: /v1/assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /v2/assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /v3/assets/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /index.html
        name: Cache-Control
        value: no-cache
      - path: /v1/index.html
        name: Cache-Control
        value: no-cache
      - path: /v2/index.html
        name: Cache-Control
        value: no-cache
      - path: /v3/index.html
        name: Cache-Control
        value: no-cache
      - path: /*
        name: Referrer-Policy
        value: strict-origin-when-cross-origin
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
```

Notes for the engineer:
- `name: century21-rebuild` must match the existing service name in the user's Render workspace — that's how Blueprint Sync binds to it rather than creating a new service.
- `runtime: static` is the current spelling; the older `env: static` is accepted but deprecated.
- `pullRequestPreviewsEnabled: false` is an explicit off; we can flip it later if wanted.

- [ ] **Step 2: Lint the YAML**

Run:
```bash
python3 -c "import yaml, sys; yaml.safe_load(open('render.yaml'))" && echo "YAML OK"
```

Expected: `YAML OK` and exit 0. If `python3` + `yaml` aren't available, fall back to:
```bash
node -e "const fs=require('fs'); try{require('js-yaml')}catch{console.log('no js-yaml; using eval check'); process.exit(0)} const y=require('js-yaml'); y.load(fs.readFileSync('render.yaml','utf8')); console.log('YAML OK')"
```
or just visually inspect (YAML is short).

- [ ] **Step 3: Sanity-check the build command matches Task 1**

Run:
```bash
grep "buildCommand:" render.yaml
```

Expected:
```
    buildCommand: corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm build:showcase
```

Must be byte-identical to the command we verified in Task 1, Step 2. If it's different, fix `render.yaml`.

- [ ] **Step 4: Commit**

```bash
git add render.yaml
git commit -m "build: add render.yaml blueprint for static-site deploy"
```

---

## Task 3: Land the change on `main`

Render's service is configured to auto-deploy from `branch: main`. The current working branch is `feature/century21-rebuild`. Ship the `render.yaml` commit to `main` via the user's standard flow.

**Files:** none (git plumbing only)

- [ ] **Step 1: Push the current branch and open a pull request**

Run (from the repo root):
```bash
git push -u origin feature/century21-rebuild
gh pr create --base main --head feature/century21-rebuild --title "Render static-site deploy blueprint" --body "$(cat <<'EOF'
## Summary
- Adds \`render.yaml\` that publishes \`dist-showcase/\` (showcase + v1/v2/v3) to the existing \`century21-rebuild\` Render service on every push to \`main\`.
- Spec: \`docs/superpowers/specs/2026-04-17-render-deploy-design.md\`

## Test plan
- [ ] Local: \`corepack enable && pnpm install --frozen-lockfile && pnpm build && pnpm build:showcase\` succeeds and \`dist-showcase/{index.html,v1,v2,v3}\` exists
- [ ] After merge + Blueprint Sync: Render deploy succeeds
- [ ] Deployed URL: showcase loads; each of v1/v2/v3 loads; hash deep-link \`#/propiedad/286194\` works on each

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: `gh` prints a PR URL. Share it with the user for review.

**Important:** If the user prefers a different flow (direct push to `main`, squash-merge, etc.), defer to them. The goal is simply: the commit with `render.yaml` reaches `main`.

- [ ] **Step 2: After PR approval, merge to `main`**

This is a user action (or a `gh pr merge` once approved). Do not merge unilaterally.

Wait for confirmation that the change is on `main` before Task 4. Verify with:
```bash
git fetch origin main && git log origin/main --oneline -5 | grep -i "render.yaml\|blueprint" || echo "not on main yet"
```

Expected: at least one line matching the render blueprint commit. If `not on main yet`, wait.

---

## Task 4: Sync the blueprint to the existing Render service

The service `century21-rebuild` already exists in the user's Render workspace. Blueprint Sync tells Render to read `render.yaml` from the repo and apply it to the existing service in place — no new service is created.

**Files:** none (Render dashboard action)

- [ ] **Step 1: Open the service settings**

In a browser:
1. Render dashboard → select workspace → open service `century21-rebuild`.
2. Navigate to **Settings**.

- [ ] **Step 2: Find Blueprint Sync**

Look for a section named **Blueprint**, **Blueprint Sync**, or **Infrastructure as Code** (Render's UI labels this differently across revisions). It should show:
- The repo the service is connected to.
- A "Sync from repo" / "Update from render.yaml" / similar button.

If the service is not already connected to the correct GitHub repo, fix that first (Settings → Build & Deploy → Repository).

- [ ] **Step 3: Trigger the sync**

Click "Sync from repo" (or equivalent). Render reads `render.yaml` from `main` and shows a diff of settings it will apply:
- Build command → the pnpm command in our YAML
- Publish directory → `dist-showcase`
- Branch → `main`
- Env vars → `NODE_VERSION=20`
- Headers → the 9 header rules

Confirm. If the diff shows a setting you do NOT want changed (e.g. it would switch the repo), cancel and investigate.

- [ ] **Step 4: Verify Settings now reflect the blueprint**

On the service's Settings page:
- **Build Command** matches `render.yaml`.
- **Publish Directory** is `dist-showcase`.
- **Branch** is `main`.
- **Environment → NODE_VERSION** is `20`.
- **Headers** lists all 9 rules.

If any field is stale, click "Sync" again.

---

## Task 5: Trigger the first deploy and watch logs

**Files:** none (Render dashboard action)

- [ ] **Step 1: Trigger a manual deploy**

Render may have auto-triggered a deploy when the blueprint synced. If not:
1. In the `century21-rebuild` service → **Manual Deploy** → **Deploy latest commit** (or similar).

- [ ] **Step 2: Watch the build logs**

Open the **Logs** tab (or "Events" → active deploy → "View logs"). Expected milestones:
1. `corepack enable` — silent.
2. `pnpm install` — "Lockfile is up to date" then "Done". Takes 30–90s depending on cache.
3. `pnpm -r --filter='./packages/v*' build` — three Vite builds, each "✓ built in …".
4. `node ./scripts/build-showcase.mjs` — prints `✓ v1 → dist-showcase/v1/` etc.
5. Render: "Uploading build artifacts…" then "Your site is live 🎉" (or current equivalent).

Total time: typically 2–5 min on Render's free/starter static tier.

- [ ] **Step 3: Handle build failure (if any)**

If the build fails, read the log message, fix the root cause in the repo, commit to `main`, and wait for Render's auto-deploy. Common pitfalls:
- `pnpm: command not found` → `corepack` not enabled; verify the build command includes `corepack enable &&` exactly.
- Lockfile drift → `pnpm install --frozen-lockfile` failure means `pnpm-lock.yaml` is stale; run `pnpm install` locally, commit the updated lockfile.
- Missing `packages/v*/dist` → the root `pnpm build` script didn't run; verify `pnpm build` works locally.

Do NOT work around failures by weakening the build command (e.g. removing `--frozen-lockfile`). Fix the underlying problem.

- [ ] **Step 4: Capture the deployed URL**

On the service page, find the primary URL (format: `https://century21-rebuild.onrender.com` or similar — Render may prepend/append a token). Save it for Task 6.

---

## Task 6: Post-deploy smoke verification

Exercise the full acceptance checklist from the spec against the live URL. If any step fails, it's a deploy bug — file it, don't ignore it.

**Files:** none (manual verification)

Let `$URL` be the deployed `*.onrender.com` URL from Task 5, Step 4.

- [ ] **Step 1: Showcase index renders**

Open `$URL` in a browser.

Expected: The showcase page loads — hero, three phone-frame cards (V1 / V2 / V3), no console errors (open DevTools → Console, should be clean).

- [ ] **Step 2: Each version's home page loads**

Click the "View V1" link. URL becomes `$URL/v1/index.html` (or similar). Page renders the V1 home.

Back, repeat for V2 and V3. All three must load.

- [ ] **Step 3: Hash deep-links work on each version**

In the address bar, navigate to each of:
- `$URL/v1/index.html#/propiedad/286194`
- `$URL/v2/index.html#/propiedad/286194`
- `$URL/v3/index.html#/propiedad/286194`

Each should render the listing detail page (hero gallery, price, description, similar listings). No 404, no white screen.

- [ ] **Step 4: No asset 404s**

On any of the pages above, open DevTools → Network → filter by "404". Expected: empty. If anything 404s (brand logos under `/v*/brand/`, JS/CSS chunks under `/v*/assets/`, hero video under `/v*/hero/`), the build artifact is missing something — investigate.

- [ ] **Step 5: Cache-control headers are live**

Pick any hashed asset URL from the Network tab (e.g. `$URL/v1/assets/index-abc123.js`). Run:
```bash
curl -sI "$URL/v1/assets/index-abc123.js" | grep -i cache-control
```

Expected:
```
cache-control: public, max-age=31536000, immutable
```

Then check the HTML entrypoint:
```bash
curl -sI "$URL/index.html" | grep -i cache-control
```

Expected:
```
cache-control: no-cache
```

If either is wrong, re-check the `headers:` block in `render.yaml` and re-sync the blueprint (Task 4, Step 3).

- [ ] **Step 6: Security headers are live**

```bash
curl -sI "$URL/" | grep -iE 'referrer-policy|x-content-type-options'
```

Expected:
```
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
```

---

## Task 7 (optional): Document the deploy URL in README

**Files:**
- Modify: `README.md`

Only run this task once Task 6 has passed on a real URL — we don't want to commit a URL that doesn't work yet.

- [ ] **Step 1: Add a "Deploy" section**

Open `README.md` and insert a new section just before the existing "## Verification harness" heading. Use exactly this content (replace `<URL>` with the real hostname):

```markdown
## Deploy

The showcase and all three design versions are deployed as a single static site
on Render.

- **Live URL:** `<URL>` (e.g. `https://century21-rebuild.onrender.com/`)
- **Config:** `render.yaml` (blueprint at repo root)
- **Trigger:** auto-deploys on every push to `main`

The blueprint runs `pnpm build && pnpm build:showcase` and publishes
`dist-showcase/` — which Render then serves from the root, with `v1/`, `v2/`,
and `v3/` as subpaths.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs(readme): document Render deploy URL and blueprint"
```

- [ ] **Step 3: Push + land on main**

Same flow as Task 3 (PR → merge). Render will auto-deploy the README change; no site behavior changes.

---

## Done

The deploy is complete when:

1. `render.yaml` is committed on `main`.
2. The `century21-rebuild` service's Settings reflect the blueprint.
3. The `*.onrender.com` URL passes every step in Task 6.
4. (Optional) The README's Deploy section links to the live URL.

From that point, any push to `main` redeploys the site automatically.
