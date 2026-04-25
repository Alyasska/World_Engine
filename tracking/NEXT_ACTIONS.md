# Next Actions

The single most important thing to do next, plus a short queue. Keep this file current.

---

## Immediate Next Step

**Phase 4A is complete. Verify the CI workflow on GitHub.**

Before treating 4A as done, confirm the Actions workflow actually runs:

1. Go to `https://github.com/Alyasska/World_Engine/settings/actions`
2. Under **Workflow permissions**, confirm **Read and write permissions** is selected.
   (Without this, the `git push` in the workflow will fail with a 403.)
3. Edit any vault Markdown file (e.g. add a sentence to a `description` field).
4. Commit and push to `main`.
5. On GitHub → Actions tab: confirm `Parse Vault Data` runs.
6. Confirm a `chore: regenerate vault JSON` commit appears.
7. Confirm `Deploy to GitHub Pages` triggers from that commit.
8. Confirm the live preview at `https://alyasska.github.io/World_Engine/` reflects the change.

---

## Recommended Next Steps (Phase 4+)

> **Option A — Post-Collapse vault content:**
> Add vault events for the Post-Collapse era. No code change required.
> Existing CI will auto-publish them. Era markers will glow on Post-Collapse.

> **Option B — Story marker layer (Phase 4B):**
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
| What it does | Runs parser, commits `web/data/generated/` only if changed |
| Bot identity | `github-actions[bot]` |
| Required GitHub setting | Workflow permissions → Read and write |

---

## Backlog

- [ ] Post-Collapse vault events (worldbuilding, no code)
- [ ] Story marker layer — Phase 4B
- [ ] Fictional calendar/date system
- [ ] MapLibre + Azgaar integration — Phase 4 major
- [ ] Add Dataview queries to creative vault
- [ ] Character detail panels (no panel exists yet for characters)

---

## Decisions Pending

| Decision | Blocking | Notes |
|---|---|---|
| Fictional calendar system | Phase 4B+ | Design before timeline scrubbing |
| MapLibre integration | Phase 4 major | See AD-007; deferred from Phase 2 |
| Character detail panel | Phase 4B | Currently characters only appear in place detail |
