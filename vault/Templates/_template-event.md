---
id: event-
type: event
title: ""
aliases: []
canonState: draft     # canon | draft | alt | legend | retired

# Time — flat fields to match JSON contract
era: ""               # age-founding | long-wars | etc.
date: ""              # human-readable: "Year 44, Age of Founding"
chronoPosition: 0.0   # float 0.0–1.0, position on chronology bar (0=earliest known, 1=latest)

# Classification
eventType: ""         # battle | founding | collapse | discovery | political | cultural | natural | mythic
scale: ""             # local | regional | world | cosmic

# Location
primaryPlace: ""      # Place slug
linkedPlaces: []      # other Place slugs affected

# Participants
participants: []      # all involved Character slugs
protagonists: []      # Character slugs who drove the event
antagonists: []

# Web summary — becomes the description field in web/data/events.json
description: ""       # one-paragraph summary for the web detail panel
consequences: []      # brief list of what changed as a result

# Connections (slugs — these fields mirror the JSON contract directly)
linkedStories: []     # Stories that depict this event
linkedEvents: []      # Events this one caused or was caused by

# Vault-only fields (not parsed to JSON in Phase 1)
duration: ""          # how long it lasted
institutions: []      # Institution slugs involved
linkedLore: []        # Lore entries referencing this event

# Meta
sourceStatus: authored  # authored | generated | imported | template
tags: []
notes: ""
---

# Event Name

*[One-sentence summary: what happened, when, and why it matters]*

---

## What Happened

[Narrative account of the event]

---

## Causes

[What led to this event]

---

## Consequences

[What changed as a result — political, cultural, geographic, personal]

---

## Notes

*[Disputed accounts, alternative versions, historiographic notes]*
