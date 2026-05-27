import { SubscriptionStatus } from './subscription-status';

export interface BillingStatusResponse { status: SubscriptionStatus; planCode?: string | null; canPublish: boolean; currentPeriodEnd?: string | null; }
