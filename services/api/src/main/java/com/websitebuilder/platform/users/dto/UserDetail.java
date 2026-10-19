package com.websitebuilder.platform.users.dto;

import java.util.UUID;
import org.springframework.lang.Nullable;

public record UserDetail(UUID id, String email, UserRole role, UserStatus status, @Nullable String firstName, @Nullable String lastName) {
    public UserDetail(UUID id, String email, UserRole role, UserStatus status) {
        this(id, email, role, status, null, null);
    }
}
