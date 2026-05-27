package com.websitebuilder.platform.admin.billing.dto;

import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import java.time.Instant;
import java.util.UUID;

public record AdminSubscriptionResponse(
        UUID userId,
        String userEmail,
        String planCode,
        SubscriptionStatus status,
        Instant createdAt,
        Instant currentPeriodEnd
) {
}