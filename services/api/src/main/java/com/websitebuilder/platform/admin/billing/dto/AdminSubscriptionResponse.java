package com.websitebuilder.platform.admin.billing.dto;

import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import java.time.Instant;
import java.math.BigDecimal;
import java.util.UUID;

public record AdminSubscriptionResponse(
        UUID userId,
        String userEmail,
        String userName,
        String plan,
        String planCode,
        SubscriptionStatus status,
        Instant createdAt,
        Instant currentPeriodEnd,
        Instant renewalDate,
        BigDecimal amount,
        String currency
) {
}
