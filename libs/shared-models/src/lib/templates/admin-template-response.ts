import { TemplateDetail } from './template-detail';

export interface AdminTemplateResponse extends TemplateDetail {
  isActive: boolean;
  usageCount: number;
  createdAt: string;
}
