# CLAUDE.md — Agent Operating Rules for World Engine

## Project Identity
- **Project:** World Engine — private long-term worldbuilding system
- **Repo:** https://github.com/Alyasska/World_Engine
- **Local root:** `C:\mirror\мое\world_engine`
- **Creative vault (Obsidian):** `C:\mirror\мое\world_engine\vault\` — fictional world content
- **Project vault (Obsidian):** `C:\mirror\мое\world_engine\workspace-vault\` — software dev management
- **Phase:** 1 complete → tracking in `tracking/MILESTONES.md`

## Architecture Principles
1. **Map-first, not CRUD-first.** Never start with database schemas. Start with visual output.
2. **Lego assembly.** Integrate existing open-source projects as blocks; build adapters, not full replacements.
3. **Static before dynamic.** Every milestone must produce something visually confirmable — a deployed page, a rendered map, a working preview.
4. **Markdown-native.** All lore, stories, world data live as plain Markdown with YAML frontmatter. No proprietary formats.
5. **GitHub is source of truth.** Obsidian vault, VS Code, and any future tools all sync through Git.

## File System Rules
- `docs/` — architecture decisions, research, vision, lessons learned
- `tracking/` — milestones, next actions, changelog (update these as you work)
- `terminology/` — canonical definitions for worldbuilding terms used in this project
- `skills/` — reusable agent behavior guides
- `vault/` — **creative** Obsidian vault: Stories, Characters, Places, Events, Lore (fictional world)
- `workspace-vault/` — **project** Obsidian vault: phases, agent notes, decisions, prompts (dev management)
- `web/` — static frontend; GitHub Pages root; contains `data/` (static JSON), `engine.js`, `index.html`
- `references/` — external links, snippets, and non-code research assets
- `scripts/` — utility scripts (vault→JSON parser, file scaffolding, etc.)

## Two-Vault Rule
**Never mix creative lore with development notes.**
- Fictional content (characters, stories, places, lore) → `vault/`
- Dev content (phases, decisions, agent notes, prompts) → `workspace-vault/`
- See `docs/OBSIDIAN_VSCODE_WORKFLOW.md` for setup and editing rules

## Agent Behavior Rules
- Always update `tracking/CHANGELOG.md` when completing a task that changes files.
- Always update `tracking/NEXT_ACTIONS.md` to reflect the current recommended next step.
- Do not copy code from `Alyasska/world_building` (old repo). Use it only as reference for lessons learned.
- Do not scaffold a database or backend until Phase 2 is explicitly authorized.
- Do not install npm packages without documenting the choice in `docs/ARCHITECTURE_DECISIONS.md`.
- When researching open-source libraries, document in `docs/OPEN_SOURCE_REPOS.md` before importing.
- Do not add placeholder comments like `// TODO: implement later` — use `tracking/NEXT_ACTIONS.md` instead.
- Keep `web/` deployable to GitHub Pages at all times (static files, no server required).

## Visual Confirmation Rule
Every milestone must end with a visually confirmable output:
- Phase 0: `web/index.html` deployed via GitHub Pages ✅
- Phase 1: Pan/zoom map, clickable markers, detail panel, layer toggles all working at GitHub Pages URL ✅
- Phase 2: Edit a vault entry → run script → reload page → updated data visible
- Phase 3+: Interactive MapLibre layer with scrubable chronology

## What NOT to Do
- Do not create a database schema before Phase 2
- Do not build a REST API before the map layer exists
- Do not install heavy frameworks (Django, Rails, Spring) at any phase
- Do not ask broad open-ended questions — make safe defaults and document them
- Do not duplicate Obsidian plugin functionality — use existing plugins via vault config

## Dependency Decision Protocol
Before adding any npm/pip/cargo dependency:
1. Check `docs/OPEN_SOURCE_REPOS.md` for prior research
2. Confirm license is compatible (MIT, Apache 2.0, BSD preferred)
3. Add an entry to `docs/ARCHITECTURE_DECISIONS.md` with rationale
4. Only then install and import

## Commit Message Convention
```
Phase N: <short imperative description>

- bullet of what changed
- bullet of what was decided
```
