package com.websitebuilder.platform.admin.settings.service;

import com.websitebuilder.platform.admin.settings.dto.AdminNotificationSettings;
import com.websitebuilder.platform.admin.settings.dto.AdminSecuritySettings;
import com.websitebuilder.platform.admin.settings.dto.AdminSettingsResponse;
import com.websitebuilder.platform.admin.settings.dto.UpdateAdminSettingsRequest;
import com.websitebuilder.platform.admin.settings.entity.PlatformSettingsEntity;
import com.websitebuilder.platform.admin.settings.repository.PlatformSettingsRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminSettingsService {

    private static final Short SETTINGS_ROW_ID = 1;

    private final PlatformSettingsRepository platformSettingsRepository;

    public AdminSettingsService(PlatformSettingsRepository platformSettingsRepository) {
        this.platformSettingsRepository = platformSettingsRepository;
    }

    @Transactional(readOnly = true)
    public AdminSettingsResponse getSettings() {
        return toResponse(loadSettings());
    }

    @Transactional
    public AdminSettingsResponse updateSettings(UpdateAdminSettingsRequest request) {
        if (!request.hasUpdates()
                || request.notifications() != null && !request.notifications().hasUpdates()
                || request.security() != null && !request.security().hasUpdates()) {
            throw new ApiException("VALIDATION_ERROR", "At least one settings field must be supplied");
        }

        PlatformSettingsEntity settings = loadSettings();
        if (request.siteName() != null) {
            settings.setSiteName(request.siteName());
        }
        if (request.siteDescription() != null) {
            settings.setSiteDescription(request.siteDescription());
        }
        if (request.supportEmail() != null) {
            settings.setSupportEmail(request.supportEmail());
        }

        if (request.notifications() != null) {
            var notifications = request.notifications();
            if (notifications.emailNotifications() != null) {
                settings.setEmailNotifications(notifications.emailNotifications());
            }
            if (notifications.newUserNotifications() != null) {
                settings.setNewUserNotifications(notifications.newUserNotifications());
            }
            if (notifications.paymentNotifications() != null) {
                settings.setPaymentNotifications(notifications.paymentNotifications());
            }
            if (notifications.weeklyReport() != null) {
                settings.setWeeklyReport(notifications.weeklyReport());
            }
        }

        if (request.security() != null) {
            var security = request.security();
            if (security.twoFactorRequired() != null) {
                settings.setTwoFactorRequired(security.twoFactorRequired());
            }
            if (security.sessionTimeout() != null) {
                settings.setSessionTimeout(security.sessionTimeout());
            }
            if (security.passwordMinLength() != null) {
                settings.setPasswordMinLength(security.passwordMinLength());
            }
        }

        return toResponse(platformSettingsRepository.save(settings));
    }

    private PlatformSettingsEntity loadSettings() {
        return platformSettingsRepository.findById(SETTINGS_ROW_ID)
                .orElseThrow(() -> new IllegalStateException("Platform settings singleton row is missing"));
    }

    private AdminSettingsResponse toResponse(PlatformSettingsEntity settings) {
        return new AdminSettingsResponse(
                settings.siteName(),
                settings.siteDescription(),
                settings.supportEmail(),
                new AdminNotificationSettings(
                        settings.emailNotifications(),
                        settings.newUserNotifications(),
                        settings.paymentNotifications(),
                        settings.weeklyReport()
                ),
                new AdminSecuritySettings(
                        settings.twoFactorRequired(),
                        settings.sessionTimeout(),
                        settings.passwordMinLength()
                )
        );
    }
}
