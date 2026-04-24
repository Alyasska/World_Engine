# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Verify Phase 1 deployment on GitHub Pages**
1. Merge `phase-1-interactive-visual-prototype` → `main` (or push directly after review)
2. Confirm GitHub Actions workflow runs successfully (check Actions tab)
3. Visit `https://alyasska.github.io/World_Engine/` and test:
   - Drag the map to pan ✓
   - Scroll to zoom ✓
   - Click "Vareth" marker → side panel shows detail ✓
   - Click an event in the detail panel → shows event detail ✓
   - Toggle "Political" layer → territory fills disappear ✓
   - Click an era in the chronology bar → other events dim ✓
4. If the page doesn't load, check Settings → Pages → Source = GitHub Actions

---

## Phase 2 Planning Queue

Once Phase 1 is confirmed deployed, the recommended next prompt:

> "Start Phase 2: vault-to-web bridge. Write a Node.js or Python script in `scripts/` that reads Markdown files from `vault/Places/`, `vault/Characters/`, `vault/Events/`, and `vault/Stories/`, parses their YAML frontmatter, and writes to `web/data/*.json` in the same format as the Phase 1 hand-authored JSON. Then create one real vault entry per type (a Place, a Character, an Event, a Story) using the existing templates. Run the script and confirm the web preview shows the new data. Document the script in docs/ARCHITECTURE_DECISIONS.md."

**Pre-work for Phase 2:**
- [ ] Decide: Python (gray-python) vs Node.js for the vault→JSON script (both are viable; Node is consistent with eventual frontend build)
- [ ] Create first real vault entries to test with (use existing templates in `vault/Templates/`)
- [ ] Decide whether to introduce MapLibre at Phase 2 or continue with the SVG approach

---

## Obsidian Setup Queue (Can Do Now)
- [ ] Open `vault/` in Obsidian and install obsidian-git plugin
- [ ] Open `workspace-vault/` in Obsidian as a second vault
- [ ] Install obsidian-open-vscode in both vaults
- [ ] Configure obsidian-git auto-commit interval

---

## Backlog (Phase 2+)

- [ ] Write vault→JSON bridge script (`scripts/vault-to-json.js` or `.py`)
- [ ] Create first real Place entry: `vault/Places/vareth.md`
- [ ] Create first real Character entry: `vault/Characters/aran-voss.md`
- [ ] Create first real Story entry: `vault/Stories/the-first-winter.md`
- [ ] Decide: MapLibre integration in Phase 2 (import after Azgaar JSON export available)
- [ ] Evaluate `vis-timeline` for Phase 3 chronology scrubbing
- [ ] Define fictional calendar/date system (needed before Phase 3 timeline)
- [ ] Add PMTiles consideration for Phase 2 map tile serving (no tile server needed)

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Script language for vault→JSON | Phase 2 | Node.js (consistent) or Python (simpler) |
| MapLibre at Phase 2 or Phase 3 | Phase 2 start | AD-007 says Phase 2; confirm with user |
| Fictional calendar system | Phase 3 timeline | Design before vis-timeline integration |
| Backend hosting provider | Phase 3+ | See `docs/HOSTING_STRATEGY.md` |
