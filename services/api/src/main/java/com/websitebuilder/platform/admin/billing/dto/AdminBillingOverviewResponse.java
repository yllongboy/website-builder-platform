package com.websitebuilder.platform.admin.billing.dto;

import java.math.BigDecimal;
import java.util.Map;

public record AdminBillingOverviewResponse(
        BigDecimal mrr,
        BigDecimal arr,
        long totalActiveSubscriptions,
        Map<String, Long> planDistribution
) {
}
