import { Routes } from '@angular/router';
import { adminGuard } from '@platform/auth';
import { AdminShellComponent } from './core/layout/admin-shell.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/admin-login.page').then((m) => m.AdminLoginPage),
  },
  {
    path: '',
    canActivate: [adminGuard],
    component: AdminShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/admin-dashboard.page').then((m) => m.AdminDashboardPage),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/pages/category-list.page').then((m) => m.CategoryListPage),
      },
      {
        path: 'templates',
        loadComponent: () =>
          import('./features/templates/pages/template-admin-list.page').then((m) => m.TemplateAdminListPage),
      },
      {
        path: 'websites',
        loadComponent: () =>
          import('./features/websites/pages/website-admin-list.page').then((m) => m.WebsiteAdminListPage),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/pages/user-admin-list.page').then((m) => m.UserAdminListPage),
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./features/billing/pages/admin-billing-overview.page').then((m) => m.AdminBillingOverviewPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/pages/admin-settings.page').then((m) => m.AdminSettingsPage),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
