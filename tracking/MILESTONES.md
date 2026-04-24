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

## Phase 1 — Interactive Map (Planned)
**Status:** 🔲 Not started  
**Goal:** An interactive, zoomable fantasy map in the browser. Either Azgaar iframe or MapLibre rendering custom GeoJSON.  
**Visual Confirmation:** Open `https://alyasska.github.io/World_Engine/` and pan/zoom a fantasy map.  

**Checklist (draft — refine at phase start):**
- [ ] Decision: Azgaar iframe vs MapLibre from scratch (document in ARCHITECTURE_DECISIONS.md)
- [ ] If MapLibre: set up Vite project in `web/`, install maplibre-gl
- [ ] Create/import base world GeoJSON (coastlines, major regions)
- [ ] Render map with MapLibre in browser
- [ ] Add click handler: clicking a region shows a stub info panel
- [ ] Update GitHub Actions workflow if build step is needed
- [ ] Deploy and confirm visual

---

## Phase 2 — Vault↔Map Link (Planned)
**Status:** 🔲 Not started  
**Goal:** Clicking a map location opens the linked Markdown lore entry. Vault entries with `mapRefs` appear as markers.  
**Visual Confirmation:** Click a settlement on the map → side panel shows its Markdown content.

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
