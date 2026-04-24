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

## AD-008 — Two-Level Obsidian Architecture
**Date:** 2026-04-24  
**Decision:** Two separate Obsidian vaults pointed at different paths in the same Git repository: the **repo root** (`C:\mirror\мое\world_engine`) as the project-management vault, and `vault/` as the creative worldbuilding vault.  
**Rationale:** Mixing fictional lore with development notes in a single Obsidian graph causes clutter — the CLAUDE.md and MILESTONES.md should not appear in the world knowledge graph next to Characters and Stories. The repo root already contains all project management files (docs/, tracking/, skills/, terminology/). No separate folder is needed. A single `PROJECT_INDEX.md` at root provides Obsidian navigation.  
**Trade-off:** When the project vault is open (repo root), non-Markdown files (web/*.js, web/*.html) appear in Obsidian's file tree but are invisible in graph view and do not interfere. Acceptable.  
**Constraint:** Use standard Markdown links `[text](path)` everywhere in repo-root files so they work in VS Code, GitHub, and both Obsidian contexts. `[[wikilinks]]` are only used inside `vault/` (creative vault), never in docs/, tracking/, or skills/.

---

## AD-010 — Built-in YAML Parser for vault→JSON Script (No External Dependency)
**Date:** 2026-04-24
**Decision:** `scripts/vault-to-json.js` uses a hand-written YAML frontmatter parser instead of `gray-matter` or `js-yaml`.
**Rationale:** The vault YAML uses a small, well-defined subset of YAML: scalar strings, numbers, null, booleans, block arrays (`- item`), and one-level nested objects (`mapRef: {x, y}`). No multi-line block scalars, no anchors, no inline tables. A targeted parser handles these patterns with ~80 lines of readable code and zero installation steps. Adding `gray-matter` would require `npm init` + `npm install`, introducing a `node_modules/` directory and a `package.json` before any other tooling decision has been made. That is premature — the parser decision should follow the broader Phase 2 toolchain decision (AD-011).
**Trade-off:** The built-in parser will fail silently or produce wrong output if future vault entries use YAML features outside its scope. Mitigated by: (a) the parser logs `[skip]` for unparseable files rather than crashing, (b) the contract doc (OBSIDIAN_DATA_CONTRACT.md) defines the allowed patterns, (c) the script writes to `web/data/generated/` not `web/data/` directly — existing live JSON is never touched.
**Known limitations:**
- No multi-line string values (`|` or `>` block scalars)
- No inline flow tables (`{key: value}` on a single line)
- No YAML anchors/aliases
- Inline comments only stripped from unquoted values; quoted string values are safe
**Revisit at:** Phase 2C. When `gray-matter` or `js-yaml` is introduced as part of a broader Node toolchain, replace the built-in parser and document as AD-011.

---

## AD-009 — Static JSON as Phase 1 Data Bridge
**Date:** 2026-04-24  
**Decision:** Hand-authored static JSON files in `web/data/` (places, characters, events, stories) serve as the Phase 1 data layer. No backend, no parser, no database.  
**Rationale:** Proves the correct data shape before building the vault→JSON parser. Fields mirror vault YAML frontmatter exactly (id, type, title, aliases, linkedPlaces, linkedCharacters, linkedEvents, chronology, canonState, mapRefs). Phase 2 script will parse `vault/*.md` and auto-generate these same JSON files.  
**Trade-off:** Manual maintenance during Phase 1. Accepted — Phase 1 has a small, fixed dataset (8 places, 4 characters, 6 events, 3 stories).  
**Revisit at:** Phase 2. When vault entries exceed ~20, manual JSON maintenance becomes unsustainable.
