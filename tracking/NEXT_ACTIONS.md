# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 3C is complete. Phase 3 (3A + 3B + 3C) is done.**

Phase 3C delivered era-aware marker emphasis: markers tied to era events glow softly;
unmarked ones dim to 28% opacity. The detail panel shows a "now" badge on events that
match the current era. All driven from existing `events.linkedPlaces` JSON — no parser change.

Recommended next steps (choose one):

> **Option A — Live panel era refresh (Phase 3D):**
> When the chronology cursor moves while a detail panel is open, re-render the event
> badges to reflect the new era. Requires calling `showPlaceDetail(state.selectedId)`
> inside `applyEra()` when `state.selectedId` is set. Small change, high UX impact.

> **Option B — Vault→VS Code marker link:**
> Clicking a place marker on the map opens its `vault/*.md` in VS Code via the
> `vscode://file/C:/mirror/мое/world_engine/vault/Places/{id}.md` URI scheme.
> No parser changes needed — engine.js builds the URI from `place.id`.

> **Option C — CI auto-parser:**
> Add a GitHub Action that runs `node scripts/vault-to-json.js` on every push that
> touches `vault/**`, then commits updated `web/data/generated/*.json`. Vault edits
> auto-deploy to GitHub Pages without a manual parser run.

> **Option D — Phase 4 start (Story↔Map feedback loop):**
> Writing a Story entry with `mapRefs` automatically creates a map marker.

---

## Phase 3 Options

- [x] **3A — Draggable chronology cursor** ✅ complete
- [x] **3B — Era-sensitive SVG territory fills** ✅ complete
- [x] **3C — Narrative time filtering (marker emphasis)** ✅ complete
- [ ] **3D — Live panel era refresh** (re-render badges when cursor moves while panel open)
- [ ] **3B/3D — Vault→VS Code marker link** (open vault `.md` from map marker)
- [ ] **3B/3D — CI auto-parser** (GitHub Action: `vault-to-json.js` on vault push)

---

## Known Limitations (Phase 3C)

- Detail panel era badges ("now") are rendered at click time. If the cursor moves to a
  different era after the panel opens, the badges do not update until the panel is
  re-opened. Fix is Option A above (Phase 3D).
- Post-Collapse has no events in the vault yet → all markers go neutral (no dimming, no glow)
  when cursor is in that era. This is correct behavior given the current data.

---

## Backlog (Phase 4+)

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
| CI parser automation | Phase 3B/3D option | GitHub Action or pre-commit hook |
| Vault→VS Code URI | Phase 3B/3D option | `vscode://file/` scheme, no dependencies |
| Live panel era refresh | Phase 3D | Small change, re-render on `applyEra` if panel open |
