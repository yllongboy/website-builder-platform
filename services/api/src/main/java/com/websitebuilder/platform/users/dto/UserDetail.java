package com.websitebuilder.platform.users.dto;

import java.util.UUID;

public record UserDetail(UUID id, String email, UserRole role, UserStatus status) {}
