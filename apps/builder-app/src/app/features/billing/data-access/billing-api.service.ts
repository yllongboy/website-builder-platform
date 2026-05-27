import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingStatusResponse, CheckoutResponse, PortalResponse } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getStatus(): Observable<BillingStatusResponse> {
    return this.http.get<BillingStatusResponse>(`${this.apiUrl}/billing/status`);
  }

  createCheckoutSession(planCode: string): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.apiUrl}/billing/checkout`, { planCode });
  }

  createPortalSession(): Observable<PortalResponse> {
    return this.http.post<PortalResponse>(`${this.apiUrl}/billing/portal`, {});
  }
}
