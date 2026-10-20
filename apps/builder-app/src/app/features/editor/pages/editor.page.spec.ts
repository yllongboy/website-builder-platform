import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditorApiService } from '../data-access/editor-api.service';
import { WebsiteApiService } from '../../websites/data-access/website-api.service';
import { EditorPage } from './editor.page';

describe('EditorPage', () => {
  let fixture: ComponentFixture<EditorPage>;
  let component: EditorPage;
  let editorApiService: jest.Mocked<Pick<EditorApiService, 'loadEditorState' | 'saveEditorState'>>;
  let websiteApiService: jest.Mocked<Pick<WebsiteApiService,
    'createBlankWebsite' | 'publish' | 'republish' | 'unpublish' | 'getPublishLogs'>>;

  beforeEach(async () => {
    editorApiService = {
      loadEditorState: jest.fn(),
      saveEditorState: jest.fn(),
    };

    editorApiService.loadEditorState.mockReturnValue(
      of({
        websiteId: 'website-1',
        htmlContent: '',
        cssContent: '',
        editorState: null,
        versionNumber: 1,
        updatedAt: new Date().toISOString(),
      }) as never
    );

    editorApiService.saveEditorState.mockReturnValue(
      of({
        websiteId: 'website-1',
        versionNumber: 1,
        savedAt: new Date().toISOString(),
      }) as never
    );

    websiteApiService = {
      createBlankWebsite: jest.fn(),
      publish: jest.fn(),
      republish: jest.fn(),
      unpublish: jest.fn(),
      getPublishLogs: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [EditorPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ websiteId: 'website-1' }),
            },
          },
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: EditorApiService,
          useValue: editorApiService,
        },
        {
          provide: WebsiteApiService,
          useValue: websiteApiService,
        },
      ],
    })
      .overrideComponent(EditorPage, {
        set: {
          imports: [],
          template: '<div></div>',
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(EditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('starts with isDirty set to false', () => {
    expect(component.isDirty).toBe(false);
  });

  it('onContentChange sets isDirty to true', () => {
    component.onContentChange({ html: '<div>a</div>', css: '', editorState: null });

    expect(component.isDirty).toBe(true);
  });

  it('sets isDirty to false after successful save', () => {
    component.onContentChange({ html: '<section>x</section>', css: '', editorState: null });

    component.manualSave();

    expect(component.isDirty).toBe(false);
  });

  it('sets isSaving to false after successful save', () => {
    component.onContentChange({ html: '<section>y</section>', css: '', editorState: null });

    component.manualSave();

    expect(component.isSaving).toBe(false);
  });

  it('undo calls grapesEditor.UndoManager.undo', () => {
    const undo = jest.fn();
    (component as any).grapesEditor = {
      UndoManager: {
        undo,
        hasUndo: () => false,
        hasRedo: () => false,
      },
    };

    component.undo();

    expect(undo).toHaveBeenCalled();
  });

  it('redo calls grapesEditor.UndoManager.redo', () => {
    const redo = jest.fn();
    (component as any).grapesEditor = {
      UndoManager: {
        redo,
        hasUndo: () => false,
        hasRedo: () => false,
      },
    };

    component.redo();

    expect(redo).toHaveBeenCalled();
  });

  it('beforeunload prevents default when dirty', () => {
    component.isDirty = true;
    const event = { preventDefault: jest.fn() } as unknown as BeforeUnloadEvent;

    component.onBeforeUnload(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('beforeunload does not prevent default when not dirty', () => {
    component.isDirty = false;
    const event = { preventDefault: jest.fn() } as unknown as BeforeUnloadEvent;

    component.onBeforeUnload(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  afterEach(() => {
    fixture?.destroy();
  });
});
