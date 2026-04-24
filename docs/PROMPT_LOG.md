# Prompt Log

A running log of prompts sent to AI agents. Useful for understanding how decisions were made, replaying a phase, or debugging agent behavior. Update this file at the end of each agent session.

---

## Format

```
## YYYY-MM-DD — Phase N: Short Title

**Summary:** What was asked in 1-2 sentences.

**Key instructions given:**
- bullet

**Result:** What was produced, commit hash, branch name.
```

---

## 2026-04-24 — Phase 0: Bootstrap

**Summary:** Initialize the entire project from scratch. Create directory structure, all documentation, Obsidian vault templates, static HTML preview, GitHub Actions workflow. Commit and push.

**Key instructions given:**
- Create CLAUDE.md, AGENTS.md, docs/, tracking/, terminology/, skills/, vault/, web/
- Research and document 6 open-source candidates in OPEN_SOURCE_REPOS.md
- Build static atmospheric HTML preview (no framework, no build step)
- Connect to https://github.com/Alyasska/World_Engine

**Result:** 28 files created, pushed to main as commit `13e5f24`.

---

## 2026-04-24 — Phase 1: Interactive Visual Prototype

**Summary:** Turn static Phase 0 preview into a working interactive prototype with pan/zoom map, clickable markers, detail panel, layer toggles, chronology bar, and static JSON data layer. No backend, no framework.

**Key instructions given:**
- Read all existing memory files before editing (CLAUDE.md, AGENTS.md, all docs/)
- Work on branch `phase-1-interactive-visual-prototype`
- Create static JSON data layer: web/data/places.json, characters.json, events.json, stories.json
- Build interaction model with vanilla JS (no MapLibre yet — document as future)
- Atmosphere: cold-toned, slightly dirty/fairytale, between game UI and writing tool
- Update all tracking files surgically (do not ignore them)
- Do NOT create workspace-vault/ — repo root IS the project Obsidian vault (correction applied)

**Result:** 30 files changed, commit `fb4f2c4` on branch `phase-1-interactive-visual-prototype`. Corrected: workspace-vault/ removed, PROJECT_INDEX.md added at root.
