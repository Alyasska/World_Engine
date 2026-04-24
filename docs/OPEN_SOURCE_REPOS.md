# Open-Source Repository Candidates

Research log for libraries and tools considered for World Engine. Every candidate must be documented here before being imported. Include integration risk and a clear recommendation.

---

## 1. Azgaar/Fantasy-Map-Generator

**Repo:** https://github.com/Azgaar/Fantasy-Map-Generator  
**Purpose:** Browser-based procedural fantasy map generator with voronoi-based geography, biomes, cultures, religions, burgs, states, and rivers. Exports to SVG and JSON.  
**Possible Role:** Primary source of the base world map. Generate the world once (or iteratively), export SVG + JSON, then use that data as the foundation for the World Engine map layer.  
**License:** MIT ✅ (verify before import — has been MIT historically)  
**Status:** Actively maintained as of 2024. Large community.  
**Integration Risk:** Medium. FMG is a standalone SPA. Integration options:
  - Use it as an external tool, import its JSON export into World Engine (lowest risk)
  - Iframe embed of a self-hosted FMG instance (medium risk, works for Phase 1)
  - Fork and modify source (high risk, maintenance burden — avoid)  
**Recommendation:** **Reference only for now. Phase 1: embed via iframe or import JSON export.** Do not fork.

---

## 2. maplibre/maplibre-gl-js

**Repo:** https://github.com/maplibre/maplibre-gl-js  
**Purpose:** Open-source fork of Mapbox GL JS. Renders vector tile maps in the browser using WebGL. Supports custom layers, geojson sources, expressions, and camera controls.  
**Possible Role:** The interactive map rendering engine for Phase 1+. Renders the world geography exported from Azgaar (or custom GeoJSON) as an interactive, zoomable, clickable map.  
**License:** BSD-3-Clause ✅  
**Status:** Actively maintained by a foundation. Production-ready.  
**Integration Risk:** Low-Medium. Well-documented API. Requires a tile source or GeoJSON data. Phase 1 can start with static GeoJSON (no tile server needed).  
**Recommendation:** **Dependency for Phase 1.** Import when interactive map work begins.

---

## 3. visgl/deck.gl

**Repo:** https://github.com/visgl/deck.gl  
**Purpose:** WebGL-powered visualization framework for large-scale geospatial data. Supports hundreds of layer types: scatter, arc, hexagon, trips (animated), icon, text, etc.  
**Possible Role:** Advanced visual overlays on top of MapLibre — e.g., character route animations, heat maps of story density, animated political spread across time.  
**License:** MIT ✅  
**Status:** Actively maintained by vis.gl / Linux Foundation. Used in production by major companies.  
**Integration Risk:** Medium-High for Phase 1. deck.gl + MapLibre integration is well-documented but adds complexity. Not needed until animated/layered overlays are required.  
**Recommendation:** **Do not use yet. Phase 2-3 candidate.** Research integration with MapLibre when animated overlays become the next feature.

---

## 4. gravity-ui/timeline (or similar chronology UI)

**Repo:** https://github.com/gravity-ui/timeline  
**Purpose:** Timeline/Gantt-style UI component for visualizing events across a time axis.  
**Possible Role:** The 4D chronology bar — a scrubable time axis at the bottom of the map view showing story events, political eras, and character lifespans.  
**License:** MIT ✅ (verify)  
**Status:** Check current maintenance status before use.  
**Integration Risk:** Medium. Will need adaptation to use a fictional calendar (not Gregorian dates). The fictional time system needs a custom date type.  
**Alternatives to consider:** `vis-timeline` (widely used, MIT), custom canvas-based timeline (most flexible, most work).  
**Recommendation:** **Research phase. Do not import yet.** Evaluate vis-timeline vs gravity-ui/timeline vs custom when Phase 3 begins.

---

## 5. Vinzent03/obsidian-git

**Repo:** https://github.com/Denolehov/obsidian-git (current maintainer: Vinzent03)  
**Purpose:** Obsidian plugin that auto-commits and syncs the vault to a Git remote on a schedule. Supports push/pull, commit on file save, and conflict resolution.  
**Possible Role:** Keeps the `vault/` automatically synced to GitHub without requiring the user to run `git push` manually after writing.  
**License:** MIT ✅  
**Status:** Actively maintained, most popular Obsidian sync plugin.  
**Integration Risk:** Low. Install as Obsidian community plugin. Configure to auto-commit on interval (e.g., every 10 minutes). Does not affect the non-vault parts of the repo.  
**Recommendation:** **Install as Obsidian plugin (not a code dependency). See `docs/OBSIDIAN_VSCODE_WORKFLOW.md` for setup.** No code import needed.

---

## 6. NomarCub/obsidian-open-vscode

**Repo:** https://github.com/NomarCub/obsidian-open-vscode  
**Purpose:** Obsidian plugin that adds a ribbon button and command to open the current note (or vault root) in VS Code.  
**Possible Role:** Smooth the Obsidian ↔ VS Code workflow. When writing in Obsidian, one click opens the same file in VS Code for code-adjacent editing (e.g., editing a Place that has a linked script).  
**License:** MIT ✅  
**Status:** Maintained. Simple plugin, low churn risk.  
**Integration Risk:** Very low. Pure UI enhancement.  
**Recommendation:** **Install as Obsidian plugin. No code dependency.** Nice-to-have, not required.

---

## Evaluation Template (for future candidates)

```markdown
## N. author/repo-name

**Repo:** https://github.com/...
**Purpose:** What it does.
**Possible Role:** How it fits in World Engine.
**License:** X ✅/⚠️ (verify date)
**Status:** Maintenance status.
**Integration Risk:** Low / Medium / High — explanation.
**Recommendation:** reference only | dependency later | possible adapter | do not use yet
```
