# Final Vision — World Engine

## One-Sentence Summary
A private, living worldbuilding system where an interactive 4D map and a Markdown story/lore database form a continuous feedback loop: the map gives spatial context to writing, and story events appear back on the map as spatial storytelling.

---

## The Three Pillars

### Pillar 1 — Procedural 4D Map Engine
A layered, time-aware interactive map of the world:

| Layer | Description |
|---|---|
| **2D Base** | Procedurally generated geography: coastlines, rivers, mountain ranges, biomes |
| **Topographic / 3D** | Elevation data, rendered as topographic overlay or pseudo-3D perspective |
| **Political** | Kingdoms, empires, territories, borders — updated per era |
| **Narrative** | Story event markers, character movement paths, battle sites, ruins |
| **Cities & Villages** | Settlements with population, culture, faction, founding date |
| **Buildings** | Key locations (castles, temples, markets) with linked lore entries |
| **Nature** | Forests, sacred groves, cursed lands, magical zones |
| **4D Chronology Bar** | Scrub through time: see political borders shift, settlements rise/fall, events unfold |

Inspirations: Azgaar's Fantasy Map Generator, Game of Thrones interactive map, Legends of Runeterra interactive map, Crusader Kings 3 political map.

---

### Pillar 2 — Markdown Knowledge System
An Obsidian-compatible vault where **Stories are the primary containers**:

- **Stories** — long-form narrative documents; the main writing unit
- **Characters** — people, creatures, entities with traits, arcs, faction links
- **Places** — locations linked to map coordinates; have history, culture, politics
- **Events** — things that happened; have date, participants, location, consequences
- **Systems** — magic systems, economies, languages, belief systems
- **Institutions** — factions, guilds, governments, religions
- **Lore** — background world facts, myths, histories that may not appear in stories
- **Maps** — map snapshots, reference images, coordinate notes

All entries use YAML frontmatter for structured metadata while keeping human-readable prose in the body.

---

### Pillar 3 — Live Map↔Story Feedback Loop
The feature that makes this more than a wiki:

- Writing a Story entry with a `mapRefs` field causes a marker to appear on the map
- Clicking a map location opens the linked Place, Story, or Event in the vault
- The chronology bar advances the "current era" for both map and vault simultaneously
- Political changes in the map auto-generate suggested Lore or Event stubs
- Character routes traced on the map appear in their Character entry as a travel log

This feedback loop is **Phase 3+** work. Phases 0–2 build the foundations.

---

## Visual Design Principles
- **Atmospheric, not clinical.** Dark parchment or dark-mode map aesthetic, not a white data dashboard.
- **Show geography first.** The map is the hero. Text panels are sidebars, not the main view.
- **Legible at any zoom.** Political labels scale and fade gracefully. No label soup.
- **Time is always visible.** The chronology bar is always accessible, even if collapsed.
- **Mobile-aware.** The map should be explorable on a phone, even if editing is desktop-only.

---

## What This Is Not
- Not a game engine (no physics, no real-time simulation in Phase 0–2)
- Not a public wiki (private-first, no multi-user auth required in early phases)
- Not a CMS (no admin panels, no content approval workflows)
- Not a CRUD app (no "Add Record" forms as the primary interface — the map and the Markdown are)

---

## Phase Roadmap (High Level)

| Phase | Goal | Visual Confirmation |
|---|---|---|
| 0 | Bootstrap workspace, document vision | Static preview page deployed to GitHub Pages |
| 1 | Embed interactive map (Azgaar or MapLibre) | Clickable map in browser |
| 2 | Link vault entries to map locations | Clicking map shows linked Markdown panel |
| 3 | Chronology bar drives both map and vault | Time scrubbing changes what's visible |
| 4 | Story events appear on map automatically | Writing a Story auto-creates a map marker |
| 5 | Polish, performance, mobile | Usable on phone, fast load, offline-capable |
