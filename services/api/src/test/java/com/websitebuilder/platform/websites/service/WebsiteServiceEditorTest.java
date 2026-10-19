package com.websitebuilder.platform.websites.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.node.NullNode;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
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
import com.websitebuilder.platform.websites.dto.SaveEditorStateRequest;
import com.websitebuilder.platform.websites.dto.SaveEditorStateResponse;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.entity.WebsiteVersionEntity;
import com.websitebuilder.platform.websites.mapper.WebsiteMapper;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class WebsiteServiceEditorTest {

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

    private WebsiteService websiteService;

    @BeforeEach
    void setUp() {
        websiteService = new WebsiteService(
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

    @Test
    void loadEditorStateReturnsEmptyFallbackWhenCurrentVersionMissing() {
        UserEntity user = testUser();
        WebsiteEntity website = testWebsite(user);

        when(websiteRepository.findById(website.id()))
                .thenReturn(Optional.of(website));
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), user.id()))
                .thenReturn(Optional.empty());

        var result = websiteService.loadEditorState(website.id(), user);

        assertEquals("", result.htmlContent());
    }

    @Test
    void loadEditorStateThrowsWebsiteNotFoundWhenWebsiteDoesNotBelongToUser() {
        UserEntity user = testUser();
        UUID websiteId = UUID.randomUUID();

        when(websiteRepository.findById(websiteId))
                .thenReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.loadEditorState(websiteId, user));

        assertEquals("WEBSITE_NOT_FOUND", exception.code());
    }

    @Test
    void saveEditorStateSanitizesHtmlBeforeSaving() {
        UserEntity user = testUser();
        WebsiteEntity website = testWebsite(user);
        WebsiteVersionEntity version = testVersion(website);
        SaveEditorStateRequest request = new SaveEditorStateRequest(
                "<script>alert('x')</script><div>safe</div>",
                ".root { color: red; }",
                NullNode.getInstance()
        );

        when(websiteRepository.findById(website.id()))
                .thenReturn(Optional.of(website));
        when(websiteVersionRepository.findCurrentByWebsiteIdAndUserId(website.id(), user.id()))
                .thenReturn(Optional.of(version));
        when(htmlSanitizer.sanitize(request.htmlContent())).thenReturn("<div>safe</div>");
        when(websiteMapper.toSaveEditorStateResponse(eq(website), any(WebsiteVersionEntity.class)))
                .thenReturn(new SaveEditorStateResponse(website.id(), 1, Instant.now()));

        websiteService.saveEditorState(website.id(), request, user);

        verify(htmlSanitizer).sanitize(request.htmlContent());
    }

    @Test
    void saveEditorStateThrowsWebsiteNotFoundWhenWebsiteDoesNotBelongToUser() {
        UserEntity user = testUser();
        UUID websiteId = UUID.randomUUID();
        SaveEditorStateRequest request = new SaveEditorStateRequest("<div>x</div>", "", NullNode.getInstance());

        when(websiteRepository.findById(websiteId))
                .thenReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class, () -> websiteService.saveEditorState(websiteId, request, user));

        assertEquals("WEBSITE_NOT_FOUND", exception.code());
    }

    private static UserEntity testUser() {
        Instant now = Instant.now();
        return new UserEntity(
                UUID.randomUUID(),
                "user@example.com",
                "hash",
                UserRole.USER,
                UserStatus.ACTIVE,
                now,
                now
        );
    }

    private static WebsiteEntity testWebsite(UserEntity user) {
        Instant now = Instant.now();
        return new WebsiteEntity(
                UUID.randomUUID(),
                user,
                null,
                "My Website",
                "my-website",
                WebsiteStatus.DRAFT,
                null,
                null,
                now,
                now
        );
    }

    private static WebsiteVersionEntity testVersion(WebsiteEntity website) {
        return new WebsiteVersionEntity(
                UUID.randomUUID(),
                website,
                "<div>old</div>",
                "",
                NullNode.getInstance(),
                1,
                true,
                Instant.now()
        );
    }
}
