import { PublishLogStatus } from './publish-log-status';

export interface PublishLogResponse {
  id: string;
  status: PublishLogStatus;
  publishedUrl: string | null;
  message: string | null;
  createdAt: string; // ISO datetime string
}