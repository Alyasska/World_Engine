# Obsidian + VS Code Workflow

This guide explains how to set up the dual-tool workflow: VS Code for code and agent work, Obsidian for rich writing and knowledge navigation — both operating on the same files, with Git as the source of truth.

---

## Setup Steps

### 1. Open the Project in VS Code
1. Open VS Code
2. File → Open Folder → select `C:\mirror\мое\world_engine`
3. You now see the entire project, including `vault/`, `docs/`, `web/`, etc.
4. All Markdown files are editable directly here

### 2. Open the Vault in Obsidian
1. Open Obsidian
2. Click "Open another vault" (or the vault switcher icon in the bottom-left)
3. Choose "Open folder as vault"
4. Select `C:\mirror\мое\world_engine\vault`
5. Obsidian now treats `vault/` as its vault root

**Result:** You have two tools open simultaneously on the same files:
- VS Code sees the whole project (code, docs, vault, scripts)
- Obsidian sees only `vault/` with its full graph and navigation features

---

## Recommended Obsidian Plugins

Install these via Settings → Community Plugins → Browse:

### obsidian-git (by Vinzent03)
- Auto-commits the vault to Git on a schedule (e.g., every 10 minutes)
- Pulls latest from remote on startup
- Prevents you from forgetting to save/push after a writing session
- **Config:** Set auto-commit interval, set commit message template like `vault: auto-save {{date}}`

### obsidian-open-vscode (by NomarCub)
- Adds a button/command to open the current note in VS Code
- Useful when a note needs code-side editing or you want to jump to a linked script
- **Usage:** Cmd/Ctrl+P → "Open in VS Code"

### Dataview (by blacksmithgu) — Optional, Phase 2+
- Query vault entries like a database using a simple SQL-like syntax
- Useful for generating lists like "all Places in Era 3" or "all Characters with canon status: draft"
- **Do not add until Phase 2** — no data to query yet

---

## Git as Source of Truth

**Rule:** Both VS Code and Obsidian read and write to the same files. Git resolves conflicts.

Recommended workflow:
1. **Start of session:** `git pull` in VS Code terminal (or obsidian-git auto-pulls on startup)
2. **Writing in Obsidian:** obsidian-git auto-commits every N minutes
3. **Code work in VS Code:** commit manually with descriptive messages
4. **End of session:** `git push` (or obsidian-git handles this if configured)

**Conflict resolution:** If both tools edit the same file simultaneously, Git will flag a merge conflict. Resolve in VS Code (which has better diff tooling than Obsidian).

---

## File Editing Rules

| File Type | Edit In | Notes |
|---|---|---|
| Stories, Characters, Places (lore) | Obsidian preferred | Graph view, backlinks, preview |
| Templates | VS Code preferred | Need YAML precision |
| docs/, tracking/, skills/ | VS Code only | Not part of the vault |
| web/ (HTML/CSS/JS) | VS Code only | Not part of the vault |
| CLAUDE.md, AGENTS.md | VS Code only | Agent-facing, not lore |

---

## Vault-Only Obsidian Features to Avoid in Shared Files
Some Obsidian syntax does not render in VS Code or GitHub:
- `![[embed]]` — wikilink embeds (use regular links or copy content instead)
- `%%comments%%` — Obsidian-only comments (invisible in Obsidian, raw text elsewhere)
- Canvas files (`.canvas`) — not plain Markdown, not Git-diff-able

Use standard Markdown links (`[text](file.md)`) for cross-references that need to work in both tools.

---

## Quick Reference — Open Both Tools

```
VS Code:  Open C:\mirror\мое\world_engine          (whole project)
Obsidian: Open C:\mirror\мое\world_engine\vault     (creative vault — lore & stories)
Obsidian: Open C:\mirror\мое\world_engine\workspace-vault  (project vault — dev management)
GitHub:   https://github.com/Alyasska/World_Engine  (source of truth)
Preview:  https://alyasska.github.io/World_Engine/  (static site)
```

---

## Two-Vault Architecture (Added Phase 1)

This project uses **two separate Obsidian vaults** in the same Git repository:

| Vault | Path | Purpose |
|---|---|---|
| **Creative vault** | `vault/` | Stories, Characters, Places, Events, Systems, Institutions, Lore — the fictional world |
| **Project vault** | `workspace-vault/` | Phase plans, agent notes, architecture decisions, prompt logs, progress — building the software |

### Why Two Vaults?
- Obsidian's graph view becomes cluttered if lore and dev notes are mixed
- The agent handoff note should never appear in the creative world knowledge graph
- Different mental contexts: building the software vs writing the world
- Independent commit histories: a writing session won't pollute dev commits

### How to Open Both in Obsidian
1. Open Obsidian → vault switcher (bottom-left gear icon)
2. Add `C:\mirror\мое\world_engine\vault` as "Creative — World Lore"
3. Add `C:\mirror\мое\world_engine\workspace-vault` as "Project — World Engine Dev"
4. Switch between them with the vault switcher

### Editing Rules for workspace-vault/
- Use `[[wikilinks]]` for cross-references *within* `workspace-vault/`
- Use standard Markdown links for files *outside* the vault: `[CLAUDE.md](../../CLAUDE.md)`
- Do not use `![[embed]]` syntax in files that need to be parsed by scripts
- Do not put fictional world content (characters, lore, places) in `workspace-vault/`
