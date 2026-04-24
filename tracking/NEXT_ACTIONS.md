# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current — update it whenever a task is completed or the priority changes.

---

## Immediate Next Step

**Verify Phase 0 deployment**
1. Check that the GitHub Actions workflow ran successfully after the initial push
2. Visit `https://alyasska.github.io/World_Engine/` and confirm the preview loads
3. In GitHub repo → Settings → Pages → confirm source is set to GitHub Actions
4. If the page doesn't load, check the Actions tab for errors

---

## Phase 1 Planning Queue

Once Phase 0 is verified, the recommended next prompt is:

> "Start Phase 1: embed an interactive fantasy map. Research and decide between Azgaar iframe embed vs MapLibre from scratch. Document the decision in docs/ARCHITECTURE_DECISIONS.md, then implement the chosen approach in web/. The visual confirmation is a zoomable fantasy map visible at the GitHub Pages URL."

**Pre-work for Phase 1:**
- [ ] Decide: Azgaar iframe (faster to Phase 1 visual) vs MapLibre (more flexible, more setup)
- [ ] If MapLibre: Evaluate whether to set up Vite in `web/` or keep plain HTML with a CDN import
- [ ] Source or generate base world GeoJSON (coastlines, major regions)
- [ ] Review `docs/OPEN_SOURCE_REPOS.md` entries for Azgaar and MapLibre

---

## Backlog (Phase 1+)

- [ ] Create first real Place entry in `vault/Places/` for a sample world location
- [ ] Create first real Story entry in `vault/Stories/` as a writing test
- [ ] Set up Obsidian community plugins: obsidian-git, obsidian-open-vscode
- [ ] Evaluate `vis-timeline` vs `gravity-ui/timeline` for the chronology bar (Phase 3)
- [ ] Decide on fictional calendar/date system (needed before timeline UI)
- [ ] Consider PMTiles format for Phase 1 map tile serving (no server needed)

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Azgaar iframe vs MapLibre | Phase 1 start | See `docs/OPEN_SOURCE_REPOS.md` |
| Vite vs CDN import for MapLibre | Phase 1 if MapLibre chosen | Vite = better DX; CDN = faster bootstrap |
| Fictional calendar system | Phase 3 timeline | Needs to be defined before chronology UI |
| Backend hosting provider | Phase 2+ | See `docs/HOSTING_STRATEGY.md` |
