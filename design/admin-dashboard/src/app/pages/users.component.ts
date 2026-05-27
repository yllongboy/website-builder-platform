import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { mockUsers } from '../mock-data';
import type { User } from '../models';
import { BadgeComponent, BadgeVariant, ConfirmModalComponent, LayoutComponent, ModalComponent } from '../ui.component';
import { IconComponent } from '../icon.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent, BadgeComponent, ModalComponent, ConfirmModalComponent, IconComponent],
  template: `
    <app-layout>
      <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between"><div><h1 class="text-xl font-semibold text-foreground tracking-tight">Users</h1><p class="text-[13px] text-muted-foreground mt-0.5">Manage user accounts and permissions</p></div><button class="inline-flex items-center gap-1.5 bg-primary text-white rounded-md px-3.5 py-1.5 text-[13px] font-medium"><app-icon name="plus" [size]="16"></app-icon>Add User</button></div>
        <section class="bg-background border border-border/70 rounded-lg p-4 flex flex-wrap items-center gap-2.5">
          <div class="relative flex-1 min-w-56"><app-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"></app-icon><input [(ngModel)]="searchQuery" placeholder="Search users by name or email..." class="w-full pl-9 pr-4 py-1.5 text-[13px] bg-muted/40 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30"></div>
          <select [(ngModel)]="roleFilter" class="px-2.5 py-1.5 text-[13px] bg-muted/40 border-0 rounded-md"><option value="">All Roles</option><option value="admin">Admin</option><option value="editor">Editor</option><option value="user">User</option></select>
          <select [(ngModel)]="statusFilter" class="px-2.5 py-1.5 text-[13px] bg-muted/40 border-0 rounded-md"><option value="">All Statuses</option><option value="active">Active</option><option value="suspended">Suspended</option><option value="pending">Pending</option></select>
          <button *ngIf="searchQuery || roleFilter || statusFilter" (click)="clearFilters()" class="inline-flex items-center gap-1.5 text-foreground-muted hover:bg-muted/70 rounded-md px-2.5 py-1 text-xs"><app-icon name="x" [size]="14"></app-icon>Clear</button>
        </section>
        <section *ngIf="selectedIds.length" class="bg-background border border-border/70 rounded-lg p-4 flex items-center gap-4">
          <span class="text-sm text-muted-foreground">{{ selectedIds.length }} user{{ selectedIds.length > 1 ? 's' : '' }} selected</span>
          <button class="inline-flex items-center gap-1.5 border border-border/80 rounded-md px-2.5 py-1 text-xs"><app-icon name="ban" [size]="16"></app-icon>Suspend Selected</button>
          <button (click)="selectedIds = []" class="text-xs text-foreground-muted hover:bg-muted/70 rounded-md px-2.5 py-1">Clear Selection</button>
        </section>
        <section class="bg-background border border-border/70 rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="border-b border-border/70"><tr><th class="w-10 px-4 py-2.5"><input type="checkbox" [checked]="allSelected" (change)="toggleAll()"></th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">User</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Role</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Status</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Websites</th><th class="px-4 py-2.5 text-left text-[11px] uppercase text-muted-foreground">Created</th><th class="w-28"></th></tr></thead>
            <tbody class="divide-y divide-border/50">
              <tr *ngFor="let user of filteredUsers" class="hover:bg-muted/40 transition-colors">
                <td class="w-10 px-4 py-2.5"><input type="checkbox" [checked]="selectedIds.includes(user.id)" (change)="toggleSelection(user.id)"></td>
                <td class="px-4 py-2.5"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">{{ user.name.charAt(0) }}</div><div><p class="font-medium text-[13px]">{{ user.name }}</p><p class="text-xs text-muted-foreground">{{ user.email }}</p></div></div></td>
                <td class="px-4 py-2.5"><app-badge [variant]="roleVariant(user.role)">{{ titleCase(user.role) }}</app-badge></td>
                <td class="px-4 py-2.5"><app-badge [variant]="statusVariant(user.status)">{{ titleCase(user.status) }}</app-badge></td>
                <td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ user.websitesCount }}</td>
                <td class="px-4 py-2.5 text-[13px] text-muted-foreground">{{ user.createdAt | date }}</td>
                <td class="px-4 py-2.5"><div class="flex items-center gap-1"><button (click)="viewUser(user)" class="p-1.5 rounded hover:bg-muted"><app-icon name="eye" [size]="16" className="text-muted-foreground"></app-icon></button><button *ngIf="user.status === 'suspended'; else suspendButton" (click)="activate(user.id)" class="p-1.5 rounded hover:bg-muted"><app-icon name="check" [size]="16" className="text-success"></app-icon></button><ng-template #suspendButton><button (click)="requestSuspend(user)" class="p-1.5 rounded hover:bg-muted"><app-icon name="ban" [size]="16" className="text-destructive"></app-icon></button></ng-template></div></td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!filteredUsers.length" class="py-12 text-center text-sm text-muted-foreground">No users found matching your filters.</div>
        </section>
      </div>
      <app-modal [open]="showViewModal" title="User Details" (close)="showViewModal = false">
        <div *ngIf="selectedUser" class="flex flex-col gap-4"><div class="flex items-center gap-4"><div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">{{ selectedUser.name.charAt(0) }}</div><div><h3 class="text-lg font-semibold">{{ selectedUser.name }}</h3><p class="text-muted-foreground">{{ selectedUser.email }}</p></div></div><div class="grid grid-cols-2 gap-4 pt-4 border-t border-border"><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Role</p><p class="font-medium mt-1 capitalize">{{ selectedUser.role }}</p></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Status</p><app-badge [variant]="statusVariant(selectedUser.status)" extraClass="mt-1">{{ selectedUser.status }}</app-badge></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Websites</p><p class="font-medium mt-1">{{ selectedUser.websitesCount }}</p></div><div><p class="text-xs text-muted-foreground uppercase tracking-wide">Created</p><p class="font-medium mt-1">{{ selectedUser.createdAt | date }}</p></div></div></div>
      </app-modal>
      <app-confirm-modal [open]="showSuspendModal" title="Suspend User" [message]="'Are you sure you want to suspend ' + (selectedUser?.name || 'this user') + '? They will lose access to their account until reactivated.'" confirmText="Suspend User" (close)="showSuspendModal = false" (confirm)="confirmSuspend()"></app-confirm-modal>
    </app-layout>
  `
})
export class UsersComponent {
  users: User[] = [...mockUsers];
  searchQuery = '';
  roleFilter = '';
  statusFilter = '';
  selectedIds: string[] = [];
  selectedUser: User | null = null;
  showViewModal = false;
  showSuspendModal = false;
  get filteredUsers(): User[] {
    const q = this.searchQuery.toLowerCase();
    return this.users.filter((user) => (!q || user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q)) && (!this.roleFilter || user.role === this.roleFilter) && (!this.statusFilter || user.status === this.statusFilter));
  }
  get allSelected(): boolean { return this.filteredUsers.length > 0 && this.filteredUsers.every((user) => this.selectedIds.includes(user.id)); }
  toggleAll(): void { this.selectedIds = this.allSelected ? [] : this.filteredUsers.map((user) => user.id); }
  toggleSelection(id: string): void { this.selectedIds = this.selectedIds.includes(id) ? this.selectedIds.filter((item) => item !== id) : [...this.selectedIds, id]; }
  clearFilters(): void { this.searchQuery = ''; this.roleFilter = ''; this.statusFilter = ''; }
  viewUser(user: User): void { this.selectedUser = user; this.showViewModal = true; }
  requestSuspend(user: User): void { this.selectedUser = user; this.showSuspendModal = true; }
  activate(id: string): void { this.users = this.users.map((user) => user.id === id ? { ...user, status: 'active' } : user); }
  confirmSuspend(): void { if (this.selectedUser) this.users = this.users.map((user) => user.id === this.selectedUser?.id ? { ...user, status: 'suspended' } : user); }
  statusVariant(status: User['status']): BadgeVariant { return ({ active: 'success', suspended: 'destructive', pending: 'warning' })[status] as BadgeVariant; }
  roleVariant(role: User['role']): BadgeVariant { return ({ admin: 'default', editor: 'secondary', user: 'outline' })[role] as BadgeVariant; }
  titleCase(value: string): string { return value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' '); }
}
