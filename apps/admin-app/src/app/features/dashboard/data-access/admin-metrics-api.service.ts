import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminMetricsResponse } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminMetricsApiService {
  private readonly http = inject(HttpClient);

  getMetrics(): Observable<AdminMetricsResponse> {
    return this.http.get<AdminMetricsResponse>(`${environment.apiBaseUrl}/admin/metrics`);
  }
}
