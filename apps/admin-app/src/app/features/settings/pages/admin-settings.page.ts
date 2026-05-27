import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../core/shared/icon.component';

interface SettingsTab {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'wb-admin-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">

      <!-- Page Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-[15px] font-semibold text-foreground tracking-tight leading-6">Settings</h1>
          <p class="text-[13px] text-foreground-muted mt-1 leading-5">Manage platform settings</p>
        </div>
        <button type="button" (click)="save()"
          class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors">
          <wb-icon name="save" [size]="16"></wb-icon>Save Changes
        </button>
      </div>

      <!-- Save Success Banner -->
      <div *ngIf="savedSuccess"
        class="bg-success/10 text-success border border-success/20 rounded-md px-4 py-3 text-[13px] font-medium flex items-center gap-2">
        <wb-icon name="check" [size]="16"></wb-icon>Settings saved successfully!
      </div>

      <!-- Tabbed Layout -->
      <div class="flex gap-6">

        <!-- Left Tab Nav -->
        <aside class="w-44 flex-shrink-0">
          <nav class="flex flex-col gap-0.5">
            <button
              *ngFor="let tab of tabs"
              type="button"
              (click)="activeTab = tab.id; savedSuccess = false"
              [ngClass]="activeTab === tab.id
                ? 'bg-primary/10 text-primary'
                : 'text-foreground-muted hover:bg-muted/70'"
              class="flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-all w-full">
              <wb-icon [name]="tab.icon" [size]="16"></wb-icon>
              <span class="text-[13px] font-medium">{{ tab.label }}</span>
            </button>
          </nav>
        </aside>

        <!-- Tab Content -->
        <main class="flex-1 min-w-0">

          <!-- General -->
          <section *ngIf="activeTab === 'general'" class="bg-background border border-border/70 rounded-lg p-5">
            <h2 class="text-[13px] font-semibold text-foreground mb-5">General Settings</h2>
            <div class="flex flex-col gap-5">
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Site Name</span>
                <input type="text" [(ngModel)]="siteName"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Site Description</span>
                <textarea [(ngModel)]="siteDescription" rows="3"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground resize-none"></textarea>
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Support Email</span>
                <input type="email" [(ngModel)]="supportEmail"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground" />
              </label>
              <div class="pt-2 text-xs text-foreground-muted border-t border-border/50">
                These settings are local placeholders. Backend persistence tracked in <span class="font-medium">SCRUM-107</span>.
              </div>
            </div>
          </section>

          <!-- Notifications -->
          <section *ngIf="activeTab === 'notifications'" class="bg-background border border-border/70 rounded-lg p-5">
            <h2 class="text-[13px] font-semibold text-foreground mb-5">Notification Settings</h2>
            <div class="flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[13px] font-medium text-foreground">Email Notifications</p>
                  <p class="text-xs text-foreground-muted mt-0.5">Receive notifications via email</p>
                </div>
                <button type="button" (click)="emailNotifications = !emailNotifications"
                  [attr.aria-pressed]="emailNotifications"
                  [ngClass]="emailNotifications ? 'bg-primary' : 'bg-muted'"
                  class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0">
                  <span [ngClass]="emailNotifications ? 'translate-x-5' : 'translate-x-0.5'"
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block"></span>
                </button>
              </div>
              <div class="border-t border-border/50"></div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[13px] font-medium text-foreground">New User Signups</p>
                  <p class="text-xs text-foreground-muted mt-0.5">Get notified when a new user registers</p>
                </div>
                <button type="button" (click)="newUserNotifications = !newUserNotifications"
                  [attr.aria-pressed]="newUserNotifications"
                  [ngClass]="newUserNotifications ? 'bg-primary' : 'bg-muted'"
                  class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0">
                  <span [ngClass]="newUserNotifications ? 'translate-x-5' : 'translate-x-0.5'"
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block"></span>
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[13px] font-medium text-foreground">Payment Alerts</p>
                  <p class="text-xs text-foreground-muted mt-0.5">Get notified about payment events</p>
                </div>
                <button type="button" (click)="paymentNotifications = !paymentNotifications"
                  [attr.aria-pressed]="paymentNotifications"
                  [ngClass]="paymentNotifications ? 'bg-primary' : 'bg-muted'"
                  class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0">
                  <span [ngClass]="paymentNotifications ? 'translate-x-5' : 'translate-x-0.5'"
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block"></span>
                </button>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[13px] font-medium text-foreground">Weekly Report</p>
                  <p class="text-xs text-foreground-muted mt-0.5">Receive a weekly summary of platform activity</p>
                </div>
                <button type="button" (click)="weeklyReport = !weeklyReport"
                  [attr.aria-pressed]="weeklyReport"
                  [ngClass]="weeklyReport ? 'bg-primary' : 'bg-muted'"
                  class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0">
                  <span [ngClass]="weeklyReport ? 'translate-x-5' : 'translate-x-0.5'"
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block"></span>
                </button>
              </div>
            </div>
          </section>

          <!-- Security -->
          <section *ngIf="activeTab === 'security'" class="bg-background border border-border/70 rounded-lg p-5">
            <h2 class="text-[13px] font-semibold text-foreground mb-5">Security Settings</h2>
            <div class="flex flex-col gap-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[13px] font-medium text-foreground">Require Two-Factor Authentication</p>
                  <p class="text-xs text-foreground-muted mt-0.5">Enforce 2FA for all admin users</p>
                </div>
                <button type="button" (click)="twoFactorRequired = !twoFactorRequired"
                  [attr.aria-pressed]="twoFactorRequired"
                  [ngClass]="twoFactorRequired ? 'bg-primary' : 'bg-muted'"
                  class="relative w-11 h-6 rounded-full transition-colors flex-shrink-0">
                  <span [ngClass]="twoFactorRequired ? 'translate-x-5' : 'translate-x-0.5'"
                    class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform block"></span>
                </button>
              </div>
              <div class="border-t border-border/50"></div>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Session Timeout (hours)</span>
                <input type="number" [(ngModel)]="sessionTimeout" min="1" max="720"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground w-32" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Minimum Password Length</span>
                <input type="number" [(ngModel)]="passwordMinLength" min="6" max="32"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground w-32" />
              </label>
            </div>
          </section>

          <!-- Appearance -->
          <section *ngIf="activeTab === 'appearance'" class="bg-background border border-border/70 rounded-lg p-5">
            <h2 class="text-[13px] font-semibold text-foreground mb-5">Appearance Settings</h2>
            <div class="flex flex-col gap-5">
              <div>
                <p class="text-[13px] font-medium text-foreground mb-3">Primary Color</p>
                <div class="flex items-center gap-2 flex-wrap">
                  <button
                    *ngFor="let color of colors"
                    type="button"
                    (click)="selectedColor = color"
                    [style.backgroundColor]="color"
                    [ngClass]="selectedColor === color ? 'ring-2 ring-offset-2 ring-foreground/30' : ''"
                    class="w-9 h-9 rounded-md border border-white/20 transition-all"
                    [attr.aria-label]="'Select color ' + color">
                  </button>
                </div>
              </div>
              <div class="border-t border-border/50"></div>
              <div>
                <p class="text-[13px] font-medium text-foreground mb-3">Theme</p>
                <div class="grid grid-cols-3 gap-3">
                  <button type="button" (click)="selectedTheme = 'light'"
                    [ngClass]="selectedTheme === 'light' ? 'border-primary ring-1 ring-primary/30' : 'border-border/70'"
                    class="p-4 border-2 rounded-md bg-white text-[13px] font-medium text-foreground transition-all">Light</button>
                  <button type="button" (click)="selectedTheme = 'dark'"
                    [ngClass]="selectedTheme === 'dark' ? 'border-primary ring-1 ring-primary/30' : 'border-border/70'"
                    class="p-4 border-2 rounded-md bg-gray-900 text-white text-[13px] font-medium transition-all">Dark</button>
                  <button type="button" (click)="selectedTheme = 'system'"
                    [ngClass]="selectedTheme === 'system' ? 'border-primary ring-1 ring-primary/30' : 'border-border/70'"
                    class="p-4 border-2 rounded-md bg-gradient-to-b from-white to-gray-900 text-[13px] font-medium transition-all">System</button>
                </div>
              </div>
              <div class="pt-2 text-xs text-foreground-muted border-t border-border/50">
                Theme and color settings are local placeholders. Backend persistence tracked in <span class="font-medium">SCRUM-107</span>.
              </div>
            </div>
          </section>

          <!-- Database -->
          <section *ngIf="activeTab === 'database'" class="bg-background border border-border/70 rounded-lg p-5">
            <h2 class="text-[13px] font-semibold text-foreground mb-5">Database Settings</h2>
            <div class="flex flex-col gap-4">
              <div class="p-4 bg-muted/40 rounded-lg border border-border/50">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-[13px] font-medium text-foreground">Database Status</span>
                  <span class="inline-flex items-center gap-1.5 text-[13px] text-success font-medium">
                    <span class="w-2 h-2 bg-success rounded-full"></span>Connected
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <p class="text-xs text-foreground-muted mb-1">Tables</p>
                    <p class="text-[13px] font-semibold text-foreground">—</p>
                  </div>
                  <div>
                    <p class="text-xs text-foreground-muted mb-1">Size</p>
                    <p class="text-[13px] font-semibold text-foreground">—</p>
                  </div>
                  <div>
                    <p class="text-xs text-foreground-muted mb-1">Last Backup</p>
                    <p class="text-[13px] font-semibold text-foreground">—</p>
                  </div>
                </div>
              </div>
              <p class="text-xs text-foreground-muted">
                Database statistics are placeholders. Backend stats endpoint tracked in <span class="font-medium">SCRUM-107</span>.
              </p>
            </div>
          </section>

        </main>
      </div>
    </div>
  `
})
export class AdminSettingsPage {
  activeTab = 'general';
  savedSuccess = false;

  readonly tabs: SettingsTab[] = [
    { id: 'general',       label: 'General',       icon: 'globe' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'security',      label: 'Security',       icon: 'shield' },
    { id: 'appearance',    label: 'Appearance',    icon: 'palette' },
    { id: 'database',      label: 'Database',      icon: 'database' },
  ];

  readonly colors: string[] = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#f97316', '#10b981', '#06b6d4',
  ];

  // General
  siteName = 'SiteBuilder';
  siteDescription = 'Create beautiful websites with our easy-to-use builder.';
  supportEmail = 'support@sitebuilder.com';

  // Notifications
  emailNotifications = true;
  newUserNotifications = true;
  paymentNotifications = true;
  weeklyReport = false;

  // Security
  twoFactorRequired = false;
  sessionTimeout = 24;
  passwordMinLength = 8;

  // Appearance
  selectedColor = '#6366f1';
  selectedTheme: 'light' | 'dark' | 'system' = 'light';

  save(): void {
    this.savedSuccess = true;
    // Auto-hide after 4 seconds
    window.setTimeout(() => { this.savedSuccess = false; }, 4000);
  }
}