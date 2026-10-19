package com.websitebuilder.platform.admin.billing.dto;

import java.math.BigDecimal;
import java.util.Map;

public record AdminBillingOverviewResponse(
        BigDecimal mrr,
        BigDecimal monthlyRecurringRevenue,
        BigDecimal arr,
        long totalActiveSubscriptions,
        long activeCount,
        long trialingCount,
        long pastDueCount,
        Map<String, BigDecimal> monthlyRecurringRevenueByCurrency,
        Map<String, Long> planDistribution
) {
}
