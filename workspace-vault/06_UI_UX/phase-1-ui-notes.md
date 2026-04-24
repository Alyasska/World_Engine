---
type: ui-note
title: Phase 1 UI/UX Notes
phase: 1
updated: 2026-04-24
---

# Phase 1 UI/UX Notes

---

## Aesthetic Direction
- **Tone:** Cold, atmospheric, slightly dirty/fairytale — NOT pure dark fantasy
- **Balance:** Between serious writing tool and game map UI
- **Future:** Russian/English bilingual layout (keep labels translatable, no hardcoded text in CSS)

## Color Palette

| Role | Value | Use |
|---|---|---|
| Map background | `#1e2230` | Deep navy, the ocean |
| Continent fill | `#2a3240` | Dark grey-blue land |
| Continent highlight | `#3a4555` | Elevated terrain |
| Inland sea | `#172028` | Darker blue-grey water |
| Mountain stroke | `#5a6882` | Grey-blue ridges |
| River stroke | `#3d6a8a` | Steel blue water |
| Forest fill | `#2c4535` | Dark forest green |
| Gold accent | `#c8a96e` | Headings, icons, markers |
| Gold dim | `#8b7355` | Secondary gold |
| Panel background | `#13151c` | Dark panel |
| Text primary | `#d4cfc4` | Warm light grey |
| Text muted | `#7a7870` | Labels, secondary |
| Border | `#2a2e3d` | Subtle separators |

---

## Layout Structure
```
┌─────────────────────────────────────────────────┐
│  TOPBAR: logo | nav | layer toggles | badge     │
├───────────────────────────────┬─────────────────┤
│                               │   SIDE PANEL    │
│        MAP AREA               │   (detail /     │
│     (pan + zoom, SVG)         │    welcome)     │
│                               │                 │
├───────────────────────────────┴─────────────────┤
│  CHRONOLOGY BAR: era bands + event dots         │
├─────────────────────────────────────────────────┤
│  PHASE NOTICE (slim status bar)                 │
└─────────────────────────────────────────────────┘
```

## Layer Toggle Design
Four toggles in the topbar. Each is a small button with an icon and label:
- 🗺 Geography — terrain labels, river labels, forest names
- ⚑ Political — territory fills, region labels, faction colors
- ✦ Narrative — story event markers, character-linked icons
- ⏱ Chronology — era overlays on chrono bar

Active = gold/bright. Inactive = dimmed with strikethrough style.

---

## Marker Types
| Type | Visual | Faction color |
|---|---|---|
| city | Circle (r=7) + ring | Yes |
| fortress | Diamond shape | Yes |
| town | Circle (r=5) | Yes |
| ruins | Broken circle / X | Neutral grey |
| village | Dot (r=3) | No |
| landmark | Star-like shape | No |

---

## Detail Panel States
1. **Welcome state** (no selection): brief world intro + "click a place on the map"
2. **Place detail**: name, type badge, era, description, linked entities
3. **Event detail**: title, date, participants, consequences (from chrono bar click)

---

## Chronology Bar
- Fixed at bottom, always visible
- Era bands as colored segments
- Event dots as clickable markers
- Cursor line showing "current moment"
- Era labels always visible; event labels on hover
- Phase 1: clicking an event shows it in the detail panel
- Phase 3: dragging cursor changes map state (not implemented yet — label it clearly)
