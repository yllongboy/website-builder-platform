package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.billing.service.BillingService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.common.util.HtmlSanitizer;
import com.websitebuilder.platform.publishing.config.R2Properties;
import com.websitebuilder.platform.publishing.dto.PublishLogResponse;
import com.websitebuilder.platform.publishing.entity.PublishLogEntity;
import com.websitebuilder.platform.publishing.entity.PublishLogStatus;
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
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebsiteServicePublishLogsTest {

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
    @DisplayName("getPublishLogs owner receives ordered logs")
    void getPublishLogs_success() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);

        PublishLogEntity newest = new PublishLogEntity(
                UUID.randomUUID(),
                website,
                PublishLogStatus.SUCCESS,
                null,
                "https://cdn.example.com/owner/site",
                Instant.parse("2026-05-09T10:15:30Z")
        );
        PublishLogEntity older = new PublishLogEntity(
                UUID.randomUUID(),
                website,
                PublishLogStatus.FAILED,
                "R2 upload failed",
                null,
                Instant.parse("2026-05-09T09:15:30Z")
        );

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(publishLogRepository.findTop50ByWebsiteIdOrderByCreatedAtDesc(website.id()))
                .thenReturn(List.of(newest, older));

        List<PublishLogResponse> result = websiteService.getPublishLogs(website.id(), owner);

        assertEquals(2, result.size());
        assertEquals(newest.id(), result.get(0).id());
        assertEquals(PublishLogStatus.SUCCESS, result.get(0).status());
        assertEquals("https://cdn.example.com/owner/site", result.get(0).publishedUrl());
        assertEquals(older.id(), result.get(1).id());
        assertEquals(PublishLogStatus.FAILED, result.get(1).status());
        assertEquals("R2 upload failed", result.get(1).message());
    }

    @Test
    @DisplayName("getPublishLogs owner with no logs returns empty list")
    void getPublishLogs_emptyList() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));
        when(publishLogRepository.findTop50ByWebsiteIdOrderByCreatedAtDesc(website.id()))
                .thenReturn(List.of());

        List<PublishLogResponse> result = websiteService.getPublishLogs(website.id(), owner);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("getPublishLogs non-owner throws WEBSITE_ACCESS_DENIED")
    void getPublishLogs_notOwner() {
        WebsiteService websiteService = newWebsiteService();
        UserEntity owner = testUser("owner@example.com");
        UserEntity attacker = testUser("attacker@example.com");
        WebsiteEntity website = testWebsite(owner, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(website.id())).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class,
                () -> websiteService.getPublishLogs(website.id(), attacker));

        assertEquals("WEBSITE_ACCESS_DENIED", exception.code());
        verify(publishLogRepository, never()).findTop50ByWebsiteIdOrderByCreatedAtDesc(website.id());
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
