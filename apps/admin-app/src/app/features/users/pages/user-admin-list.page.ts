import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdminApiService } from '../data-access/user-admin-api.service';
import { AdminUserResponse, UserStatus } from '@platform/shared-models';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { AuthService } from '@platform/auth';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'app-user-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-[18px] font-semibold text-foreground tracking-tight leading-7">All Users</h1>
        <p class="text-[13px] text-foreground-muted mt-0.5 leading-5">Manage user accounts and permissions</p>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-wrap items-center gap-1.5">
        <div class="relative flex-1 min-w-56">
          <wb-icon name="search" [size]="16" className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/60"></wb-icon>
          <input
            type="text"
            [(ngModel)]="emailFilter"
            (ngModelChange)="applyFilters()"
            placeholder="Search users by email..."
            class="bg-muted/40 border-0 rounded-md text-[13px] px-3 py-1.5 w-full text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-primary/30 pl-9"
          />
        </div>
        <select
          [(ngModel)]="statusFilter"
          (ngModelChange)="applyFilters()"
          class="bg-muted/40 border-0 rounded-md text-[13px] px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
        >
          <option value="">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
        <select
          [(ngModel)]="roleFilter"
          (ngModelChange)="applyFilters()"
          class="bg-muted/40 border-0 rounded-md text-[13px] px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="py-16 text-center text-foreground-muted">Loading users...</div>
      <div *ngIf="error" class="bg-destructive/10 text-destructive rounded-xl p-4 text-sm">{{ error }}</div>

      <!-- Empty State -->
      <div *ngIf="!loading && users.length === 0 && !error" class="py-16 text-center text-foreground-muted">No users found.</div>

      <!-- Table -->
      <section *ngIf="!loading && users.length > 0" class="bg-background border border-border/70 rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-border/50">
          <thead class="border-b border-border/70">
            <tr>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">User</th>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">Role</th>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">Status</th>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">Websites</th>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">Created</th>
              <th scope="col" class="px-4 py-3 text-left text-[13px] font-medium text-foreground-muted tracking-normal">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr *ngFor="let user of users" class="hover:bg-muted/25 transition-colors duration-100">
              <td class="px-4 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                    {{ getUserInitial(user.email) }}
                  </div>
                  <div>
                    <p class="text-[13px] font-medium text-foreground">—</p>
                    <p class="text-[13px] text-foreground-muted">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <span *ngIf="user.role === 'ADMIN'" class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded bg-primary/10 text-primary">ADMIN</span>
                <span *ngIf="user.role === 'USER'" class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border border-border/80 text-foreground-muted">USER</span>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap">
                <app-status-badge [status]="user.status" type="user"></app-status-badge>
              </td>
              <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground-muted">{{ user.websiteCount }}</td>
              <td class="px-4 py-3.5 whitespace-nowrap text-[13px] text-foreground-muted">{{ user.createdAt | date:'mediumDate' }}</td>
              <td class="px-4 py-3.5 whitespace-nowrap flex items-center gap-1">
                <button
                  type="button"
                  (click)="openViewModal(user)"
                  class="p-1.5 rounded-md hover:bg-muted text-foreground-muted transition-colors"
                >
                  <wb-icon name="eye" [size]="16"></wb-icon>
                </button>
                <button
                  type="button"
                  *ngIf="user.status === 'ACTIVE'"
                  (click)="openSuspendModal(user)"
                  [disabled]="!currentAdminId || user.id === currentAdminId || processingId === user.id"
                  class="p-1.5 rounded-md hover:bg-muted text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 bg-transparent flex"
                >
                  <wb-icon name="ban" [size]="16"></wb-icon>
                </button>
                <button
                  type="button"
                  *ngIf="user.status === 'SUSPENDED'"
                  (click)="openReactivateModal(user)"
                  [disabled]="!currentAdminId || user.id === currentAdminId || processingId === user.id"
                  class="p-1.5 rounded-md hover:bg-muted text-success transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-0 bg-transparent flex"
                >
                  <wb-icon name="check" [size]="16"></wb-icon>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- View User Modal -->
      <div *ngIf="showViewModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="closeViewModal()"></div>
        <div class="relative bg-background rounded-xl shadow-2xl w-full max-w-md mx-4" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 class="text-base font-semibold text-foreground">User Details</h2>
            <button type="button" aria-label="Close" class="p-1 rounded-md hover:bg-muted transition-colors text-foreground-muted" (click)="closeViewModal()">
              <wb-icon name="x" [size]="20"></wb-icon>
            </button>
          </div>
          <div class="px-6 py-5 flex flex-col gap-4">
            <div class="flex flex-col items-center gap-3">
              <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                {{ getUserInitial(selectedUser?.email || '') }}
              </div>
              <div class="text-center">
                <p class="text-base font-semibold text-foreground">—</p>
                <p class="text-[13px] text-foreground-muted">{{ selectedUser?.email }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">ROLE</span>
                <span *ngIf="selectedUser?.role === 'ADMIN'" class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded bg-primary/10 text-primary">ADMIN</span>
                <span *ngIf="selectedUser?.role === 'USER'" class="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border border-border/80 text-foreground-muted">USER</span>
              </div>
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">STATUS</span>
                <app-status-badge *ngIf="selectedUser?.status" [status]="selectedUser!.status" type="user"></app-status-badge>
              </div>
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">WEBSITES</span>
                <span class="text-[13px] text-foreground-muted">{{ selectedUser?.websiteCount }}</span>
              </div>
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">CREATED</span>
                <span class="text-[13px] text-foreground">{{ selectedUser?.createdAt | date:'mediumDate' }}</span>
              </div>
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">SUBSCRIPTION</span>
                <app-status-badge *ngIf="selectedUser?.subscriptionStatus" [status]="selectedUser!.subscriptionStatus" type="subscription"></app-status-badge>
                <span *ngIf="!selectedUser?.subscriptionStatus" class="text-[13px] text-foreground-muted">—</span>
              </div>
              <div>
                <span class="block text-[13px] text-foreground-muted uppercase tracking-wide mb-1">PLAN</span>
                <span class="text-[13px] text-foreground">{{ selectedUser?.planCode || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Suspend Modal -->
      <div *ngIf="showSuspendModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="closeSuspendModal()"></div>
        <div class="relative bg-background rounded-xl shadow-2xl w-full max-w-sm mx-4" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 class="text-base font-semibold text-foreground">Suspend User</h2>
            <button type="button" aria-label="Close suspend dialog" class="p-1 rounded-md hover:bg-muted transition-colors text-foreground-muted" (click)="closeSuspendModal()">
              <wb-icon name="x" [size]="20"></wb-icon>
            </button>
          </div>
          <div class="px-6 py-4">
            <p class="text-[13px] text-foreground">Are you sure you want to suspend <strong>{{ selectedUser?.email }}</strong>? They will lose access until reactivated.</p>
          </div>
          <div class="px-6 py-4 border-t border-border bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
            <button type="button" class="inline-flex items-center justify-center font-medium rounded-md transition-all border border-border/80 text-foreground hover:bg-muted/50 px-3.5 py-1.5 text-[13px]" (click)="closeSuspendModal()">Cancel</button>
            <button type="button" class="inline-flex items-center justify-center font-medium rounded-md transition-all bg-destructive text-white hover:bg-destructive/90 px-3.5 py-1.5 text-[13px]" (click)="confirmSuspend()">Suspend User</button>
          </div>
        </div>
      </div>

      <!-- Reactivate Modal -->
      <div *ngIf="showReactivateModal && selectedUser" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-foreground/50 backdrop-blur-sm" (click)="closeReactivateModal()"></div>
        <div class="relative bg-background rounded-xl shadow-2xl w-full max-w-sm mx-4" role="dialog" aria-modal="true">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 class="text-base font-semibold text-foreground">Reactivate User</h2>
            <button type="button" aria-label="Close reactivate dialog" class="p-1 rounded-md hover:bg-muted transition-colors text-foreground-muted" (click)="closeReactivateModal()">
              <wb-icon name="x" [size]="20"></wb-icon>
            </button>
          </div>
          <div class="px-6 py-4">
            <p class="text-[13px] text-foreground">Are you sure you want to reactivate <strong>{{ selectedUser?.email }}</strong>?</p>
          </div>
          <div class="px-6 py-4 border-t border-border bg-muted/30 rounded-b-xl flex items-center justify-end gap-3">
            <button type="button" class="inline-flex items-center justify-center font-medium rounded-md transition-all border border-border/80 text-foreground hover:bg-muted/50 px-3.5 py-1.5 text-[13px]" (click)="closeReactivateModal()">Cancel</button>
            <button type="button" class="inline-flex items-center justify-center font-medium rounded-md transition-all bg-success text-white hover:bg-success/90 px-3.5 py-1.5 text-[13px]" (click)="confirmReactivate()">Reactivate</button>
          </div>
        </div>
      </div>

    </div>
  `
})
export class UserAdminListPage implements OnInit {
  private readonly userAdminApi = inject(UserAdminApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly authService = inject(AuthService);

  users: AdminUserResponse[] = [];
  loading = true;
  error: string | null = null;
  processingId: string | null = null;
  
  // Retrieved from the authenticated backend session
  currentAdminId: string | null = '';

  emailFilter = '';
  statusFilter = '';
  roleFilter = '';

  // New component state
  selectedUser: AdminUserResponse | null = null;
  showViewModal = false;
  showSuspendModal = false;
  showReactivateModal = false;

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.showViewModal = false;
    this.showSuspendModal = false;
    this.showReactivateModal = false;
    this.selectedUser = null;
    this.cdr.markForCheck();
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedUser = null;
  }

  closeSuspendModal(): void {
    this.showSuspendModal = false;
    this.selectedUser = null;
  }

  closeReactivateModal(): void {
    this.showReactivateModal = false;
    this.selectedUser = null;
  }

  ngOnInit(): void {
    // Get current logged-in user
    this.authService.getMe().subscribe({
      next: (user) => {
        this.currentAdminId = user.id;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load current admin');
        this.currentAdminId = '';
        this.cdr.markForCheck();
      }
    });

    this.loadUsers();
  }

  applyFilters(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userAdminApi.listAll({
      email: this.emailFilter || undefined,
      status: this.statusFilter || undefined,
      role: this.roleFilter || undefined
    }).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'Failed to load users.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  openViewModal(user: AdminUserResponse): void {
    this.selectedUser = user;
    this.showViewModal = true;
  }

  openSuspendModal(user: AdminUserResponse): void {
    this.selectedUser = user;
    this.showSuspendModal = true;
  }

  openReactivateModal(user: AdminUserResponse): void {
    this.selectedUser = user;
    this.showReactivateModal = true;
  }

  getUserInitial(email: string): string {
    return email.charAt(0).toUpperCase();
  }

  confirmSuspend(): void {
    if (this.selectedUser && this.selectedUser.id !== this.currentAdminId) {
      this.toggleStatus(this.selectedUser, 'SUSPENDED');
      this.showSuspendModal = false;
      this.selectedUser = null;
    }
  }

  confirmReactivate(): void {
    if (this.selectedUser && this.selectedUser.id !== this.currentAdminId) {
      this.toggleStatus(this.selectedUser, 'ACTIVE');
      this.showReactivateModal = false;
      this.selectedUser = null;
    }
  }

  toggleStatus(user: AdminUserResponse, newStatus: UserStatus): void {
    this.processingId = user.id;
    this.userAdminApi.updateStatus(user.id, { status: newStatus }).subscribe({
      next: () => {
        this.processingId = null;
        this.loadUsers();
      },
      error: () => {
        this.processingId = null;
        alert('Failed to update status.');
        this.cdr.markForCheck();
      }
    });
  }
}
