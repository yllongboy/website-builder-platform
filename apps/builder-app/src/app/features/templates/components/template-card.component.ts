import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateSummary } from '@platform/shared-models';

@Component({
  selector: 'app-template-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="template-card" (click)="onSelect()">
      <div class="thumbnail-container">
        <img *ngIf="template.thumbnailUrl" [src]="template.thumbnailUrl" [alt]="template.name">
        <div *ngIf="!template.thumbnailUrl" class="placeholder-thumbnail">No Thumbnail</div>
        <span *ngIf="template.isPremium" class="badge-premium">Premium</span>
      </div>
      <div class="template-info">
        <h3>{{ template.name }}</h3>
        <p *ngIf="template.description">{{ template.description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .template-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .template-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .thumbnail-container {
      height: 150px;
      background: #f0f0f0;
      position: relative;
    }
    .thumbnail-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .placeholder-thumbnail {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #666;
    }
    .badge-premium {
      position: absolute;
      top: 8px;
      right: 8px;
      background: gold;
      color: #333;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .template-info {
      padding: 12px;
    }
    .template-info h3 {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
    }
    .template-info p {
      margin: 0;
      font-size: 0.9rem;
      color: #555;
    }
  `]
})
export class TemplateCardComponent {
  @Input({ required: true }) template!: TemplateSummary;
  @Output() selected = new EventEmitter<TemplateSummary>();

  onSelect() {
    this.selected.emit(this.template);
  }
}
