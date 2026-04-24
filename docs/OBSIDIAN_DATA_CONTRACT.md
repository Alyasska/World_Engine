# Obsidian Data Contract

**Phase:** 2A alignment (static JSON ↔ vault templates)
**Last updated:** 2026-04-24

---

## Purpose

The vault and the web engine share a data model. This document defines the canonical field names for each entity type so that:

1. Hand-authored JSON in `web/data/` uses the same names as vault frontmatter
2. A future parser script (Phase 2B) can convert vault `.md` frontmatter directly to JSON with no field renaming

The vault is authoritative for lore content. The JSON is authoritative for what the web engine renders. This document is the bridge.

---

## Pipeline (current and target)

```
Phase 1 (now):   vault/  ──(manual)──►  web/data/*.json  ──►  engine.js
Phase 2B (next): vault/  ──(script)──►  web/data/*.json  ──►  engine.js
```

Until the parser exists, JSON files must be kept in sync by hand. The contract ensures alignment is possible when the script is built.

---

## Canonical Field Contract

### All types share these core fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | slug, e.g. `place-vareth`, `char-aran-voss` |
| `type` | string | `place` \| `character` \| `event` \| `story` |
| `title` | string | Display name |
| `aliases` | string[] | Alternate names, titles, era names |
| `canonState` | string | `canon` \| `draft` \| `alt` \| `legend` \| `retired` |

---

### Place

| Vault frontmatter | JSON field | Notes |
|---|---|---|
| `placeType` | `placeType` | `city \| town \| village \| fortress \| ruins \| landmark \| wilderness` |
| `region` | `region` | parent region slug |
| `faction` | `faction` | controlling faction slug (null if none) |
| `layer` | `layer` | `geography \| political \| narrative` — controls SVG layer in engine |
| `mapRef.x` | `mapRef.x` | SVG pixel X for Phase 1 map |
| `mapRef.y` | `mapRef.y` | SVG pixel Y for Phase 1 map |
| `mapRef.cellId` | *(reserved)* | Azgaar cell ID for Phase 2+ — not used in Phase 1 JSON |
| `description` | `description` | One-paragraph summary for web detail panel |
| `linkedCharacters` | `linkedCharacters` | Character slugs associated with this place |
| `linkedEvents` | `linkedEvents` | Event slugs that occurred here |
| `linkedStories` | `linkedStories` | Story slugs set here |

**Vault-only fields** (rich detail, not parsed to JSON in Phase 1):
`size`, `population`, `culture`, `foundingDate`, `historicalFactions`, `linkedLore`, `linkedPlaces`, `sourceStatus`, `notes`

**JSON-only fields** (computed or rendered, not stored in vault):
`chronology` object (derived from `foundingDate` + linked events)

---

### Character

| Vault frontmatter | JSON field | Notes |
|---|---|---|
| `role` | `role` | `protagonist \| antagonist \| supporting \| background` |
| `faction` | `faction` | primary faction slug (null if none) |
| `species` | `species` | |
| `birthPlace` | `birthPlace` | Place slug |
| `currentPlace` | `currentPlace` | Place slug |
| `traits` | `traits` | 3–5 trait strings |
| `arc` | `arc` | One-sentence character arc |
| `description` | `description` | One-paragraph summary for web detail panel |
| `linkedPlaces` | `linkedPlaces` | Significant places in their story |
| `linkedEvents` | `linkedEvents` | Events they participated in |
| `linkedStories` | `linkedStories` | Stories they appear in |

**Vault-only fields**: `birthDate`, `deathDate`, `gender`, `abilities`, `flaws`, `allegiances`, `linkedCharacters`, `linkedLore`, `sourceStatus`, `notes`

---

### Event

| Vault frontmatter | JSON field | Notes |
|---|---|---|
| `era` | `era` | era slug, e.g. `age-founding`, `long-wars` |
| `date` | `date` | human-readable, e.g. `"Year 44, Age of Founding"` |
| `chronoPosition` | `chronoPosition` | float 0.0–1.0, position on chronology bar |
| `eventType` | `eventType` | `battle \| founding \| collapse \| discovery \| political \| cultural \| natural \| mythic` |
| `scale` | `scale` | `local \| regional \| world \| cosmic` |
| `primaryPlace` | `primaryPlace` | Place slug |
| `linkedPlaces` | `linkedPlaces` | Other affected Place slugs |
| `participants` | `participants` | Character slugs (all involved) |
| `description` | `description` | One-paragraph summary for web detail panel |
| `consequences` | `consequences` | String array — what changed |
| `linkedStories` | `linkedStories` | Stories that depict this event |
| `linkedEvents` | `linkedEvents` | Causally related events |

**Vault-only fields**: `protagonists`, `antagonists`, `duration`, `institutions`, `linkedLore`, `sourceStatus`, `notes`

---

### Story

| Vault frontmatter | JSON field | Notes |
|---|---|---|
| `era` | `era` | era slug |
| `date` | `date` | human-readable date range |
| `chronoPosition` | `chronoPosition` | float 0.0–1.0, position on chronology bar |
| `primaryPlace` | `primaryPlace` | Place slug |
| `linkedPlaces` | `linkedPlaces` | All places visited in the story |
| `protagonists` | `protagonists` | Character slugs |
| `participants` | `participants` | Other Character slugs |
| `logline` | `logline` | One-sentence hook for web detail panel |
| `description` | `description` | One-paragraph summary |
| `linkedEvents` | `linkedEvents` | Events depicted or referenced |
| `linkedCharacters` | `linkedCharacters` | All characters in this story |
| `tags` | `tags` | |

**Vault-only fields**: `antagonists`, `institutions`, `linkedLore`, `sourceStatus`, `notes`

---

## Resolved Mismatches (Phase 2A)

These fields were renamed in templates to match the JSON contract:

| Template (old) | JSON / contract (new) | Type | Why changed |
|---|---|---|---|
| `currentFaction` | `faction` | place | JSON uses `faction` throughout |
| `significantEvents` | `linkedEvents` | place | Matches JSON and all other types |
| `additionalPlaces` | `linkedPlaces` | story | Matches JSON and event template |
| `affectedPlaces` | `linkedPlaces` | event | Matches JSON and story template |
| `mapRef: {cellId, region, coords}` | `mapRef: {x, y, cellId}` | place | `x/y` is what Phase 1 SVG uses; `cellId` preserved for Phase 2 |
| *(absent)* | `description` | all | Added as frontmatter field — body prose is too hard to parse |
| *(absent)* | `layer` | place | Engine needs this to assign SVG layer group |
| *(absent)* | `chronoPosition` | event, story | Engine needs this for chronology bar position |
| *(absent)* | `logline` | story | Engine uses this as the one-line summary in the detail panel |
| *(absent)* | `era` (flat) | event, story | Templates used `chronology.era`; JSON uses flat `era` field |
| *(absent)* | `date` (flat) | event, story | Templates used `chronology.date`; JSON uses flat `date` field |

---

## What the Parser Will Do (Phase 2B scope)

- Read every `.md` file in `vault/Places/`, `vault/Characters/`, `vault/Events/`, `vault/Stories/`
- Extract YAML frontmatter
- Map fields per the table above (direct copy for core fields)
- Drop vault-only fields
- Write output to `web/data/{type}s.json`
- Skip entries where `canonState: retired`

Parser lives at `scripts/vault-to-json.js` (to be built in Phase 2B).
