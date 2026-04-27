# Next Actions

*Updated 2026-04-27 after Phase 4 complete closure.*  
Keep this file current. The single most important action is always listed first.

---

## 1. Immediate Next Action

### [CONTENT] Write body text for remaining draft stories

Phase 4F promoted 17 entries. Four stories remain draft because their body text is a placeholder (`[Story content begins here]`). These are otherwise complete in frontmatter.

**Stories to write:**
- `story-merchant-roads` — Mira Solhand carries undiplomated messages through the Long Wars
- `story-the-first-winter` — Aran Voss inherits the Siege of Vareth on day three of his rule
- `story-the-last-road` — Post-Collapse merchant routes, Mira Solhand returns
- `story-the-silence-after` — the first outsider at Ashveil after the burning

Write at minimum a `## Structure` section (like the promoted stories have) and a closing `## Notes` section. Then promote to canon.

No code change. CI validates and publishes automatically.

---

## 3. Deferred Actions

These are valid future phases but should not start until the immediate items above are done.

| Phase | Description | Why deferred |
|---|---|---|
| Phase 4G | Story path layer (data-driven SVG paths from linkedPlaces) | Currently 1 hardcoded path in index.html; acceptable until more stories canon |
| Phase 5A | Chronology depth — era dates, in-world calendar, event count per era | Calendar design is a worldbuilding decision that precedes implementation |
| Phase 5B | Data-driven era map overlays (replace CSS-hardcoded territory rules) | Needs era metadata design (5A) first |

---

## 4. Do Not Start Yet

| Item | Reason |
|---|---|
| Phase 6 — MapLibre + Azgaar | Major infrastructure change; hand-crafted SVG is fine until 20+ places exist; see AD-007 |
| Backend / API server | Not needed; GitHub Pages is sufficient |
| Database | Vault Markdown is the data store |
| npm dependencies in `scripts/` | Prohibited by AD-010 until a broader toolchain decision is made |
| React / Next.js / SvelteKit | No framework. Vanilla JS is sufficient and keeps GitHub Pages compatible |
| Prisma / ORM | No database means no ORM |
| Breaking changes to data contract | Do not add new required fields to vault templates without a migration plan |

---

## 5. Manual Verification Checklist

Run this before treating any phase as complete:

- [ ] `node scripts/validate-vault.js` exits 0
- [ ] `node scripts/vault-to-json.js` runs without `[skip]` warnings for active (non-retired) entries
- [ ] All 16 place markers visible on the map at `https://alyasska.github.io/World_Engine/`
- [ ] Chronology cursor draggable; all three era zones functional
- [ ] Era-aware marker emphasis and political overlays working for Age of Founding and Long Wars
- [ ] Post-Collapse: markers return to neutral (or glow once 4C content exists)
- [ ] Clicking a place marker opens detail panel with description, linked entities
- [ ] Clicking an event in detail panel opens event detail
- [ ] Layer toggles (Geography / Political / Narrative / Chronology) all functional
- [ ] `?author=1` shows VS Code links; normal URL shows none
- [ ] GitHub Actions: `Parse Vault Data` runs after vault push; `Deploy to GitHub Pages` follows

---

## 6. Branch Naming Plan

| Phase | Branch name | Status |
|---|---|---|
| 4C (content) | `phase-4c-post-collapse-content` | ✅ merged |
| 4D (char/story panels) | `phase-4d-character-story-panels` | ✅ merged |
| 4E (empty era feedback) | `phase-4e-empty-era-state` | ✅ merged |
| 4F (content promotion) | `phase-4f-content-promotion` | ✅ merged |
| 4G (story path layer) | `phase-4g-story-path-layer` | 🔲 not started |
| 5A (chronology depth) | `phase-5a-chronology-depth` | 🔲 not started |
| 5B (data-driven overlays) | `phase-5b-data-driven-overlays` | 🔲 not started |
| 6 (MapLibre) | `phase-6-maplibre-azgaar` | 🔲 not started |

---

## CI Workflow Reference

| File | `.github/workflows/parse-vault.yml` |
|---|---|
| Trigger | Push to `main` touching `vault/**`, `scripts/vault-to-json.js`, or `scripts/validate-vault.js`; also `workflow_dispatch` |
| Step 1 | `node scripts/validate-vault.js` — blocks on schema/cross-ref error |
| Step 2 | `node scripts/vault-to-json.js` — only runs if validation passes |
| Step 3 | Commits `web/data/generated/` back to `main` only if JSON changed |
| Bot identity | `github-actions[bot]` |
| Required setting | Settings → Actions → General → Workflow permissions → Read and write |
