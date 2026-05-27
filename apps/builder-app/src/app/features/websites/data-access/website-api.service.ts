import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WebsiteSummary, PublishResponse, PublishLogResponse } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsiteApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  createFromTemplate(templateId: string, name: string): Observable<WebsiteSummary> {
    return this.http.post<WebsiteSummary>(`${this.apiUrl}/websites/from-template/${encodeURIComponent(templateId)}`, { name });
  }

  createBlankWebsite(name: string): Observable<WebsiteSummary> {
    return this.http.post<WebsiteSummary>(`${this.apiUrl}/websites`, { name });
  }

  getMyWebsites(): Observable<WebsiteSummary[]> {
    return this.http.get<WebsiteSummary[]>(`${this.apiUrl}/websites/my`);
  }

  renameWebsite(id: string, name: string): Observable<WebsiteSummary> {
    return this.http.patch<WebsiteSummary>(`${this.apiUrl}/websites/${encodeURIComponent(id)}`, { name });
  }

  deleteWebsite(id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/websites/${encodeURIComponent(id)}`);
  }

  publish(id: string): Observable<PublishResponse> {
    return this.http.post<PublishResponse>(`${this.apiUrl}/websites/${encodeURIComponent(id)}/publish`, {});
  }

  republish(id: string): Observable<PublishResponse> {
    return this.http.post<PublishResponse>(`${this.apiUrl}/websites/${encodeURIComponent(id)}/republish`, {});
  }

  unpublish(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/websites/${encodeURIComponent(id)}/publish`);
  }

  getPublishLogs(id: string): Observable<PublishLogResponse[]> {
    return this.http.get<PublishLogResponse[]>(`${this.apiUrl}/websites/${encodeURIComponent(id)}/publish-logs`);
  }
}
