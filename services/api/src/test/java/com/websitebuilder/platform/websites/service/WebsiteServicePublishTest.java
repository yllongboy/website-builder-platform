package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.doThrow;
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
class WebsiteServicePublishTest {

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
    @DisplayName("publish owner with active subscription returns success")
    void publish_ownerWithActiveSubscription_returnsSuccess() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner);
        WebsiteVersionEntity version = testVersion(website);
        PublishLogEntity log = testLog(website);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenReturn(true);
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), owner.id()))
            .thenReturn(Optional.of(version));
        when(publishLogService.logStarted(website)).thenReturn(log);

        PublishResponse result = websiteService.publish(website.id(), owner);
        String expectedUserSlug = expectedUserSlug(owner);
        String expectedPublishedUrl = "https://pub.sites.example.test/" + expectedUserSlug + "/sprint-5-test-site";

        assertEquals("SUCCESS", result.status());
        assertEquals(expectedPublishedUrl, result.publishedUrl());
        verify(r2UploadService).uploadSiteFiles(eq(expectedUserSlug), eq("sprint-5-test-site"), anyString(), any());
        verify(publishLogService).logSuccess(log, expectedPublishedUrl);
        verify(activityEventService).record(
                ActivityEventType.WEBSITE_PUBLISHED, "Website published: " + website.name(), owner.email());
    }

    @Test
    @DisplayName("publish non-owner throws WEBSITE_ACCESS_DENIED before billing check")
    void publish_nonOwner_throwsForbiddenBeforeBillingCheck() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        UserEntity attacker = testUser("attacker@example.com");
        WebsiteEntity website = testWebsite(owner);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.publish(website.id(), attacker));

        assertEquals("WEBSITE_ACCESS_DENIED", exception.code());
        verify(billingService, never()).canPublish(attacker);
        verify(r2UploadService, never()).uploadSiteFiles(anyString(), anyString(), anyString(), any());
        verify(activityEventService, never()).record(any(), anyString(), anyString());
    }

    @Test
    @DisplayName("publish owner without subscription throws SUBSCRIPTION_REQUIRED")
    void publish_ownerWithoutSubscription_throwsSubscriptionRequired() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenReturn(false);

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.publish(website.id(), owner));

        assertEquals("SUBSCRIPTION_REQUIRED", exception.code());
        verify(r2UploadService, never()).uploadSiteFiles(anyString(), anyString(), anyString(), any());
        verify(activityEventService, never()).record(any(), anyString(), anyString());
    }

    @Test
    @DisplayName("publish upload failure does not record a published activity event")
    void publish_uploadFailure_doesNotRecordActivity() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner);
        WebsiteVersionEntity version = testVersion(website);
        PublishLogEntity log = testLog(website);
        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(billingService.canPublish(owner)).thenReturn(true);
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), owner.id()))
                .thenReturn(Optional.of(version));
        when(publishLogService.logStarted(website)).thenReturn(log);
        doThrow(new RuntimeException("R2 unavailable"))
                .when(r2UploadService).uploadSiteFiles(anyString(), anyString(), anyString(), any());

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.publish(website.id(), owner));

        assertEquals("PUBLISH_FAILED", exception.code());
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
                1,
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

    private static WebsiteEntity testWebsite(UserEntity owner) {
        Instant now = Instant.now();
        return new WebsiteEntity(
                UUID.randomUUID(),
                owner,
                null,
                "Sprint 5 Test Site",
                "sprint-5-test-site",
                WebsiteStatus.DRAFT,
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
