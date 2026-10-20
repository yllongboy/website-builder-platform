import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import grapesjs, { Editor, EditorConfig } from 'grapesjs';

export interface GrapesContent {
  html: string;
  css: string;
  editorState: Record<string, unknown> | null;
}

@Component({
  selector: 'app-grapes-editor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      /* ── host sizing ──────────────────────────────────────────── */
      app-grapes-editor { display: block; height: 100%; width: 100%; }

      /* ── canvas fills its flex cell ──────────────────────────── */
      app-grapes-editor .gjs-editor { height: 100% !important; overflow: hidden; position: relative; }
      app-grapes-editor .gjs-cv-canvas { position: absolute !important; top: 0 !important; bottom: 0 !important; left: 0 !important; right: 0 !important; width: auto !important; height: auto !important; overflow: auto !important; background-color: #f1f5f9 !important; }
      app-grapes-editor .gjs-frame-wrapper__top, app-grapes-editor .gjs-frame-wrapper__bottom { display: none !important; }
      app-grapes-editor iframe.gjs-frame { display: block !important; min-height: 600px !important; }

      /* ── block manager inside left panel ─────────────────────── */
      .gjs-panel-host { width: 100%; box-sizing: border-box; }
      .gjs-panel-host .gjs-blocks-c { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; padding: 8px; }
      .gjs-panel-host .gjs-block { width: auto !important; height: 64px; margin: 0 !important; padding: 8px 4px !important; font-size: 10px !important; border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; overflow: hidden; box-sizing: border-box; }
      .gjs-panel-host .gjs-block__media { width: 24px !important; height: 24px !important; max-width: 24px !important; max-height: 24px !important; flex-shrink: 0; }
      .gjs-panel-host .gjs-block-label { font-size: 10px !important; line-height: 1.2; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; color: #334155 !important; }
      .gjs-panel-host .gjs-block__media svg { width: 20px !important; height: 20px !important; fill: #64748b !important; stroke: #64748b !important; color: #64748b !important; }

      /* ── layer manager ────────────────────────────────────────── */
      .gjs-panel-host .gjs-layer { padding: 4px 8px; font-size: 12px; }
      .gjs-panel-host .gjs-layer__title { font-size: 12px; color: #334155 !important; }
      .gjs-panel-host .gjs-layer-name { color: #334155 !important; }

      /* ── style manager ────────────────────────────────────────── */
      .gjs-panel-host .gjs-sm-sector { border-bottom: 1px solid var(--color-border, #e2e8f0); }
      .gjs-panel-host .gjs-sm-sector__title { padding: 8px 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; }
      .gjs-panel-host .gjs-sm-properties { padding: 8px; }
      .gjs-panel-host .gjs-sm-field { width: 100% !important; box-sizing: border-box; }
      .gjs-panel-host .gjs-field { font-size: 12px; }

      /* ── trait manager ────────────────────────────────────────── */
      .gjs-panel-host .gjs-trt-trait { padding: 6px 12px; font-size: 12px; }
      .gjs-panel-host .gjs-trt-trait__wrp-label { font-size: 11px; color: #475569 !important; }
      .gjs-panel-host .gjs-sm-label { color: #475569 !important; }
      .gjs-panel-host { color: #334155; }

      /* ── GrapesJS dark theme overrides (light app theme) ─────── */
      .gjs-one-bg { background-color: transparent !important; }
      .gjs-two-bg { background-color: transparent !important; }
      .gjs-three-bg { background-color: transparent !important; }
      .gjs-four-clr { color: #1e293b !important; }
      .gjs-sm-sector { background-color: transparent !important; }
      .gjs-sm-sector__title { background-color: #f1f5f9 !important; color: #1e293b !important; padding: 8px 12px; font-size: 11px; font-weight: 600; cursor: pointer; }
      .gjs-sm-sector__title * { color: #1e293b !important; fill: #1e293b !important; }
      .gjs-sm-sector__title svg, .gjs-sm-sector__title svg * { fill: #334155 !important; stroke: #334155 !important; }
      .gjs-sm-properties { background-color: transparent !important; }
      .gjs-sm-field input, .gjs-sm-field select { background-color: #ffffff !important; color: #1e293b !important; border: 1px solid #e2e8f0 !important; border-radius: 4px; }
      .gjs-field { background-color: #ffffff !important; color: #1e293b !important; border: 1px solid #e2e8f0 !important; }
      .gjs-field input { background-color: transparent !important; color: inherit !important; }
      .gjs-sm-label { color: #475569 !important; font-size: 11px; }
      .gjs-sm-property { color: #334155 !important; }
      .gjs-layer { background-color: transparent !important; color: #1e293b !important; }
      .gjs-layer.gjs-hovered { background-color: #f1f5f9 !important; }
      .gjs-layer.gjs-selected { background-color: #ede9fe !important; }
      .gjs-trt-trait { background-color: transparent !important; color: #1e293b !important; }
      .gjs-clm-tag { background-color: #f1f5f9 !important; color: #1e293b !important; }
      .gjs-block-category .gjs-title { background-color: #f1f5f9 !important; color: #1e293b !important; border-bottom: 1px solid #e2e8f0 !important; padding: 6px 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
      .gjs-color-main { color: #334155 !important; }
      .gjs-input-unit { color: #475569 !important; }
      .gjs-select { color: #1e293b !important; background-color: #ffffff !important; }
    `,
  ],
  host: { 'style': 'display: block; height: 100%; width: 100%;' },
  template: `
    <div style="display:flex;height:100%;width:100%;overflow:hidden;">
      <div class="w-64 flex-shrink-0 bg-surface border-r border-border flex flex-col overflow-hidden">
        <div class="flex border-b border-border flex-shrink-0">
          <button
            class="flex-1 px-3 py-2 text-xs font-medium transition-colors"
            [class.text-foreground]="leftTab === 'blocks'"
            [class.border-b-2]="leftTab === 'blocks'"
            [class.border-primary]="leftTab === 'blocks'"
            [class.text-muted-foreground]="leftTab !== 'blocks'"
            (click)="leftTab = 'blocks'"
          >
            Blocks
          </button>
          <button
            class="flex-1 px-3 py-2 text-xs font-medium transition-colors"
            [class.text-foreground]="leftTab === 'layers'"
            [class.border-b-2]="leftTab === 'layers'"
            [class.border-primary]="leftTab === 'layers'"
            [class.text-muted-foreground]="leftTab !== 'layers'"
            (click)="leftTab = 'layers'"
          >
            Layers
          </button>
        </div>
        <div #blocksEl class="flex-1 overflow-y-auto gjs-panel-host" [style.display]="leftTab === 'blocks' ? 'block' : 'none'"></div>
        <div #layersEl class="flex-1 overflow-y-auto gjs-panel-host" [style.display]="leftTab === 'layers' ? 'block' : 'none'"></div>
      </div>

      <div #grapesContainer class="flex-1 relative overflow-hidden"></div>

      <div class="w-64 flex-shrink-0 bg-surface border-l border-border flex flex-col overflow-hidden">
        <div class="flex border-b border-border flex-shrink-0">
          <button
            class="flex-1 px-3 py-2 text-xs font-medium transition-colors"
            [class.text-foreground]="rightTab === 'styles'"
            [class.border-b-2]="rightTab === 'styles'"
            [class.border-primary]="rightTab === 'styles'"
            [class.text-muted-foreground]="rightTab !== 'styles'"
            (click)="rightTab = 'styles'"
          >
            Styles
          </button>
          <button
            class="flex-1 px-3 py-2 text-xs font-medium transition-colors"
            [class.text-foreground]="rightTab === 'traits'"
            [class.border-b-2]="rightTab === 'traits'"
            [class.border-primary]="rightTab === 'traits'"
            [class.text-muted-foreground]="rightTab !== 'traits'"
            (click)="rightTab = 'traits'"
          >
            Traits
          </button>
        </div>
        <div #stylesEl class="flex-1 overflow-y-auto gjs-panel-host" [style.display]="rightTab === 'styles' ? 'block' : 'none'"></div>
        <div #traitsEl class="flex-1 overflow-y-auto gjs-panel-host" [style.display]="rightTab === 'traits' ? 'block' : 'none'"></div>
      </div>
    </div>
  `,
})
export class GrapesEditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('grapesContainer', { static: true }) container!: ElementRef<HTMLDivElement>;
  @ViewChild('blocksEl', { static: true }) blocksEl!: ElementRef<HTMLDivElement>;
  @ViewChild('layersEl', { static: true }) layersEl!: ElementRef<HTMLDivElement>;
  @ViewChild('stylesEl', { static: true }) stylesEl!: ElementRef<HTMLDivElement>;
  @ViewChild('traitsEl', { static: true }) traitsEl!: ElementRef<HTMLDivElement>;

  @Input() config: Partial<EditorConfig> = {};
  @Input() initialContent: GrapesContent = { html: '', css: '', editorState: null };

  @Output() contentChange = new EventEmitter<GrapesContent>();
  @Output() ready = new EventEmitter<Editor>();

  leftTab: 'blocks' | 'layers' = 'blocks';
  rightTab: 'styles' | 'traits' = 'styles';

  private editor!: Editor;
  private initTimeout?: ReturnType<typeof setTimeout>;
  private headHtml = '';
  private headStyleCss = '';

  ngAfterViewInit(): void {
    this.initTimeout = setTimeout(() => {
      // If initialContent.html is a full HTML document, extract body + external scripts/styles
      let bodyContent = this.initialContent.html || '';
      const canvasScripts: string[] = [];
      const canvasStyles: string[] = [];
      this.headStyleCss = '';

      const trimmed = bodyContent.trim().toLowerCase();
      if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(bodyContent, 'text/html');
        doc.querySelectorAll('head script[src]').forEach((el) => {
          const src = (el as HTMLScriptElement).src;
          if (src) canvasScripts.push(src);
        });
        doc.querySelectorAll('head link[rel="stylesheet"][href]').forEach((el) => {
          const href = (el as HTMLLinkElement).href;
          if (href) canvasStyles.push(href);
        });
        const headStyleParts: string[] = [];
        doc.head.querySelectorAll('style').forEach((el) => {
          const css = el.textContent ?? '';
          if (css) headStyleParts.push(css);
          el.remove();
        });
        this.headStyleCss = headStyleParts.join('\n');
        this.headHtml = doc.head.innerHTML;
        bodyContent = doc.body.innerHTML;
      }

      this.editor = grapesjs.init({
        container: this.container.nativeElement,
        fromElement: false,
        ...this.config,
        height: '100%',
        width: '100%',
        panels: { defaults: [] },
        components: bodyContent,
        style: [this.headStyleCss, this.initialContent.css || ''].filter(Boolean).join('\n'),
        storageManager: false,
        canvas: {
          scripts: canvasScripts,
          styles: canvasStyles,
        },
        deviceManager: {
          devices: [
            { name: 'Desktop', width: '' },
            { name: 'Tablet', width: '768px', widthMedia: '992px' },
            { name: 'Mobile portrait', width: '390px', widthMedia: '480px' },
          ],
        },
        blockManager: { appendTo: this.blocksEl.nativeElement },
        layerManager: { appendTo: this.layersEl.nativeElement },
        styleManager: { appendTo: this.stylesEl.nativeElement },
        traitManager: { appendTo: this.traitsEl.nativeElement },
      });

      const editorState = this.initialContent.editorState;
      const hasProjectData =
        editorState !== null &&
        typeof editorState === 'object' &&
        'pages' in editorState &&
        Array.isArray((editorState as any).pages) &&
        (editorState as any).pages.length > 0;

      if (hasProjectData) {
        try {
          this.editor.loadProjectData(editorState as any);
        } catch {
          // editorState shape was unexpected; fall back to components/style set during init
        }
      }

      this.editor.on('update', () => {
        this.emitCurrentContent();
      });

      // GrapesJS commits inline rich-text edits to its component model when RTE
      // editing is disabled. Publish that committed state after the async RTE
      // disable flow finishes (the editor's generic update event can happen
      // while the canvas still contains only the transient DOM edit).
      this.editor.on('rte:disable', () => {
        setTimeout(() => this.emitCurrentContent(), 0);
      });

      this.ready.emit(this.editor);

      // Add basic blocks
      const bm = this.editor.BlockManager;
      const blocks = [
        { id: 'text',      label: 'Text',      svg: '<svg viewBox="0 0 24 24"><path d="M13 2H3v4h4v14h6V6h4V2h-4z"/></svg>',     content: '<p>Your text here</p>' },
        { id: 'heading',   label: 'Heading',   svg: '<svg viewBox="0 0 24 24"><path d="M6 4v16M18 4v16M6 12h12M2 4h4M18 4h4M2 20h4M18 20h4"/></svg>', content: '<h2>Your Heading</h2>' },
        { id: 'button',    label: 'Button',    svg: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4"/></svg>', content: '<a href="#" style="display:inline-block;padding:8px 20px;background:#6366f1;color:#fff;border-radius:6px;text-decoration:none">Button</a>' },
        { id: 'image',     label: 'Image',     svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>', content: '<img src="https://via.placeholder.com/350x200" alt="Image" style="max-width:100%;display:block"/>' },
        { id: 'divider',   label: 'Divider',   svg: '<svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12" stroke-width="2"/></svg>', content: '<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"/>' },
        { id: 'link',      label: 'Link',      svg: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>', content: '<a href="#">Link text</a>' },
        { id: 'container', label: 'Container', svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke-width="2"/></svg>', content: '<div style="padding:20px;min-height:80px"></div>' },
        { id: 'columns2',  label: '2 Columns', svg: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="9" height="16" rx="1"/><rect x="13" y="4" width="9" height="16" rx="1"/></svg>', content: '<div style="display:flex;gap:16px"><div style="flex:1;padding:12px;min-height:60px;border:1px dashed #cbd5e1"></div><div style="flex:1;padding:12px;min-height:60px;border:1px dashed #cbd5e1"></div></div>' },
        { id: 'columns3',  label: '3 Columns', svg: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="6" height="16" rx="1"/><rect x="9" y="4" width="6" height="16" rx="1"/><rect x="17" y="4" width="6" height="16" rx="1"/></svg>', content: '<div style="display:flex;gap:12px"><div style="flex:1;padding:12px;min-height:60px;border:1px dashed #cbd5e1"></div><div style="flex:1;padding:12px;min-height:60px;border:1px dashed #cbd5e1"></div><div style="flex:1;padding:12px;min-height:60px;border:1px dashed #cbd5e1"></div></div>' },
        { id: 'section',   label: 'Section',   svg: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" fill="none" stroke-width="2"/><line x1="2" y1="9" x2="22" y2="9"/></svg>', content: '<section style="padding:40px 20px;background:#f8fafc"><h2 style="margin:0 0 12px">Section Title</h2><p style="margin:0;color:#64748b">Section content goes here.</p></section>' },
      ];

      blocks.forEach(b => {
        bm.add(b.id, {
          label: b.label,
          category: 'Basic',
          content: b.content,
          media: b.svg,
        });
      });
    }, 0);
  }

  ngOnDestroy(): void {
    clearTimeout(this.initTimeout);
    if (this.editor) {
      this.editor.destroy();
    }
  }

  async flushCurrentContent(): Promise<void> {
    const selected = this.editor?.getSelected();
    const view = selected?.getView() as { disableEditing?: () => Promise<void> } | undefined;
    if (view?.disableEditing) {
      await view.disableEditing();
    }
    this.emitCurrentContent();
  }

  private emitCurrentContent(): void {
    if (!this.editor) return;

    const bodyHtml = this.editor.getHtml();
    const editorCss = this.editor.getCss() ?? '';
    const combinedCss = [this.headStyleCss, editorCss].filter(Boolean).join('\n');
    const cssTag = combinedCss ? `<style>${combinedCss}</style>` : '';
    const html = this.headHtml
      ? `<!doctype html><html><head>${this.headHtml}${cssTag}</head><body>${bodyHtml}</body></html>`
      : bodyHtml;
    this.contentChange.emit({
      html,
      css: editorCss,
      editorState: this.editor.getProjectData() as Record<string, unknown>,
    });
  }
}
