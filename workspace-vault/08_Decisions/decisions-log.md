---
type: decisions-log
title: Decisions Log
updated: 2026-04-24
---

# Decisions Log

Companion to [docs/ARCHITECTURE_DECISIONS.md](../../docs/ARCHITECTURE_DECISIONS.md). This version is for Obsidian navigation with context and linked phases.

---

## Phase 1 Map Library Decision
**Date:** 2026-04-24  
**Question:** Use MapLibre GL JS for Phase 1 interactive map, or vanilla JS?

**Decision:** Vanilla JS + custom SVG for Phase 1. MapLibre deferred to Phase 2.

**Why:**
- Phase 1 goal is to prove the interaction model (pan/zoom, click, panel, layers, chrono)
- MapLibre requires GeoJSON/tile data and a bundler (Vite) — adds complexity before we know what we need
- A proven interaction model in vanilla JS is a better foundation for choosing the right map engine later
- If the model doesn't work, we haven't invested in MapLibre integration
- If the model works perfectly, we can port it to MapLibre cleanly

**Trade-off:** The SVG world is hand-crafted, not procedurally generated. Phase 2 will replace it with Azgaar-exported data + MapLibre rendering.

**Linked:** [[../01_Phases/phase-1-interactive-visual-prototype]], [[../05_Open_Source_Research/overview]]

---

## Two-Vault Architecture Decision
**Date:** 2026-04-24  
**Question:** Should the project management notes live in `vault/` with the lore, or separately?

**Decision:** Separate vault — `workspace-vault/` for project building, `vault/` for creative worldbuilding.

**Why:**
- Obsidian's graph view becomes cluttered if lore and dev notes are mixed
- The agent handoff note should never appear in the creative world graph
- Different mental contexts: building the software vs writing the world
- Independent git-diff histories: lore changes don't pollute dev changes

**Trade-off:** Two Obsidian windows to open instead of one. Mitigated by documenting this clearly in the README of each vault.

---

## Static JSON for Phase 1 Data
**Date:** 2026-04-24  
**Question:** Should Phase 1 data come from parsed Markdown, a database, or hand-authored JSON?

**Decision:** Hand-authored static JSON files in `web/data/`.

**Why:**
- No backend, no parser needed
- JSON shape mirrors vault YAML frontmatter (same field names)
- Phase 2 will write a script to auto-generate these from `vault/*.md`
- Allows verifying the correct shape before building the parser

**Constraint:** The JSON files are manually maintained in Phase 1. Do not let them diverge from the vault content shape.
