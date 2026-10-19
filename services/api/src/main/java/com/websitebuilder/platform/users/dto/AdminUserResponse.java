package com.websitebuilder.platform.users.dto;

import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import java.time.Instant;
import java.util.UUID;
import org.springframework.lang.Nullable;

public record AdminUserResponse(
	UUID id,
	String email,
	@Nullable String firstName,
	@Nullable String lastName,
	UserRole role,
	UserStatus status,
	Instant createdAt,
	long websiteCount,
	@Nullable SubscriptionStatus subscriptionStatus,
	@Nullable String planCode
) {}
