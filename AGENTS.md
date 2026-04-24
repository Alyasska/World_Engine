# AGENTS.md — Agent Handoff Guide

This file helps any agent (Claude Code, future automated agents, CI bots) understand the project state and how to continue work without manual re-briefing.

## What This Project Is
World Engine is a private, long-term worldbuilding system. It combines:
- A **procedural 4D map engine** (2D base, topographic/3D layers, political/narrative overlays, chronological bar)
- An **Obsidian-like Markdown knowledge system** (Stories as primary containers, linked to Places, Characters, Events, Systems, Institutions, Lore)
- A future **live map↔story feedback loop** (spatial context for writing; story events appear on map)

It is assembled from carefully selected open-source projects — not built from scratch. Think: Lego assembly, not bottom-up engineering.

## Current Phase
See `tracking/MILESTONES.md` for the authoritative phase status.

**Phase 0** is bootstrap: workspace structure, documentation, static preview deployed.  
**Phase 1** will embed an interactive map (Azgaar or MapLibre).  
**Phase 2** will wire lore/story data to map layers.

## Quick Orientation
| What you need | Where to find it |
|---|---|
| Architecture decisions | `docs/ARCHITECTURE_DECISIONS.md` |
| Final vision | `docs/FINAL_VISION.md` |
| Lessons from old repo | `docs/OLD_REPO_LESSONS.md` |
| Open-source candidates | `docs/OPEN_SOURCE_REPOS.md` |
| Current milestone status | `tracking/MILESTONES.md` |
| What to do next | `tracking/NEXT_ACTIONS.md` |
| Recent changes | `tracking/CHANGELOG.md` |
| Canonical terms | `terminology/TERMS.md` |
| Agent behavior rules | `CLAUDE.md` |

## Handoff Protocol
When an agent finishes a task:
1. Mark the relevant milestone in `tracking/MILESTONES.md` as complete
2. Add an entry to `tracking/CHANGELOG.md`
3. Update `tracking/NEXT_ACTIONS.md` with the next recommended step
4. Commit with the convention from `CLAUDE.md`

## Repository Layout
```
world_engine/
├── CLAUDE.md              # Agent operating rules
├── AGENTS.md              # This file — agent handoff
├── docs/                  # Architecture, vision, research
├── tracking/              # Milestones, changelog, next actions
├── terminology/           # Canonical worldbuilding term definitions
├── skills/                # Reusable agent behavior guides
├── vault/                 # Obsidian-compatible Markdown knowledge base
│   ├── Stories/
│   ├── Characters/
│   ├── Places/
│   ├── Events/
│   ├── Systems/
│   ├── Institutions/
│   ├── Lore/
│   ├── Maps/
│   ├── Assets/
│   └── Templates/
├── web/                   # Static preview + future frontend (GitHub Pages root)
├── references/            # External links, research assets
└── scripts/               # Utility scripts
```

## Safety Rules (Repeat from CLAUDE.md)
- No database scaffolding before Phase 2
- No backend API before map layer exists
- `web/` must remain statically deployable at all times
- All open-source integrations must be documented in `docs/OPEN_SOURCE_REPOS.md` before use
