package com.websitebuilder.platform.billing.dto;

import java.time.Instant;

public record BillingStatusResponse(SubscriptionStatus status, String planCode, Boolean canPublish, Instant currentPeriodEnd) {}
