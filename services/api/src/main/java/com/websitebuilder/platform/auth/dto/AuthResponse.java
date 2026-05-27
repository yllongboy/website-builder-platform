package com.websitebuilder.platform.auth.dto;

import com.websitebuilder.platform.users.dto.UserSummary;

public record AuthResponse(String accessToken, UserSummary user) {}
