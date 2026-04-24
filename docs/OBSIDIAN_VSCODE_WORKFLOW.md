# Obsidian + VS Code Workflow

Two tools, one repository, one source of truth (Git).

---

## The Two-Level Vault Architecture

This project uses **two separate Obsidian vaults** pointed at different folders in the same Git repository:

| Vault | Obsidian root | Purpose |
|---|---|---|
| **Project vault** | `C:\mirror\мое\world_engine` (repo root) | Project management: phases, decisions, architecture, tracking, agent notes, prompts |
| **Creative vault** | `C:\mirror\мое\world_engine\vault` | Worldbuilding: Stories, Characters, Places, Events, Systems, Institutions, Lore |

**Why two vaults?**
- The Obsidian graph of the creative vault should only show fictional world entities, not agent handoff notes or deployment docs.
- Different mental modes: one for *building* the software, one for *writing* the world.
- `vault/` can sync independently without pulling in web/data/ or docs/ changes.

---

## Setup Steps

### Step 1 — Open the Whole Project in VS Code
1. VS Code → File → Open Folder → `C:\mirror\мое\world_engine`
2. You see everything: `docs/`, `tracking/`, `vault/`, `web/`, `scripts/`, etc.
3. All Markdown files are editable directly. This is your primary coding/agent environment.

### Step 2 — Open the Project Vault in Obsidian (for project management)
1. Obsidian → vault switcher (bottom-left) → "Open folder as vault"
2. Select `C:\mirror\мое\world_engine` (the **repo root**)
3. Start from [PROJECT_INDEX.md](../PROJECT_INDEX.md) for navigation
4. This vault shows docs/, tracking/, skills/, terminology/, and PROJECT_INDEX.md

### Step 3 — Open the Creative Vault in Obsidian (for worldbuilding)
1. Obsidian → vault switcher → "Open folder as vault"
2. Select `C:\mirror\мое\world_engine\vault`
3. This vault shows only Stories, Characters, Places, Events, Lore, etc.
4. The graph view here only shows fictional world entities

You can have both vaults open in the **same Obsidian window** via the vault switcher — switch between them with a single click.

---

## Recommended Obsidian Plugins

Install in both vaults via Settings → Community Plugins → Browse:

### obsidian-git (by Vinzent03)
- Auto-commits vault changes to Git on a schedule (e.g., every 10 minutes)
- Pulls latest from remote on startup
- **Config:** Set commit message template like `vault: auto-save {{date}}`
- Install in the **creative vault** for automatic lore sync
- Optional in the project vault (you commit manually in VS Code for dev work)

### obsidian-open-vscode (by NomarCub)
- Adds a button to open the current note in VS Code
- Useful when you're writing lore and need to jump to a related script or JSON file
- **Usage:** Cmd/Ctrl+P → "Open in VS Code"

### Dataview (by blacksmithgu) — Creative vault only, Phase 2+
- Query vault entries like a database (SQL-like syntax)
- Example: `TABLE title, canonState FROM "Places" WHERE canonState = "canon"`
- **Do not add until Phase 2** — the vault has no real entries yet

---

## Git as Source of Truth

Both Obsidian vaults and VS Code read/write the same files. Git resolves conflicts.

**Recommended session workflow:**
1. **Start:** `git pull` in VS Code terminal (or obsidian-git auto-pulls)
2. **Writing lore:** obsidian-git auto-commits creative vault every N minutes
3. **Dev/agent work:** commit manually in VS Code with descriptive messages
4. **End:** `git push` (or obsidian-git for the creative vault)

**Conflict resolution:** Use VS Code diff tooling to resolve. Obsidian's conflict resolution is limited.

---

## File Editing Rules

| File Type | Edit In | Notes |
|---|---|---|
| Stories, Characters, Places, Lore | Obsidian (creative vault) | Graph view, backlinks, Dataview |
| vault/Templates/ | VS Code preferred | Need YAML precision |
| docs/, tracking/, skills/, terminology/ | VS Code or project Obsidian vault | Both tools work; VS Code for agent work |
| web/ (HTML/CSS/JS/JSON) | VS Code only | Not Markdown |
| CLAUDE.md, AGENTS.md, PROJECT_INDEX.md | VS Code or project vault | Both work |
| scripts/ | VS Code only | Code files |

---

## Syntax Rules for Shared Files

Standard Markdown links everywhere — they work in VS Code, GitHub, and both Obsidian vaults:
```markdown
[text](relative/path/to/file.md)
```

Avoid these in files outside `vault/` (they break in VS Code and GitHub):
- `![[embed]]` — wikilink embeds
- `%%comments%%` — Obsidian-only comments
- `.canvas` files — not plain Markdown

Inside `vault/`, `[[wikilinks]]` are fine because those files are only opened in Obsidian (creative vault).

---

## Phase 2 Authoring Workflow: Vault → Map

This is the day-to-day workflow for keeping the interactive map preview current
with vault lore entries (active since Phase 2C).

```
1. Edit or create a vault entry
   → vault/Places/*.md, vault/Characters/*.md, vault/Events/*.md, vault/Stories/*.md
   → Use the aligned templates in vault/Templates/
   → Edit in Obsidian (creative vault) or VS Code

2. Run the parser
   → From the repo root in a terminal:
      node scripts/vault-to-json.js
   → Output goes to web/data/generated/

3. Check the output (optional)
   → Inspect web/data/generated/places.json etc. to verify the entry looks right
   → Start VS Code Live Server to preview locally

4. Commit everything together
   → git add vault/  web/data/generated/
   → git commit -m "vault: update [entry name]"

5. Push → GitHub Pages redeploys automatically
   → GitHub Actions deploys web/ to https://alyasska.github.io/World_Engine/
   → The map shows the updated data within ~30 seconds of push
```

**Field contract:** See [docs/OBSIDIAN_DATA_CONTRACT.md](OBSIDIAN_DATA_CONTRACT.md)
for which frontmatter fields are exported to JSON vs vault-only.

**Parser limitations:** The built-in YAML parser handles the patterns used in this
vault. Do not use multi-line block scalars (`|`, `>`), inline flow tables, or YAML
anchors in vault entries. See AD-010 in [docs/ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md).

---

## Quick Reference

```
VS Code:         C:\mirror\мое\world_engine          ← everything
Obsidian #1:     C:\mirror\мое\world_engine          ← project vault (planning)
Obsidian #2:     C:\mirror\мое\world_engine\vault    ← creative vault (lore)
GitHub:          https://github.com/Alyasska/World_Engine
Preview:         https://alyasska.github.io/World_Engine/
Parser:          node scripts/vault-to-json.js
Generated data:  web/data/generated/
```
