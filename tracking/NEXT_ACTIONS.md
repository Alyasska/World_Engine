# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 2 is complete. Start Phase 3 — Chronology Scrubbing.**

The full vault→map pipeline works. All entries are vault-authored, the engine loads
generated JSON, and GitHub Pages shows the Phase 2 data-flow attribution.

Recommended next prompt:

> "Start Phase 3 on branch `phase-3-chronology-scrub`. Goal: make the chronology
> bar draggable so the user can scrub through time. When the cursor is in the Age
> of Founding, show only Age of Founding events and dim others. When in the Long
> Wars, show Long Wars events. Phase 3A focus: (1) draggable cursor on the
> chronology bar, (2) event dots dim/brighten based on selected era, (3) visible
> era label updates as you drag. No MapLibre yet — stay SVG. Evaluate vis-timeline
> (MIT licensed) as an option but document the decision in AD-012 before adding it."

---

## Phase 3 Options

- [ ] **3A — Draggable chronology scrub bar** (drag cursor, era-sensitive event dimming) — recommended first
- [ ] **3B — Era-sensitive territory fills** (SVG political layers shift when era changes)
- [ ] **3B — Vault→VS Code marker link** (clicking a marker opens vault `.md` in VS Code via URI)
- [ ] **3B — CI auto-parser** (GitHub Action runs parser on vault push, commits generated JSON)

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
