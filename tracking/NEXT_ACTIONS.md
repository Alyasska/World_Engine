# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 3D is complete. Phase 3 (3A–3D) is fully done.**

Phase 3D added live panel refresh: dragging the cursor while a place detail is open
re-renders the era badges instantly. Five lines of JS — one new state field, three
one-liners in existing functions, one new helper.

Recommended next steps (choose one):

> **Option A — Vault→VS Code marker link:**
> Clicking a place marker opens its `vault/Places/{id}.md` in VS Code via the
> `vscode://file/C:/mirror/мое/world_engine/vault/Places/{id}.md` URI scheme.
> No parser changes. Engine.js builds the URI from `place.id` and adds a small
> "Open in VS Code" link inside `showPlaceDetail`.

> **Option B — CI auto-parser (GitHub Action):**
> Add `.github/workflows/parse-vault.yml` — runs `node scripts/vault-to-json.js`
> on every push that touches `vault/**`, then commits the updated
> `web/data/generated/*.json`. Vault edits auto-deploy to GitHub Pages.

> **Option C — Phase 4 start (Story↔Map feedback loop):**
> Writing a Story entry with `mapRefs` automatically creates a map marker.
> Requires reading `stories.json` in `renderMarkers()` and rendering story-linked
> markers with a distinct shape.

> **Option D — Post-Collapse vault content:**
> Add vault events for the Post-Collapse era so that era produces glowing markers
> instead of the current neutral state. Pure worldbuilding — no code changes.

---

## Phase 3 Status

- [x] **3A — Draggable chronology cursor** ✅
- [x] **3B — Era-sensitive SVG territory fills** ✅
- [x] **3C — Narrative time filtering (marker emphasis)** ✅
- [x] **3D — Live panel era refresh** ✅

---

## Backlog (Phase 4+)

- [ ] Vault→VS Code marker link — Option A above
- [ ] CI auto-parser (GitHub Action) — Option B above
- [ ] Fictional calendar/date system — needed before precise timeline positioning
- [ ] MapLibre + Azgaar integration — Phase 4 decision (see AD-007)
- [ ] Add Dataview queries to creative vault
- [ ] Story↔Map feedback loop — Phase 4 goal
- [ ] Post-Collapse vault events — no code change required

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Fictional calendar system | Phase 4 | Design before scrubbing |
| MapLibre at Phase 4 or later | Phase 4 | AD-007 updated to Phase 4 |
| CI parser automation | Option B | GitHub Action or pre-commit hook |
| Vault→VS Code URI | Option A | `vscode://file/` scheme, no dependencies |
