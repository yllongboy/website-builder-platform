export type PublishResultStatus = 'SUCCESS' | 'FAILED';

export interface PublishResponse { status: PublishResultStatus; publishedUrl?: string | null; message?: string | null; }
