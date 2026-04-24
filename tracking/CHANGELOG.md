# Changelog

Format: `[YYYY-MM-DD] Phase N — Description`

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
