import { UserRole } from './user-role';
import { UserStatus } from './user-status';

export interface UserDetail { id: string; email: string; role: UserRole; status: UserStatus; }
