# Skill: Visual Confirmation Rules

Every milestone in World Engine must end with a visually confirmable output — something a human can see in a browser or file viewer without running code mentally.

---

## The Rule
**Do not mark a milestone complete unless a human can look at something and confirm it works.**

"I wrote the code" is not confirmation. "I deployed and the page loads" is confirmation.

---

## Confirmation Levels (in order of strength)

| Level | Example | Acceptable for |
|---|---|---|
| **Deployed URL** | `https://alyasska.github.io/World_Engine/` loads | Phase milestones |
| **Local browser** | `open web/index.html` shows the preview | Development checks |
| **Screenshot described** | Agent describes what should be visible | Blocked cases only |
| **File exists** | File was created at expected path | Sub-tasks within a phase |

Deployed URL is the gold standard. Never claim a phase is complete with only "file exists" confirmation.

---

## Phase-by-Phase Confirmation Criteria

| Phase | Confirmation Criterion |
|---|---|
| 0 | `https://alyasska.github.io/World_Engine/` shows the Phase 0 preview page |
| 1 | Same URL shows a pan/zoomable fantasy map |
| 2 | Clicking map location shows linked Markdown content in a side panel |
| 3 | Dragging timeline changes visible map state |
| 4 | Adding `mapRefs` to a Story creates a map marker without manual intervention |
| 5 | Lighthouse score ≥ 85; works on mobile |

---

## What to Do When Blocked on Visual Confirmation

If GitHub Pages hasn't deployed yet:
1. Check the Actions tab in the GitHub repo for workflow status
2. Wait for the workflow to complete (usually < 2 minutes)
3. Hard-refresh the browser (Ctrl+Shift+R)
4. Check Settings → Pages for the correct source configuration

If the page loads but looks wrong:
1. Open browser DevTools → Console for JS errors
2. Open Network tab and check for 404s on assets
3. Verify paths in `web/index.html` are relative (not absolute) so GitHub Pages subdirectory routing works

---

## Anti-Patterns to Avoid
- "The code looks correct so it should work" — verify it, don't assume
- Marking a task done and moving on without checking the deployed result
- Deploying and immediately starting the next phase before confirming the current one
