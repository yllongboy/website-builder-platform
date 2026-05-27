package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

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
import com.websitebuilder.platform.websites.dto.AdminWebsiteResponse;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.mapper.WebsiteMapper;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebsiteServiceAdminTest {

    @Mock private WebsiteRepository websiteRepository;
    @Mock private WebsiteVersionRepository websiteVersionRepository;
    @Mock private TemplateRepository templateRepository;
    @Mock private WebsiteMapper websiteMapper;
    @Mock private HtmlSanitizer htmlSanitizer;
    @Mock private BillingService billingService;
    @Mock private R2UploadService r2UploadService;
    @Mock private PublishLogService publishLogService;
    @Mock private PublishLogRepository publishLogRepository;

    @Test
    void adminUpdateStatus_toArchived_succeeds() {
        WebsiteService service = newWebsiteService();
        UUID websiteId = UUID.fromString("11111111-1111-1111-1111-111111111111");
        WebsiteEntity website = testWebsite(websiteId, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(websiteId)).thenReturn(Optional.of(website));
        when(websiteRepository.save(website)).thenReturn(website);
        when(websiteMapper.toAdminResponse(website)).thenReturn(new AdminWebsiteResponse(
                website.id(), website.user().email(), website.name(),
                com.websitebuilder.platform.websites.dto.WebsiteStatus.ARCHIVED,
                website.publishedUrl(), website.updatedAt()
        ));

        AdminWebsiteResponse response = service.adminUpdateStatus(
                websiteId, com.websitebuilder.platform.websites.dto.WebsiteStatus.ARCHIVED);

        assertEquals(com.websitebuilder.platform.websites.dto.WebsiteStatus.ARCHIVED, response.status());
        assertEquals(WebsiteStatus.ARCHIVED, website.status());
        verify(websiteRepository).save(website);
    }

    @Test
    void adminUpdateStatus_toDraft_succeeds() {
        WebsiteService service = newWebsiteService();
        UUID websiteId = UUID.fromString("22222222-2222-2222-2222-222222222222");
        WebsiteEntity website = testWebsite(websiteId, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(websiteId)).thenReturn(Optional.of(website));
        when(websiteRepository.save(website)).thenReturn(website);
        when(websiteMapper.toAdminResponse(website)).thenReturn(new AdminWebsiteResponse(
                website.id(), website.user().email(), website.name(),
                com.websitebuilder.platform.websites.dto.WebsiteStatus.DRAFT,
                website.publishedUrl(), website.updatedAt()
        ));

        AdminWebsiteResponse response = service.adminUpdateStatus(
                websiteId, com.websitebuilder.platform.websites.dto.WebsiteStatus.DRAFT);

        assertEquals(com.websitebuilder.platform.websites.dto.WebsiteStatus.DRAFT, response.status());
        assertEquals(WebsiteStatus.DRAFT, website.status());
        verify(websiteRepository).save(website);
    }

    @Test
    void adminUpdateStatus_rejectsPublished_with400() {
        WebsiteService service = newWebsiteService();
        UUID websiteId = UUID.fromString("33333333-3333-3333-3333-333333333333");
        WebsiteEntity website = testWebsite(websiteId, WebsiteStatus.PUBLISHED);

        when(websiteRepository.findById(websiteId)).thenReturn(Optional.of(website));

        ApiException exception = assertThrows(ApiException.class,
                () -> service.adminUpdateStatus(websiteId,
                        com.websitebuilder.platform.websites.dto.WebsiteStatus.PUBLISHED));

        assertEquals("WEBSITE_STATUS_INVALID", exception.code());
        verify(websiteRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    @Test
    void adminUpdateStatus_throwsNotFound_whenWebsiteNotFound() {
        WebsiteService service = newWebsiteService();
        UUID websiteId = UUID.fromString("44444444-4444-4444-4444-444444444444");

        when(websiteRepository.findById(websiteId)).thenReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class,
                () -> service.adminUpdateStatus(websiteId,
                        com.websitebuilder.platform.websites.dto.WebsiteStatus.ARCHIVED));

        assertEquals("WEBSITE_NOT_FOUND", exception.code());
        verify(websiteRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    private WebsiteService newWebsiteService() {
        return new WebsiteService(websiteRepository, websiteVersionRepository, templateRepository,
                websiteMapper, htmlSanitizer, billingService, r2UploadService, publishLogService,
                publishLogRepository, new R2Properties("account", "key", "secret", "bucket",
                "https://pub.sites.example.test"));
    }

    private static UserEntity testUser() {
        Instant now = Instant.parse("2026-05-01T10:15:30Z");
        return new UserEntity(UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                "owner@example.com", "password-hash", UserRole.USER, UserStatus.ACTIVE, now, now);
    }

    private static WebsiteEntity testWebsite(UUID websiteId, WebsiteStatus status) {
        Instant now = Instant.parse("2026-05-01T10:15:30Z");
        return new WebsiteEntity(websiteId, testUser(), null, "Admin Test Site", "admin-test-site",
                status, "https://pub.sites.example.test/owner/admin-test-site", null, now, now);
    }
}
