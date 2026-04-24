---
type: prompt-log
title: Prompt Log
---

# Prompt Log

A running log of prompts sent to AI agents. Useful for understanding how decisions were made, replaying a phase, or debugging unexpected agent behavior.

---

## 2026-04-24 — Phase 0: Bootstrap

**Summary:** Initialize the entire project from scratch. Create directory structure, all documentation, Obsidian vault templates, static HTML preview, GitHub Actions workflow. Commit and push.

**Key instructions given:**
- Create CLAUDE.md, AGENTS.md, docs/, tracking/, terminology/, skills/, vault/, web/
- Research and document 6 open-source candidates in OPEN_SOURCE_REPOS.md
- Build static atmospheric HTML preview (no framework)
- Connect to https://github.com/Alyasska/World_Engine

**Result:** 28 files created, pushed to main as commit `13e5f24`.

---

## 2026-04-24 — Phase 1: Interactive Visual Prototype + Project Vault

**Summary:** Turn static Phase 0 preview into an interactive prototype. Add pan/zoom map, clickable markers, detail panel, layer toggles, chronology bar. Create separate project-building Obsidian vault (workspace-vault/). Do NOT add backend, database, Next.js, or heavy frameworks.

**Key instructions given:**
- Read all existing memory files before editing
- Work on branch `phase-1-interactive-visual-prototype`
- Create `workspace-vault/` for project management (separate from creative `vault/`)
- Create static JSON data layer: web/data/places.json, characters.json, events.json, stories.json
- Build interaction model with vanilla JS (no MapLibre yet — document it as future)
- Atmosphere: cold-toned, slightly dirty/fairytale, between game UI and writing tool
- Update all tracking files surgically (do not ignore them)

**Result:** (recorded at end of phase)

---

## Template for Future Prompts

```
## YYYY-MM-DD — Phase N: Short Title

**Summary:** What was asked in 1-2 sentences.

**Key instructions given:**
- bullet
- bullet

**Result:** What was produced, commit hash, branch name.
```
