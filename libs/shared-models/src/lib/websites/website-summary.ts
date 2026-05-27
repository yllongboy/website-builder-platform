import { WebsiteStatus } from './website-status';

export interface WebsiteSummary { id: string; name: string; slug: string; status: WebsiteStatus; publishedUrl?: string | null; updatedAt: string; thumbnailUrl?: string | null; }
