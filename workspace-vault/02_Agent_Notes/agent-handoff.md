---
type: agent-handoff
title: Agent Handoff — World Engine
updated: 2026-04-24
---

# Agent Handoff — World Engine

Read this first. It orients you in ~2 minutes without consuming the full codebase.

---

## What This Project Is
A private worldbuilding system: interactive map + Markdown lore/story vault + future live feedback loop.

**Phase status:** See [tracking/MILESTONES.md](../../tracking/MILESTONES.md)  
**Next action:** See [tracking/NEXT_ACTIONS.md](../../tracking/NEXT_ACTIONS.md)  
**Operating rules:** See [CLAUDE.md](../../CLAUDE.md) — read this before writing any code

---

## Repository Layout (condensed)
```
world_engine/
├── CLAUDE.md              ← agent rules, architecture principles, what NOT to do
├── AGENTS.md              ← quick repo orientation
├── docs/                  ← vision, decisions, research (authoritative)
├── tracking/              ← milestones, changelog, next actions (keep updated)
├── vault/                 ← creative Obsidian vault (fictional world content)
├── workspace-vault/       ← this vault (project management)
│   ├── 01_Phases/         ← one note per dev phase
│   ├── 02_Agent_Notes/    ← this file and future handoffs
│   ├── 03_Prompts/        ← user prompts log
│   └── ...
├── web/                   ← static frontend (GitHub Pages root)
│   ├── data/              ← JSON data bridge (places, characters, events, stories)
│   ├── engine.js          ← interactive map engine (vanilla JS)
│   ├── index.html         ← main page
│   └── style.css
└── .github/workflows/     ← GitHub Actions Pages deploy
```

---

## Critical Rules (summary of CLAUDE.md)
1. **No database or backend before Phase 2** (the old repo died from starting with DB schema)
2. **web/ must remain statically deployable** at all times
3. **Update tracking/ files after every task** (CHANGELOG, NEXT_ACTIONS, MILESTONES)
4. **Document OSS choices in docs/OPEN_SOURCE_REPOS.md before importing**
5. **Document architecture decisions in docs/ARCHITECTURE_DECISIONS.md before implementing**
6. **Visual confirmation required** — don't mark a phase complete without a deployed, working URL

---

## Two-Vault Logic
There are **two separate Obsidian vaults** in this repo:

| | `vault/` | `workspace-vault/` |
|---|---|---|
| Purpose | Creative worldbuilding | Software project management |
| Contents | Stories, Characters, Places, Events, Lore | Phase plans, agent notes, decisions, prompts |
| Open as vault | `C:\mirror\мое\world_engine\vault` | `C:\mirror\мое\world_engine\workspace-vault` |

**Do not mix them.** Lore goes in `vault/`. Dev notes go in `workspace-vault/`.

---

## Data Shape (Phase 1)
Static JSON files in `web/data/` bridge the browser and the vault concept.  
Shape mirrors vault YAML frontmatter. Future Phase 2 script will parse `vault/*.md` → `web/data/*.json`.

Key fields: `id`, `type`, `title`, `aliases`, `linkedPlaces`, `linkedCharacters`, `linkedEvents`, `chronology`, `canonState`, `mapRef`

---

## Current Tech Stack
- **Frontend:** Vanilla HTML + CSS + JS (no framework, no build step)
- **Data:** Static JSON files fetched at runtime
- **Map:** Custom SVG + vanilla JS pan/zoom (no MapLibre yet)
- **Deployment:** GitHub Pages via Actions workflow
- **Writing:** Obsidian (creative vault) + VS Code (everything)
