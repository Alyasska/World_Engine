# UI Design Notes

Visual design reference for the World Engine frontend. Update this file when making significant styling decisions.

---

## Aesthetic Direction

- **Tone:** Cold, atmospheric, slightly dirty/fairytale — NOT pure dark fantasy
- **Balance:** Between serious writing tool (Notion/Obsidian feel) and game map UI (CKIII/LoR feel)
- **Localization:** Keep all text in HTML/JS (not in CSS). Labels must be easy to translate to Russian/English in Phase 3+. Do not hardcode display strings in CSS rules.

---

## Phase 1 Color Palette (CSS variables in `web/style.css`)

| CSS Variable | Value | Role |
|---|---|---|
| `--bg-deep` | `#0d0e12` | Page background, deepest layer |
| `--bg-panel` | `#13151c` | Side panel, topbar, chrono bar |
| `--bg-map` | `#172030` | Map area / ocean background |
| `--bg-hover` | `#1e2230` | Hover states |
| `--border` | `#2a2e3d` | Subtle separators |
| `--border-light` | `#3a3f55` | Slightly brighter borders |
| `--gold` | `#c8a96e` | Primary accent: logo, headings, selected markers |
| `--gold-dim` | `#8b7355` | Secondary accent: dimmed gold |
| `--text-primary` | `#d4cfc4` | Main readable text |
| `--text-muted` | `#7a7870` | Secondary labels |
| `--text-dim` | `#4a4840` | Tertiary / disabled text |
| `--faction-north` | `#6a9ac8` | Northern Reach (cool blue) |
| `--faction-compact` | `#c8a044` | The Compact (warm amber) |
| `--faction-free` | `#6aaa88` | Free Coast (grey-green) |
| `--river` | `#3d6a8a` | River strokes |
| `--mountain` | `#5a6882` | Mountain range strokes |
| `--forest` | `#2c4535` | Forest fill |
| `--continent` | `#252e3e` | Continent base fill |
| `--continent-hi` | `#2e3848` | Continent edge / highland |

---

## Layout Structure

```
┌────────────────────────────────────────────────────┐
│  TOPBAR: logo | nav | layer toggles | phase badge  │  48px
├─────────────────────────────────┬──────────────────┤
│                                 │                  │
│        MAP AREA                 │   SIDE PANEL     │
│   (pan + zoom, SVG world)       │   (welcome /     │
│                                 │    place detail / │
│                                 │    event detail) │
│                                 │  272px fixed     │
├─────────────────────────────────┴──────────────────┤
│  CHRONOLOGY BAR: label | era bands + event dots    │  66px
├────────────────────────────────────────────────────┤
│  PHASE NOTICE (slim status bar)                    │  30px
└────────────────────────────────────────────────────┘
```

---

## Marker Visual Vocabulary

| Place type | Shape | Faction color? |
|---|---|---|
| `city` | Circle (r=7) + outer ring | Yes |
| `fortress` | Diamond polygon | Yes |
| `town` | Circle (r=5), no ring | Yes |
| `ruins` | Broken X + dashed circle | Neutral grey |
| `village` | Small dot (r=3) | No |
| `landmark` | Small circle (r=4) | No |

Selected marker: gold stroke + glow drop-shadow.  
Political layer OFF: all markers revert to neutral gold `#c8a96e`.

---

## Phase 2+ Design Notes

- When MapLibre is introduced: map markers move from SVG `<g>` elements to MapLibre marker API. Engine.js adapter wraps the MapLibre marker creation.
- The detail panel width (272px) and color variables stay stable across phase transitions.
- Chronology bar: scrubable cursor is Phase 3. Phase 1 is click-only.
- Mobile: side panel collapses below 700px. Layer toggle labels collapse below 480px.
