# Place vs Space vs Location

This distinction matters in code (data models, map layer naming) and in writing (how to reference geography in lore).

---

## Definitions

### Place
A **named, narratively significant location** in the world. A Place has:
- A canonical name (possibly multiple names across languages/eras)
- A geographic position or region
- A `mapRef` linking it to the map
- Lore content: history, culture, current political status
- Connections to Characters, Events, Stories, and Institutions

Examples: *The City of Var*, *The Sunken Marsh*, *The Black Tower*, *The Crossroads Inn*

A Place is a **story concept** that happens to have a location.

---

### Space
A **geometric or geographic area** defined by boundaries, not by narrative significance. A Space is a computational concept used in the map layer:
- A voronoi cell (from Azgaar)
- A GeoJSON polygon or feature
- A map tile or grid cell

A Space may or may not correspond to a Place. Many Spaces have no Place attached. A Place may span multiple Spaces.

A Space is a **map concept** that may or may not have a story.

---

### Location
An **ambiguous term** — avoid using it without qualification. In this project:
- Prefer **Place** when talking about named, story-relevant geography
- Prefer **Space** when talking about map geometry
- Use **coordinates** when talking about exact map positions (fictional lat/lng, grid ref, or Azgaar cell ID)

The word "location" is fine in natural language, but avoid it in:
- YAML frontmatter field names (use `place` or `mapRef` instead)
- Code variable names (use `place`, `space`, `cellId`, `coords`)
- API response shapes

---

## Why This Matters

In Phase 2, the map↔vault link will work by matching map Spaces to vault Places via `mapRef`. If we conflate the terms, it becomes ambiguous whether a `location` field refers to a story entity or a map geometry — causing bugs and confusion.

**Rule:**
- Vault YAML frontmatter: use `place` (for referenced Place entries) and `mapRef` (for map coordinates)
- Map layer code: use `space`, `cell`, `feature`, `polygon` for geometric objects
- Never use `location` as a field name in either context

---

## Examples in YAML Frontmatter

```yaml
# In a Character entry — where they're from
birthPlace: "the-silver-city"      # references vault/Places/the-silver-city.md

# In a Story entry — where it takes place
primaryPlace: "the-sunken-marsh"   # references vault/Places/the-sunken-marsh.md
mapRefs:                           # map coordinates for event markers
  - cellId: "azgaar-cell-4421"
  - coords: { x: 240, y: 180 }

# In a Place entry — its map position
mapRef:
  cellId: "azgaar-cell-4421"
  region: "northern-wetlands"
```
