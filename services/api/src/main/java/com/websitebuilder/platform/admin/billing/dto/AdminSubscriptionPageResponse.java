package com.websitebuilder.platform.admin.billing.dto;

import java.util.List;

public record AdminSubscriptionPageResponse(
        List<AdminSubscriptionResponse> content,
        long totalElements,
        int page,
        int size
) {
}