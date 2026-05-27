import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminBillingOverview, AdminInvoicePage } from '@platform/shared-models';

@Injectable({ providedIn: 'root' })
export class AdminBillingApiService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/admin/billing';

  getOverview(): Observable<AdminBillingOverview> {
    return this.http.get<AdminBillingOverview>(`${this.base}/overview`);
  }

  getInvoices(page = 0, size = 20): Observable<AdminInvoicePage> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<AdminInvoicePage>(`${this.base}/invoices`, { params });
  }

  cancelSubscription(userId: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.base}/subscriptions/${userId}/cancel`, {});
  }
}
