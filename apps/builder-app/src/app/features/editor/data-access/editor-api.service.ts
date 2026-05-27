import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EditorStateResponse,
  SaveEditorStateRequest,
  SaveEditorStateResponse,
  PreviewResponse,
} from '@platform/shared-models';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EditorApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiBaseUrl;

  loadEditorState(websiteId: string): Observable<EditorStateResponse> {
    return this.http.get<EditorStateResponse>(`${this.apiUrl}/websites/${encodeURIComponent(websiteId)}/editor`);
  }

  saveEditorState(
    websiteId: string,
    payload: SaveEditorStateRequest
  ): Observable<SaveEditorStateResponse> {
    return this.http.put<SaveEditorStateResponse>(`${this.apiUrl}/websites/${encodeURIComponent(websiteId)}/editor`, payload);
  }

  getPreview(websiteId: string): Observable<PreviewResponse> {
    return this.http.get<PreviewResponse>(`${this.apiUrl}/websites/${encodeURIComponent(websiteId)}/preview`);
  }

  updateWebsiteName(websiteId: string, name: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/websites/${encodeURIComponent(websiteId)}`, { name });
  }
}
