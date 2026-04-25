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

## AD-014 — GitHub Actions Auto-Parser for Vault-Generated JSON
**Date:** 2026-04-25
**Decision:** A GitHub Actions workflow (`.github/workflows/parse-vault.yml`) runs `node scripts/vault-to-json.js` automatically when vault Markdown or the parser script changes on `main`. If the generated JSON differs, the workflow commits only `web/data/generated/` back to `main` using the `github-actions[bot]` identity.

**Rationale:** The manual step — "run `node scripts/vault-to-json.js` then commit generated JSON" — was the only remaining friction in the Obsidian → publish loop. Automating it means a vault author can edit Markdown in Obsidian, push, and see the map update on GitHub Pages without any terminal work. The existing `deploy-pages.yml` already triggers on every push to `main`, so the bot commit triggers an automatic Pages redeploy.

**Design choices:**
- Trigger path filters (`vault/**`, `scripts/vault-to-json.js`) prevent the workflow from running on unrelated pushes (e.g. docs, tracking files, web/ changes)
- `git diff --quiet -- web/data/generated` skips the commit if nothing changed (idempotent)
- Only `web/data/generated/` is committed — vault files and other changed files are never touched by the bot
- `permissions: contents: write` is the minimum required; all other permissions default to `none`
- No `npm install` step — `vault-to-json.js` has no external dependencies (AD-010)

**Trade-off:** The bot commit to `main` triggers `deploy-pages.yml` for a second time (first for the vault push, second for the bot commit). This costs one extra Pages build per vault change. Acceptable at this scale.

**Constraint:** For the `git push` to succeed, the repository's default branch protection must not require pull requests for pushes. If branch protection is later added, the workflow will need a Personal Access Token or a GitHub App token with bypass permission.

**Revisit at:** If branch protection rules are enabled on `main`, or if the vault grows large enough that per-push CI costs become a concern.

---

## AD-015 — Vault Validation Before Generated JSON Publishing
**Date:** 2026-04-25
**Decision:** A validation script (`scripts/validate-vault.js`) runs as a required CI step before the parser (`vault-to-json.js`). If any vault entity fails validation, the workflow exits 1 and no generated JSON is committed.

**Checks enforced:**
1. Required fields: `id`, `type`, `title`, `canonState` on every entity
2. No duplicate `id` values across all vault folders
3. `type` must be one of: `place`, `character`, `event`, `story`
4. `id` prefix must match folder type (`place-*`, `char-*`, `event-*`, `story-*`)
5. Declared `type` must match the folder the file lives in
6. Cross-reference integrity: every value in `linkedPlaces`, `linkedCharacters`, `linkedEvents`, `linkedStories` must resolve to a known vault `id`
7. Event `era` must be one of: `age-founding`, `long-wars`, `post-collapse`
8. `canonState` must be one of: `canon`, `draft`, `alt`, `legend`, `retired`

**Rationale:** Phase 4A automated the parser, but an automated parser that publishes broken cross-references or invalid era tags silently is worse than no automation. The validator is the gate: broken vault → CI fails → no bad JSON reaches GitHub Pages.

**Design choices:**
- Same frontmatter parser as `vault-to-json.js` (AD-010) — no new dependency, no divergence
- Three-pass structure: collect, validate structure, validate cross-references. Cross-reference pass requires all IDs collected first.
- CRLF normalization (`\r\n` → `\n`) applied at read time so the validator works on Windows locally and Linux CI identically. The parser skips this because it is only ever run in CI (Linux, LF endings from git checkout).
- Template files (leading `_`) excluded from validation — they are scaffolding, not entities.
- Empty reference arrays (`linkedPlaces: []`) are valid and not checked.
- `retired` entities are included in the ID registry so references to them pass cross-reference checks.

**Trade-off:** Validation runs on every vault push, adding ~1s to CI. Acceptable. If the vault grows to hundreds of entries, the three-pass scan is still O(n) and remains fast.

**Revisit at:** If new entity types are added (`institution`, `lore`), update `SOURCES` and `ID_PREFIX` in both `validate-vault.js` and `vault-to-json.js`.

---

## AD-013 — ?author=1 Query Parameter for Local Authoring Mode
**Date:** 2026-04-25
**Decision:** Local-only features (e.g. `vscode://file/` links to the Obsidian vault) are gated behind a `?author=1` query parameter in the URL. Public GitHub Pages users never see them.

**Rationale:** The preview is deployed publicly on GitHub Pages. Hardcoded local filesystem paths (`C:/mirror/мое/world_engine/...`) must not appear in the public UI — they are meaningless to anyone else and look like a bug. A query-parameter gate is the simplest mechanism that:
1. Requires zero server-side logic (works with static hosting)
2. Leaves the public URL completely clean
3. Is discoverable to the author via documentation
4. Does not pollute the URL for normal use

**Convention established:**
- `isAuthorMode()` checks `new URLSearchParams(window.location.search).get('author') === '1'`
- `VAULT_ROOT` constant defines the local repo root — used only when `isAuthorMode()` returns true
- Any future local-dev-only feature follows the same gate

**Trade-off:** The `?author=1` URL is not secret — anyone who finds it would see VS Code links that silently fail on their machine. This is acceptable; the links are harmless on non-matching machines (browser opens a `vscode://` URI which either no-ops or shows a system "open VS Code?" prompt).

**Revisit at:** Phase 4, if a broader author dashboard (multiple local settings) is needed. Consider `?author=1&vault=...` extension or a local `author.config.json` that is `.gitignore`d.

---

## AD-012 — Vanilla JS Drag for Phase 3A Chronology (vis-timeline Evaluated and Rejected)
**Date:** 2026-04-24
**Decision:** Phase 3A draggable chronology cursor is implemented with vanilla JS + CSS. vis-timeline was evaluated and rejected.

**vis-timeline evaluation:**
- Repo: `visjs/vis-timeline` (MIT license ✓)
- Bundle: ~300 KB minified (~100 KB gzip) — significant for one scrub bar
- API surface: designed for multi-track timelines with item groups, item rendering, and complex event models; requires a build step or CDN import
- The Phase 3A requirement is a single draggable cursor over 3 era bands — `mousedown`/`mousemove`/`mouseup` + touch equivalents + clamped fraction math + CSS transitions. This is ~40 lines of JS and ~25 lines of CSS.

**Rationale:** vis-timeline solves a harder problem than Phase 3A requires. Adding it now would introduce a significant dependency for a feature that vanilla JS handles cleanly at a fraction of the complexity. The custom cursor is extensible to Phase 3B territory fills without library lock-in.

**Trade-off:** A multi-track item timeline (e.g., overlapping story arcs rendered as bars) would be significantly harder to build in vanilla JS. If Phase 3B or Phase 4 requires that kind of timeline, revisit vis-timeline then.

**Revisit at:** Phase 3B, if multi-item timeline rendering over eras is required.

---

## AD-011 — Web Engine Loads from Generated Vault Data
**Date:** 2026-04-24
**Decision:** `web/engine.js` now fetches from `web/data/generated/*.json` (vault-generated) instead of `web/data/*.json` (hand-authored). The hand-authored files are retained as `web/data/*.json` for reference but are no longer served by the live preview.
**Rationale:** Phase 2C completes the end-to-end pipeline: vault Markdown → `scripts/vault-to-json.js` → `web/data/generated/` → GitHub Pages. All 8 places, 4 characters, 6 events, and 3 stories now have vault `.md` sources that produce equivalent JSON output. Switching to generated data proves the pipeline works at full dataset scale and makes vault editing the authoritative authoring workflow going forward.
**Trade-off:** Generated JSON is only as current as the last parser run. If a vault entry is edited without running the script, the preview is stale. Mitigated by: (a) single-command update (`node scripts/vault-to-json.js`), (b) generated JSON is committed to Git alongside vault changes so the deploy is always consistent. A future Phase 3 option: GitHub Action that runs the parser automatically on vault file changes.
**Hand-authored JSON retention:** `web/data/places.json`, `characters.json`, `events.json`, `stories.json` remain on disk as legacy reference and emergency fallback. They are not deleted. To revert to hand-authored data, change the four `fetch` paths in `engine.js` from `./data/generated/X.json` back to `./data/X.json`.
**Revisit at:** Phase 3, if automated pipeline (CI runs parser) or MapLibre integration changes the data serving approach.

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
