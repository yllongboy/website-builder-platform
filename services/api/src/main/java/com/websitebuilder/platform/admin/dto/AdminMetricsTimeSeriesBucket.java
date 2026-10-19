package com.websitebuilder.platform.admin.dto;

public record AdminMetricsTimeSeriesBucket(
        String month,
        long userCount,
        long revenueCents
) {
}
