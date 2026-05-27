import { PublishLogStatus } from './publish-log-status';

export interface PublishStatusResponse { status: PublishLogStatus; publishedUrl?: string | null; lastPublishedAt?: string | null; }
