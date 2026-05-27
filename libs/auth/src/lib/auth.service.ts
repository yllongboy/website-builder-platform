import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, catchError } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  user: UserSummary;
}

export interface UserSummary {
  id: string;
  email: string;
  role: string;
}

export interface UserDetail extends UserSummary {
  status: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  // SECURITY: Token stored in-memory only (not localStorage). Lost on page refresh — intentional.
  // Users must re-authenticate after page reload. This prevents XSS token theft.
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly currentUserSubject = new BehaviorSubject<UserDetail | null>(null);
  private isLoggingOut = false;

  readonly currentUser$ = this.currentUserSubject.asObservable();

  register(body: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/register', body).pipe(
      tap(res => this.storeToken(res.accessToken))
    );
  }

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/login', body).pipe(
      tap(res => {
        this.storeToken(res.accessToken);
        this.currentUserSubject.next({ ...res.user, status: 'ACTIVE' });
      })
    );
  }

  getMe(): Observable<any> {
    return this.http.get<any>('/api/auth/me');
  }

  logout(): Observable<void> {
    if (this.isLoggingOut) return of(void 0);
    this.isLoggingOut = true;
    const token = this.getToken();
    if (!token) {
      this.isLoggingOut = false;
      this.tokenSubject.next(null);
      this.currentUserSubject.next(null);
      return of(void 0);
    }
    return this.http.post<void>('/api/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      catchError(() => of(void 0)),
      tap(() => {
        this.tokenSubject.next(null);
        this.currentUserSubject.next(null);
        this.isLoggingOut = false;
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const base64 = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload['role'] ?? null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  private storeToken(token: string): void {
    this.tokenSubject.next(token);
  }
}
