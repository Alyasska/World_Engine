# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 4B is complete. CI pipeline now validates vault data before publishing.**

The `Parse Vault Data` workflow now runs `validate-vault.js` before `vault-to-json.js`.
A vault push with broken IDs, invalid eras, bad cross-references, or missing required
fields will fail CI before any JSON is committed.

To verify: introduce a deliberate error (e.g. a `linkedPlaces` pointing to a nonexistent ID),
push, and confirm the workflow fails at the "Validate vault data" step with a clear error message.

---

## Recommended Next Steps (Phase 4+)

> **Option A — Post-Collapse vault content:**
> Add vault events for the Post-Collapse era. No code change required.
> Existing CI will auto-publish them. Era markers will glow on Post-Collapse.

> **Option B — Story marker layer (Phase 4C):**
> Render story-linked places as a distinct map layer. Read `stories.json` in
> `renderMarkers()`, add a "story" marker shape, open a story detail panel on click.

> **Option C — Fictional calendar system:**
> Define a canonical in-world calendar (year numbering, era epochs).
> Needed before story events can be positioned precisely on the timeline.

> **Option D — MapLibre + Azgaar (Phase 4 major):**
> Replace the hand-crafted SVG world map with a proper tile-based map using
> MapLibre GL JS + Azgaar Fantasy Map Generator export. See AD-007.

---

## CI Workflow Reference

| File | `.github/workflows/parse-vault.yml` |
|---|---|
| Trigger | Push to `main` touching `vault/**` or `scripts/vault-to-json.js`; also `workflow_dispatch` |
| Step 1 | `node scripts/validate-vault.js` — blocks on any schema/cross-ref error |
| Step 2 | `node scripts/vault-to-json.js` — only runs if validation passes |
| Step 3 | Commits `web/data/generated/` back to `main` only if JSON changed |
| Bot identity | `github-actions[bot]` |
| Required GitHub setting | Workflow permissions → Read and write |

---

## Backlog

- [ ] Post-Collapse vault events (worldbuilding, no code)
- [ ] Story marker layer — Phase 4C
- [ ] Fictional calendar/date system
- [ ] MapLibre + Azgaar integration — Phase 4 major
- [ ] Add Dataview queries to creative vault
- [ ] Character detail panels (no panel exists yet for characters)

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Fictional calendar system | Phase 4C+ | Design before timeline scrubbing |
| MapLibre integration | Phase 4 major | See AD-007; deferred from Phase 2 |
| Character detail panel | Phase 4C | Currently characters only appear in place detail |
