# Hosting Strategy

## Phase 0 — GitHub Pages (Static HTML)

**Target:** `web/index.html` served at `https://alyasska.github.io/World_Engine/`  
**Method:** GitHub Actions workflow deploys the `web/` folder to GitHub Pages on every push to `main`.  
**Requirements:**
1. In GitHub repo → Settings → Pages → set Source to **GitHub Actions**
2. The workflow at `.github/workflows/deploy-pages.yml` handles the rest automatically
3. No build step required — `web/` is already static HTML/CSS

**Verify deployment:** After first push and Actions run, visit `https://alyasska.github.io/World_Engine/`

---

## Phase 1 — GitHub Pages (Vite Build)

When an interactive map (MapLibre) is added, the `web/` folder will become a Vite project.

**Change required:**
- Update `.github/workflows/deploy-pages.yml` to add `npm ci && npm run build` before the deploy step
- Deploy `web/dist/` instead of `web/` directly
- Document this change in `docs/ARCHITECTURE_DECISIONS.md`

---

## Phase 2+ — Potential Hosting Options

If a backend becomes necessary (Phase 2+), options in order of preference:

| Option | Pros | Cons | Notes |
|---|---|---|---|
| **Vercel** | Zero-config, free tier, edge functions | Vendor lock-in | Best for Next.js if we go that route |
| **Railway** | Simple Docker deploy, free tier | Less edge coverage | Good for a small Node/Python backend |
| **Fly.io** | Real VMs, free tier, global | More setup | Good if we need persistent storage |
| **Self-hosted VPS** | Full control | Maintenance burden | Only if cost/privacy is critical |
| **Cloudflare Pages + Workers** | Edge, generous free tier | Workers quirks | Good alternative to Vercel |

**Decision Rule:** Do not commit to a backend hosting provider until Phase 2 scope is defined. Document the choice in `docs/ARCHITECTURE_DECISIONS.md` when it's made.

---

## Data / Storage Strategy (Future)

| Data Type | Phase 0–1 | Phase 2+ |
|---|---|---|
| World map data | Static JSON/GeoJSON files in `web/` | Same, possibly streamed from CDN |
| Lore / Stories | Markdown files in `vault/` | Parsed at build time into searchable index |
| User sessions | None (no auth) | Phase 3+ decision |
| Map tiles | None (static GeoJSON) | MapLibre tile server or PMTiles file |

---

## Cost Target
- Phase 0–1: **$0/month** (GitHub Pages is free for public repos)
- Phase 2: **$0–5/month** (free tiers on Vercel/Railway/Fly)
- Phase 3+: Evaluate based on actual usage

---

## Custom Domain (Optional)
If a custom domain is desired:
1. Buy domain (e.g., `worldengine.dev`)
2. Add CNAME record pointing to `alyasska.github.io`
3. Configure in GitHub repo → Settings → Pages → Custom domain
4. Enable "Enforce HTTPS"
