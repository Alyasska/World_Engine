# Skill: No Blind Copying of Open-Source Projects

Rules for integrating external open-source tools into World Engine. The Lego assembly philosophy requires thoughtful integration, not cargo-culting.

---

## The Core Rule
**Document before you import. Wrap before you embed. Never fork unless you plan to maintain.**

---

## The Integration Protocol

### Step 1: Document in OPEN_SOURCE_REPOS.md
Before writing a single `import` or `<script src>`:
- Add an entry to `docs/OPEN_SOURCE_REPOS.md` with purpose, role, license, risk, and recommendation
- If the entry already exists, review it and update if the project has changed

### Step 2: Verify the License
Check the repo's LICENSE file, not just what the README claims:
- MIT, Apache 2.0, BSD-2/3: ✅ safe to use
- LGPL: ✅ with caution (dynamic linking required)
- GPL: ⚠️ viral — requires your code to also be GPL if distributed
- CC-BY-SA: ⚠️ check if it applies to code or only content
- AGPL: ⚠️ very viral — affects network use
- No license: ❌ do not use (all rights reserved by default)

### Step 3: Add an Architecture Decision
Add an entry to `docs/ARCHITECTURE_DECISIONS.md` explaining:
- Why this library was chosen over alternatives
- What it replaces or what it adds
- The integration approach (adapter layer, direct import, iframe, etc.)

### Step 4: Wrap in a Thin Adapter
Never call a third-party library's API directly from application code (except trivial utilities):
- Create an adapter module (e.g., `web/src/map/mapAdapter.js`) that wraps MapLibre
- If the library changes API, only the adapter needs updating
- The adapter defines the interface the rest of the app depends on

### Step 5: Commit the import separately
First commit: `Phase N: add [library] to OPEN_SOURCE_REPOS.md`  
Second commit: `Phase N: import [library] and create adapter`  
Third commit: `Phase N: wire [library] adapter to [feature]`

Separate commits make it easy to roll back the import without losing feature work.

---

## What "Blind Copying" Looks Like (Avoid This)
- Copy-pasting 500 lines of a demo into `web/` without knowing what it does
- Importing a library and using it directly without an adapter layer
- Using a GPL library without checking your distribution obligations
- Importing a library that does 10 things when you need 1 thing
- Forking a large project (like Azgaar FMG) to "customize it" — you'll have to maintain that fork forever

---

## Preferred Integration Patterns by Risk Level

| Pattern | When to Use | Example |
|---|---|---|
| **External tool + JSON export** | Standalone generators | Azgaar: run it, export JSON, import data only |
| **CDN import** | Stable, small libraries | MapLibre from CDN in Phase 1 static HTML |
| **npm install + adapter** | Libraries with rich APIs | MapLibre in Phase 1+ Vite project |
| **iframe embed** | Complex SPAs you don't control | Azgaar iframe if Phase 1 goes that route |
| **Fork** | Only if library is abandoned and critical | Last resort — document in ADR with maintenance plan |
