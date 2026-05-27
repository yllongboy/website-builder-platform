import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminWebsiteResponse, AdminWebsiteStatusRequest } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsiteAdminApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getWebsites(): Observable<AdminWebsiteResponse[]> {
    return this.http.get<AdminWebsiteResponse[]>(`${this.apiUrl}/admin/websites`);
  }

  updateStatus(websiteId: string, request: AdminWebsiteStatusRequest): Observable<AdminWebsiteResponse> {
    return this.http.patch<AdminWebsiteResponse>(
      `${this.apiUrl}/admin/websites/${websiteId}/status`,
      request
    );
  }
}
