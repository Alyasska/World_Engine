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

## Phase 2C — Map Engine Decision (Planned)
**Status:** 🔲 Not started
**Goal:** Decide whether to introduce MapLibre + Azgaar tiles or continue with the SVG approach. Add vault→marker link (clicking a marker opens the vault entry).
**Visual Confirmation:** Click a map marker → vault entry opens in VS Code or browser preview.

---

## Phase 3 — Chronology Bar (Planned)
**Status:** 🔲 Not started  
**Goal:** A scrubable timeline at the bottom of the map. Dragging changes the visible political era, event markers, and linked vault state.  
**Visual Confirmation:** Drag the timeline → political borders shift on the map.

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
