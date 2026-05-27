import { WebsiteStatus } from './website-status';

export interface AdminWebsiteResponse { id: string; ownerEmail: string; name: string; status: WebsiteStatus; publishedUrl?: string | null; updatedAt: string; }
