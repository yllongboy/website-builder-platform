import { TemplateSummary } from './template-summary';

export interface TemplateDetail extends TemplateSummary { htmlContent: string; cssContent?: string | null; editorState?: Record<string, unknown> | null; }
