# Sprint 6: Publishing

Sprint 6 is split into two parts to validate the full agent workflow (Jira creation → branch → implementation → code review → QA → security → UAT) with a small, focused scope before tackling the remaining publishing features.

---

## Part 1 — Publish Static Files to Cloudflare R2

### Goal
Deliver end-to-end publishing of a website's static files to Cloudflare R2, validated through all quality and security gates, as a pilot for the new agent-driven delivery flow.

### Scope
- [ ] Publish static files to Cloudflare R2

### Out of Scope
- Generate public URLs
- Republish flow
- Unpublish flow
- Publish logs/status
- Work from future sprints
- Unapproved feature creep

### Required Gates
- AI Review passes (code quality and correctness)
- QA Testing signoff (no critical issues)
- Security Review signoff (no high-risk findings)
- Build passes
- Lint passes
- Relevant tests pass
- All tickets must reach Ready for UAT before PO begins testing

### End User UAT
Product Owner manually tests all completed features using the sprint UAT checklist.
- Tickets remain in Ready for UAT until PO gives explicit sign-off.
- PO names approved tickets (→ Done) and rejected tickets (→ In Progress with comment + UAT-REJECTED label).
- Rejected tickets must pass AI Review → QA Testing → Security Review again before re-entering Ready for UAT.

### Deliverable Report
- Completed tasks
- Files changed
- Known issues
- Risks
- Recommendation for Part 2

---

## Part 2 — Remaining Publishing Features

### Goal
Deliver the remaining publishing features building on the Cloudflare R2 foundation established in Part 1.

### Scope
- [ ] Generate public URLs
- [ ] Republish flow
- [ ] Unpublish flow
- [ ] Publish logs/status

### Out of Scope
- Work from future sprints
- Unapproved feature creep

### Required Gates
- AI Review passes (code quality and correctness)
- QA Testing signoff (no critical issues)
- Security Review signoff (no high-risk findings)
- Build passes
- Lint passes
- Relevant tests pass
- All tickets must reach Ready for UAT before PO begins testing

### End User UAT
Product Owner manually tests all completed features using the sprint UAT checklist.
- Tickets remain in Ready for UAT until PO gives explicit sign-off.
- PO names approved tickets (→ Done) and rejected tickets (→ In Progress with comment + UAT-REJECTED label).
- Rejected tickets must pass AI Review → QA Testing → Security Review again before re-entering Ready for UAT.

### Deliverable Report
- Completed tasks
- Files changed
- Known issues
- Risks
- Recommendation for next sprint
