---
id: char-
type: character
title: ""
aliases: []           # other names, titles, epithets
canonState: draft     # canon | draft | alt | legend | retired

# Identity
species: human
role: ""              # protagonist | antagonist | supporting | background
faction: ""           # primary faction slug (null if none)

# Biography
birthPlace: ""        # Place slug
currentPlace: ""      # Place slug
birthDate: ""
deathDate: ""         # leave blank if alive

# Traits
traits: []            # personality traits, 3-5 words
arc: ""               # one-sentence character arc

# Web summary — becomes the description field in web/data/characters.json
description: ""       # one-paragraph summary for the web detail panel

# Connections (slugs — these fields mirror the JSON contract directly)
linkedPlaces: []      # significant places in their story
linkedEvents: []      # Event slugs they participated in
linkedStories: []     # Story slugs they appear in

# Vault-only fields (not parsed to JSON in Phase 1)
gender: ""
abilities: []         # skills, powers, notable capabilities
flaws: []
allegiances: []       # broader loyalties beyond primary faction
linkedCharacters: []  # notable relationships (reference by slug)

# Meta
sourceStatus: authored  # authored | generated | imported | template
tags: []
notes: ""
---

# Name

*[One-sentence character summary: role, defining trait, what makes them memorable]*

---

## Background

[Who are they, where are they from, what shaped them]

---

## Story Role

[How they appear in the narrative, what they drive or represent]

---

## Notes

*[Continuity notes, alternative versions, unresolved questions]*
