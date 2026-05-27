import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUserResponse, UpdateUserStatusRequest } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserAdminApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/admin/users`;

  listAll(filters?: { email?: string; status?: string; role?: string }): Observable<AdminUserResponse[]> {
    let params = new HttpParams();
    if (filters?.email) {
      params = params.set('email', filters.email);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.role) {
      params = params.set('role', filters.role);
    }
    return this.http.get<AdminUserResponse[]>(this.apiUrl, { params });
  }

  getById(userId: string): Observable<AdminUserResponse> {
    return this.http.get<AdminUserResponse>(`${this.apiUrl}/${userId}`);
  }

  updateStatus(userId: string, request: UpdateUserStatusRequest): Observable<AdminUserResponse> {
    return this.http.patch<AdminUserResponse>(`${this.apiUrl}/${userId}/status`, request);
  }
}
