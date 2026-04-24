---
id: story-
type: story
title: ""
aliases: []
canonState: draft     # canon | draft | alt | legend | retired

# Time — flat fields to match JSON contract
era: ""               # age-founding | long-wars | etc.
date: ""              # human-readable date or range: "Year 12–13, The Long Wars"
chronoPosition: 0.0   # float 0.0–1.0, position on chronology bar

# Spatial
primaryPlace: ""      # main Place slug
linkedPlaces: []      # all Place slugs visited in the story

# People
protagonists: []      # Character slugs
antagonists: []
participants: []      # other involved Character slugs

# Web summary — these fields go directly to web/data/stories.json
logline: ""           # one-sentence hook shown in the web detail panel
description: ""       # one-paragraph summary

# Connections (slugs — these fields mirror the JSON contract directly)
linkedEvents: []      # Event slugs depicted or referenced
linkedCharacters: []  # all Character slugs in this story

# Vault-only fields (not parsed to JSON in Phase 1)
institutions: []      # Institution slugs involved
linkedLore: []        # Lore entries this story draws on
linkedSystems: []     # World system slugs (magic, economy, etc.)

# Meta
sourceStatus: authored  # authored | generated | imported | template
tags: []
notes: ""
---

# Title

*[One-sentence logline or summary]*

---

## Opening

[Story content begins here]

---

## Notes & Connections

*[Out-of-story notes: continuity flags, alternative versions, questions to resolve]*
