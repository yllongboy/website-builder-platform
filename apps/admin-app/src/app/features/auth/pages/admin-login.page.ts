import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@platform/auth';
import { LucideAngularModule } from 'lucide-angular';
import { IconComponent } from '../../../core/shared/icon.component';

@Component({
  selector: 'wb-admin-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-background-subtle flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Logo mark -->
        <div class="flex justify-center mb-8">
          <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <wb-icon name="zap" [size]="24" className="text-white"></wb-icon>
          </div>
        </div>

        <div class="bg-background border border-border/70 rounded-xl p-8">
          <h1 class="text-xl font-semibold text-foreground text-center mb-1">Admin Sign In</h1>
          <p class="text-[13px] text-muted-foreground text-center mb-6">Sign in to manage the platform</p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="email" class="text-sm font-medium text-foreground">Email</label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  class="w-full bg-muted/50 border-0 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="password" class="text-sm font-medium text-foreground">Password</label>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  autocomplete="current-password"
                  class="w-full bg-muted/50 border-0 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 focus:bg-muted transition-all"
                />
              </div>

              @if (error()) {
                <p role="alert" class="text-[13px] text-destructive">{{ error() }}</p>
              }

              <button
                type="submit"
                [disabled]="form.invalid || loading()"
                class="w-full bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm font-medium transition-all disabled:opacity-50 mt-2"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class AdminLoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => {
        if (!this.authService.isAdmin()) {
          this.authService.logout().subscribe({
            complete: () => {
              this.error.set('Access denied. Admin credentials required.');
              this.loading.set(false);
            }
          });
          return;
        }
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.error.set('Login failed. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
