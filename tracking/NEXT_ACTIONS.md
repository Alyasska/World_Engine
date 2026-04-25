# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 3A is complete. Start Phase 3B — Era-Sensitive Overlays.**

Phase 3A delivered a draggable chronology cursor with live era detection, dot dimming
(20% opacity outside active era), and glow feedback during drag. No library added.

Recommended next prompt:

> "Start Phase 3B on branch `phase-3b-era-overlays`. Goal: when the user drags the
> chronology cursor into a different era, the SVG political territory fills update
> to reflect the politics of that era. Define era-specific territory data for the
> Age of Founding (only Northern Reach exists, no Compact), Long Wars (current
> default), and Post-Collapse (Free Coast dominant). Store the era-variant data in
> web/data/generated/eras.json or inline in engine.js. On era change, update the
> SVG fill opacity/color for the political layer groups using CSS classes. No
> MapLibre yet. Keep all changes in vanilla JS + SVG."

---

## Phase 3 Options

- [x] **3A — Draggable chronology cursor** ✅ complete
- [ ] **3B — Era-sensitive SVG territory fills** (update political fills as cursor moves through eras)
- [ ] **3B — Vault→VS Code marker link** (clicking a marker opens vault `.md` in VS Code via URI scheme)
- [ ] **3B — CI auto-parser** (GitHub Action: run `vault-to-json.js` on vault push, commit generated JSON)

---

## Backlog (Phase 3+)

- [ ] Draggable chronology scrub — Phase 3A
- [ ] Era-sensitive SVG territory fills — Phase 3B
- [ ] Vault→VS Code link from map markers — Phase 3B
- [ ] GitHub Action: auto-run `vault-to-json.js` on push — Phase 3B
- [ ] Evaluate vis-timeline for scrubbing — Phase 3A decision (see AD-012 when created)
- [ ] Fictional calendar/date system definition — needed before precise Phase 3 positioning
- [ ] MapLibre + Azgaar integration — Phase 4 decision (see AD-007)
- [ ] Add Dataview queries to creative vault (now has real entries)

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| vis-timeline vs custom scrub | Phase 3A start | MIT licensed; check bundle size first |
| Fictional calendar system | Phase 3 timeline | Design before scrubbing |
| MapLibre at Phase 3 or 4 | Phase 4 start | AD-007 says Phase 2; updated to Phase 4 |
| CI parser automation | Phase 3B | GitHub Action or pre-commit hook |
