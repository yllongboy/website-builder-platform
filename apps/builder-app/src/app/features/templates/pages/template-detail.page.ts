import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateApiService } from '../data-access/template-api.service';
import { WebsiteApiService } from '../../websites/data-access/website-api.service';
import { TemplateDetail } from '@platform/shared-models';
import { AppLayoutComponent, CardComponent, ButtonComponent, BadgeComponent, SkeletonComponent } from '@platform/ui';

@Component({
  selector: 'app-template-detail',
  standalone: true,
  imports: [CommonModule, AppLayoutComponent, CardComponent, ButtonComponent, BadgeComponent, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ui-app-layout>
      <div class="max-w-6xl mx-auto flex flex-col gap-6 p-6 animate-fade-in">
        
        @if (loading) {
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <ui-skeleton class="h-10 w-64" />
              <ui-skeleton class="h-10 w-40" />
            </div>
            <ui-skeleton class="flex-1 rounded-xl" />
          </div>
        } @else if (error) {
          <div class="flex items-center justify-center h-full text-destructive">
            {{ error }}
          </div>
        } @else if (template) {
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <ui-button variant="ghost" size="sm" (click)="goBack()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  Back
                </ui-button>
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl font-bold text-foreground m-0">{{ template.name }}</h1>
                  @if (template.isPremium) {
                    <ui-badge variant="warning" class="bg-amber-500 text-white border-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 lucide lucide-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.518l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
                      Premium
                    </ui-badge>
                  }
                </div>
              </div>
              <div class="flex flex-col items-end">
                <ui-button variant="primary" (click)="useTemplate()" [disabled]="creating" [isLoading]="creating">
                  Use This Template
                </ui-button>
                @if (createError) {
                  <span class="text-sm text-destructive mt-1">{{ createError }}</span>
                }
              </div>
            </div>
            
            @if (template.description) {
              <p class="text-muted-foreground">{{ template.description }}</p>
            }

            <ui-card padding="none" class="overflow-hidden bg-muted">
              @if (htmlContent) {
                <iframe class="w-full h-[80vh] border-0 bg-white" [srcdoc]="htmlContent" sandbox="allow-scripts"></iframe>
              }
            </ui-card>
          </div>
        }

      </div>
    </ui-app-layout>
  `,
  styles: []
})
export class TemplateDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly templateApi = inject(TemplateApiService);
  private readonly websiteApi = inject(WebsiteApiService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);

  template?: TemplateDetail;
  loading = true;
  error?: string;
  htmlContent?: SafeHtml;
  creating = false;
  createError: string | null = null;
  
  ngOnInit() {
    const templateId = this.route.snapshot.paramMap.get('templateId');
    if (templateId) {
      this.templateApi.getTemplateDetail(templateId).subscribe({
        next: (tpl) => {
          this.template = tpl;
          this.loading = false;
          let content = tpl.htmlContent;
          if (tpl.cssContent) {
            content = `<style>${tpl.cssContent}</style> ${content}`;
          }
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
          this.cdr.markForCheck();
        },
        error: () => {
          this.error = 'Template not found.';
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.error = 'Invalid template ID.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  }

  goBack() {
    this.router.navigate(['/templates']);
  }

  useTemplate(): void {
    if (!this.template || this.creating) return;
    this.creating = true;
    this.createError = null;
    this.cdr.markForCheck();
    this.websiteApi.createFromTemplate(this.template.id, this.template.name).subscribe({
      next: () => {
        this.creating = false;
        this.cdr.markForCheck();
        this.router.navigate(['/']);
      },
      error: () => {
        this.createError = 'Failed to create website. Please try again.';
        this.creating = false;
        this.cdr.markForCheck();
      }
    });
  }
}
