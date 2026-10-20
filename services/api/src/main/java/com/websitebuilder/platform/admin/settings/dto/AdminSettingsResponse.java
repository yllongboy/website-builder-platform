package com.websitebuilder.platform.admin.settings.dto;

public record AdminSettingsResponse(
        String siteName,
        String siteDescription,
        String supportEmail,
        AdminNotificationSettings notifications,
        AdminSecuritySettings security
) {
}
