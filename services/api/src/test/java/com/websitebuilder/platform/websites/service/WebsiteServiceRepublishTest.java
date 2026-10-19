package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.billing.service.BillingService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.common.util.HtmlSanitizer;
import com.websitebuilder.platform.publishing.config.R2Properties;
import com.websitebuilder.platform.publishing.entity.PublishLogEntity;
import com.websitebuilder.platform.publishing.repository.PublishLogRepository;
import com.websitebuilder.platform.publishing.service.PublishLogService;
import com.websitebuilder.platform.publishing.service.R2UploadService;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.websites.dto.PublishResponse;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.entity.WebsiteVersionEntity;
import com.websitebuilder.platform.websites.mapper.WebsiteMapper;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import java.time.Instant;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebsiteServiceRepublishTest {

    @Mock
    private WebsiteRepository websiteRepository;

    @Mock
    private WebsiteVersionRepository websiteVersionRepository;

    @Mock
    private TemplateRepository templateRepository;

    @Mock
    private WebsiteMapper websiteMapper;

    @Mock
    private HtmlSanitizer htmlSanitizer;

    @Mock
    private BillingService billingService;

    @Mock
    private R2UploadService r2UploadService;

    @Mock
    private PublishLogService publishLogService;

    @Mock
    private PublishLogRepository publishLogRepository;

    @Mock
    private ActivityEventService activityEventService;

    @Test
    @DisplayName("republish published owner updates lastPublishedAt and keeps publishedUrl")
    void republish_success() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);
        WebsiteVersionEntity version = testVersion(website);
        PublishLogEntity log = testLog(website);
        Instant previousPublishedAt = Instant.now().minusSeconds(120);
        String existingPublishedUrl = "https://pub.sites.example.test/existing-user/test-site";

        website.setLastPublishedAt(previousPublishedAt);
        website.setPublishedUrl(existingPublishedUrl);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenReturn(true);
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), owner.id()))
                .thenReturn(Optional.of(version));
        when(publishLogService.logStarted(website)).thenReturn(log);

        PublishResponse result = websiteService.republish(website.id(), owner);

        assertEquals("SUCCESS", result.status());
        assertEquals(existingPublishedUrl, website.publishedUrl());
        assertEquals(existingPublishedUrl, result.publishedUrl());
        assertTrue(website.lastPublishedAt().isAfter(previousPublishedAt));
        verify(r2UploadService).uploadSiteFiles(eq(expectedUserSlug(owner)), eq("test-site"), anyString(), anyString());
        verify(publishLogService).logSuccess(log, existingPublishedUrl);
        verify(activityEventService).record(
                ActivityEventType.WEBSITE_PUBLISHED, "Website published: " + website.name(), owner.email());
    }

    @Test
    @DisplayName("republish non-owner throws WEBSITE_ACCESS_DENIED and does not call r2")
    void republish_notOwner() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        UserEntity attacker = testUser("attacker@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.republish(website.id(), attacker));

        assertEquals("WEBSITE_ACCESS_DENIED", exception.code());
        verify(r2UploadService, never()).uploadSiteFiles(anyString(), anyString(), anyString(), anyString());
        verify(activityEventService, never()).record(any(), anyString(), anyString());
    }

    @Test
    @DisplayName("republish draft website throws WEBSITE_NOT_PUBLISHED and does not call r2")
    void republish_websiteNotPublished_draft() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.DRAFT);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.republish(website.id(), owner));

        assertEquals("WEBSITE_NOT_PUBLISHED", exception.code());
        verify(r2UploadService, never()).uploadSiteFiles(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    @DisplayName("republish billing failure is propagated and does not call r2")
    void republish_billingBlocked() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);
        ApiException billingFailure = new ApiException("BILLING_BLOCKED", "Billing check failed");

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenThrow(billingFailure);

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.republish(website.id(), owner));

        assertEquals("BILLING_BLOCKED", exception.code());
        verify(r2UploadService, never()).uploadSiteFiles(anyString(), anyString(), anyString(), anyString());
    }

    @Test
    @DisplayName("republish r2 failure logs failed and throws REPUBLISH_FAILED")
    void republish_r2Failure() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);
        WebsiteVersionEntity version = testVersion(website);
        PublishLogEntity log = testLog(website);

        website.setPublishedUrl("https://pub.sites.example.test/existing-user/test-site");

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenReturn(true);
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), owner.id()))
                .thenReturn(Optional.of(version));
        when(publishLogService.logStarted(website)).thenReturn(log);
        doThrow(new RuntimeException("R2 unavailable"))
                .when(r2UploadService).uploadSiteFiles(anyString(), anyString(), anyString(), anyString());

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.republish(website.id(), owner));

        assertEquals("REPUBLISH_FAILED", exception.code());
        verify(publishLogService).logFailed(log, "Failed to republish website");
        verify(activityEventService, never()).record(any(), anyString(), anyString());
    }

    private WebsiteService newWebsiteService() {
        return new WebsiteService(
                websiteRepository,
                websiteVersionRepository,
                templateRepository,
                websiteMapper,
                htmlSanitizer,
                billingService,
                r2UploadService,
                publishLogService,
                publishLogRepository,
                new R2Properties(
                        "account",
                        "key",
                        "secret",
                        "bucket",
                        "https://pub.sites.example.test"
                ),
                activityEventService
        );
    }

    private static WebsiteVersionEntity testVersion(WebsiteEntity website) {
        return new WebsiteVersionEntity(
                UUID.randomUUID(),
                website,
                "<html>ok</html>",
                "body {}",
                null,
                2,
                true,
                Instant.now()
        );
    }

    private static PublishLogEntity testLog(WebsiteEntity website) {
        return new PublishLogEntity(
                UUID.randomUUID(),
                website,
                com.websitebuilder.platform.publishing.entity.PublishLogStatus.STARTED,
                null,
                null,
                Instant.now()
        );
    }

    private static UserEntity testUser(String email) {
        Instant now = Instant.now();
        return new UserEntity(
                UUID.randomUUID(),
                email,
                "hash",
                UserRole.USER,
                UserStatus.ACTIVE,
                now,
                now
        );
    }

    private static WebsiteEntity testWebsite(UserEntity owner, WebsiteStatus status) {
        Instant now = Instant.now();
        return new WebsiteEntity(
                UUID.randomUUID(),
                owner,
                null,
                "Test Site",
                "test-site",
                status,
                null,
                null,
                now,
                now
        );
    }

    private static String expectedUserSlug(UserEntity user) {
        String email = user.email() == null ? "user" : user.email();
        String localPart = email.contains("@") ? email.substring(0, email.indexOf('@')) : email;
        String emailSlug = localPart.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
        if (emailSlug.isBlank()) {
            emailSlug = "user";
        }
        String uuidSegment = user.id().toString().replace("-", "").substring(0, 8);
        return emailSlug + "-" + uuidSegment;
    }
}
