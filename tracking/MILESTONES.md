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

## Phase 3C — Narrative Time Filtering
**Status:** ✅ Complete
**Branch:** `phase-3c-narrative-time-filtering`
**Goal:** Map markers visually reflect the active era — places linked to era events are emphasized; others dim.

**Checklist:**
- [x] `applyNarrativeFilter(eraId)` derives active place IDs from `state.data.events` at runtime — no hardcoding
- [x] Uses existing `events.linkedPlaces` field — no parser change, no data contract change
- [x] `marker-era-active` — soft gold drop-shadow glow on markers with era-relevant events
- [x] `marker-era-inactive:not(.marker-selected)` — opacity 0.28; selected (open detail panel) markers never dim
- [x] Post-Collapse (no events): all markers revert to neutral (no dimming, no glow)
- [x] CSS `transition: opacity 0.4s ease, filter 0.4s ease` — smooth per-marker crossfade
- [x] `showPlaceDetail` — linked events matching active era get `.era-current` border accent + "now" badge
- [x] All Phase 3A and 3B features intact
- [x] Layer toggles, pan/zoom, detail panel, GitHub Pages compatibility all preserved

**Known limitation:** ~~The detail panel era badges are rendered at click time and do not update live.~~ Fixed in Phase 3D.

**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — drag cursor to Age of Founding → Vareth and Solmark glow; other markers dim. Drag to Long Wars → Vareth, Ashveil, Grey Keep, Solmark glow. Drag to Post-Collapse → all markers neutral. Open a place detail while in an era → events matching that era show a gold "now" badge.

---

## Phase 3D — Live Panel Era Refresh
**Status:** ✅ Complete
**Branch:** `phase-3d-live-panel-refresh`
**Goal:** The place detail panel re-renders its era badges live as the chronology cursor moves.

**Checklist:**
- [x] `state.detailMode` — new field tracking `'place'` / `'event'` / `null`
- [x] `showPlaceDetail` sets `detailMode = 'place'`
- [x] `showEventDetail` sets `detailMode = 'event'`
- [x] `clearDetail` sets `detailMode = null`
- [x] `refreshOpenPanel()` — re-renders place detail if `detailMode === 'place'`; no-ops for event details and closed panels
- [x] `applyEra()` calls `refreshOpenPanel()` as its last step
- [x] Selected marker remains visually selected after re-render (`.marker-selected` re-applied on each `showPlaceDetail` call)
- [x] No CSS changes needed — existing `.era-current` and `.era-badge-active` rules reused
- [x] No parser change. No data contract change.
- [x] All Phase 3A–3C features intact

**Visual Confirmation:** `https://alyasska.github.io/World_Engine/` — open Vareth detail, drag cursor through all three eras; "now" badge appears/disappears on Founding of Vareth and Siege of Vareth in real time.

---

## Phase 3E — Local Authoring Links
**Status:** ✅ Complete
**Branch:** `phase-3e-local-authoring-links`
**Goal:** When browsing the preview locally with `?author=1`, clicking the authoring link in a place or event detail panel opens the corresponding vault `.md` in VS Code.

**Checklist:**
- [x] `isAuthorMode()` — checks `?author=1` in URL; false in all public browsing
- [x] `authoringLinkHTML(entity)` — derives vault path from `entity.type` + `entity.id`; returns `''` in public mode
- [x] Place detail: "Open in VS Code" link in detail header
- [x] Event detail: "Open in VS Code" link in detail header
- [x] Cyrillic `мое` path segment percent-encoded via `encodeURI` for safe URI construction
- [x] CSS `.author-link` — subdued monospace badge, gold border on hover
- [x] No link visible in normal public (GitHub Pages) browsing
- [x] No parser change. No generated JSON change. No data contract change.
- [x] AD-013 documenting `?author=1` gate pattern
- [x] All Phase 3A–3D features intact

**Visual Confirmation (local only):** Open `http://localhost:PORT/?author=1` → click any place or event → "Open in VS Code" link appears in the detail header. Click it → VS Code opens the matching vault file.

---

## Phase 3 — Chronology + Era Overlays + Narrative Filtering + Authoring
**Status:** ✅ Complete (3A + 3B + 3C + 3D + 3E)
**Summary:** Draggable chronology cursor (3A), era-sensitive SVG territory fills (3B), era-aware marker emphasis with live panel refresh (3C + 3D), and local VS Code authoring links gated behind `?author=1` (3E).

---

## Phase 4A — CI Auto-Parser
**Status:** ✅ Complete
**Branch:** `phase-4a-ci-auto-parser`
**Goal:** Close the manual loop — vault edits push to GitHub Pages automatically with no terminal steps.

**Checklist:**
- [x] `.github/workflows/parse-vault.yml` created
- [x] Triggers on `vault/**` or `scripts/vault-to-json.js` path changes on `main`
- [x] `workflow_dispatch` for manual runs
- [x] Runs `node scripts/vault-to-json.js` (no `npm install` — zero external dependencies)
- [x] `git diff --quiet` gate — skips commit and push if JSON unchanged (idempotent)
- [x] Commits only `web/data/generated/` — vault files never touched by bot
- [x] Commit message: `chore: regenerate vault JSON`
- [x] Bot identity: `github-actions[bot]`
- [x] Permissions: `contents: write` only
- [x] AD-014 documented
- [x] Parser and data contract untouched
- [x] All Phase 3A–3E features untouched

**Deployment chain after this phase:**
Obsidian vault edit → `git push` → `parse-vault.yml` runs → bot commits `web/data/generated/*.json` → `deploy-pages.yml` triggers → GitHub Pages updated

**GitHub settings to verify:** Repository must allow Actions to push to `main` (Settings → Actions → General → Workflow permissions → Read and write permissions).

**Visual Confirmation:** After merging to main, edit any vault `.md` field (e.g. change a description), push. Go to Actions tab on GitHub — `Parse Vault Data` should run, produce a `chore: regenerate vault JSON` commit, which then triggers `Deploy to GitHub Pages`.

---

## Phase 4B — Vault Data Validation
**Status:** ✅ Complete
**Branch:** `phase-4b-vault-validation`
**Goal:** Gate the CI auto-parser behind a validation step so broken vault data cannot silently reach GitHub Pages.

**Checklist:**
- [x] `scripts/validate-vault.js` — no-dependency validator (mirrors vault-to-json.js parser, AD-010)
- [x] Required field checks: `id`, `type`, `title`, `canonState`
- [x] Duplicate ID detection across all vault folders
- [x] `type` allowed-value check (`place`, `character`, `event`, `story`)
- [x] ID prefix ↔ folder type consistency (`place-*`, `char-*`, `event-*`, `story-*`)
- [x] Declared `type` ↔ folder name consistency
- [x] Cross-reference integrity: `linkedPlaces`, `linkedCharacters`, `linkedEvents`, `linkedStories`
- [x] Event `era` allowed-value check (`age-founding`, `long-wars`, `post-collapse`)
- [x] `canonState` allowed-value check (`canon`, `draft`, `alt`, `legend`, `retired`)
- [x] CRLF-safe: normalizes line endings at read time (works on Windows locally and Linux CI)
- [x] Template files (leading `_`) excluded from validation
- [x] `.github/workflows/parse-vault.yml` — "Validate vault data" step added before "Generate JSON from vault"
- [x] AD-015 documented
- [x] All 21 current vault entities pass validation
- [x] All Phase 4A CI features intact

**Visual Confirmation (CI):** Push a vault file with a broken `linkedPlaces` reference → `Parse Vault Data` workflow fails at the validation step; no bad JSON is committed.

---

---

## Roadmap — Reevaluated 2026-04-25

The sections below replace the original vague "Phase 4 / Phase 5" placeholders.
They reflect what was actually built, what gaps exist, and what the next safe steps are.

**Current data inventory (as of 4B):**
- 8 places (7 canon, 1 draft)
- 4 characters (3 canon, 1 draft)
- 6 events: 2 Age of Founding, 4 Long Wars, **0 Post-Collapse**
- 3 stories: all draft, all Long Wars era

**Known gaps driving the near-term roadmap:**
1. Post-Collapse era is completely empty — the signature feature (era scrubbing) has a dead zone for 1/3 of the timeline.
2. Characters and stories in detail panels are listed but not clickable — no detail views exist for these entity types.
3. All story entries are draft and concentrated in one era.

---

## Phase 4C — Post-Collapse Content Seed
**Status:** ✅ Complete
**Branch:** `phase-4c-post-collapse-content-seed`
**Type:** Content work (vault authoring, zero code changes)
**Goal:** Add at least 2–3 Post-Collapse events and link them to existing places. Make the era scrubber meaningful across all three eras.

**Checklist:**
- [x] `vault/Events/collapse-of-the-compact.md` — Year 3 PC, chronoPosition 0.77, linked to Solmark + Vareth
- [x] `vault/Events/free-coast-declaration.md` — Year 9 PC, chronoPosition 0.85, linked to Port Maren + Drenford + Solmark
- [x] `vault/Events/thornwood-watch-abandoned.md` — Year 17 PC, chronoPosition 0.93, linked to Thornwood Watch + Vareth
- [x] `vault/Stories/the-last-road.md` — Post-Collapse story stub, chronoPosition 0.80, linked to both political events
- [x] Updated `linkedEvents` in: vareth, solmark, port-maren, thornwood-watch, drenford
- [x] Updated `linkedStories` in drenford (added `story-the-last-road`)
- [x] `node scripts/validate-vault.js` passes — 25 entities, 0 errors
- [x] All code files, parser, data contract, CI workflow untouched

**Visual Confirmation:** After CI regenerates JSON — drag cursor to Post-Collapse → 3 event dots appear in the post-collapse zone (0.72–1.0) → Vareth, Solmark, Port Maren, Drenford, Thornwood Watch all glow era-active → clicking a place shows Post-Collapse events with "now" badges.

---

## Phase 4D — Character and Story Detail Panels
**Status:** ✅ Complete
**Branch:** `phase-4d-character-story-panels`
**Type:** Engineering work (engine.js + style.css only)
**Goal:** Characters and stories are now first-class clickable entities in the detail panel, matching places and events.

**Checklist:**
- [x] `showCharacterDetail(charId)` — description, role badge, faction, traits, arc, linked places/events/stories (all clickable)
- [x] `showStoryDetail(storyId)` — logline (italic), description, era badge, date, linked places/events/characters (all clickable)
- [x] `eraLabel(eraId)` — new helper; replaces inline ternary chain in `showEventDetail`
- [x] `showPlaceDetail()` — click listeners wired for `[data-char-id]` and `[data-story-id]`
- [x] `showEventDetail()` — participants now have `data-char-id` + role; linked stories section added with `data-story-id`; click listeners wired for chars and stories
- [x] `state.detailMode` — extended to `'character'` | `'story'`
- [x] `refreshOpenPanel()` — already no-ops for character/story; comment updated
- [x] Back button — returns to place (`state.selectedId`) or clears if no place was selected
- [x] Authoring links — `?author=1` shows VS Code vault links for characters and stories (extends Phase 3E)
- [x] `.badge-character`, `.badge-story` — new type badge styles
- [x] `.detail-link-item[data-char-id/story-id/place-id]` — pointer cursor + per-entity-type hover highlight
- [x] All Phase 3A–3E and Phase 4A–4C features intact
- [x] No parser change. No data contract change. No vault content change. No new dependencies.

**Visual Confirmation:** Open any place marker → click a character in the Characters section → character detail opens (role badge, traits, arc, linked entities all clickable) → click "← Back to place" → place detail restores. Repeat for stories. In event detail, click a participant or linked story. In `?author=1` mode, Open in VS Code link appears for characters and stories.

---

### Phase 4E — Empty Era State Feedback

**Status:** Complete  
**Type:** Engineering, small UI feedback layer  
**Risk:** Low  

**Goal:** Make the chronology system explain empty eras instead of silently showing a neutral state.

**Proof of completion:**
- Empty-era feedback is data-driven through `getEventsForEra()` and `eraHasEvents()`.
- `#eraEmptyMsg` appears when the selected era has zero recorded events.
- Place detail panels can show a subtle note when the selected place has linked events, but none occurred in the active era.
- Existing chronology drag, era overlays, marker dimming/glow, event dots, and detail panels remain unchanged.
- Parser, data contract, generated JSON structure, and vault content were untouched.

**Files touched:** `web/engine.js`, `web/style.css`, `web/index.html`, tracking files.

---

## Phase 4F — Draft Content Promotion
**Status:** ✅ Complete
**Branch:** `phase-4f-content-promotion`
**Type:** Content work (vault authoring only — zero code changes)
**Goal:** Promote stable draft vault entries to canon, fix cross-reference gaps, improve character descriptions where needed.

**Checklist:**
- [x] 5 stories promoted to canon: `beyond-the-vale`, `last-sentinel`, `solan-and-the-pale-throne`, `the-pale-kings-hunger`, `the-wandering-grey`
- [x] 10 events promoted to canon (all 10 draft events — all fully formed)
- [x] `char-the-pale-king` promoted; self-referential `linkedCharacters` bug fixed; `char-kessa-of-saltmere` added
- [x] `place-veiled-shore` promoted
- [x] `event-ambush-at-ironwood`: `linkedStories` back-link to `story-last-sentinel` added
- [x] `story-the-wandering-grey`: `event-siege-of-stonecrown` added to `linkedEvents`
- [x] `char-the-wanderer`: arc and description improved; remains draft
- [x] 4 stories kept draft: `merchant-roads`, `the-first-winter`, `the-last-road`, `the-silence-after` (placeholder body text)
- [x] `- draft` tag removed from promoted story `tags` arrays (tags is web-facing for stories)
- [x] `node scripts/validate-vault.js` → 54 entities, 0 errors
- [x] Parser, data contract, CI workflow, and all web files untouched

**Visual Confirmation (after CI regenerates JSON):** Character and story detail panels for canon entries will now show complete, well-linked content. The Pale King's character panel will show Kessa of Saltmere in linked characters. The Wandering Grey story will link to the Siege of Stonecrown.

---

## Phase 4G — Story Path Layer (Data-Driven)
**Status:** 🔲 Not started
**Type:** Engineering work (medium — engine.js + index.html)
**Goal:** Render story paths as a dynamic map overlay driven by story data, replacing the hardcoded SVG path in `index.html`.

**Why it matters:**  
There is currently a hardcoded SVG path for "Merchant Roads" drawn in `index.html`'s narrative layer. It is disconnected from the story data. As story entries grow, paths should be generated from `story.linkedPlaces` in order, not manually drawn in HTML.

**What it touches:** `web/engine.js` (story path renderer using linkedPlaces mapRef coordinates), `web/index.html` (remove hardcoded path), `web/style.css` (story path styles)

**What must not change:** No new vault fields needed. `linkedPlaces` already provides the place IDs; `mapRef.x/y` provides coordinates.

**Risk:** Medium. Requires coordinate interpolation and SVG path generation. Defer until 4C and 4D are complete.

---

## Phase 5A — Chronology Depth and Era Metadata
**Status:** 🔲 Not started (future)
**Type:** Engineering + content design
**Goal:** Richer chronology display: era dates/in-world years, event count per era, era tooltips. Define the canonical in-world calendar system.

**Depends on:** Phase 4C (content must exist before calendar design makes sense)
**Risk:** Medium. Calendar design is a worldbuilding decision that should precede implementation.

---

## Phase 5B — Data-Driven Era Map Overlays
**Status:** 🔲 Not started (future)
**Type:** Engineering + content design
**Goal:** Replace hardcoded CSS political overlay rules with vault-driven era map states. Define a data contract for era-specific territory visibility (which factions control which territory in which era).

**Current state:** Era overlays are CSS rules hardcoded in `style.css` for 3 known eras. Adding a new era or changing territory boundaries requires CSS editing. A vault-based contract would allow authors to specify era map states in Markdown.

**Depends on:** Phase 5A (era metadata must be defined before territory data can reference it)
**Risk:** Medium. Requires a new vault entity type or extended event schema.

---

## Phase 6 — Map Infrastructure Upgrade (MapLibre + Azgaar)
**Status:** 🔲 Not started (major future phase)
**Type:** Engineering (high effort, high impact)
**Goal:** Replace the hand-crafted SVG world map with a proper tile-based map using MapLibre GL JS + Azgaar Fantasy Map Generator export.

**Current state:** The SVG map is hand-drawn at Phase 1 quality. Places are at approximate pixel positions. Political territories are manually drawn paths. This is acceptable until the world grows to a scale where hand-crafting becomes unsustainable.

**Depends on:** Azgaar map export with GeoJSON. MapLibre integration research (already in `docs/OPEN_SOURCE_REPOS.md`).
**Risk:** High. Significant engineering effort; requires bundler (Vite or similar), breaking change to map rendering.
**Decision gate:** Do not start until the vault has 20+ places and the hand-crafted SVG becomes a creative constraint.

---

## Out of Scope — Static-First Era

The following are explicitly not part of this project in its current phase. Do not introduce them without a documented phase decision:

| Technology | Why deferred |
|---|---|
| Backend / REST API | No server-side logic needed; GitHub Pages is sufficient |
| Database (SQLite, PostgreSQL, etc.) | Vault Markdown is the data store; no query engine needed yet |
| Next.js / React / SvelteKit | No framework; vanilla JS + static files proven sufficient |
| Prisma / ORM | No database means no ORM |
| User accounts / auth | Single-author private project |
| Real-time collaboration | Not a use case |
| npm dependencies in parser/validator | AD-010 prohibits external deps in scripts/ |
