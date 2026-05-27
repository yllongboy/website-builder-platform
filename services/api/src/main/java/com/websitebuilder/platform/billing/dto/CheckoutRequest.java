package com.websitebuilder.platform.billing.dto;

import jakarta.validation.constraints.NotBlank;

public record CheckoutRequest(@NotBlank String planCode) {}
