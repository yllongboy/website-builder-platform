package com.websitebuilder.platform.users.dto;

import java.util.UUID;
import org.springframework.lang.Nullable;

public record UserSummary(UUID id, String email, UserRole role, @Nullable String firstName, @Nullable String lastName) {
    public UserSummary(UUID id, String email, UserRole role) {
        this(id, email, role, null, null);
    }
}
