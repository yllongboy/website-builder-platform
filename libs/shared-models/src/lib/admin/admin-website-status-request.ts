export type WebsiteStatusUpdate = 'DRAFT' | 'ARCHIVED';

export interface AdminWebsiteStatusRequest {
  status: WebsiteStatusUpdate;
}
