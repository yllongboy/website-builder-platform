# Sprint Start Template

Orchestrator:

Run Sprint [X] only.

Read:
- AGENTS.md
- /docs/agents/ownership-matrix.md
- /docs/product/mvp-scope.md
- /docs/api/openapi.yaml
- /docs/roadmap/sprint-[X].md

Rules:

> These rules are a **numbered sequential protocol**. Each step MUST complete before the next begins. Do NOT parallelize across steps. Do NOT skip or reorder steps.

**Step 1 — Scope validation (no code, no planning yet)**
- Instruct Product Manager to validate sprint scope against mvp-scope.md.
- Wait for Product Manager confirmation before proceeding.

**Step 2 — Technical planning (no code, no delegation yet)**
- Instruct Planner to produce a sequenced task plan for the sprint.
- Planner returns the plan to Orchestrator only. Planner does NOT delegate to engineers.
- Wait for Planner to return the completed plan before proceeding.

**Step 3 — Jira sprint creation (BLOCKING GATE — do NOT proceed until confirmed)**
- Instruct Jira Delivery Manager to create the sprint in Jira.
- Instruct Jira Delivery Manager to create all tickets from the sprint roadmap doc.
- **WAIT for explicit confirmation from Jira Delivery Manager that the sprint is started and all tickets exist.**
- Do NOT delegate any implementation work until this confirmation is received.

**Step 4 — Implementation (only after Step 3 is confirmed)**
- Delegate work to proper agents per the ownership matrix.
- Parallelize only non-conflicting work within this step.
- **Before any implementation agent writes code for a ticket,inform Orchestrator to instruct Repository Manager to create a dedicated branch for that Jira ticket.**
- All code changes must go through Repository Manager (branch/commit/PR).
- Code Reviewer must approve every PR before it advances.
- Log all comments from Code Reviewer in to JIRA ticket and PR request's comments section for traceability regardless if it's `APPROVED` or not.

**Step 5 — QA gate**
- Run QA gate. Fix critical/high issues only. Return to Step 4 for fixes.

**Step 6 — Security gate**
- Run Security gate. Fix critical/high issues only. Return to Step 4 for fixes.

**Do NOT begin next sprint.**

At completion provide:
1. Completed tasks
2. Files changed
3. Known issues
4. QA results
5. Security results
6. End-user UAT steps
7. Ready/not ready recommendation
