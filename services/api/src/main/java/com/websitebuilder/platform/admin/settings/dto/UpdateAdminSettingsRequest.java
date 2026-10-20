package com.websitebuilder.platform.admin.settings.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateAdminSettingsRequest(
        @Pattern(regexp = ".*\\S.*") @Size(max = 100) String siteName,
        @Size(max = 500) String siteDescription,
        @Email @Pattern(regexp = ".*\\S.*") @Size(max = 254) String supportEmail,
        @Valid UpdateAdminNotificationSettings notifications,
        @Valid UpdateAdminSecuritySettings security
) {
    public boolean hasUpdates() {
        return siteName != null || siteDescription != null || supportEmail != null
                || notifications != null || security != null;
    }

    public record UpdateAdminNotificationSettings(
            Boolean emailNotifications,
            Boolean newUserNotifications,
            Boolean paymentNotifications,
            Boolean weeklyReport
    ) {
        public boolean hasUpdates() {
            return emailNotifications != null || newUserNotifications != null
                    || paymentNotifications != null || weeklyReport != null;
        }
    }

    public record UpdateAdminSecuritySettings(
            Boolean twoFactorRequired,
            @Min(1) @Max(720) Integer sessionTimeout,
            @Min(8) @Max(128) Integer passwordMinLength
    ) {
        public boolean hasUpdates() {
            return twoFactorRequired != null || sessionTimeout != null || passwordMinLength != null;
        }
    }
}
