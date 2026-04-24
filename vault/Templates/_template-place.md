---
id: place-
type: place
title: ""
aliases: []           # alternate names, names in different eras/languages
canonState: draft     # canon | draft | alt | legend | retired

# Geography
region: ""            # parent region slug
placeType: ""         # city | town | village | fortress | ruins | landmark | wilderness
layer: political      # geography | political | narrative — controls SVG layer in web engine
size: ""              # vast | large | medium | small | tiny

# Map reference — x/y are SVG pixel coords for Phase 1; cellId reserved for Phase 2 Azgaar
mapRef:
  x: 0
  y: 0
  cellId: ""

# Politics
faction: ""           # slug of controlling faction/institution (null if contested/none)

# Web summary — becomes the description field in web/data/places.json
description: ""       # one-paragraph summary for the web detail panel

# History
foundingDate: ""
historicalFactions: []  # list of { era: "", faction: "" }

# Connections (slugs — these fields mirror the JSON contract directly)
linkedCharacters: []  # Characters associated with this place
linkedEvents: []      # Event slugs that occurred here
linkedStories: []     # Stories set here
linkedPlaces: []      # nearby or related places

# Vault-only fields (not parsed to JSON in Phase 1)
population: ""        # approximate, can be narrative ("tens of thousands")
culture: ""           # cultural identity or mix
linkedLore: []        # Lore entries about this place

# Meta
sourceStatus: authored  # authored | generated | imported | template
tags: []
notes: ""
---

# Place Name

*[One-sentence description: what it is, where it is, why it matters]*

---

## Description

[Geography, atmosphere, what it looks and feels like]

---

## History

[How this place came to be, major events, how it changed across eras]

---

## Culture & People

[Who lives here, what they believe, how they live]

---

## Notable Locations

*[Key sub-locations within this place, if applicable]*

---

## Notes

*[Continuity notes, unresolved questions, map coordinate status]*
