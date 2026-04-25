# Milestones

Track phase completion here. A phase is complete only when the Visual Confirmation criterion is met and verifiable in a browser or file system.

---

## Phase 0 — Bootstrap Workspace
**Status:** ✅ Complete  
**Goal:** Clean agent-friendly workspace with documented vision, structure, and a deployed static preview.  
**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` loads the Phase 0 preview page.  

**Checklist:**
- [x] Git repo initialized at `C:\mirror\мое\world_engine`
- [x] Remote connected to `https://github.com/Alyasska/World_Engine`
- [x] Directory structure created (docs, tracking, terminology, skills, vault, web, references, scripts)
- [x] CLAUDE.md and AGENTS.md created
- [x] docs/FINAL_VISION.md
- [x] docs/ARCHITECTURE_DECISIONS.md
- [x] docs/OLD_REPO_LESSONS.md
- [x] docs/OPEN_SOURCE_REPOS.md
- [x] docs/HOSTING_STRATEGY.md
- [x] docs/OBSIDIAN_VSCODE_WORKFLOW.md
- [x] tracking/MILESTONES.md (this file)
- [x] tracking/NEXT_ACTIONS.md
- [x] tracking/CHANGELOG.md
- [x] terminology/TERMS.md
- [x] terminology/PLACE_VS_SPACE.md
- [x] skills/agent-token-efficiency.md
- [x] skills/visual-confirmation-rules.md
- [x] skills/no-blind-copying-open-source.md
- [x] vault/ Obsidian structure with templates
- [x] web/index.html static preview
- [x] .github/workflows/deploy-pages.yml
- [x] Initial commit pushed to GitHub

---

## Phase 1 — Interactive Visual Prototype
**Status:** ✅ Complete  
**Branch:** `phase-1-interactive-visual-prototype`  
**Goal:** Turn the static preview into a working interactive prototype with pan/zoom, clickable markers, detail panel, layer toggles, and chronology bar. No external dependencies.  
**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — drag to pan, scroll to zoom, click markers to see linked data, toggle layers.

**Checklist:**
- [x] Create `workspace-vault/` project-building Obsidian vault (separate from creative `vault/`)
- [x] Create `web/data/` static JSON layer: places.json, characters.json, events.json, stories.json
- [x] Write `web/engine.js` — vanilla JS interactive engine (~450 lines)
- [x] Rewrite `web/index.html` — detailed hand-crafted SVG world map with layers
- [x] Extend `web/style.css` — full Phase 1 interaction styles
- [x] Pan + zoom (drag + scroll wheel + touch + zoom buttons)
- [x] Clickable place markers (8 places) with detail panel
- [x] Related characters, events, stories shown from JSON
- [x] Layer toggles: Geography, Political, Narrative, Chronology (all visibly affect map)
- [x] Chronology bar with era bands and event dots (clickable)
- [x] docs/ARCHITECTURE_DECISIONS.md updated (AD-007, AD-008, AD-009)
- [x] docs/OBSIDIAN_VSCODE_WORKFLOW.md updated (two-level architecture)
- [x] CLAUDE.md, AGENTS.md updated
- [x] tracking/ files updated
- [x] PROJECT_INDEX.md created at repo root for Obsidian project-vault navigation
- [x] Committed and pushed to GitHub

**What Is Real vs Mocked:**

| Feature | Status | Notes |
|---|---|---|
| Pan / zoom | ✅ Real | Vanilla JS, CSS transform, cursor-centered zoom |
| Place markers | ✅ Real | Rendered from places.json (8 places) |
| Detail panel content | ✅ Real | Loaded from JSON |
| Related entities | ✅ Real | Cross-referenced across 4 JSON files |
| Layer toggles | ✅ Real | Visibly show/hide SVG groups and chrono bar |
| Chronology bar | ✅ Real | Events from events.json, era selection |
| World geography | ⚙️ Hand-crafted SVG | Not from Azgaar — Phase 2 decision |
| Political borders | ⚙️ Approximate fills | Rough territory, not from data |
| vault → JSON pipeline | 🔲 Mocked | JSON is hand-authored; script is Phase 2 |
| MapLibre / Azgaar | 🔲 Not yet | Documented as future; Phase 2 decision |

---

## Phase 2A — Obsidian Data Contract Alignment
**Status:** ✅ Complete
**Branch:** `phase-2a-obsidian-data-contract`
**Goal:** Align vault templates and web JSON to a shared field contract so a future parser can convert Markdown frontmatter to JSON with no field renaming. No parser yet — alignment only.

**Checklist:**
- [x] `docs/OBSIDIAN_DATA_CONTRACT.md` — canonical field contract for all four types
- [x] Updated `vault/Templates/_template-place.md` — `faction`, `linkedEvents`, `layer`, `description`, `mapRef.x/y`
- [x] Updated `vault/Templates/_template-character.md` — added `faction`, `description`
- [x] Updated `vault/Templates/_template-event.md` — flat `era`/`date`/`chronoPosition`, `linkedPlaces`
- [x] Updated `vault/Templates/_template-story.md` — flat `era`/`date`/`chronoPosition`, `linkedPlaces`, `logline`, `description`, `linkedCharacters`
- [x] Sample vault note: `vault/Places/vareth.md`
- [x] Sample vault note: `vault/Characters/aran-voss.md`
- [x] Sample vault note: `vault/Events/siege-of-vareth.md`
- [x] Sample vault note: `vault/Stories/the-first-winter.md`
- [x] `PROJECT_INDEX.md` updated with contract doc link
- [x] tracking files updated

---

## Phase 2B — Vault→JSON Parser Script
**Status:** ✅ Complete
**Branch:** `phase-2b-vault-parser`
**Goal:** Script that reads vault `.md` YAML frontmatter and writes JSON. Writes to `web/data/generated/` (staging) — live `web/data/*.json` untouched until Phase 2C.

**Checklist:**
- [x] `scripts/vault-to-json.js` — no-dependency YAML frontmatter parser
- [x] `docs/ARCHITECTURE_DECISIONS.md` — AD-010: built-in parser rationale and limitations
- [x] `web/data/generated/places.json` — 1 entry from vault/Places/vareth.md
- [x] `web/data/generated/characters.json` — 1 entry from vault/Characters/aran-voss.md
- [x] `web/data/generated/events.json` — 1 entry from vault/Events/siege-of-vareth.md
- [x] `web/data/generated/stories.json` — 1 entry from vault/Stories/the-first-winter.md
- [x] `web/data/generated/README.md` — documents staging area and promotion path
- [x] All 4 vault entries parsed with correct web fields, vault-only fields dropped
- [x] Original `web/data/*.json` unchanged — Phase 1 preview not broken

**Run:** `node scripts/vault-to-json.js`

---

## Phase 2C — Live Generated Data + Static Demo
**Status:** ✅ Complete
**Branch:** `phase-2c-live-generated-data`
**Goal:** Complete the full Phase 2 loop — vault Markdown → parser → generated JSON → live GitHub Pages preview. All entries have vault sources; engine loads generated data; preview shows data-flow attribution.

**Checklist:**
- [x] vault/Places/ — all 8 places have vault `.md` sources
- [x] vault/Characters/ — all 4 characters have vault `.md` sources
- [x] vault/Events/ — all 6 events have vault `.md` sources
- [x] vault/Stories/ — all 3 stories have vault `.md` sources
- [x] `node scripts/vault-to-json.js` produces 8+4+6+3 entries in web/data/generated/
- [x] `web/engine.js` fetches from `web/data/generated/` (generated data is live)
- [x] `web/index.html` topbar badge updated to "Phase 2 Preview"
- [x] `web/index.html` notice bar shows Phase 2 data-flow attribution
- [x] `web/data/generated/` entries match the hand-authored JSON (validated before switch)
- [x] `web/data/*.json` (hand-authored) retained as legacy reference — not deleted
- [x] All Phase 1 visual features verified: markers, layers, panel, chronology bar
- [x] `docs/ARCHITECTURE_DECISIONS.md` — AD-011 (engine switches to generated data)
- [x] `docs/OBSIDIAN_VSCODE_WORKFLOW.md` — Phase 2 authoring workflow documented
- [x] tracking files updated

**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — notice bar reads
"Obsidian vault Markdown → vault-to-json.js → generated JSON → interactive map".
Data status shows "vault-generated". All 8 markers, layers, and chronology bar work.

---

## Phase 3A — Draggable Chronology Cursor
**Status:** ✅ Complete
**Branch:** `phase-3-chronology-scrub`
**Goal:** Make the chronology bar cursor draggable. Dragging or clicking the track moves the cursor, updates the active era live, brightens the current era band, and dims out-of-era event dots.

**Checklist:**
- [x] Cursor drag: mouse (mousedown/mousemove/mouseup on window)
- [x] Cursor drag: touch (touchstart/touchmove/touchend with passive:false)
- [x] Click anywhere on track → cursor moves to that exact position
- [x] Era band click still works (cursor snaps to era center)
- [x] Event dot click still works (opens event detail)
- [x] Era label updates live while dragging
- [x] Era bands highlight/dim based on cursor position (not just on click)
- [x] Event dots outside active era dim to 20% opacity with CSS transition
- [x] Cursor hit area expanded to 16px wide (transparent) via CSS — easy to grab
- [x] Gold line visual via `::after` (centered, 2px)
- [x] `.dragging` class removes `left` transition during drag (instant follow)
- [x] `.dragging::after` brightens the cursor glow while dragging
- [x] `docs/ARCHITECTURE_DECISIONS.md` — AD-012 (vis-timeline evaluated, vanilla JS chosen)
- [x] No external library added
- [x] All Phase 1 and Phase 2 visual features still working

**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — grab the gold cursor on the chronology bar and drag left/right. Era label updates live. Event dots dim to near-invisible outside the active era. Click any era band to snap cursor there.

---

## Phase 3B — Era-Sensitive Overlays
**Status:** ✅ Complete
**Branch:** `phase-3b-era-overlays`
**Goal:** SVG territory fills and markers shift based on the current era. Dragging the cursor into the Age of Founding shows Age of Founding political borders.

**Checklist:**
- [x] `applyEraOverlays(eraId)` — toggles `era-{id}` CSS class on `#layerPolitical`
- [x] Called automatically from `applyEra()` on every cursor move
- [x] Age of Founding: Compact + Free Coast territories hidden; Northern Reach fill brightened
- [x] Long Wars: default three-power split (no overrides — base styles are Long Wars)
- [x] Post-Collapse: Northern + Compact fills dimmed; Free Coast fill brightened
- [x] CSS `transition: fill/opacity 0.5s ease` on territories, labels, and borders — smooth crossfade
- [x] No new SVG paths, no new HTML elements, no new libraries
- [x] Layer toggle (Political on/off) still works independently of era class
- [x] All Phase 3A features intact (drag, dot dimming, era label)

**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — drag cursor to Age of Founding → Compact and Free Coast territory fills fade out; Northern Reach brightens. Drag to Post-Collapse → Northern and Compact dim; Free Coast glows. Drag back to Long Wars → default three-way split restores.

---

## Phase 3 — Chronology + Era Overlays
**Status:** ✅ Complete (3A + 3B)
**Summary:** Draggable chronology cursor with live era detection (3A) and era-sensitive SVG political territory fills (3B).

---

## Phase 4 — Story↔Map Feedback Loop (Planned)
**Status:** 🔲 Not started  
**Goal:** Writing a Story entry with location data automatically creates a map marker.  
**Visual Confirmation:** Add `mapRefs` to a Story → marker appears on map without manual intervention.

---

## Phase 5 — Polish and Mobile (Planned)
**Status:** 🔲 Not started  
**Goal:** Fast load, offline-capable, usable on phone.  
**Visual Confirmation:** Lighthouse score ≥ 85, works on iPhone/Android browser.
