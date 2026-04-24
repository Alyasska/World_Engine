# World Engine Vault

This folder is designed to be opened directly as an **Obsidian vault** while remaining fully editable in VS Code.

## How to Open in Obsidian
1. Open Obsidian → vault switcher (bottom-left)
2. Choose "Open folder as vault"
3. Select `C:\mirror\мое\world_engine\vault`

## How to Edit in VS Code
All files here are plain Markdown. Open `C:\mirror\мое\world_engine` in VS Code and navigate to `vault/` in the explorer. Edit any `.md` file directly — no Obsidian required.

## Folder Structure

| Folder | Contents |
|---|---|
| `Stories/` | Long-form narrative documents — the primary writing containers |
| `Characters/` | Named entities with agency: people, creatures, gods |
| `Places/` | Named locations with map references and lore |
| `Events/` | Things that happened: dated, located, with participants |
| `Systems/` | World rules: magic, economy, language, belief |
| `Institutions/` | Organizations: kingdoms, factions, guilds, religions |
| `Lore/` | Background world knowledge, myths, histories |
| `Maps/` | Map snapshots, coordinate notes, reference images |
| `Assets/` | Images, exported files, and other non-Markdown assets |
| `Templates/` | YAML frontmatter templates for each entry type |

## File Naming Convention
- All vault entries: `kebab-case.md`
- Templates: `_template-[type].md` (underscore prefix sorts them to top)
- Assets: descriptive filenames with date prefix if relevant

## YAML Frontmatter
Every vault entry uses YAML frontmatter for structured metadata. This allows future programmatic querying, map linking, and cross-referencing. The body of the file is free-form Markdown prose.

## Recommended Obsidian Plugins
- **obsidian-git** — auto-commits vault changes to Git
- **obsidian-open-vscode** — open current note in VS Code with one click
- **Dataview** (Phase 2+) — query vault entries like a database

## Source of Truth
Git is the source of truth. Both Obsidian and VS Code read from and write to the same files. Sync via `git push` / `git pull` (or obsidian-git auto-sync).
