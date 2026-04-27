# Changelog

Format: `[YYYY-MM-DD] Phase N — Description`

---

## [2026-04-27] Phase 4E — Empty era state feedback

**Branch:** `phase-4e-empty-era-state`

**Changed:**
- `web/index.html`:
  - Added `<span class="chrono-empty-era" id="eraEmptyMsg" hidden>` to `.chrono-left` in the chronology bar
- `web/engine.js`:
  - `getEventsForEra(eraId)` — new helper returning all events whose `era` matches the given id
  - `eraHasEvents(eraId)` — new helper returning boolean; used by `applyEra` to toggle the message
  - `applyEra()` — shows/hides `#eraEmptyMsg` based on whether the selected era has any events
  - `showPlaceDetail()` events section — adds a subtle note "None of these events occurred in the [era]." when a place has linked events but none match the active era
- `web/style.css`:
  - `.chrono-empty-era` — small muted italic label in the chrono-left column (no layout shift)
  - `.place-era-empty-note` — small muted italic note inside the place events section

**Behaviour:**
- When no events exist for the selected era, `#eraEmptyMsg` becomes visible in the chronology bar beside the era name
- When a place panel is open and none of its linked events fall in the active era, a subtle note appears below the events list
- All behaviour is data-driven; no hardcoded era IDs outside of `ERAS` array

---

## [2026-04-27] Phase 4D — Character and story detail panels

**Branch:** `phase-4d-character-story-panels`

**Changed:**
- `web/engine.js`:
  - `state.detailMode` — extended to support `'character'` and `'story'` (was `'place'` | `'event'` | `null`)
  - `showCharacterDetail(charId)` — new function: renders character panel with description, traits, arc, faction, linked places (clickable), linked events (clickable), linked stories (clickable), `?author=1` VS Code link
  - `showStoryDetail(storyId)` — new function: renders story panel with logline, description, era badge, date, linked places (clickable), linked events (clickable), linked characters (clickable), `?author=1` VS Code link
  - `showPlaceDetail()` — added click listeners for `[data-char-id]` and `[data-story-id]` items in the characters and stories sections
  - `showEventDetail()` — added `data-char-id` attribute + role sub-label to participant items; added linked-stories section with `data-story-id` items; added click listeners for chars and stories; removed now-unused `.clickable` class override (place items use `data-place-id` cursor rule)
  - `eraLabel(eraId)` — new helper returning display name for era slugs; replaces inline ternary chain in `showEventDetail`
  - `refreshOpenPanel()` — comment updated; behavior unchanged (already no-ops for character/story modes)
- `web/style.css`:
  - `.badge-character` — blue-gray type badge for character panels
  - `.badge-story` — green type badge for story panels (matches free-coast palette)
  - `.detail-link-item[data-char-id]` — pointer cursor + blue-gray hover highlight
  - `.detail-link-item[data-story-id]` — pointer cursor + green hover highlight
  - `.detail-link-item[data-place-id]` — pointer cursor + gold hover highlight (consistent with event items)

**Behaviour:**
- Clicking a character in any detail panel opens the character detail; back button returns to the place panel (or clears if no place was selected)
- Clicking a story in any detail panel opens the story detail; same back navigation
- All linked items in character and story panels are clickable (places → place detail, events → event detail, characters/stories → respective detail)
- `?author=1` mode shows VS Code vault links for characters and stories (extends Phase 3E authoring links)
- Era dragging, political overlays, marker dimming/glow, live panel refresh, event dot clicks — all intact
- `refreshOpenPanel()` no-ops for character/story modes (no era-sensitive content in those panels)

**No-change:** Parser untouched. Data contract untouched. Vault content untouched. CI workflow untouched. No new dependencies.

---

## [2026-04-25] Phase 4C — Post-Collapse content seed

**Branch:** `phase-4c-post-collapse-content-seed`

**Added (vault/Events/):**
- `collapse-of-the-compact.md` — `event-collapse-of-the-compact` · post-collapse · Year 3 PC · chronoPosition 0.77 · primaryPlace: Solmark · linked to Vareth and Solmark · eventType: collapse
- `free-coast-declaration.md` — `event-free-coast-declaration` · post-collapse · Year 9 PC · chronoPosition 0.85 · primaryPlace: Port Maren · linked to Port Maren, Drenford, Solmark · eventType: political
- `thornwood-watch-abandoned.md` — `event-thornwood-watch-abandoned` · post-collapse · Year 17 PC · chronoPosition 0.93 · primaryPlace: Thornwood Watch · linked to Thornwood Watch and Vareth · eventType: collapse

**Added (vault/Stories/):**
- `the-last-road.md` — `story-the-last-road` · post-collapse · Year 9–12 PC · chronoPosition 0.80 · primaryPlace: Drenford · participant: char-mira-solhand · linked to both new political events

**Updated (vault/Places/):**
- `vareth.md` — added `event-collapse-of-the-compact`, `event-thornwood-watch-abandoned` to linkedEvents
- `solmark.md` — added `event-collapse-of-the-compact`, `event-free-coast-declaration` to linkedEvents
- `port-maren.md` — added `event-free-coast-declaration` to linkedEvents
- `thornwood-watch.md` — added `event-thornwood-watch-abandoned` to linkedEvents
- `drenford.md` — added `event-free-coast-declaration` to linkedEvents; added `story-the-last-road` to linkedStories

**No-change:** `web/engine.js`, `web/style.css`, `web/index.html`, `scripts/vault-to-json.js`, `scripts/validate-vault.js`, `.github/workflows/parse-vault.yml`, data contract, parser logic all untouched.

**Validation:** `node scripts/validate-vault.js` passes — 25 entities, 0 errors.

**Effect (after CI regenerates JSON):** Drag cursor to Post-Collapse → 3 event dots appear in the 0.72–1.0 zone → Vareth, Solmark, Port Maren, Drenford, and Thornwood Watch markers all glow (era-active) → clicking any of those places shows Post-Collapse events with "now" badges in the detail panel.

---

## [2026-04-25] Roadmap reevaluation after Phase 4A–4B

**Branch:** `phase-roadmap-reevaluation`

**Reviewed:** engine.js, index.html, all tracking/docs files, generated JSON, vault structure.

**Findings:**
- Post-Collapse era has 0 events — era scrubber dead zone for 1/3 of the timeline
- Characters and stories listed in place panels are non-interactive (no `showCharacterDetail` or `showStoryDetail` exists in engine.js)
- All 3 story entries are draft and all are Long Wars era only
- PROJECT_INDEX.md was stale (referenced Phase 2 as current)
- MILESTONES.md "Phase 4/5" placeholders were vague and not aligned with actual project state

**Changed:**
- `tracking/MILESTONES.md` — replaced vague Phase 4/5 placeholders with full phase definitions: 4C (content), 4D (engineering), 4E (engineering), 4F (deferred), 5A, 5B, Phase 6; added "Out of Scope" section
- `tracking/NEXT_ACTIONS.md` — full rewrite: structured with immediate action, next 3 actions, deferred, do-not-start-yet, manual checklist, branch naming plan
- `tracking/CHANGELOG.md` — this entry
- `PROJECT_INDEX.md` — updated phase reference from "Phase 2 complete" to current Phase 4B

**Roadmap outcome:**
- Immediate next: Phase 4C — Post-Collapse content seed (CONTENT work, zero code)
- Next engineering: Phase 4D — character and story detail panels
- Small polish: Phase 4E — empty era state feedback
- Deferred: Phase 4F, 5A, 5B
- Do not start: Phase 6 (MapLibre), backend, database, framework

---

## [2026-04-25] Phase 4B — Vault data validation

**Branch:** `phase-4b-vault-validation`

**Added:**
- `scripts/validate-vault.js` — no-dependency validation script:
  - Checks required fields (`id`, `type`, `title`, `canonState`) on every entity
  - Detects duplicate IDs across all vault folders
  - Validates `type` against allowed values
  - Validates `id` prefix matches folder type (`place-*`, `char-*`, `event-*`, `story-*`)
  - Validates declared `type` matches the folder the file lives in
  - Cross-reference integrity: all `linkedPlaces`, `linkedCharacters`, `linkedEvents`, `linkedStories` values must resolve to known IDs
  - Event `era` must be one of: `age-founding`, `long-wars`, `post-collapse`
  - `canonState` must be one of: `canon`, `draft`, `alt`, `legend`, `retired`
  - Exit 0 on pass; exit 1 on any error
  - CRLF-safe (normalizes line endings at read time — works on both Windows and Linux CI)

**Changed:**
- `.github/workflows/parse-vault.yml` — added "Validate vault data" step before "Generate JSON from vault"; broken vault now blocks parser from running
- `docs/ARCHITECTURE_DECISIONS.md` — AD-015: vault validation design rationale

**Effect:** A vault push with broken cross-references, invalid era tags, duplicate IDs, or missing required fields now fails CI before any JSON is committed to `main`.

---

## [2026-04-25] Phase 4A — CI auto-parser

**Branch:** `phase-4a-ci-auto-parser`

**Added:**
- `.github/workflows/parse-vault.yml` — GitHub Actions workflow:
  - Triggers on push to `main` when `vault/**` or `scripts/vault-to-json.js` changes; also `workflow_dispatch`
  - Runs `node scripts/vault-to-json.js`
  - Checks `git diff --quiet -- web/data/generated`; skips commit if nothing changed
  - If changed: commits only `web/data/generated/` with `github-actions[bot]` identity and message `chore: regenerate vault JSON`; pushes to `main`
  - Permissions: `contents: write` only
  - No `npm install` step (parser has no external dependencies)

**Changed:**
- `docs/ARCHITECTURE_DECISIONS.md` — AD-014: CI auto-parser design decisions

**Effect:** Editing a vault `.md` in Obsidian → push to main → workflow runs → generated JSON updated → `deploy-pages.yml` redeploys GitHub Pages. Full loop, zero manual steps.

---

## [2026-04-25] Phase 3E — Local authoring links

**Branch:** `phase-3e-local-authoring-links`

**Changed:**
- `web/engine.js`:
  - `VAULT_ROOT` constant — `'C:/mirror/мое/world_engine'` (used only when author mode is active)
  - `ENTITY_VAULT_DIR` / `ENTITY_ID_PREFIX` — maps entity `type` to vault folder and ID prefix
  - `isAuthorMode()` — returns `true` when `?author=1` is in the URL
  - `authoringLinkHTML(entity)` — derives `vault/{Type}/{slug}.md` from entity type and id; constructs `vscode://file/...` URI (Cyrillic path percent-encoded via `encodeURI`); returns `''` in public mode
  - `showPlaceDetail` — `${authoringLinkHTML(place)}` injected in detail header
  - `showEventDetail` — `${authoringLinkHTML(ev)}` injected in detail header
- `web/style.css` — `.author-link` and `.author-link:hover` styles (subdued monospace badge with gold border on hover)
- `web/index.html` — phase note updated to "Phase 3A–3E ✓"
- `docs/ARCHITECTURE_DECISIONS.md` — AD-013: `?author=1` local authoring mode gate

**Behaviour:** In normal public browsing (GitHub Pages or local), no VS Code links appear. Load the preview with `?author=1` to enable authoring links in place and event detail panels. Links resolve to the exact vault `.md` file in VS Code. Missing-vault or no-VS-Code failures are harmless (browser silent fail or system prompt).

**No-change:** No parser change. No generated JSON change. No data contract change.

---

## [2026-04-25] Phase 3D — Live panel era refresh

**Branch:** `phase-3d-live-panel-refresh`

**Changed:**
- `web/engine.js`:
  - `state.detailMode` — new field (`null` | `'place'` | `'event'`); tracks which panel is currently displayed
  - `showPlaceDetail()` — sets `state.detailMode = 'place'`
  - `showEventDetail()` — sets `state.detailMode = 'event'`
  - `clearDetail()` — sets `state.detailMode = null`
  - `refreshOpenPanel()` — new helper; calls `showPlaceDetail(state.selectedId)` when `detailMode === 'place'`; no-ops otherwise
  - `applyEra()` — calls `refreshOpenPanel()` after all other era updates
- `web/index.html` — phase note updated to "Phase 3A–3D ✓"

**Behaviour:** Dragging or clicking the chronology cursor while a place detail is open re-renders the panel immediately. Active-era "now" badges and `.era-current` left-border highlights update live. Event sub-details (opened by clicking an event in the panel) are left undisturbed — they contain no era-aware content yet.

**No-change:** No CSS added. No parser change. No data contract change. No new DOM listeners added on each re-render (innerHTML replacement GC's old nodes).

---

## [2026-04-25] Phase 3C — Narrative time filtering

**Branch:** `phase-3c-narrative-time-filtering`

**Changed:**
- `web/engine.js`:
  - `applyNarrativeFilter(eraId)` — new function; derives active place IDs from `events.linkedPlaces` filtered by era; toggles `marker-era-active`/`marker-era-inactive` on each `[data-place-id]` marker `<g>`; if the era has no events (post-collapse), removes all era classes (neutral state)
  - `applyEra()` — calls `applyNarrativeFilter()` after existing era logic
  - `showPlaceDetail()` — linked events that match `state.activeEra` get `.era-current` class and an inline `<span class="era-badge-active">now</span>`
- `web/style.css`:
  - `.place-marker` transition extended to `opacity 0.4s ease, filter 0.4s ease`
  - `.place-marker.marker-era-active` — soft gold drop-shadow glow
  - `.place-marker.marker-era-inactive:not(.marker-selected)` — opacity 0.28; selected markers never dim
  - `.detail-link-item.era-current` — left gold border accent
  - `.era-badge-active` — small uppercase "now" label in gold
- `web/index.html` — phase note updated to "3A ✓ · 3B ✓ · 3C ✓"

**Data:** No parser change. Uses existing `events.linkedPlaces` to derive active places per era at runtime. All data is in `web/data/generated/events.json`.

---

## [2026-04-25] Phase 3B — Era-sensitive map overlays

**Branch:** `phase-3b-era-overlays`

**Changed:**
- `web/engine.js`:
  - `applyEraOverlays(eraId)` — new function; toggles `era-{id}` class on `#layerPolitical`
  - `applyEra()` — calls `applyEraOverlays()` so overlays update on every cursor move
- `web/style.css`:
  - `.territory`, `.region-label`, `.political-border` — `transition: fill 0.5s ease, opacity 0.5s ease` added
  - `#layerPolitical.era-age-founding` rules — Compact + Free Coast hidden (`opacity: 0`); Northern Reach fill brightened (`rgba(106,154,200,0.22)`)
  - `#layerPolitical.era-post-collapse` rules — Northern + Compact fills dimmed; Free Coast fill brightened (`rgba(106,170,136,0.25)`), label opacity boosted
  - Long Wars era: no overrides (base styles are the Long Wars default)
- `web/index.html` — topbar badge updated to "Phase 3 Preview"; phase note updated; status bar updated

---

## [2026-04-24] Phase 3A — Draggable chronology cursor

**Branch:** `phase-3-chronology-scrub`

**Changed:**
- `web/engine.js` — chronology section refactored:
  - `eraAtPosition(fraction)` — returns era at any 0–1 timeline position
  - `applyEra(eraId)` — updates band highlights, dot dimming, era label (no cursor move)
  - `moveCursorTo(fraction)` — moves cursor + calls `applyEra()` (single path for all interactions)
  - `selectEra(eraId)` — snaps cursor to era center (used by era band clicks)
  - `setupChronoEvents()` — replaced: cursor drag (mouse + touch), track click, event dot click preserved
  - Era bands no longer have individual click listeners; track-level click handles all
- `web/style.css`:
  - `.chrono-cursor` — 16px transparent hit area, `transform: translateX(-50%)`, `cursor: ew-resize`, `pointer-events: auto`
  - `.chrono-cursor::after` — 2px gold visual line via pseudo-element
  - `.chrono-cursor.dragging` — removes left transition for instant drag follow; brightens glow
  - `.chrono-event-dot.dot-inactive` — opacity 0.2 (was 0.4 + gray background)
- `web/index.html` — chrono hint text updated to reflect drag interaction
- `docs/ARCHITECTURE_DECISIONS.md` — AD-012: vis-timeline evaluated (~300KB), vanilla JS chosen

---

## [2026-04-24] Phase 2C — Live generated data + Phase 2 static demo

**Branch:** `phase-2c-live-generated-data`

**Added:**
- `vault/Places/` — 7 new entries: grey-keep, solmark, drenford, ashveil, port-maren, thornwood-watch, veiled-shore
- `vault/Characters/` — 3 new entries: mira-solhand, the-wanderer, elder-council
- `vault/Events/` — 5 new entries: founding-vareth, founding-solmark, burning-of-ashveil, treaty-of-solmark, fall-of-grey-keep
- `vault/Stories/` — 2 new entries: merchant-roads, the-silence-after
- `web/data/generated/` — updated to full dataset: 8 places, 4 characters, 6 events, 3 stories

**Changed:**
- `web/engine.js` — fetches from `web/data/generated/*.json`; data status shows "vault-generated"; comment updated to Phase 2
- `web/index.html` — topbar badge: "Phase 2 Preview"; notice bar: Phase 2 data-flow attribution
- `docs/ARCHITECTURE_DECISIONS.md` — AD-011 (engine switches to generated vault data)
- `docs/OBSIDIAN_VSCODE_WORKFLOW.md` — Phase 2 authoring workflow section added
- `tracking/MILESTONES.md` — Phase 2C marked complete; Phase 3 section added
- `tracking/NEXT_ACTIONS.md` — updated for Phase 3

**Phase 2 complete:** Obsidian vault Markdown → `vault-to-json.js` → `web/data/generated/` → GitHub Pages interactive map. No backend. No framework. All Phase 1 visual features intact.

---

## [2026-04-24] Phase 2B — Vault→JSON parser (safe staged output)

**Branch:** `phase-2b-vault-parser`

**Added:**
- `scripts/vault-to-json.js` — Node.js script (no external dependencies) that parses vault Markdown YAML frontmatter and writes to `web/data/generated/`. Built-in YAML parser handles all patterns used in this vault. Skips `canonState: retired`. Drops vault-only fields. Strips cellId from mapRef.
- `web/data/generated/places.json` — 1 generated entry (place-vareth)
- `web/data/generated/characters.json` — 1 generated entry (char-aran-voss)
- `web/data/generated/events.json` — 1 generated entry (event-siege-of-vareth)
- `web/data/generated/stories.json` — 1 generated entry (story-the-first-winter)
- `web/data/generated/README.md` — documents staging area and promotion steps for Phase 2C

**Changed:**
- `docs/ARCHITECTURE_DECISIONS.md` — added AD-010 (built-in YAML parser rationale + limitations)
- `docs/OBSIDIAN_DATA_CONTRACT.md` — updated pipeline section to show current Phase 2B state
- `tracking/MILESTONES.md` — Phase 2B marked complete
- `tracking/NEXT_ACTIONS.md` — updated for Phase 2C

**Safety:** `web/data/*.json` (Phase 1 hand-authored files) is untouched. Phase 1 preview is not broken.

**Run:** `node scripts/vault-to-json.js`

---

## [2026-04-24] Phase 2A — Obsidian data contract alignment

**Branch:** `phase-2a-obsidian-data-contract`

**Added:**
- `docs/OBSIDIAN_DATA_CONTRACT.md` — canonical field contract for Place, Character, Event, Story; field mapping tables; list of resolved mismatches; Phase 2B parser scope
- `vault/Places/vareth.md` — first real vault Place entry using aligned template
- `vault/Characters/aran-voss.md` — first real vault Character entry
- `vault/Events/siege-of-vareth.md` — first real vault Event entry
- `vault/Stories/the-first-winter.md` — first real vault Story entry

**Changed:**
- `vault/Templates/_template-place.md` — `currentFaction`→`faction`; `significantEvents`→`linkedEvents`; `mapRef` structure to `{x, y, cellId}`; added `layer`, `description`; vault-only fields clearly marked
- `vault/Templates/_template-character.md` — added `faction`, `description`; vault-only fields clearly marked
- `vault/Templates/_template-event.md` — `chronology: {era, date}`→flat `era`+`date`; added `chronoPosition`; `affectedPlaces`→`linkedPlaces`; added `description`
- `vault/Templates/_template-story.md` — `chronology: {era}`→flat `era`+`date`; added `chronoPosition`, `logline`, `description`, `linkedCharacters`; `additionalPlaces`→`linkedPlaces`
- `tracking/MILESTONES.md` — Phase 2 split into 2A (complete), 2B, 2C
- `tracking/NEXT_ACTIONS.md` — updated for Phase 2B
- `PROJECT_INDEX.md` — added link to OBSIDIAN_DATA_CONTRACT.md

**What was aligned:**
- All four templates now use the same field names as `web/data/*.json`
- A future parser script can copy frontmatter fields to JSON with no renaming
- Fields that are vault-only (rich detail) are clearly marked and excluded from the contract

---

## [2026-04-24] Phase 1 correction — Remove workspace-vault, use repo root as project Obsidian vault

**Changed:**
- Removed `workspace-vault/` entirely (was an incorrect separate planning system)
- Created `PROJECT_INDEX.md` at repo root — navigation index for project-management Obsidian vault
- Created `docs/PROMPT_LOG.md` — prompt log (unique content rescued from workspace-vault)
- Created `docs/UI_DESIGN_NOTES.md` — color palette + aesthetic direction reference
- Updated `docs/OBSIDIAN_VSCODE_WORKFLOW.md` — rewritten for correct two-level architecture
- Updated `docs/ARCHITECTURE_DECISIONS.md` — AD-008 corrected (repo root = project vault)
- Updated `CLAUDE.md`, `AGENTS.md` — removed workspace-vault references
- Updated `tracking/MILESTONES.md` — added real/mocked table to Phase 1 section

**Architecture correction:** The repo root `C:\mirror\мое\world_engine` IS the project-management Obsidian vault. No separate folder needed — CLAUDE.md, AGENTS.md, docs/, tracking/, skills/, terminology/ already contain all project management content. `PROJECT_INDEX.md` provides Obsidian-friendly navigation of these files.

---

## [2026-04-24] Phase 1 — Interactive visual prototype and project vault

**Branch:** `phase-1-interactive-visual-prototype`

**Added:**
- `workspace-vault/` — new project-building Obsidian vault (separate from creative `vault/`)
  - `README.md`, `00_Index/HOME.md`, `01_Phases/` (2 notes), `02_Agent_Notes/agent-handoff.md`
  - `03_Prompts/prompt-log.md`, `04_Architecture/overview.md`, `05_Open_Source_Research/overview.md`
  - `06_UI_UX/phase-1-ui-notes.md`, `07_Deployment/github-pages.md`
  - `08_Decisions/decisions-log.md`, `09_Progress_Log/2026-04-24.md`
- `web/data/places.json` — 8 hand-authored places with mapRef, faction, linked entities
- `web/data/characters.json` — 4 characters with traits, arcs, linked places/events/stories
- `web/data/events.json` — 6 historical events with chronoPosition (0–1), era, participants
- `web/data/stories.json` — 3 stories with loglines, linked entities, chronological position
- `web/engine.js` — ~450-line vanilla JS interactive engine:
  - Pan + zoom (drag, scroll wheel, touch, zoom buttons) with cursor-centered zoom
  - 8 place markers rendered from JSON (city/fortress/town/ruins/village/landmark shapes)
  - Layer toggles: Geography, Political, Narrative (SVG group show/hide), Chronology (bar hide)
  - Click marker → detail panel with description, linked characters/events/stories
  - Click event in panel → event detail with participants, consequences, back button
  - Chronology bar: era bands, event dots with tooltips, era selection with cursor animation

**Changed:**
- `web/index.html` — complete rewrite with hand-crafted SVG world (continent, inland sea, 2 mountain ranges, 4 rivers, 3 forests), political territories, narrative overlays, compass rose, 4 SVG layer groups
- `web/style.css` — complete rewrite/extension for Phase 1 interactions and two-panel layout
- `docs/ARCHITECTURE_DECISIONS.md` — added AD-007 (vanilla JS for Phase 1), AD-008 (two-vault), AD-009 (static JSON bridge)
- `docs/OBSIDIAN_VSCODE_WORKFLOW.md` — added two-vault architecture section
- `tracking/MILESTONES.md` — Phase 1 marked complete, Phase 2 goal updated
- `tracking/NEXT_ACTIONS.md` — updated for Phase 2
- `CLAUDE.md` — updated phase reference, added workspace-vault note
- `AGENTS.md` — updated for two-vault logic

**Decisions made:**
- AD-007: Vanilla JS + SVG for Phase 1 (no MapLibre yet — prove interaction model first)
- AD-008: Two-vault Obsidian architecture (creative `vault/` vs project `workspace-vault/`)
- AD-009: Static JSON as Phase 1 data bridge (mirrors vault YAML frontmatter shape)

---

## [2026-04-24] Phase 0 — Bootstrap World Engine workspace

**Added:**
- Git repository initialized at `C:\mirror\мое\world_engine`
- Remote connected to `https://github.com/Alyasska/World_Engine`
- Full directory structure: `docs/`, `tracking/`, `terminology/`, `skills/`, `vault/`, `web/`, `references/`, `scripts/`
- `CLAUDE.md` — agent operating rules, architecture principles, safety constraints
- `AGENTS.md` — agent handoff guide with project orientation table
- `docs/FINAL_VISION.md` — three-pillar vision: map + knowledge + feedback loop
- `docs/ARCHITECTURE_DECISIONS.md` — 6 initial decisions logged (AD-001 through AD-006)
- `docs/OLD_REPO_LESSONS.md` — retrospective on `Alyasska/world_building`
- `docs/OPEN_SOURCE_REPOS.md` — research on 6 open-source candidates (Azgaar, MapLibre, deck.gl, timeline, obsidian-git, obsidian-open-vscode)
- `docs/HOSTING_STRATEGY.md` — GitHub Pages Phase 0, future hosting options
- `docs/OBSIDIAN_VSCODE_WORKFLOW.md` — dual-tool setup guide
- `tracking/MILESTONES.md` — Phase 0–5 milestone tracker
- `tracking/NEXT_ACTIONS.md` — immediate next steps and backlog
- `tracking/CHANGELOG.md` — this file
- `terminology/TERMS.md` — canonical worldbuilding term definitions
- `terminology/PLACE_VS_SPACE.md` — Place vs Space vs Location distinction
- `skills/agent-token-efficiency.md` — token efficiency guidelines
- `skills/visual-confirmation-rules.md` — visual confirmation protocol
- `skills/no-blind-copying-open-source.md` — integration rules for OSS
- `vault/README.md` — Obsidian vault setup instructions
- `vault/Templates/` — 6 Markdown templates with YAML frontmatter
- `vault/Stories/`, `vault/Characters/`, `vault/Places/`, `vault/Events/`, `vault/Systems/`, `vault/Institutions/`, `vault/Lore/`, `vault/Maps/`, `vault/Assets/`
- `web/index.html` — static Phase 0 preview (atmospheric, GitHub Pages compatible)
- `web/style.css` — styling for the preview
- `.github/workflows/deploy-pages.yml` — GitHub Actions workflow for GitHub Pages

**Decisions made:**
- Static HTML (no framework) for Phase 0 preview (AD-001)
- Plain Markdown + YAML frontmatter as data format (AD-002)
- Obsidian as writing layer only, Git as source of truth (AD-003)
- GitHub Pages from `web/` via Actions (AD-004)
- No backend/database until Phase 2 (AD-005)
- Lego assembly over ground-up build (AD-006)
