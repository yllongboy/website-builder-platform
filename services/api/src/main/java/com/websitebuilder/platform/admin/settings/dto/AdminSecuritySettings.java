package com.websitebuilder.platform.admin.settings.dto;

public record AdminSecuritySettings(
        boolean twoFactorRequired,
        int sessionTimeout,
        int passwordMinLength
) {
}
