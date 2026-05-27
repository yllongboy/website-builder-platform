import { Routes } from '@angular/router';
import { authGuard } from '@platform/auth';

export const appRoutes: Routes = [
  // Public routes
  {
    path: 'landing',
    loadComponent: () =>
      import('./features/landing/pages/landing.page').then((m) => m.LandingPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register.page').then((m) => m.RegisterPage),
  },
  // Public template browsing
  {
    path: 'templates',
    loadComponent: () =>
      import('./features/templates/pages/template-list.page').then((m) => m.TemplateListPage),
  },
  {
    path: 'templates/:templateId',
    loadComponent: () =>
      import('./features/templates/pages/template-detail.page').then((m) => m.TemplateDetailPage),
  },
  // Authenticated routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'websites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'editor/:websiteId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/editor/pages/editor.page').then((m) => m.EditorPage),
  },
  {
    path: 'preview/:websiteId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/editor/pages/preview.page').then((m) => m.PreviewPage),
  },
  {
    path: 'billing',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/billing/pages/billing.page').then((m) => m.BillingPage),
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/settings/pages/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'help',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/help/pages/help.page').then((m) => m.HelpPage),
  },
  // Fallback
  {
    path: '**',
    redirectTo: 'landing',
  },
];
