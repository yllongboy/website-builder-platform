import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminSettingsResponse, UpdateAdminSettingsRequest } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminSettingsApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/admin/settings`;

  getSettings(): Observable<AdminSettingsResponse> {
    return this.http.get<AdminSettingsResponse>(this.apiUrl);
  }

  updateSettings(request: UpdateAdminSettingsRequest): Observable<AdminSettingsResponse> {
    return this.http.patch<AdminSettingsResponse>(this.apiUrl, request);
  }
}
