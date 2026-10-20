package com.websitebuilder.platform.admin.settings.dto;

public record AdminNotificationSettings(
        boolean emailNotifications,
        boolean newUserNotifications,
        boolean paymentNotifications,
        boolean weeklyReport
) {
}
