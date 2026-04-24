# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Start Phase 2C — promote generated data and extend the vault**

Phase 2B is complete. The parser works. The next step is: add more vault entries,
run the script, confirm the web preview loads from generated data correctly.

Recommended next prompt:

> "Start Phase 2C on branch `phase-2c-live-data`. Goal: (1) Add vault entries for
> the remaining 7 places, 3 characters, 5 events, and 2 stories that exist in
> web/data/*.json but have no vault source yet. Use the aligned templates from
> Phase 2A. (2) Run `node scripts/vault-to-json.js` — confirm all entries appear
> in web/data/generated/. (3) Switch web/engine.js to load from
> web/data/generated/*.json instead of web/data/*.json. (4) Verify the GitHub
> Pages preview still shows all 8 place markers, all layers, and the chronology
> bar. (5) Document the toolchain decision (Node.js, no framework yet) as AD-011."

**Decisions pending for Phase 2C:**
- [ ] Merge strategy: when the vault entry for a place exists AND a hand-authored JSON entry with the same id exists, which wins? (Recommend: vault wins — it is the authoritative source)
- [ ] Switch timing: promote generated/ → live in the same PR as completing vault entries, or in a separate commit?

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
