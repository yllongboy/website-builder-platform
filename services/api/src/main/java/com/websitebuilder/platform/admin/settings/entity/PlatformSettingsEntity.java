package com.websitebuilder.platform.admin.settings.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "platform_settings")
public class PlatformSettingsEntity {

    @Id
    @Column(name = "singleton_id", nullable = false)
    private Short singletonId;

    @Column(name = "site_name", nullable = false, length = 100)
    private String siteName;

    @Column(name = "site_description", nullable = false, length = 500)
    private String siteDescription;

    @Column(name = "support_email", nullable = false, length = 254)
    private String supportEmail;

    @Column(name = "email_notifications", nullable = false)
    private boolean emailNotifications;

    @Column(name = "new_user_notifications", nullable = false)
    private boolean newUserNotifications;

    @Column(name = "payment_notifications", nullable = false)
    private boolean paymentNotifications;

    @Column(name = "weekly_report", nullable = false)
    private boolean weeklyReport;

    @Column(name = "two_factor_required", nullable = false)
    private boolean twoFactorRequired;

    @Column(name = "session_timeout", nullable = false)
    private int sessionTimeout;

    @Column(name = "password_min_length", nullable = false)
    private int passwordMinLength;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected PlatformSettingsEntity() {
    }

    @PreUpdate
    void updateTimestamp() {
        updatedAt = Instant.now();
    }

    public Short singletonId() { return singletonId; }
    public String siteName() { return siteName; }
    public String siteDescription() { return siteDescription; }
    public String supportEmail() { return supportEmail; }
    public boolean emailNotifications() { return emailNotifications; }
    public boolean newUserNotifications() { return newUserNotifications; }
    public boolean paymentNotifications() { return paymentNotifications; }
    public boolean weeklyReport() { return weeklyReport; }
    public boolean twoFactorRequired() { return twoFactorRequired; }
    public int sessionTimeout() { return sessionTimeout; }
    public int passwordMinLength() { return passwordMinLength; }

    public void setSiteName(String siteName) { this.siteName = siteName; }
    public void setSiteDescription(String siteDescription) { this.siteDescription = siteDescription; }
    public void setSupportEmail(String supportEmail) { this.supportEmail = supportEmail; }
    public void setEmailNotifications(boolean value) { emailNotifications = value; }
    public void setNewUserNotifications(boolean value) { newUserNotifications = value; }
    public void setPaymentNotifications(boolean value) { paymentNotifications = value; }
    public void setWeeklyReport(boolean value) { weeklyReport = value; }
    public void setTwoFactorRequired(boolean value) { twoFactorRequired = value; }
    public void setSessionTimeout(int sessionTimeout) { this.sessionTimeout = sessionTimeout; }
    public void setPasswordMinLength(int passwordMinLength) { this.passwordMinLength = passwordMinLength; }
}
