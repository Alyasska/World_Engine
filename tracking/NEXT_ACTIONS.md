# Next Actions

*Reevaluated 2026-04-25 after Phase 4A–4B completion.*  
Keep this file current. The single most important action is always listed first.

---

## 1. Immediate Next Action

**[CONTENT] Phase 4C — Post-Collapse Content Seed**

The era scrubber — the project's signature interactive feature — visits Post-Collapse and shows nothing. All 6 vault events are Age of Founding or Long Wars. Zero Post-Collapse events exist.

Add 2–3 Post-Collapse vault events. No code change required. The CI pipeline will auto-publish them.

**Minimum to make the era feel alive:**
- Create `vault/Events/` entries with `era: post-collapse`
- Set `chronoPosition` in the 0.72–1.0 range
- Link each event to at least one existing place via `linkedPlaces`
- Update the corresponding place's `linkedEvents` list

**Branch:** `phase-4c-post-collapse-content`  
**Visual confirmation:** Drag cursor to Post-Collapse on GitHub Pages → event dots appear in the post-collapse zone → at least one place marker glows (era-active).

---

## 2. Next 3 Safe Actions

### [ENGINEERING] Phase 4D — Character and Story Detail Panels

**Priority:** High — this is the most visible UX gap.

Characters and stories appear as list items in place detail panels but clicking them does nothing. `engine.js` renders them with no click listeners.

- Add `showCharacterDetail(charId)` — description, role, faction, traits, arc, linked places/events/stories
- Add `showStoryDetail(storyId)` — logline, description, era, linked events/characters/places (primary place clickable → selects marker on map)
- Add click listeners in `showPlaceDetail` for `[data-char-id]` and `[data-story-id]` items
- Back navigation: ← returns to the place panel that linked here

Files: `web/engine.js` only (plus minor `web/style.css` if needed).  
No schema change. No new dependencies. No parser change.

**Branch:** `phase-4d-character-story-panels`

---

### [ENGINEERING] Phase 4E — Empty Era State Feedback

**Priority:** Medium — small fix, high clarity value.

When the cursor is in an era with no events, all markers return to neutral silently. Users may think the feature is broken. A one-line contextual message resolves this.

- Detect zero-event eras in `applyNarrativeFilter` or `applyEra`
- Show a subtle "No events recorded in this era" message (in era display, welcome panel, or chronology hint)
- Remove the message when cursor moves to a populated era

Files: `web/engine.js`, `web/style.css` (small).  
No data contract change. No new JSON fields.

**Branch:** `phase-4e-empty-era-feedback`

---

### [CONTENT] Promote Draft Vault Entries

**Priority:** Medium — content quality, no code needed.

Current draft entities:
- `place-veiled-shore` (draft)
- `char-the-wanderer` (draft)
- `event-fall-of-grey-keep` (draft)
- All 3 stories (`story-merchant-roads`, `story-the-first-winter`, `story-the-silence-after`) are draft

Review and promote to `canon` those that are lore-stable. Update cross-references and descriptions as needed. Stories especially benefit from promotion — the story detail panel (Phase 4D) will render them prominently.

No code change. CI validates and publishes automatically.

---

## 3. Deferred Actions

These are valid future phases but should not start until the immediate items above are done.

| Phase | Description | Why deferred |
|---|---|---|
| Phase 4F | Story path layer (data-driven SVG paths from linkedPlaces) | Depends on 4D being complete; currently 1 hardcoded path in index.html, acceptable for now |
| Phase 5A | Chronology depth — era dates, in-world calendar, event count per era | Needs content (4C) and calendar design before implementation |
| Phase 5B | Data-driven era map overlays (replace CSS-hardcoded territory rules) | Needs era metadata design (5A) first |

---

## 4. Do Not Start Yet

| Item | Reason |
|---|---|
| Phase 6 — MapLibre + Azgaar | Major infrastructure change; hand-crafted SVG is fine until 20+ places exist; see AD-007 |
| Backend / API server | Not needed; GitHub Pages is sufficient |
| Database | Vault Markdown is the data store |
| npm dependencies in `scripts/` | Prohibited by AD-010 until a broader toolchain decision is made |
| React / Next.js / SvelteKit | No framework. Vanilla JS is sufficient and keeps GitHub Pages compatible |
| Prisma / ORM | No database means no ORM |
| Breaking changes to data contract | Do not add new required fields to vault templates without a migration plan |

---

## 5. Manual Verification Checklist

Run this before treating any phase as complete:

- [ ] `node scripts/validate-vault.js` exits 0
- [ ] `node scripts/vault-to-json.js` runs without `[skip]` warnings for active (non-retired) entries
- [ ] All 8 place markers visible on the map at `https://alyasska.github.io/World_Engine/`
- [ ] Chronology cursor draggable; all three era zones functional
- [ ] Era-aware marker emphasis and political overlays working for Age of Founding and Long Wars
- [ ] Post-Collapse: markers return to neutral (or glow once 4C content exists)
- [ ] Clicking a place marker opens detail panel with description, linked entities
- [ ] Clicking an event in detail panel opens event detail
- [ ] Layer toggles (Geography / Political / Narrative / Chronology) all functional
- [ ] `?author=1` shows VS Code links; normal URL shows none
- [ ] GitHub Actions: `Parse Vault Data` runs after vault push; `Deploy to GitHub Pages` follows

---

## 6. Branch Naming Plan

| Phase | Branch name |
|---|---|
| 4C (content) | `phase-4c-post-collapse-content` |
| 4D (char/story panels) | `phase-4d-character-story-panels` |
| 4E (empty era feedback) | `phase-4e-empty-era-feedback` |
| 4F (story path layer) | `phase-4f-story-path-layer` |
| 5A (chronology depth) | `phase-5a-chronology-depth` |
| 5B (data-driven overlays) | `phase-5b-data-driven-overlays` |
| 6 (MapLibre) | `phase-6-maplibre-azgaar` |

---

## CI Workflow Reference

| File | `.github/workflows/parse-vault.yml` |
|---|---|
| Trigger | Push to `main` touching `vault/**`, `scripts/vault-to-json.js`, or `scripts/validate-vault.js`; also `workflow_dispatch` |
| Step 1 | `node scripts/validate-vault.js` — blocks on schema/cross-ref error |
| Step 2 | `node scripts/vault-to-json.js` — only runs if validation passes |
| Step 3 | Commits `web/data/generated/` back to `main` only if JSON changed |
| Bot identity | `github-actions[bot]` |
| Required setting | Settings → Actions → General → Workflow permissions → Read and write |
