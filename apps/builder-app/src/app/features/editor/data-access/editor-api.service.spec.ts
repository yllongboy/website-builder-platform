import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SaveEditorStateRequest } from '@platform/shared-models';
import { environment } from '../../../../environments/environment';
import { EditorApiService } from './editor-api.service';

describe('EditorApiService', () => {
  let service: EditorApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditorApiService],
    });

    service = TestBed.inject(EditorApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('loadEditorState calls GET /api/websites/{websiteId}/editor', () => {
    const websiteId = 'website-1';

    service.loadEditorState(websiteId).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/websites/${websiteId}/editor`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('saveEditorState calls PUT /api/websites/{websiteId}/editor', () => {
    const websiteId = 'website-2';
    const payload: SaveEditorStateRequest = {
      htmlContent: '<div>updated</div>',
      cssContent: '.root { color: black; }',
      editorState: null,
    };

    service.saveEditorState(websiteId, payload).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/websites/${websiteId}/editor`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('saveEditorState sends payload body in PUT request', () => {
    const websiteId = 'website-3';
    const payload: SaveEditorStateRequest = {
      htmlContent: '<main>content</main>',
      cssContent: '.main { padding: 8px; }',
      editorState: null,
    };

    service.saveEditorState(websiteId, payload).subscribe();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/websites/${websiteId}/editor`);
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });
});
