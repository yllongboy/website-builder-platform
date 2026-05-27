# Agent Ownership Matrix

## Purpose
This file is the single source of truth for ownership, responsibilities, and delegation boundaries for the Website Builder project.

## Core Rules
- Every task must have one Primary Owner.
- Supporting Owners may assist but do not override the Primary Owner.
- Orchestrator should consult this file before delegation.
- If ownership is unclear, Product Manager resolves scope ownership.
- Security Reviewer, QA Engineer, and Code Reviewer are cross-cutting reviewers.

## Implementating Agent Flow
When all Implementating agents or any agent that works on a JIRA ticket and requires a code change, It must follow the flow sequence below.

- Implementation Agent writes/changes code locally
- Implementation Agent reports “ready for commit” to Orchestrator
- Orchestrator asks Repository Manager to inspect changed files
- Repository Manager creates branch / commits / pushes
- Repository Manager opens PR
- Code Reviewer reviews PR and signals Orchestrator with a decision (APPROVED or CHANGES REQUESTED) and a list of comments
- Orchestrator instructs Repository Manager to post Code Reviewer's comments and set the PR status in Bitbucket on Code Reviewer's behalf
- Repository Manager confirms to Orchestrator once comments and PR status are set in Bitbucket

## Code Review / Rework Loop Rules
- Code Reviewer → reviews PR diff, forms decision (APPROVED or CHANGES REQUESTED), and compiles list of comments
- Code Reviewer → signals Orchestrator with decision + comments (Code Reviewer does NOT interact with Bitbucket directly)
- Orchestrator → instructs Repository Manager to post comments and set PR status in Bitbucket on Code Reviewer's behalf
- Repository Manager → posts comments and sets PR status in Bitbucket, confirms back to Orchestrator
- Orchestrator → assigns fix back to original agent if CHANGES REQUESTED
- Original agent (Implementation Agent) → commits fixes to same branch
- Code Reviewer → re-reviews and signals Orchestrator again

    * `Important Rule:`
        * Fixes stay in the same branch and same PR.
        * Code Reviewer MUST provide both a decision AND comments to Orchestrator — Orchestrator will NOT advance the Jira ticket until Repository Manager confirms the PR status is set in Bitbucket.
        * Orchestrator confirms gates.
        * Repository Manager or human merges.        
---

## Product Manager

### Owns
- Product vision
- MVP scope
- Priorities
- Backlog grooming
- Release readiness
- Pricing and packaging decisions
- Acceptance criteria

> **Jira Note:** PM owns backlog decisions but delegates Jira artifact creations and updates to the Jira Delivery Manager.

### Supports
- Sprint planning
- Cross-team coordination

### Does Not Own
- Implementation code
- Infrastructure execution

---

## Planner

### Owns
- Technical plans
- Architecture proposals
- Delivery sequencing
- Risk identification
- Dependency mapping

### Supports
- Orchestrator
- Product Manager

### Does Not Own
- Production code

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in work
- Responsibilities: Create the technical plan for assigned tickets
- Must NOT create, close, or change Jira ticket status directly

---

## Orchestrator

### Owns
- Task delegation
- Phase execution
- Parallelization decisions
- Progress tracking
- Quality gate enforcement
- Final delivery coordination

### Supports
- All teams

### Does Not Own
- Product scope
- Feature implementation

### Jira Rules
- NEVER directly modify Jira
- Always delegate Jira actions to Jira Delivery Manager
- Responsibilities: Trigger sprint creation, ticket creation, coordinate status updates, and enforce QA/Security gates via Jira Delivery Manager

### Sprint Kickoff Protocol
Before any implementation begins on a sprint, the Orchestrator MUST:
1. Instruct the Jira Delivery Manager to create the sprint in Jira
2. Instruct the Jira Delivery Manager to create all tickets from the sprint roadmap doc
3. Receive confirmation from the Jira Delivery Manager that all tickets exist and the sprint is started
4. Only then delegate implementation tasks to engineers

### Important
No implementation work may begin until step 3 is confirmed.

### Status Signal Handling
When any agent signals a status change, the Orchestrator MUST instruct the Jira Delivery Manager to perform the corresponding transition:

| Agent Signal | Transition |
|---|---|
| Agent signals work has started on a ticket | TODO → In Progress |
| Repository Manager signals PR opened | In Progress → AI Review |
| Code Reviewer approves PR | AI Review → QA Testing |
| QA Testing passes | QA Testing → Security Review |
| Security Review passes | Security Review → Ready for UAT |

The Orchestrator must not skip transitions. Each signal triggers exactly one step forward.

---

## Frontend Engineer

### Owns
- Angular Builder App
- Angular Admin App
- UI implementation
- RxJS state flows
- Route guards
- Reactive forms
- Accessibility
- Responsive behavior
- Frontend API integration
- Generated Angular client usage
- Frontend data-access services
- Error handling integration

### Supports
- Editor Integration Engineer
- Payments Engineer

### Does Not Own
- Backend APIs
- Product decisions
- Database schema

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Backend Engineer

### Owns
- Java Spring Boot APIs
- Business logic
- Authentication flows
- Authorization enforcement
- DTOs
- Controllers
- Services
- Repository layer
- Integrations orchestration

### Supports
- Payments Engineer
- Publishing Engineer
- Frontend Engineer

### Does Not Own
- UI implementation
- Database strategy ownership

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Database Architect

### Owns
- PostgreSQL schema design
- Flyway migrations
- Constraints
- Indexes
- Query performance
- Data retention strategy
- Backup recommendations
- JSONB modeling

### Supports
- Backend Engineer
- Reporting features

### Does Not Own
- API business logic
- UI

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Editor Integration Engineer

### Owns
- GrapesJS integration
- Template import/export
- Editor save/load contracts
- Autosave workflows
- Asset manager integration
- HTML/CSS generation compatibility
- Editor-specific UX flows

### Supports
- Frontend Engineer
- Backend Engineer

### Does Not Own
- Payments
- Infra

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Payments Engineer

### Owns
- Stripe products/plans setup
- Checkout flows
- Webhook processing logic
- Subscription lifecycle states
- Billing access rules
- Failed payment handling
- Invoice/subscription sync logic

### Supports
- Backend Engineer
- Frontend Engineer
- Security Reviewer

### Does Not Own
- General UI ownership
- Core schema ownership

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Publishing Engineer

### Owns
- Static site export pipeline
- Cloudflare R2 deployment flow
- Subdomain publish flow
- Cache invalidation rules
- Publish logs
- Rollback strategy
- CDN delivery concerns

### Supports
- Backend Engineer
- DevOps Engineer

### Does Not Own
- Product pricing
- Billing

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## DevOps Engineer

### Owns
- CI/CD pipelines
- Environments (dev/staging/prod)
- Docker/containerization
- Secrets management
- Monitoring/alerts
- Infrastructure as Code
- Backup automation
- Reliability processes

### Supports
- Publishing Engineer
- Backend Engineer
- Frontend Engineer

### Does Not Own
- Product scope
- Feature UI logic

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## QA Engineer

### Owns
- Test plans
- Manual test scenarios
- Regression coverage
- Acceptance validation
- Bug reporting
- Release confidence checks

### Supports
- All engineering teams

### Does Not Own
- Production code changes

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Automation Engineer

### Owns
- Unit tests
- Integration tests
- End-to-end tests
- CI test pipelines
- Test fixtures/mocks
- Reliability of automated suites

### Supports
- QA Engineer
- Frontend Engineer
- Backend Engineer

### Does Not Own
- Manual signoff
- Product scope

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Repository Manager

### Owns
- Branch creation for every Jira ticket
- Committing and pushing implementation changes
- Opening pull requests
- Enforcing branch naming conventions
- Coordinating merges after Code Reviewer approval
- Repository workflow enforcement
- PR management and lifecycle

### Supports
- All engineering teams
- Orchestrator
- Code Reviewer

### Does Not Own
- Code review decisions
- PR approval or rejection authority
- Jira ticket management
- Product scope

### Merge Authority
- You may:
    - Create branches
    - Commit and push code
    - Open PRs
    - Merge PRs after Code Reviewer approval and Orchestrator confirmation
    - Follow the PR template in `/docs/templates/PR-Template.md` during creation of a PR,.

- You may NOT:
    - Review or approve PRs
    - Override Code Reviewer decisions
    - Merge without Code Reviewer approval
    - Modify Jira tickets directly

### Jira Scope
- No direct Jira interaction
- Signal to Orchestrator when PR is opened so the ticket can be moved to AI Review
- Signal to Orchestrator when PR is merged
- When instructed by Orchestrator: post Code Reviewer's comments on the PR in Bitbucket and set the PR status (APPROVED or CHANGES REQUESTED) in Bitbucket on Code Reviewer's behalf
- Confirm to Orchestrator once the PR status and comments are posted in Bitbucket

---

## Code Reviewer

### Owns
- Review PR diffs
- Check code quality
- Check architecture consistency
- Check naming/package conventions
- Check OpenAPI contract alignment
- Check frontend/backend separation
- Check tests were added/updated
- Leave actionable PR comments
- Approve or request changes

### Supports
- Orchestrator
- All engineering teams

### Does Not Own
- Product requirements
- Sprint planning
- Jira ticket management
- CI/CD deployment
- Infrastructure decisions
- Production release approval
- Implementation of code

### Approval Authority
- You may:
    - Approve PRs
    - Request changes
    - Block PR progression to QA

- You may NOT:
    - Merge PRs
    - Override QA
    - Override Security
    - Mark Jira tickets Done
    - Approve scope changes

### Escalation Rules
Escalates to:

- Orchestrator
    * When:
        - PR scope becomes unclear
        - Multiple agents conflict
        - Rework loops become excessive

- Product Manager
    * When:
        - Acceptance criteria ambiguity exists
        - PR introduces scope creep

- Security Reviewer
    * When:
        - High-risk vulnerabilities are suspected

### Jira Scope
- You have no business or scope within JIRA
- You do NOT interact with Bitbucket directly
- You MUST signal to the Orchestrator with: the ticket ID, your decision (APPROVED or CHANGES REQUESTED), and your full list of review comments
- Orchestrator will instruct Repository Manager to post your comments and set the PR status in Bitbucket on your behalf


---

## Security Reviewer

### Owns
- Security audits
- OWASP risk reviews
- Auth/JWT reviews
- Input validation review
- Stripe webhook signature review
- XSS/CSRF/injection checks
- Secure secrets guidance

### Supports
- Backend Engineer
- Frontend Engineer
- DevOps Engineer

### Does Not Own
- Feature prioritization
- Mainline implementation

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in commits/work
- Must NOT create, close, or change Jira ticket status directly

---

## Designer

### Owns
- UI/UX system
- Design tokens
- Layouts
- User flows
- Visual consistency
- Conversion-focused pages
- Editor usability recommendations

### Supports
- Frontend Engineer
- Product Manager

### Does Not Own
- Production code
- Backend logic

### Jira Scope
- Works only on assigned tickets
- References Jira ticket ID in work
- Must NOT create, close, or change Jira ticket status directly

---

## Jira Delivery Manager

### Owns
- All Jira interactions
- Creating epics and sprints
- Creating tickets from sprint documentation
- Assigning tickets to agents
- Transitioning ticket states through the full workflow
- Adding comments and updates
- Generating sprint reports
- Enforcing the sprint-level UAT gate

### Jira Project
- https://ofoodie.atlassian.net/jira/software/projects/SCRUM/boards/1

### Supports
- Orchestrator
- Product Manager

### Does Not Own
- Implementation code
- Product scope decisions

### Permissions
- ONLY agent allowed to create, modify, or close Jira tickets
- Uses MCP Jira tools exclusively

### Jira Rules
- **Ready for UAT → Done requires explicit Product Owner instruction.** No other agent (including Orchestrator) may authorize this transition.
- Only transition tickets through AI Review, QA Testing, and Security Review based on Orchestrator instruction.
- Must NOT skip AI Review, QA Testing, or Security Review gates.
- Any gate failure returns the ticket to In Progress with a comment explaining the failure.
- On UAT rejection: add PO's feedback as comment, apply `UAT-REJECTED` label, transition to In Progress.
- Rejected tickets must pass through all gates again (In Progress → AI Review → QA Testing → Security Review → Ready for UAT).
- All sprint tickets remain in Ready for UAT until PO completes the sprint UAT checklist.

---

# Ownership by Domain

## Authentication
Primary Owner: Backend Engineer  
Supporting: Frontend Engineer, Security Reviewer, QA Engineer

## Template Marketplace
Primary Owner: Frontend Engineer  
Supporting: Backend Engineer, Designer, QA Engineer

## Website Creation
Primary Owner: Backend Engineer  
Supporting: Frontend Engineer, Database Architect

## Website Editor
Primary Owner: Editor Integration Engineer  
Supporting: Frontend Engineer, Backend Engineer, QA Engineer

## Billing & Subscriptions
Primary Owner: Payments Engineer  
Supporting: Backend Engineer, Frontend Engineer, Security Reviewer, QA Engineer

## Publishing
Primary Owner: Publishing Engineer  
Supporting: Backend Engineer, DevOps Engineer, QA Engineer

## Admin Dashboard
Primary Owner: Frontend Engineer  
Supporting: Backend Engineer, Product Manager, QA Engineer

## CI/CD & Production
Primary Owner: DevOps Engineer  
Supporting: Backend Engineer, Frontend Engineer, Security Reviewer

> **Note:** Code Reviewer is a cross-cutting agent and implicitly supports all domains above. Every domain's implementation work passes through Code Reviewer before advancing to QA Testing.

---

# Conflict Resolution

1. Product scope conflict -> Product Manager
2. Technical design conflict -> Planner
3. Delivery sequencing conflict -> Orchestrator
4. Security risk conflict -> Security Reviewer blocks release
5. Quality risk conflict -> QA Engineer blocks release
6. PR review disagreement between Code Reviewer and implementation agent -> Orchestrator mediates

---

# Definition of Done

A task is complete only when:
1. Primary Owner marks implementation complete
2. Repository Manager has opened a PR for the implementation
3. Code Reviewer approves the PR (AI Review gate passed)
4. QA Engineer reports no critical issues
5. Security Reviewer reports no high-risk findings
6. Orchestrator confirms integration success
7. **Product Owner confirms UAT pass (sprint-level sign-off)**

> **Note:** Steps 1–6 move a ticket to Ready for UAT. Only step 7 moves it to Done. The Product Owner is the sole authority for closing tickets.

---
## Operating Guidance

- Read this file before delegating work or modifying code.
- Changes should stay within the responsible area unless cross-functional work is explicitly coordinated.
- API behavior starts with `docs/api/openapi.yaml`.
- DTOs must be defined in OpenAPI before implementation code references them.
- QA and Security act as gates for implementation work and should not be bypassed.

## Jira Workflow

Ticket lifecycle: **TODO → In Progress → AI Review → QA Testing → Security Review → Ready for UAT → Done**

### Board Columns
| Column | Purpose |
|--------|--------|
| TODO | Ticket created, not yet started |
| In Progress | Developer actively working on implementation |
| AI Review | AI agents review implementation for quality and correctness |
| QA Testing | QA Engineer validates functionality and regression |
| Security Review | Security Reviewer checks for vulnerabilities |
| Ready for UAT | All gates passed; awaiting Product Owner manual testing |
| Done | Product Owner has confirmed the feature works as expected |

### Transition Rules
- Orchestrator instructs transitions through AI Review, QA Testing, and Security Review gates.
- **Only the Product Owner can instruct the Ready for UAT → Done transition.**
- Any gate failure returns the ticket to In Progress with a comment.
- Only the Jira Delivery Manager interacts with Jira directly.

### Blocked Flag
- "Blocked" is a label, not a board column. Apply it to any ticket without changing status.

### Status Signal Protocol
All agents are responsible for signaling the Orchestrator when their status changes. Agents must NEVER move tickets themselves — only the Jira Delivery Manager may do that.

- **When starting work:** Agent signals the Orchestrator with the ticket ID and "starting implementation"
- **When done:** Agent signals the Orchestrator with the ticket ID and "implementation complete"
- **Review agents (Code Reviewer / AI Review, QA, Security):** Signal pass or fail to the Orchestrator with the ticket ID — never touch the ticket directly

The Orchestrator then instructs the Jira Delivery Manager to perform the appropriate transition.

### UAT Rejection Flow
- Product Owner rejects a ticket → Jira Delivery Manager adds rejection comment + `UAT-REJECTED` label → ticket returns to In Progress.
- Rejected tickets must pass through all gates again before re-entering Ready for UAT.

### Sprint-Level UAT Gate
- All sprint tickets must reach Ready for UAT before the Product Owner begins testing.
- All tickets remain in Ready for UAT until the PO completes the sprint UAT checklist.
- PO names which tickets are approved (→ Done) and which are rejected (→ In Progress).