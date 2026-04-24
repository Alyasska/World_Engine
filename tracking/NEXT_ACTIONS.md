# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Start Phase 2B — vault→JSON parser script**

The data contract is aligned (Phase 2A complete). Sample vault entries exist in `vault/Places/`, `vault/Characters/`, `vault/Events/`, `vault/Stories/`. The next step is the script that converts them to JSON.

Recommended next prompt:

> "Start Phase 2B: write a script in `scripts/vault-to-json.js` (Node.js, no external dependencies beyond the built-in `fs` module and a YAML parser) that reads every `.md` file in `vault/Places/`, `vault/Characters/`, `vault/Events/`, and `vault/Stories/`, parses their YAML frontmatter using the field contract in `docs/OBSIDIAN_DATA_CONTRACT.md`, and writes to `web/data/places.json`, `web/data/characters.json`, `web/data/events.json`, `web/data/stories.json`. Skip entries where `canonState: retired`. Merge output with any existing entries that have no vault source. Document the script choice in `docs/ARCHITECTURE_DECISIONS.md` as AD-010."

**Pre-work / decisions pending:**
- [ ] Confirm: Node.js for the parser (consistent with project; `gray-matter` is the standard YAML+MD parser — check license before importing)
- [ ] Decide: Should the script **merge** existing hand-authored JSON with vault-generated entries, or **replace** entirely? (Recommend: replace entries by `id`, keep hand-authored ones with no vault source)

---

## Obsidian Setup Queue (Can Do Anytime)
- [ ] Open `vault/` in Obsidian as the creative worldbuilding vault
- [ ] Open repo root in Obsidian as the project-management vault
- [ ] Install `obsidian-git` plugin in both vaults
- [ ] Install `obsidian-open-vscode` to jump from vault note → VS Code
- [ ] Configure obsidian-git auto-commit interval

---

## Backlog (Phase 2B+)

- [ ] Write vault→JSON bridge script (`scripts/vault-to-json.js`) — **Phase 2B**
- [ ] Decide: MapLibre at Phase 2C or continue SVG — document in AD-011
- [ ] Add vault→marker link: clicking a map marker opens the vault `.md` file
- [ ] Evaluate `vis-timeline` for Phase 3 chronology scrubbing
- [ ] Define fictional calendar/date system (needed before Phase 3 timeline)
- [ ] Add PMTiles consideration for Phase 2C map tile serving

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Script language for vault→JSON | Phase 2 | Node.js (consistent) or Python (simpler) |
| MapLibre at Phase 2 or Phase 3 | Phase 2 start | AD-007 says Phase 2; confirm with user |
| Fictional calendar system | Phase 3 timeline | Design before vis-timeline integration |
| Backend hosting provider | Phase 3+ | See `docs/HOSTING_STRATEGY.md` |
