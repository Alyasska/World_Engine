---
type: phase-note
phase: 1
title: Phase 1 — Interactive Visual Prototype
status: complete
started: 2026-04-24
completed: 2026-04-24
branch: phase-1-interactive-visual-prototype
---

# Phase 1 — Interactive Visual Prototype

**Status:** ✅ Complete  
**Branch:** `phase-1-interactive-visual-prototype`

---

## Goal
Turn the static Phase 0 preview into a working interactive prototype. Prove the interaction model — pan/zoom map, clickable markers, detail panel, layer toggles, chronology bar — using lightweight static files with no external dependencies.

This is still NOT full app development. No backend, no database, no heavy framework.

---

## Acceptance Criteria

- [x] GitHub Pages preview still works
- [x] Map can pan (drag) and zoom (scroll wheel)
- [x] Place markers are clickable
- [x] Detail panel updates from JSON data on marker click
- [x] Related Stories/Characters/Events shown from static JSON
- [x] Bottom chronology bar is visible and shows events
- [x] Layer toggles (Geography, Political, Narrative, Chronology) visibly affect the preview
- [x] project-building Obsidian workspace (this vault) exists separately from creative vault
- [x] Existing Markdown planning/progress files are updated (not ignored)
- [x] No backend/database/framework introduced

---

## What Is Real vs Mocked

| Feature | Status | Notes |
|---|---|---|
| Pan / zoom | ✅ Real | Vanilla JS, CSS transform |
| Place markers | ✅ Real | Rendered from places.json |
| Detail panel content | ✅ Real | Loaded from JSON |
| Related entities | ✅ Real | Cross-referenced from JSON |
| Layer toggles | ✅ Real | Visibly show/hide SVG groups |
| Chronology bar | ✅ Real | Events from events.json |
| World geography | ⚙️ Hand-crafted SVG | Not procedurally generated |
| Political borders | ⚙️ Approximate | Rough territory fills |
| Obsidian → JSON pipeline | 🔲 Mocked | JSON files are hand-authored; scripts come in Phase 2 |
| MapLibre / Azgaar | 🔲 Not yet | Documented as future; Phase 2 decision |

---

## Architecture Choice: No External Map Library (Yet)
Documented in [[04_Architecture/overview]] and in `docs/ARCHITECTURE_DECISIONS.md` as AD-007.

The correct Phase 1 approach: prove the interaction model with vanilla JS + static SVG + static JSON. Only bring in MapLibre when the interaction model is confirmed working and we need real geographic tiles/data.

---

## Two-Vault Structure Introduced
- `vault/` = creative world-writing vault (Stories, Characters, Places, etc.)
- `workspace-vault/` = this vault = project-building workspace

See [[04_Architecture/overview#Two Vault Architecture]].

---

## Files Created / Changed
- `workspace-vault/` (new — entire project vault)
- `web/data/places.json` (new)
- `web/data/characters.json` (new)
- `web/data/events.json` (new)
- `web/data/stories.json` (new)
- `web/engine.js` (new — ~450 lines interactive engine)
- `web/index.html` (rewritten — Phase 1 layout + SVG world)
- `web/style.css` (extended — interactions, panel, chrono)
- `docs/ARCHITECTURE_DECISIONS.md` (added AD-007, AD-008)
- `docs/OBSIDIAN_VSCODE_WORKFLOW.md` (added two-vault section)
- `CLAUDE.md`, `AGENTS.md` (updated)
- `tracking/` files (updated)

---

## Next Phase
→ [[01_Phases/phase-2-vault-map-link]] (to be created)

Phase 2 goals:
- Script to parse vault/ Markdown frontmatter → web/data/ JSON
- Click map location → opens linked vault Markdown entry
- Real MapLibre integration decision
