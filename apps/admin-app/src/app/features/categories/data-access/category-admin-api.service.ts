import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminCategoryResponse, CategoryUpsertRequest } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryAdminApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  getCategories(): Observable<AdminCategoryResponse[]> {
    return this.http.get<AdminCategoryResponse[]>(`${this.apiUrl}/admin/categories`);
  }

  createCategory(req: CategoryUpsertRequest): Observable<AdminCategoryResponse> {
    return this.http.post<AdminCategoryResponse>(`${this.apiUrl}/admin/categories`, req);
  }

  updateCategory(id: string, req: CategoryUpsertRequest): Observable<AdminCategoryResponse> {
    return this.http.put<AdminCategoryResponse>(`${this.apiUrl}/admin/categories/${id}`, req);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/categories/${id}`);
  }
}
