# Sprint 7: Admin Dashboard — Part 2 (UI/UX Overhaul)

Sprint 7 Part 2 delivers the full UI/UX redesign of the admin-app, applying the design system
from `design/admin-dashboard/` (Tailwind v4 tokens, Angular component patterns, layout shell)
to every admin page. Part 1 delivered functional admin features; Part 2 makes the admin app
production-quality.

---

## Design Reference

Source: `design/admin-dashboard/src/`

- **Theme tokens** (`theme.css`): primary `#4f46e5`, accent `#7c3aed`, Inter font, dark sidebar
  (`--color-sidebar: #111827`), semantic colors — success `#059669`, warning `#d97706`,
  destructive `#dc2626`
- **Layout shell**: Sidebar (collapsible `w-60` / `w-16`) + Topbar + `<main>` content
- **Sidebar** (`SidebarComponent`): dark background, `w-8 h-8 rounded-lg bg-primary` logo mark
  with zap icon, nav items (Dashboard / Users / Websites / Templates / Categories / Billing /
  Settings), active item `bg-sidebar-active text-white`, collapse toggle at bottom
- **Topbar** (`TopbarComponent`): search input, notifications bell dropdown, user avatar with
  gradient (`from-primary to-accent`) + sign-out menu
- **Design components** (all already Angular): `BadgeComponent`
  (default/success/warning/destructive/secondary/outline variants), `ToggleComponent`,
  `ModalComponent`, `ConfirmModalComponent`, `ToastService` + `ToastHostComponent`,
  `SidebarComponent`, `TopbarComponent`, `LayoutComponent`

### Admin-Specific Adaptations

The design reference is admin-specific and already in Angular. The following items still require
adaptation for the production codebase:

- Dashboard stats: Total Users, Total Websites, Active Subscriptions, Revenue
- Billing page: full admin billing management (MRR/ARR, plan distribution, invoices, cancel subscription)
- Sidebar nav: Settings nav item is out of scope for this sprint

---

## Part 2 — Admin App UI/UX Redesign

### Goal

Deliver a production-quality admin UI by applying the design system across all admin-app pages,
building the layout shell, and delivering a full admin billing management page backed by new API
endpoints.

### Scope

#### Phase 1 — Design System Setup

- [ ] **ADMIN-72-01** — Import design tokens, Inter font, and custom utilities into
  `apps/admin-app/src/styles.css`

#### Phase 2 — Admin Shell Components (blocks all page redesigns)

- [ ] **ADMIN-72-02** — Create `AdminShellComponent` (layout wrapper: sidebar + header +
  `<router-outlet>`) — `apps/admin-app/src/app/core/layout/admin-shell.component.ts`
- [ ] **ADMIN-72-03** — Create `AdminSidebarComponent` (collapsible sidebar, admin nav:
  Dashboard / Users / Websites / Templates / Categories / Billing) —
  `apps/admin-app/src/app/core/layout/admin-sidebar.component.ts`
- [ ] **ADMIN-72-04** — Create `AdminHeaderComponent` (search bar, notifications bell,
  user avatar + plan badge dropdown with sign-out) —
  `apps/admin-app/src/app/core/layout/admin-header.component.ts`

#### Phase 3 — Routes Update (depends on Phase 2)

- [ ] **ADMIN-72-05** — Update `apps/admin-app/src/app/app.routes.ts` to load
  `AdminShellComponent` as the layout wrapper for all authenticated child routes

#### Phase 4 — Page Redesigns (depend on Phase 3; tickets run in parallel)

- [ ] **ADMIN-72-06** — Redesign login page: branded centered card, gradient logo mark,
  polished form with validation states —
  `apps/admin-app/src/app/features/auth/pages/admin-login.page.ts`
- [ ] **ADMIN-72-07** — Redesign dashboard page: 4-column stats cards (Total Users, Total
  Websites, Active Subscriptions, Revenue), quick access cards (Users / Websites / Billing),
  recent activity section —
  `apps/admin-app/src/app/features/dashboard/pages/admin-dashboard.page.ts`
- [ ] **ADMIN-72-08** — Modernize users list: elevated filter bar, styled table header/rows,
  design-system status badges, Suspend/Reactivate action buttons —
  `apps/admin-app/src/app/features/users/pages/user-admin-list.page.ts`
- [ ] **ADMIN-72-09** — Modernize websites list: design-system table, status badges
  (DRAFT/PUBLISHED/ARCHIVED), Unpublish / Archive action buttons —
  `apps/admin-app/src/app/features/websites/pages/website-admin-list.page.ts`
- [ ] **ADMIN-72-10** — Modernize categories + templates pages: consistent elevated card + table
  styling, inline add/edit form polish —
  `apps/admin-app/src/app/features/categories/pages/category-list.page.ts`,
  `apps/admin-app/src/app/features/templates/pages/template-admin-list.page.ts`

#### Phase 5 — Admin Billing (contract-first; sequential within phase)

- [ ] **ADMIN-72-11** — Update `docs/api/openapi.yaml`: add admin billing endpoints —
  `GET /admin/billing/overview` (MRR, ARR, plan distribution counts),
  `GET /admin/billing/invoices` (paginated invoice list),
  `POST /admin/billing/subscriptions/{userId}/cancel`
- [ ] **ADMIN-72-12** — Backend: implement admin billing controller + service in `services/api/`
  per OpenAPI contract (ADMIN-72-11 must be merged first)
- [ ] **ADMIN-72-13** — Frontend: create `admin-billing-overview.page.ts` — revenue metric
  cards (MRR, ARR, total active subscribers), plan distribution table (Free/Pro/Enterprise),
  paginated invoice list, cancel subscription action with confirmation modal; add `/billing`
  route to `app.routes.ts` —
  `apps/admin-app/src/app/features/billing/pages/admin-billing-overview.page.ts`

### Files to Create

- `apps/admin-app/src/app/core/layout/admin-shell.component.ts`
- `apps/admin-app/src/app/core/layout/admin-sidebar.component.ts`
- `apps/admin-app/src/app/core/layout/admin-header.component.ts`
- `apps/admin-app/src/app/features/billing/pages/admin-billing-overview.page.ts`

### Files to Modify

- `apps/admin-app/src/styles.css`
- `apps/admin-app/src/app/app.routes.ts`
- `docs/api/openapi.yaml`
- `apps/admin-app/src/app/features/auth/pages/admin-login.page.ts`
- `apps/admin-app/src/app/features/dashboard/pages/admin-dashboard.page.ts`
- `apps/admin-app/src/app/features/users/pages/user-admin-list.page.ts`
- `apps/admin-app/src/app/features/websites/pages/website-admin-list.page.ts`
- `apps/admin-app/src/app/features/categories/pages/category-list.page.ts`
- `apps/admin-app/src/app/features/templates/pages/template-admin-list.page.ts`

### Out of Scope

- Changes to builder-app
- Changes to shared libs (shared-ui, auth, etc.)
- Dark mode support
- New user-facing features
- Work from future sprints
- Unapproved feature creep

### Agent Ownership

| Ticket(s)             | Primary Owner       | Supporting |
|-----------------------|---------------------|------------|
| ADMIN-72-01 to 72-10  | Frontend Engineer   | —          |
| ADMIN-72-11           | Backend Engineer    | Frontend Engineer |
| ADMIN-72-12           | Backend Engineer    | —          |
| ADMIN-72-13           | Frontend Engineer   | Backend Engineer |
| All PRs               | Repository Manager  | —          |
| All PR reviews        | Code Reviewer       | —          |
| All QA signoffs       | QA Engineer         | —          |
| All security reviews  | Security Reviewer   | —          |
| Jira artifacts        | Jira Delivery Manager | —        |

### Required Gates

- AI Review passes (code quality and correctness)
- QA Testing signoff (no critical issues)
- Security Review signoff (no high-risk findings)
- Build passes: `pnpm nx build admin-app`
- Lint passes: `pnpm nx lint admin-app`
- Relevant tests pass
- All tickets must reach Ready for UAT before PO begins testing

### End User UAT

Product Owner manually tests all completed features using the sprint UAT checklist.
- Tickets remain in Ready for UAT until PO gives explicit sign-off.
- PO names approved tickets (→ Done) and rejected tickets (→ In Progress with comment +
  UAT-REJECTED label).
- Rejected tickets must pass AI Review → QA Testing → Security Review again before
  re-entering Ready for UAT.

### Deliverable Report

- Completed tasks
- Files changed
- Known issues
- Risks
- Recommendation for next sprint
