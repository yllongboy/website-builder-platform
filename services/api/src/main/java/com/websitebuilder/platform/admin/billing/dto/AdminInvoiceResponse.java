package com.websitebuilder.platform.admin.billing.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record AdminInvoiceResponse(
        String id,
        String userId,
        String userEmail,
        BigDecimal amount,
        String currency,
        String status,
        Instant createdAt
) {
}
