# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 3B is complete. Phase 3 (3A + 3B) is done.**

Phase 3B delivered era-sensitive SVG territory overlays: dragging the chronology cursor
into any era now crossfades the political territory fills — Northern Reach brightens in the
Age of Founding, Free Coast rises in Post-Collapse, all three balance in the Long Wars.
Pure CSS + 12 lines of JS. No new library, no parser change.

Recommended next steps (choose one):

> **Option A — Vault→VS Code marker link:**
> Clicking a place marker on the map opens its `vault/*.md` in VS Code via the
> `vscode://file/...` URI scheme. No parser changes needed. Engine.js builds the URI
> from `place.id` and opens it with `window.location.href`.

> **Option B — CI auto-parser:**
> Add a GitHub Action that runs `node scripts/vault-to-json.js` on every push to main
> that touches `vault/**`, then commits the updated `web/data/generated/*.json`. Vault
> edits auto-deploy to GitHub Pages without a manual parser run.

> **Option C — Phase 4 start (Story↔Map feedback loop):**
> Writing a Story entry with `mapRefs` automatically creates a map marker. Requires
> defining a "story marker" shape in engine.js and reading `linkedPlaces` from stories.json.

---

## Phase 3 Options

- [x] **3A — Draggable chronology cursor** ✅ complete
- [x] **3B — Era-sensitive SVG territory fills** ✅ complete
- [ ] **3B — Vault→VS Code marker link** (clicking a marker opens vault `.md` in VS Code via URI scheme)
- [ ] **3B — CI auto-parser** (GitHub Action: run `vault-to-json.js` on vault push, commit generated JSON)

---

## Backlog (Phase 4+)

- [ ] Vault→VS Code link from map markers — Phase 3B option
- [ ] GitHub Action: auto-run `vault-to-json.js` on push — Phase 3B option
- [ ] Fictional calendar/date system definition — needed before precise timeline positioning
- [ ] MapLibre + Azgaar integration — Phase 4 decision (see AD-007)
- [ ] Add Dataview queries to creative vault (now has real entries)
- [ ] Story↔Map feedback loop — Phase 4 goal

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Fictional calendar system | Phase 4 timeline | Design before scrubbing |
| MapLibre at Phase 4 or later | Phase 4 start | AD-007 says Phase 2; updated to Phase 4 |
| CI parser automation | Phase 3B option | GitHub Action or pre-commit hook |
| Vault→VS Code URI | Phase 3B option | `vscode://file/` scheme, no dependencies |
