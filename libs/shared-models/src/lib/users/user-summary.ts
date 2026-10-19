import { UserRole } from './user-role';

export interface UserSummary {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string | null;
  lastName?: string | null;
}
