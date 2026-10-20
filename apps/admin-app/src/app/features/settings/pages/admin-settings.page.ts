import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminSettingsResponse, UpdateAdminSettingsRequest } from '@platform/shared-models';
import { IconComponent } from '../../../core/shared/icon.component';
import { AdminSettingsApiService } from '../data-access/admin-settings-api.service';

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
          [disabled]="!settingsLoaded || loading || saving"
          [attr.aria-busy]="saving"
          class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors">
          <wb-icon name="save" [size]="16"></wb-icon>{{ saving ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>

      <div *ngIf="loading" role="status" aria-live="polite"
        class="text-[13px] text-foreground-muted">Loading platform settings…</div>
      <div *ngIf="loadError" role="alert"
        class="bg-danger/10 text-danger border border-danger/20 rounded-md px-4 py-3 text-[13px]">{{ loadError }}</div>
      <div *ngIf="saveError" role="alert"
        class="bg-danger/10 text-danger border border-danger/20 rounded-md px-4 py-3 text-[13px]">{{ saveError }}</div>

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
                <input type="text" [(ngModel)]="siteName" [disabled]="!settingsLoaded || saving"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Site Description</span>
                <textarea [(ngModel)]="siteDescription" rows="3" [disabled]="!settingsLoaded || saving"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground resize-none"></textarea>
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Support Email</span>
                <input type="email" [(ngModel)]="supportEmail" [disabled]="!settingsLoaded || saving"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground" />
              </label>
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
                  [disabled]="!settingsLoaded || saving"
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
                  [disabled]="!settingsLoaded || saving"
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
                  [disabled]="!settingsLoaded || saving"
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
                  [disabled]="!settingsLoaded || saving"
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
                  [disabled]="!settingsLoaded || saving"
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
                <input type="number" [(ngModel)]="sessionTimeout" min="1" max="720" [disabled]="!settingsLoaded || saving"
                  class="px-3 py-2 text-[13px] bg-background border border-border/70 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 text-foreground w-32" />
              </label>
              <label class="flex flex-col gap-1.5">
                <span class="text-[13px] font-medium text-foreground">Minimum Password Length</span>
                <input type="number" [(ngModel)]="passwordMinLength" min="8" max="128" [disabled]="!settingsLoaded || saving"
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
export class AdminSettingsPage implements OnInit {
  private readonly settingsApi = inject(AdminSettingsApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  activeTab = 'general';
  savedSuccess = false;
  loading = true;
  saving = false;
  settingsLoaded = false;
  loadError?: string;
  saveError?: string;

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

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading = true;
    this.loadError = undefined;
    this.settingsApi.getSettings().subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.settingsLoaded = true;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error: { status?: number; error?: { message?: string } }) => {
        this.loadError = this.errorMessage(error, 'load');
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  save(): void {
    if (!this.settingsLoaded || this.loading || this.saving) return;

    const request: UpdateAdminSettingsRequest = {
      siteName: this.siteName,
      siteDescription: this.siteDescription,
      supportEmail: this.supportEmail,
      notifications: {
        emailNotifications: this.emailNotifications,
        newUserNotifications: this.newUserNotifications,
        paymentNotifications: this.paymentNotifications,
        weeklyReport: this.weeklyReport,
      },
      security: {
        twoFactorRequired: this.twoFactorRequired,
        sessionTimeout: this.sessionTimeout,
        passwordMinLength: this.passwordMinLength,
      },
    };

    this.saving = true;
    this.savedSuccess = false;
    this.saveError = undefined;
    this.settingsApi.updateSettings(request).subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.saving = false;
        this.savedSuccess = true;
        this.cdr.markForCheck();
      },
      error: (error: { status?: number; error?: { message?: string } }) => {
        this.saving = false;
        this.saveError = this.errorMessage(error, 'save');
        this.cdr.markForCheck();
      },
    });
  }

  private applySettings(settings: AdminSettingsResponse): void {
    this.siteName = settings.siteName;
    this.siteDescription = settings.siteDescription;
    this.supportEmail = settings.supportEmail;
    this.emailNotifications = settings.notifications.emailNotifications;
    this.newUserNotifications = settings.notifications.newUserNotifications;
    this.paymentNotifications = settings.notifications.paymentNotifications;
    this.weeklyReport = settings.notifications.weeklyReport;
    this.twoFactorRequired = settings.security.twoFactorRequired;
    this.sessionTimeout = settings.security.sessionTimeout;
    this.passwordMinLength = settings.security.passwordMinLength;
  }

  private errorMessage(error: { status?: number; error?: { message?: string } }, operation: 'load' | 'save'): string {
    if (error.status === 401 || error.status === 403) {
      return 'You do not have permission to manage platform settings. Please sign in with an administrator account.';
    }
    if (error.status === 400 || error.status === 422) {
      return error.error?.message || 'Some settings are invalid. Check the values and try again.';
    }
    return error.error?.message || `Unable to ${operation} platform settings. Please try again.`;
  }
}
