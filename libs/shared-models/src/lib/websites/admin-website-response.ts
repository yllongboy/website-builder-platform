import { WebsiteStatus } from './website-status';

export interface AdminWebsiteResponse {
  id: string;
  ownerEmail: string;
  ownerName: string | null;
  name: string;
  status: WebsiteStatus;
  templateName: string | null;
  pageViews: number;
  publishedUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
