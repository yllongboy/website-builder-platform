import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/pages/dashboard.component';
import { UsersComponent } from './app/pages/users.component';
import { WebsitesComponent } from './app/pages/websites.component';
import { TemplatesComponent } from './app/pages/templates.component';
import { CategoriesComponent } from './app/pages/categories.component';
import { BillingComponent } from './app/pages/billing.component';
import { SettingsComponent } from './app/pages/settings.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'websites', component: WebsitesComponent },
  { path: 'templates', component: TemplatesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimations()]
}).catch((error) => console.error(error));
