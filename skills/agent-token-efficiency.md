# Skill: Agent Token Efficiency

Guidelines for keeping agent work lean, focused, and resumable without burning unnecessary context.

---

## Principles

### 1. Write to files, not to context
When gathering research, making decisions, or planning architecture, write conclusions to the appropriate doc file immediately. Don't hold large amounts of reasoning in the conversation — it bloats context and is lost when the session ends.

- Research findings → `docs/OPEN_SOURCE_REPOS.md`
- Architecture decisions → `docs/ARCHITECTURE_DECISIONS.md`
- Lessons → `docs/OLD_REPO_LESSONS.md`
- Next steps → `tracking/NEXT_ACTIONS.md`

### 2. Read before you write
Before creating or editing a file, check if it already exists and what it contains. Duplicating content wastes tokens and creates contradictions.

### 3. One task at a time in the tracker
Keep exactly one task `in_progress` in the todo list. Complete it before starting the next. This prevents context drift.

### 4. Scope commits tightly
One commit = one logical change. Don't batch unrelated work into a single commit. Tight commits make `git log` readable and make rollback safe.

### 5. Prefer parallel tool calls for independent work
When creating multiple independent files (e.g., `docs/A.md` and `docs/B.md`), write them in a single response with parallel Write calls. Saves round-trips.

### 6. Stop before scope creep
If the user's prompt implies one thing but a better/bigger solution is tempting, document the bigger idea in `tracking/NEXT_ACTIONS.md` and do the minimal scoped thing. Don't gold-plate.

### 7. Checkpoint before large operations
Before running any destructive operation (git reset, rm -rf, overwrite) or before a long multi-file generation task, state the plan explicitly so the user can redirect.

---

## Resuming a Session

If picking up after a gap:
1. Read `tracking/NEXT_ACTIONS.md` — tells you what to do next
2. Read `tracking/MILESTONES.md` — tells you what phase you're in
3. Read `tracking/CHANGELOG.md` — tells you what was recently changed
4. Read `docs/ARCHITECTURE_DECISIONS.md` — tells you what was decided and why

Do not re-read all source files from scratch unless specifically investigating a bug.
