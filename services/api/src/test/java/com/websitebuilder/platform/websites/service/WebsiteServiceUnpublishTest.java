package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.any;
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
import com.websitebuilder.platform.publishing.repository.PublishLogRepository;
import com.websitebuilder.platform.publishing.service.PublishLogService;
import com.websitebuilder.platform.publishing.service.R2UploadService;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.mapper.WebsiteMapper;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebsiteServiceUnpublishTest {

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
    @DisplayName("unpublish published owner resets publish fields and logs event")
    void unpublish_success() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);
        website.setPublishedUrl("https://pub.sites.example.test/owner/test-site");
        website.setLastPublishedAt(Instant.now());

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        websiteService.unpublish(website.id(), owner);

        assertEquals(WebsiteStatus.DRAFT, website.status());
        assertNull(website.publishedUrl());
        assertNull(website.lastPublishedAt());
        verify(r2UploadService).deleteSiteFiles(anyString(), anyString());
        verify(websiteRepository).save(website);
        verify(publishLogService).logUnpublished(website);
        verify(activityEventService, never()).record(any(ActivityEventType.class), anyString(), anyString());
    }

    @Test
    @DisplayName("unpublish by non-owner throws WEBSITE_ACCESS_DENIED and does not call r2")
    void unpublish_notOwner() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        UserEntity attacker = testUser("attacker@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.unpublish(website.id(), attacker));

        assertEquals("WEBSITE_ACCESS_DENIED", exception.code());
        verify(r2UploadService, never()).deleteSiteFiles(anyString(), anyString());
        verify(websiteRepository, never()).save(website);
        verify(publishLogService, never()).logUnpublished(website);
    }

    @Test
    @DisplayName("unpublish draft website throws WEBSITE_NOT_PUBLISHED and does not call r2")
    void unpublish_alreadyDraft() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.DRAFT);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.unpublish(website.id(), owner));

        assertEquals("WEBSITE_NOT_PUBLISHED", exception.code());
        verify(r2UploadService, never()).deleteSiteFiles(anyString(), anyString());
        verify(websiteRepository, never()).save(website);
        verify(publishLogService, never()).logUnpublished(website);
    }

    @Test
    @DisplayName("unpublish archived website throws WEBSITE_NOT_PUBLISHED and does not call r2")
    void unpublish_archived() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.ARCHIVED);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.unpublish(website.id(), owner));

        assertEquals("WEBSITE_NOT_PUBLISHED", exception.code());
        verify(r2UploadService, never()).deleteSiteFiles(anyString(), anyString());
        verify(websiteRepository, never()).save(website);
        verify(publishLogService, never()).logUnpublished(website);
    }

    @Test
    @DisplayName("unpublish propagates r2 failure and does not persist website")
    void unpublish_r2Failure() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);
        ApiException r2Failure = new ApiException("UNPUBLISH_FAILED", "Failed to remove published site files");

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        doThrow(r2Failure).when(r2UploadService).deleteSiteFiles(anyString(), anyString());

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.unpublish(website.id(), owner));

        assertEquals("UNPUBLISH_FAILED", exception.code());
        verify(websiteRepository).save(website);
        verify(publishLogService, never()).logUnpublished(website);
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
}
