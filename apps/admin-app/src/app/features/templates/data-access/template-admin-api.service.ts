import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminTemplateResponse, TemplateUpsertRequest, AdminCategoryResponse } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemplateAdminApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getTemplates(): Observable<AdminTemplateResponse[]> {
    return this.http.get<AdminTemplateResponse[]>(`${this.apiUrl}/admin/templates`);
  }

  createTemplate(req: TemplateUpsertRequest): Observable<AdminTemplateResponse> {
    return this.http.post<AdminTemplateResponse>(`${this.apiUrl}/admin/templates`, req);
  }

  updateTemplate(id: string, req: TemplateUpsertRequest): Observable<AdminTemplateResponse> {
    return this.http.put<AdminTemplateResponse>(`${this.apiUrl}/admin/templates/${id}`, req);
  }

  deleteTemplate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/templates/${id}`);
  }

  getCategories(): Observable<AdminCategoryResponse[]> {
    return this.http.get<AdminCategoryResponse[]>(`${this.apiUrl}/admin/categories`);
  }
}
