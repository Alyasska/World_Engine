---
type: architecture-note
title: Architecture Overview
updated: 2026-04-24
---

# Architecture Overview

This note summarizes architecture decisions. The authoritative source is [docs/ARCHITECTURE_DECISIONS.md](../../docs/ARCHITECTURE_DECISIONS.md).

---

## Core Principles
1. **Map-first** — visual output before data schemas
2. **Lego assembly** — integrate OSS, don't rebuild from scratch
3. **Static before dynamic** — every milestone deploys something visible
4. **Markdown-native** — all world data in `.md` + YAML frontmatter
5. **Git as source of truth** — Obsidian, VS Code, agents all sync through Git

---

## Two-Vault Architecture

```
world_engine/
├── vault/            ← Creative vault (fictional world content)
│   ├── Stories/
│   ├── Characters/
│   ├── Places/
│   └── ...
└── workspace-vault/  ← Project vault (this) — software dev management
    ├── 01_Phases/
    ├── 02_Agent_Notes/
    └── ...
```

**Rule:** Never put lore in workspace-vault. Never put dev plans in vault.

---

## Phase Stack

| Phase | Tech | Status |
|---|---|---|
| 0 | Static HTML/CSS | ✅ Done |
| 1 | Vanilla JS + SVG + JSON | ✅ Done |
| 2 | Script: vault/ → web/data/; MapLibre decision | Planned |
| 3 | Chronology bar scrubbing (vis-timeline or custom) | Planned |
| 4 | Story↔map feedback loop | Planned |

---

## Data Flow (Phase 1)

```
vault/*.md (Markdown + YAML frontmatter)
     ↓  [Phase 2: parse script]
web/data/*.json (static JSON)
     ↓  [browser fetch()]
engine.js (renders markers, detail panel, chronology)
     ↓
index.html (SVG map + layout)
```

Phase 1: the middle step (parse script) is manual — JSON is hand-authored.  
Phase 2: automate the vault → JSON step.

---

## Current Tech Decisions (summary)

| Decision | Choice | Why |
|---|---|---|
| Phase 0-1 frontend | Static HTML/CSS/JS | No build step; instant GitHub Pages deploy |
| Phase 1 map | Custom SVG + vanilla JS | No deps; proves interaction model before MapLibre |
| Phase 1 data | Static JSON files | No backend; mirrors vault frontmatter shape |
| Phase 2+ map engine | MapLibre GL JS (planned) | BSD-3, production-ready, no MapBox dependency |
| Phase 3 timeline | Undecided (vis-timeline vs custom) | Needs fictional date system first |
| Backend | None until Phase 2+ | Old repo died from database-first mistake |

Full decision log: [docs/ARCHITECTURE_DECISIONS.md](../../docs/ARCHITECTURE_DECISIONS.md)
