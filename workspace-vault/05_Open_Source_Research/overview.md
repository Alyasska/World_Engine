---
type: research-note
title: Open-Source Research Overview
updated: 2026-04-24
---

# Open-Source Research Overview

Authoritative source: [docs/OPEN_SOURCE_REPOS.md](../../docs/OPEN_SOURCE_REPOS.md)

This note is a quick summary for Obsidian navigation.

---

## Candidate Summary

| Library | Role | Phase | Recommendation |
|---|---|---|---|
| Azgaar/Fantasy-Map-Generator | Procedural world generation | 1-2 | Import JSON export, don't fork |
| maplibre/maplibre-gl-js | Interactive map rendering | 2 | Dependency at Phase 2 |
| visgl/deck.gl | Advanced visual overlays | 3 | Research only |
| gravity-ui/timeline | Chronology bar | 3 | Research phase, compare with vis-timeline |
| obsidian-git | Vault auto-sync | Now | Install as Obsidian plugin |
| obsidian-open-vscode | Vault → VS Code jump | Now | Install as Obsidian plugin |

---

## Phase 1 Decision: No External Libraries Yet
See [[../08_Decisions/decisions-log#Phase 1 Map Library Decision]].

The interaction model (pan/zoom, markers, panels, layers) is proven with vanilla JS first.  
MapLibre is introduced at Phase 2 when real geographic data is needed.

This avoids the risk of coupling the interaction model prototype to a complex external API too early.

---

## Integration Risk Notes

**MapLibre:** Low-medium risk. Well-documented. Needs GeoJSON or vector tiles.  
**Azgaar:** Use as external tool only — generate world, export JSON/SVG. Never fork.  
**deck.gl:** High risk for Phase 1-2. Add only when animated overlays are the next feature.  
**vis-timeline:** Better maintained than gravity-ui/timeline. Evaluate at Phase 3.
