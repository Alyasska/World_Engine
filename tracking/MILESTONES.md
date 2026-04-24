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
- [x] docs/OBSIDIAN_VSCODE_WORKFLOW.md updated (two-vault section)
- [x] CLAUDE.md, AGENTS.md updated
- [x] tracking/ files updated
- [x] Committed and pushed to GitHub

---

## Phase 2 — Vault↔Map Link + Real Map Engine (Planned)
**Status:** 🔲 Not started  
**Goal:** (1) Script that parses `vault/*.md` YAML frontmatter → `web/data/*.json` automatically. (2) Decide on MapLibre vs continued SVG approach. (3) Clicking a map marker links to the actual vault Markdown entry.  
**Visual Confirmation:** Edit a Place in `vault/Places/`, run the script, reload the map — the updated description appears in the detail panel without touching the JSON manually.

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
