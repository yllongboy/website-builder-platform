import { WebsiteStatus } from './website-status';

export interface EditorStateResponse { websiteId: string; name: string; htmlContent: string; cssContent?: string | null; editorState?: Record<string, unknown> | null; versionNumber: number; updatedAt: string; websiteStatus?: WebsiteStatus | null; publishedUrl?: string | null; }
