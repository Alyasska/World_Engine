# Lessons from the Old Repo (Alyasska/world_building)

This document captures what went wrong, what went right, and what is worth salvaging from the previous worldbuilding project. Do not copy code from that repo. Use this as a retrospective to inform better decisions here.

---

## What Went Wrong

### 1. Database-First Design
The old project started with designing entity schemas and database tables before any visual output existed. This led to:
- Long early phases with nothing to show
- Schema changes cascading through multiple layers
- Loss of motivation when features felt abstract and invisible
- **Lesson:** Visual confirmation must come first. Build the map before building the schema.

### 2. CRUD App Mindset
The UI was designed around "Add record / Edit record / Delete record" forms. This is a database admin tool, not a worldbuilding system.
- **Lesson:** The interface should be the map and the story, not a form. Data entry should feel like writing, not filling spreadsheets.

### 3. Feature Scope Creep Before Foundation
Early issues included adding features (complex search, tagging systems, export pipelines) before the core loop (map + story + link) was established.
- **Lesson:** Phase 0 and Phase 1 must be ruthlessly minimal. Add complexity only after the core is working and visually confirmed.

### 4. No Agent-Friendly Documentation
The old repo had code but no CLAUDE.md, no AGENTS.md, no architecture decision log. Returning to it after a break required extensive re-orientation.
- **Lesson:** Document decisions as they're made. Agent-friendly structure allows resuming work without re-reading all the code.

### 5. No Milestone-Based Visual Gates
There were no explicit "this phase ends when X is visible in a browser" criteria. Progress felt invisible.
- **Lesson:** Each phase must end with a deployable, visually confirmable artifact.

---

## What Went Right

### 1. Markdown-Centric Lore
The decision to store lore as Markdown files (not only in a database) was correct. Those files are still readable, still useful, and transferred cleanly to this project.
- **Keep:** The YAML frontmatter field design (id, type, title, linkedPlaces, etc.)

### 2. Obsidian Vault Structure
The `vault/` folder organization (Stories, Characters, Places, Events, etc.) was intuitive and functional.
- **Keep:** The same top-level folder structure. Refined with better templates here.

### 3. Open-Source Map Inspiration
Research into Azgaar, MapLibre, and deck.gl was valuable. That research is the basis for `docs/OPEN_SOURCE_REPOS.md` in this project.
- **Keep:** The research conclusions. Start from Phase 1 with Azgaar for procedural generation and MapLibre for the interactive layer.

### 4. The Core Vision Was Right
The idea of map + story + time as a unified system is the correct product vision. It just needed a better build order.
- **Keep:** The vision exactly as described in `docs/FINAL_VISION.md`.

---

## UI Ideas Worth Revisiting (Phase 2+)
These UI patterns from the old repo were good ideas but premature:
- Side panel that shows linked entity cards when a map location is clicked
- Timeline strip at the bottom that scrubs political eras
- Character "route" overlay on the map (dotted line following travel history)
- "Canon state" toggle (show only canonical events, or include drafts/alternatives)

---

## What NOT to Salvage
- Any database migration files or ORM schema definitions
- Any REST API endpoint code
- Any form-based UI components
- Any authentication / session management code
- Any deployment configs tied to a specific hosting provider
