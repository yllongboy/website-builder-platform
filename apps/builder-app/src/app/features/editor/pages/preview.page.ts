import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditorApiService } from '../data-access/editor-api.service';

@Component({
  selector: 'app-preview-page',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="h-screen flex flex-col bg-background">
      <!-- Toolbar -->
      <header class="h-12 bg-surface border-b border-border px-4 flex items-center justify-between flex-shrink-0">
        <button
          (click)="goBack()"
          class="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
          ← Back to Editor
        </button>
        <span class="text-sm font-medium text-foreground">Preview</span>
        <span class="text-xs text-muted-foreground">Read-only</span>
      </header>

      <!-- Loading -->
      <div *ngIf="loading" class="flex-1 flex items-center justify-center">
        <p class="text-muted-foreground text-sm">Loading preview...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error" class="flex-1 flex items-center justify-center">
        <p class="text-destructive text-sm">{{ error }}</p>
      </div>

      <!-- Preview iframe -->
      <iframe
        *ngIf="!loading && !error && iframeContent"
        [srcdoc]="iframeContent"
        sandbox="allow-scripts"
        class="flex-1 w-full border-0"
        title="Website Preview">
      </iframe>
    </div>
  `,
})
export class PreviewPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly editorApi = inject(EditorApiService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly websiteId = this.route.snapshot.paramMap.get('websiteId') ?? '';
  loading = true;
  error: string | null = null;
  iframeContent: SafeHtml | null = null;

  ngOnInit(): void {
    this.editorApi.getPreview(this.websiteId).subscribe({
      next: (preview) => {
        const htmlContent = preview.htmlContent ?? '';
        const trimmed = htmlContent.trim().toLowerCase();
        let html: string;
        if (trimmed.startsWith('<!doctype') || trimmed.startsWith('<html')) {
          // Already a full HTML document — use directly (CSS is already embedded in <style> tag)
          html = htmlContent;
        } else {
          const safeCss = (preview.cssContent ?? '').replace(/</g, '\\3C ');
          html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${safeCss}</style>
</head>
<body>
${htmlContent}
</body>
</html>`;
        }
        this.iframeContent = this.sanitizer.bypassSecurityTrustHtml(html);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = err?.status === 403
          ? 'You do not have permission to preview this website.'
          : 'Failed to load preview. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/editor', this.websiteId]);
  }
}
