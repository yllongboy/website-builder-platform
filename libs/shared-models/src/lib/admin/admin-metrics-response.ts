export interface AdminMetricsResponse {
  totalUsers: number;
  totalWebsites: number;
  totalActiveSubscriptions: number;
  monthlyRevenueCents: number;
  userGrowthPercent: number | null;
  websiteGrowthPercent: number | null;
  subscriptionGrowthPercent: number | null;
  revenueGrowthPercent: number | null;
}
