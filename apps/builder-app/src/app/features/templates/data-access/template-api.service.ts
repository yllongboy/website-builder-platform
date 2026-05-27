import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateSummary, TemplateDetail } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getTemplates(params?: { categorySlug?: string; search?: string }): Observable<TemplateSummary[]> {
    let httpParams = new HttpParams();
    if (params?.categorySlug) {
      httpParams = httpParams.set('categorySlug', params.categorySlug);
    }
    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }
    return this.http.get<TemplateSummary[]>(`${this.apiUrl}/templates`, { params: httpParams });
  }

  getTemplateDetail(id: string): Observable<TemplateDetail> {
    return this.http.get<TemplateDetail>(`${this.apiUrl}/templates/${id}`);
  }
}
