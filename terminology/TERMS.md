# Canonical Terms

Definitions used consistently throughout this project. When writing code, documentation, or lore, use these terms exactly. If a term needs to be redefined, update this file first.

---

## World / Setting Terms

### World
The entire fictional universe — all geography, history, cultures, and entities. The highest level container. In the map, it is the outermost boundary.

### Era
A named period of time in the world's history. Eras are the primary units of the chronology bar. Example: "Era of the First Kings," "The Long Winter," "Post-Collapse."

### Region
A large geographical area with shared geography and/or political identity. Regions contain Places. They correspond to roughly kingdom- or continent-scale areas on the map.

### Place
A specific, named location in the world with a defined geographic position. Has map coordinates or a map reference. See `terminology/PLACE_VS_SPACE.md` for the Place/Space/Location distinction.

### Settlement
A Place where people live: city, town, village, outpost, camp. Has population (approximate), founding date, and faction affiliation.

### Institution
An organized group of people with shared purpose: kingdom, empire, faction, guild, religion, council, company. Institutions control territory (places) and participate in Events.

### Character
Any named entity with agency: person, creature, god, spirit. Characters have traits, affiliations (Institutions), and participate in Events and Stories.

### Event
Something that happened at a specific time and place. Events have participants (Characters, Institutions), a location (Place), and consequences. Events are the atomic units of history.

### Story
A long-form narrative document. Stories are the primary writing containers — they reference Characters, Places, Events, and Lore. A Story may be a chapter, a short story, a legend, a history, or an in-world document.

### Lore
Background world knowledge that may not appear directly in any Story but informs the world's coherence. Myths, cosmologies, language notes, material culture descriptions.

### System
A defined rule or mechanism of the world: magic system, economic system, legal system, language family, belief system. Systems are referenced by Characters and Institutions.

---

## Technical Terms

### mapRef
A reference from a vault entry to a location on the map. Format: `mapRef: [regionId, placeId]` or `mapRef: {lat: 0, lng: 0}` (fictional coordinate system TBD in Phase 2).

### canonState
The canonical status of a vault entry. Values:
- `canon` — part of the definitive world continuity
- `draft` — being written, not yet finalized
- `alt` — an alternative timeline or "what if" version
- `legend` — an in-world myth or story that may not be literally true
- `retired` — no longer part of the active continuity

### chronology
The ordering of Events and Eras along the fictional time axis. The chronology is what the 4D bar navigates.

### sourceStatus
Whether a vault entry was generated, written manually, or imported from an external tool:
- `authored` — written by the user
- `generated` — scaffolded by an agent or script
- `imported` — brought in from the old repo or another tool (use with caution)
- `template` — a template stub, not yet a real entry

---

## Naming Conventions

- Vault file names: `kebab-case.md` (e.g., `the-silver-city.md`, `lord-aran-voss.md`)
- Template names: `_template-[type].md` with underscore prefix to sort to top
- Map layer IDs: `snake_case` (e.g., `political_layer`, `settlement_layer`)
- Git branches: `phase-N/short-description`
- Commit messages: follow convention in `CLAUDE.md`
