import { UserRole } from './user-role';
import { UserStatus } from './user-status';
import { SubscriptionStatus } from '../billing/subscription-status';

export interface AdminUserResponse {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  subscriptionStatus: SubscriptionStatus | null;
  planCode: string | null;
  websiteCount: number;
}
