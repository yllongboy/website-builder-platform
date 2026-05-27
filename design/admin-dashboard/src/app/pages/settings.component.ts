import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon.component';
import { LayoutComponent, ToastService, ToggleComponent } from '../ui.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, ToggleComponent, IconComponent],
  template: `
    <app-layout><div class="flex flex-col gap-6"><div class="flex items-center justify-between"><div><h1 class="text-xl font-semibold text-foreground tracking-tight">Settings</h1><p class="text-[13px] text-muted-foreground mt-0.5">Manage platform settings</p></div><button (click)="save()" class="inline-flex items-center gap-1.5 bg-primary text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium"><app-icon name="save" [size]="16"></app-icon>Save Changes</button></div>
      <div class="flex gap-6"><aside class="w-48 flex-shrink-0"><nav class="flex flex-col gap-0.5"><button *ngFor="let tab of tabs" (click)="activeTab = tab.id" [ngClass]="activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/70 text-foreground-muted'" class="flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-all"><app-icon [name]="tab.icon" [size]="16"></app-icon><span class="text-[13px] font-medium">{{ tab.label }}</span></button></nav></aside>
      <main class="flex-1"><section *ngIf="activeTab === 'general'" class="bg-background border border-border/70 rounded-lg p-5"><h2 class="text-sm font-medium text-foreground mb-5">General Settings</h2><div class="flex flex-col gap-6"><label class="flex flex-col gap-1.5 text-sm font-medium">Site Name<input [(ngModel)]="siteName" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"></label><label class="flex flex-col gap-1.5 text-sm font-medium">Site Description<textarea [(ngModel)]="siteDescription" rows="3" class="px-3 py-2 text-sm bg-background border border-border rounded-lg resize-none"></textarea></label><label class="flex flex-col gap-1.5 text-sm font-medium">Support Email<input type="email" [(ngModel)]="supportEmail" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"></label></div></section>
      <section *ngIf="activeTab === 'notifications'" class="bg-background border border-border/70 rounded-lg p-5"><h2 class="text-lg font-semibold mb-6">Notification Settings</h2><div class="flex flex-col gap-6"><app-toggle label="Email Notifications" description="Receive notifications via email" [(enabled)]="emailNotifications"></app-toggle><div class="border-t border-border"></div><app-toggle label="New User Signups" description="Get notified when a new user registers" [(enabled)]="newUserNotifications"></app-toggle><app-toggle label="Payment Alerts" description="Get notified about payment events" [(enabled)]="paymentNotifications"></app-toggle><app-toggle label="Weekly Report" description="Receive a weekly summary of platform activity" [(enabled)]="weeklyReport"></app-toggle></div></section>
      <section *ngIf="activeTab === 'security'" class="bg-background border border-border/70 rounded-lg p-5"><h2 class="text-lg font-semibold mb-6">Security Settings</h2><div class="flex flex-col gap-6"><app-toggle label="Require Two-Factor Authentication" description="Enforce 2FA for all admin users" [(enabled)]="twoFactorRequired"></app-toggle><div class="border-t border-border"></div><label class="flex flex-col gap-1.5 text-sm font-medium">Session Timeout (hours)<input type="number" [(ngModel)]="sessionTimeout" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"></label><label class="flex flex-col gap-1.5 text-sm font-medium">Minimum Password Length<input type="number" [(ngModel)]="passwordMinLength" class="px-3 py-2 text-sm bg-background border border-border rounded-lg"></label></div></section>
      <section *ngIf="activeTab === 'appearance'" class="bg-background border border-border/70 rounded-lg p-5"><h2 class="text-lg font-semibold mb-6">Appearance Settings</h2><div class="flex flex-col gap-6"><div><label class="text-sm font-medium block mb-3">Primary Color</label><div class="flex items-center gap-3"><button *ngFor="let color of colors" [style.backgroundColor]="color" class="w-10 h-10 rounded-lg border-2 border-transparent hover:border-foreground/20"></button></div></div><div class="border-t border-border"></div><div class="grid grid-cols-3 gap-3"><button class="p-4 border-2 border-primary rounded-lg bg-white">Light</button><button class="p-4 border-2 border-border rounded-lg bg-gray-900 text-white">Dark</button><button class="p-4 border-2 border-border rounded-lg bg-gradient-to-b from-white to-gray-900">System</button></div></div></section>
      <section *ngIf="activeTab === 'database'" class="bg-background border border-border/70 rounded-lg p-5"><h2 class="text-lg font-semibold mb-6">Database Settings</h2><div class="p-4 bg-muted/50 rounded-lg"><div class="flex items-center justify-between mb-3"><span class="text-sm font-medium">Database Status</span><span class="inline-flex items-center gap-1.5 text-sm text-success"><span class="w-2 h-2 bg-success rounded-full"></span>Connected</span></div><div class="grid grid-cols-3 gap-4 text-sm"><div><p class="text-muted-foreground">Tables</p><p class="font-semibold">24</p></div><div><p class="text-muted-foreground">Size</p><p class="font-semibold">1.2 GB</p></div><div><p class="text-muted-foreground">Last Backup</p><p class="font-semibold">2h ago</p></div></div></div></section></main></div></div></app-layout>
  `
})
export class SettingsComponent {
  private toast = inject(ToastService);
  activeTab = 'general';
  tabs = [{ id: 'general', label: 'General', icon: 'globe' }, { id: 'notifications', label: 'Notifications', icon: 'bell' }, { id: 'security', label: 'Security', icon: 'shield' }, { id: 'appearance', label: 'Appearance', icon: 'palette' }, { id: 'database', label: 'Database', icon: 'database' }];
  colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#10b981', '#06b6d4'];
  siteName = 'SiteBuilder';
  siteDescription = 'Create beautiful websites with our easy-to-use builder.';
  supportEmail = 'support@sitebuilder.com';
  emailNotifications = true;
  newUserNotifications = true;
  paymentNotifications = true;
  weeklyReport = false;
  twoFactorRequired = false;
  sessionTimeout = '24';
  passwordMinLength = '8';
  save(): void { this.toast.add('success', 'Settings saved successfully!'); }
}
