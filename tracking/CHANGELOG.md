# Changelog

Format: `[YYYY-MM-DD] Phase N — Description`

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
