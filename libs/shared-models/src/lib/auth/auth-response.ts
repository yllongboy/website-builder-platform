import { UserSummary } from '../users/user-summary';

export interface AuthResponse { accessToken: string; user: UserSummary; }
