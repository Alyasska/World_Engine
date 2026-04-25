# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 3E is complete. Phase 3 (3A–3E) is fully done.**

Phase 3E added `?author=1` local authoring links. In public mode nothing changes.
With `?author=1`, place and event detail panels show an "Open in VS Code" link
that opens the corresponding vault `.md` directly in VS Code.

Recommended next steps (choose one):

> **Option A — CI auto-parser (GitHub Action):**
> Add `.github/workflows/parse-vault.yml` that runs `node scripts/vault-to-json.js`
> on every push touching `vault/**`, then commits updated `web/data/generated/*.json`.
> Vault edits auto-deploy to GitHub Pages with no manual parser run.
> This completes the Obsidian → publish loop without any manual steps.

> **Option B — Phase 4 start (Story↔Map feedback loop):**
> Writing a Story entry with `mapRefs` automatically creates a map marker.
> Read `stories.json` in `renderMarkers()`, render story-linked places with a
> distinct "story" shape, open story detail panel on click.

> **Option C — Post-Collapse vault content:**
> Add vault events for the Post-Collapse era. Worldbuilding task, no code change.
> Result: Post-Collapse era produces glowing markers and "now" badges instead of
> the current neutral state.

> **Option D — Fictional calendar system:**
> Define a canonical in-world calendar (year numbering, era epochs, season names).
> Needed before Phase 4 can position story events with precision on the timeline.

---

## Phase 3 Status

- [x] **3A — Draggable chronology cursor** ✅
- [x] **3B — Era-sensitive SVG territory fills** ✅
- [x] **3C — Narrative time filtering (marker emphasis)** ✅
- [x] **3D — Live panel era refresh** ✅
- [x] **3E — Local authoring links (`?author=1`)** ✅

---

## How to use author mode

Add `?author=1` to the local preview URL:

```
http://localhost:5500/?author=1
```

Click any place or event → "Open in VS Code" link appears in the detail header.
The link opens `vault/Places/{slug}.md`, `vault/Events/{slug}.md`, etc. in VS Code.

**This link does not appear on the public GitHub Pages preview.**

---

## Backlog (Phase 4+)

- [ ] CI auto-parser (GitHub Action) — Option A above
- [ ] Story↔Map feedback loop — Phase 4 goal
- [ ] Post-Collapse vault events — worldbuilding, no code change
- [ ] Fictional calendar/date system — needed before precise timeline positioning
- [ ] MapLibre + Azgaar integration — Phase 4 decision (see AD-007)
- [ ] Add Dataview queries to creative vault

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| CI parser automation | Phase 4 | GitHub Action or pre-commit hook |
| Fictional calendar system | Phase 4 | Design before scrubbing |
| MapLibre at Phase 4 or later | Phase 4 | AD-007 updated to Phase 4 |
