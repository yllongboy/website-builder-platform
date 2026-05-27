package com.websitebuilder.platform.users.dto;

import java.util.UUID;

public record UserSummary(UUID id, String email, UserRole role) {}
