# Sprint 4: Website Editor

    ## Goal
    Deliver the sprint scope with QA and security gates. This sprint runs two parallel tracks: the backend Website Editor (GrapesJS) and the frontend Design System integration.

    ## Scope
    
    ### Backend Track
    - [ ] GrapesJS integration
    - [ ] Load editor state
    - [ ] Save draft
    - [ ] Autosave
    - [ ] Preview mode
    - [ ] Undo/redo baseline

    ### Frontend Design Track
    - [ ] Tailwind CSS v4 + design token foundation (theme.css, Inter font, lucide-angular)
    - [ ] Angular UI component library: Button, Card, Badge, Input, Avatar, Modal, Tooltip, Dropdown, Tabs, Toast, Toggle, Skeleton, EmptyState, Progress
    - [ ] AppLayout, Sidebar, Header Angular components
    - [ ] Route restructure: /landing (public), / (dashboard, auth-guarded), /websites, /billing, /settings, /help
    - [ ] Landing page restyled
    - [ ] Login + Register pages restyled
    - [ ] Templates browser restyled
    - [ ] My Websites dashboard restyled
    - [ ] Billing, Settings, Help placeholder pages (DisabledFeature)
    - [ ] Editor shell styled (EditorLayout — integrates with GrapesJS backend track)

    ## Out of Scope
    - Work from future sprints
    - Unapproved feature creep

    ## Required Gates
    - AI Review passes (code quality and correctness)
    - QA Testing signoff (no critical issues)
    - Security Review signoff (no high-risk findings)
    - Build passes
    - Lint passes
    - Relevant tests pass
    - All tickets must reach Ready for UAT before PO begins testing

    ## End User UAT
    Product Owner manually tests all completed features using the sprint UAT checklist.
    - Tickets remain in Ready for UAT until PO gives explicit sign-off.
    - PO names approved tickets (→ Done) and rejected tickets (→ In Progress with comment + UAT-REJECTED label).
    - Rejected tickets must pass AI Review → QA Testing → Security Review again before re-entering Ready for UAT.

    ## Deliverable Report
    - Completed tasks
    - Files changed
    - Known issues
    - Risks
    - Recommendation for next sprint
