import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@platform/auth';
import { CardComponent, ButtonComponent, InputComponent } from '@platform/ui';

@Component({
  selector: 'wb-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CardComponent, ButtonComponent, InputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
          </div>
          <h1 class="text-3xl font-bold text-foreground">Create an account</h1>
          <p class="text-muted-foreground mt-2">Enter your details to get started</p>
        </div>

        <ui-card padding="lg">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
            <ui-input
              label="First name (optional)"
              id="firstName"
              type="text"
              formControlName="firstName"
              autocomplete="given-name"
              placeholder="Jane"
            />

            <ui-input
              label="Last name (optional)"
              id="lastName"
              type="text"
              formControlName="lastName"
              autocomplete="family-name"
              placeholder="Doe"
            />

            <ui-input
              label="Email"
              id="email"
              type="email"
              formControlName="email"
              autocomplete="email"
              placeholder="you@example.com"
            />
            
            <ui-input
              label="Password (min 8 characters)"
              id="password"
              type="password"
              formControlName="password"
              autocomplete="new-password"
              placeholder="••••••••"
            />

            @if (error()) {
              <div class="p-3 bg-destructive/10 text-destructive text-sm rounded-md mb-2 border border-destructive/20 text-center">
                {{ error() }}
              </div>
            }

            <ui-button 
              type="submit" 
              class="w-full mt-2" 
              [disabled]="form.invalid || loading()" 
              [isLoading]="loading()"
            >
              Register
            </ui-button>
          </form>

          <div class="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? 
            <a routerLink="/login" class="text-primary hover:text-primary-hover font-medium underline-offset-4 hover:underline transition-all">
              Sign In
            </a>
          </div>
        </ui-card>
      </div>
    </div>
  `,
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.maxLength(100)]],
    lastName: ['', [Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);
    this.cdr.markForCheck();
    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Registration failed. Please try again.');
        this.loading.set(false);
        this.cdr.markForCheck();
      },
    });
  }
}
