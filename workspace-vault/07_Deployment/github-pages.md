---
type: deployment-note
title: GitHub Pages Deployment
updated: 2026-04-24
---

# GitHub Pages Deployment

## Live URL
`https://alyasska.github.io/World_Engine/`

## How It Works
1. Push to `main` triggers `.github/workflows/deploy-pages.yml`
2. Workflow uploads the `web/` folder as a GitHub Pages artifact
3. Pages deploys it under `/World_Engine/` subdirectory
4. No build step in Phase 0-1 (static files only)

## Manual Setup Required (first time)
In GitHub repo → **Settings → Pages → Source → GitHub Actions**  
Without this, the workflow runs but nothing is served.

## Path Notes
- The repo is served at `/World_Engine/` (subdirectory, not root)
- All relative paths in `web/index.html` work correctly: `./style.css`, `./engine.js`, `./data/places.json`
- **Do not use absolute paths like `/style.css`** — they'd resolve to root of github.io, not `/World_Engine/`

## Local Development
GitHub Pages requires a server context for `fetch()` calls.  
Options:
1. VS Code **Live Server** extension (port 5500) — recommended
2. `python -m http.server 8000` from the `web/` folder
3. `npx serve web/` — quick option without installing anything

Opening `web/index.html` directly via `file://` will fail on the JSON fetch calls.

## Phase 1→2 Change Needed
When Phase 2 introduces a Vite build:
1. Update the workflow to add `npm ci && npm run build`
2. Change artifact path from `web/` to `web/dist/`
3. Document in [docs/ARCHITECTURE_DECISIONS.md](../../docs/ARCHITECTURE_DECISIONS.md)
