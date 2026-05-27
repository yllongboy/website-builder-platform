## Codex Working Agreement

Before delegating work or modifying code, read `/docs/agents/ownership-matrix.md`.

Rules:
- Follow the documented agent ownership rules.
- Use contract-first development.
- Update `/docs/api/openapi.yaml` before changing API behavior.
- Keep frontend, backend, database, payments, publishing, QA, and security responsibilities separated.
- Never invent DTOs outside OpenAPI.
- Never bypass QA and security gates for implementation work.
- All Jira interactions (ticket creation, transitions, updates) must go through the Jira Delivery Manager. No other agent may directly modify Jira.
- Create Jira sprint and tickets via Jira Delivery Manager BEFORE any implementation begins.
- Always create a branch in the repo for every Jira Ticket.
- All code changes must go through Repository Manager for branch creation, commit, and PR opening.
- Code Reviewer must review and approve all PRs before they can proceed to QA Testing.
- Never bypass the Code Reviewer gate. No PR may be merged or advance without Code Reviewer approval.

Bootstrap mode is complete. Sprint 0 through Sprint 2 are done and UAT-passed. Sprint 3 (User Websites) is the active sprint. Implement features per the sprint roadmap doc and ownership matrix.
