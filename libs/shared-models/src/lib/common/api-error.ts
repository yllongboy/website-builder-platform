export interface ApiError { error: { code: string; message: string; details?: ApiErrorDetail[]; }; }

export interface ApiErrorDetail { field?: string; message?: string; }
