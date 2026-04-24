# Architecture Decisions

This document records every significant technical decision made in this project, with rationale. Update this file before adding any dependency or making a structural change.

---

## AD-001 — Static HTML/CSS for Phase 0 Preview
**Date:** 2026-04-24  
**Decision:** Use plain HTML + CSS (no framework, no build step) for `web/index.html`  
**Rationale:** Phase 0 needs a deployable visual confirmation as quickly as possible. No build pipeline, no Node.js toolchain, no CI complexity. Pure static files work with GitHub Pages out of the box.  
**Trade-off:** Not scalable beyond Phase 0. Phase 1 will migrate to a proper frontend toolchain (likely Vite + React or SvelteKit).  
**Revisit at:** Phase 1, when an interactive map library (MapLibre) is introduced.

---

## AD-002 — Vault as Plain Markdown with YAML Frontmatter
**Date:** 2026-04-24  
**Decision:** All lore, story, and world data stored as `.md` files with YAML frontmatter. No SQLite, no JSON database, no custom binary format.  
**Rationale:** Plain Markdown is human-readable, Git-diff-able, Obsidian-compatible, and exportable to any future system. Avoids the database-first mistake from the old repo.  
**Trade-off:** Querying and aggregating across many entries requires a build step or parser. Acceptable until Phase 2.  
**Revisit at:** Phase 2, when map↔vault links require programmatic querying.

---

## AD-003 — Obsidian as Writing Layer Only (Not Storage Authority)
**Date:** 2026-04-24  
**Decision:** Obsidian opens `vault/` as a vault but is not the source of truth. Git is.  
**Rationale:** Obsidian is a local app that may or may not be installed. The files must be readable and editable in VS Code without Obsidian. Obsidian adds navigational and graph features but does not own the data.  
**Trade-off:** Some Obsidian-specific features (canvas, dataview queries) may not render in VS Code.  
**Constraint:** Do not use Obsidian-specific syntax (like `%%comments%%` or `![[embed]]`) in files that need to be processed programmatically.

---

## AD-004 — GitHub Pages from `web/` Directory
**Date:** 2026-04-24  
**Decision:** GitHub Pages is served from the `web/` folder on the `main` branch (or via Actions workflow deploying to `gh-pages` branch).  
**Rationale:** Keeps the preview always deployable without a build server. The `web/` folder is self-contained static content.  
**Trade-off:** When Phase 1 introduces a frontend build (Vite), the Actions workflow will need to build first and then deploy the `dist/` output. Document that change in this file.  
**Action required:** In GitHub repo Settings → Pages → set source to GitHub Actions (for Actions-based deploy) or `main / web/` folder.

---

## AD-005 — No Backend / No Database Until Phase 2
**Date:** 2026-04-24  
**Decision:** No server, no database (SQLite, PostgreSQL, etc.) until Phase 2 is explicitly started.  
**Rationale:** The old repo (`Alyasska/world_building`) started with database schema design and never reached a working visual product. This project reverses that: visual proof first, data layer second.  
**Trade-off:** Some features (real-time search, cross-entry queries) will be limited until Phase 2.

---

## AD-006 — Lego Assembly Over Ground-Up Build
**Date:** 2026-04-24  
**Decision:** Prefer integrating existing open-source tools over building equivalent functionality from scratch.  
**Rationale:** Azgaar's Fantasy Map Generator took years to build. MapLibre is maintained by a large community. Building replacements wastes time and produces inferior results.  
**Protocol:** All candidates documented in `docs/OPEN_SOURCE_REPOS.md` before any import. License must be verified. Integration risk must be assessed.  
**Trade-off:** Dependency on external projects. Mitigated by preferring MIT/Apache-licensed tools and wrapping them in thin adapter layers.

---

## AD-007 — Vanilla JS + Static SVG for Phase 1 Interaction Model
**Date:** 2026-04-24  
**Decision:** Phase 1 uses vanilla JS + hand-crafted SVG + static JSON. No MapLibre, no Vite, no npm dependencies.  
**Rationale:** The goal of Phase 1 is to prove the interaction model (pan/zoom, clickable markers, detail panel, layer toggles, chronology bar) before committing to a specific map engine. MapLibre requires GeoJSON/tile data and a bundler — adding those before the interaction model is validated increases risk without benefit. If the interaction model is wrong, we haven't invested in MapLibre integration. If it's right, porting to MapLibre is a clean, well-scoped Phase 2 task.  
**Trade-off:** The SVG world is hand-crafted, not procedurally generated. Cities are at approximate positions. Phase 2 will replace this with Azgaar-exported GeoJSON + MapLibre rendering.  
**Revisit at:** Phase 2, when real geographic data (Azgaar JSON export) is available and MapLibre integration is the clear next step.

---

## AD-008 — Two-Vault Obsidian Architecture
**Date:** 2026-04-24  
**Decision:** Maintain two separate Obsidian vaults in the same Git repository: `vault/` for creative worldbuilding content, `workspace-vault/` for software project management.  
**Rationale:** Mixing fictional lore with development notes in a single Obsidian graph causes clutter: the agent handoff note should not appear next to "Chapter 3 of The First Winter." Different mental contexts require different tools. Independent commits: a lore writing session should not pollute the development commit history.  
**Trade-off:** Two Obsidian windows to open instead of one. Documented in `docs/OBSIDIAN_VSCODE_WORKFLOW.md` with setup instructions for both.  
**Constraint:** `workspace-vault/` uses Obsidian `[[wikilinks]]` only for internal cross-references within that vault. Links to project files outside the vault use standard Markdown links.

---

## AD-009 — Static JSON as Phase 1 Data Bridge
**Date:** 2026-04-24  
**Decision:** Hand-authored static JSON files in `web/data/` (places, characters, events, stories) serve as the Phase 1 data layer. No backend, no parser, no database.  
**Rationale:** Proves the correct data shape before building the vault→JSON parser. Fields mirror vault YAML frontmatter exactly (id, type, title, aliases, linkedPlaces, linkedCharacters, linkedEvents, chronology, canonState, mapRefs). Phase 2 script will parse `vault/*.md` and auto-generate these same JSON files.  
**Trade-off:** Manual maintenance during Phase 1. Accepted — Phase 1 has a small, fixed dataset (8 places, 4 characters, 6 events, 3 stories).  
**Revisit at:** Phase 2. When vault entries exceed ~20, manual JSON maintenance becomes unsustainable.
