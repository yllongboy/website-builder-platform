package com.websitebuilder.platform.admin.dto;

import java.math.BigDecimal;

public record AdminMetricsResponse(
        long totalUsers,
        long totalWebsites,
        long publishedWebsites,
        long totalActiveSubscriptions,
        long monthlyRevenueCents,
        BigDecimal userGrowthPercent,
        BigDecimal subscriptionGrowthPercent,
        BigDecimal websiteGrowthPercent,
        BigDecimal revenueGrowthPercent
) {
}
