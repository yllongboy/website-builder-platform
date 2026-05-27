package com.websitebuilder.platform.admin.dto;

public record AdminMetricsResponse(
        long totalUsers,
        long totalWebsites,
        long totalActiveSubscriptions
) {
}