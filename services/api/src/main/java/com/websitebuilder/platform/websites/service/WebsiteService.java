package com.websitebuilder.platform.websites.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.billing.service.BillingService;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.common.util.HtmlSanitizer;
import com.websitebuilder.platform.publishing.config.R2Properties;
import com.websitebuilder.platform.publishing.dto.PublishLogResponse;
import com.websitebuilder.platform.publishing.entity.PublishLogEntity;
import com.websitebuilder.platform.publishing.repository.PublishLogRepository;
import com.websitebuilder.platform.publishing.service.PublishLogService;
import com.websitebuilder.platform.publishing.service.R2UploadService;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.websites.dto.AdminWebsiteResponse;
import com.websitebuilder.platform.websites.dto.CreateBlankWebsiteRequest;
import com.websitebuilder.platform.websites.dto.CreateWebsiteFromTemplateRequest;
import com.websitebuilder.platform.websites.dto.EditorStateResponse;
import com.websitebuilder.platform.websites.dto.PreviewResponse;
import com.websitebuilder.platform.websites.dto.PublishResponse;
import com.websitebuilder.platform.websites.dto.PublishStatusResponse;
import com.websitebuilder.platform.websites.dto.SaveEditorStateRequest;
import com.websitebuilder.platform.websites.dto.SaveEditorStateResponse;
import com.websitebuilder.platform.websites.dto.UpdateWebsiteRequest;
import com.websitebuilder.platform.websites.dto.WebsiteSummary;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.entity.WebsiteVersionEntity;
import com.websitebuilder.platform.websites.mapper.WebsiteMapper;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import com.websitebuilder.platform.websites.repository.WebsiteVersionRepository;
import jakarta.annotation.PostConstruct;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WebsiteService {

    private final WebsiteRepository websiteRepository;
    private final WebsiteVersionRepository websiteVersionRepository;
    private final TemplateRepository templateRepository;
    private final WebsiteMapper websiteMapper;
    private final HtmlSanitizer htmlSanitizer;
    private final BillingService billingService;
    private final R2UploadService r2UploadService;
    private final PublishLogService publishLogService;
    private final PublishLogRepository publishLogRepository;
    private final R2Properties r2Properties;
    private final ActivityEventService activityEventService;

    public WebsiteService(
            WebsiteRepository websiteRepository,
            WebsiteVersionRepository websiteVersionRepository,
            TemplateRepository templateRepository,
            WebsiteMapper websiteMapper,
            HtmlSanitizer htmlSanitizer,
            BillingService billingService,
            R2UploadService r2UploadService,
            PublishLogService publishLogService,
            PublishLogRepository publishLogRepository,
            R2Properties r2Properties,
            ActivityEventService activityEventService
    ) {
        this.websiteRepository = websiteRepository;
        this.websiteVersionRepository = websiteVersionRepository;
        this.templateRepository = templateRepository;
        this.websiteMapper = websiteMapper;
        this.htmlSanitizer = htmlSanitizer;
        this.billingService = billingService;
        this.r2UploadService = r2UploadService;
        this.publishLogService = publishLogService;
        this.publishLogRepository = publishLogRepository;
        this.r2Properties = r2Properties;
        this.activityEventService = activityEventService;
    }

    @PostConstruct
    void validateR2PublicUrlBase() {
        String publicUrlBase = r2Properties.publicUrlBase();
        if (publicUrlBase != null && !publicUrlBase.isBlank() && !publicUrlBase.startsWith("https://")) {
            throw new IllegalStateException("R2 publicUrlBase must use https scheme");
        }
    }

    @Transactional
    public WebsiteSummary createFromTemplate(UUID templateId, CreateWebsiteFromTemplateRequest request, UserEntity user) {
        TemplateEntity template = templateRepository.findByIdAndIsActiveTrue(templateId)
                .orElseThrow(() -> new ApiException("TEMPLATE_NOT_FOUND", "Template not found"));

        String baseName = request.name().strip();
        String baseSlug = generateSlug(baseName);
        String slug = resolveUniqueSlug(user.id(), baseSlug);

        Instant now = Instant.now();
        WebsiteEntity website = new WebsiteEntity(
                UUID.randomUUID(),
                user,
                template,
                baseName,
                slug,
                WebsiteStatus.DRAFT,
                null,
                null,
                now,
                now
        );
        websiteRepository.save(website);

        WebsiteVersionEntity version = new WebsiteVersionEntity(
                UUID.randomUUID(),
                website,
                template.htmlContent(),
                template.cssContent(),
                sanitizeEditorState(template.editorState() != null ? template.editorState().deepCopy() : null),
                1,
                true,
                now
        );
        websiteVersionRepository.save(version);

        return websiteMapper.toSummary(website);
    }

    @Transactional
    public WebsiteSummary createBlankWebsite(CreateBlankWebsiteRequest request, UserEntity user) {
        String baseName = request.name().strip();
        if (baseName.isBlank()) {
            throw new ApiException("WEBSITE_NAME_REQUIRED", "Website name is required");
        }

        String baseSlug = generateSlug(baseName);
        String slug = resolveUniqueSlug(user.id(), baseSlug);

        Instant now = Instant.now();
        WebsiteEntity website = new WebsiteEntity(
                UUID.randomUUID(),
                user,
                null,
                baseName,
                slug,
                WebsiteStatus.DRAFT,
                null,
                null,
                now,
                now
        );
        websiteRepository.save(website);

        WebsiteVersionEntity version = new WebsiteVersionEntity(
                UUID.randomUUID(),
                website,
                "",
                null,
                null,
                1,
                true,
                now
        );
        websiteVersionRepository.save(version);

        return websiteMapper.toSummary(website);
    }

    @Transactional(readOnly = true)
    public List<WebsiteSummary> listByUser(UserEntity user) {
        return websiteRepository.findByUserId(user.id())
                .stream()
                .map(websiteMapper::toSummary)
                .toList();
    }

    @Transactional
    public WebsiteSummary update(UUID websiteId, UpdateWebsiteRequest request, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        String newName = request.name();
        if (newName != null && !newName.isBlank()) {
            website.setName(newName.strip());
        }
        websiteRepository.save(website);
        return websiteMapper.toSummary(website);
    }

    @Transactional
    public SuccessResponse delete(UUID websiteId, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        websiteRepository.delete(website);
        return new SuccessResponse(true);
    }

    @Transactional(readOnly = true)
    public List<AdminWebsiteResponse> listAdmin() {
        return websiteRepository.findAll()
                .stream()
                .map(websiteMapper::toAdminResponse)
                .toList();
    }

    @Transactional
    public AdminWebsiteResponse adminUpdateStatus(
            UUID websiteId,
            com.websitebuilder.platform.websites.dto.WebsiteStatus newStatus
    ) {
        WebsiteEntity website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new ApiException("WEBSITE_NOT_FOUND", "Website not found"));

        if (newStatus != com.websitebuilder.platform.websites.dto.WebsiteStatus.DRAFT
            && newStatus != com.websitebuilder.platform.websites.dto.WebsiteStatus.ARCHIVED) {
            throw new ApiException("WEBSITE_STATUS_INVALID", "Admin can only set status to DRAFT or ARCHIVED");
        }

        website.setStatus(WebsiteStatus.valueOf(newStatus.name()));
        WebsiteEntity saved = websiteRepository.save(website);
        return websiteMapper.toAdminResponse(saved);
    }

    @Transactional(readOnly = true)
    public EditorStateResponse loadEditorState(UUID websiteId, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        WebsiteVersionEntity version = websiteVersionRepository
            .findCurrentByWebsiteIdAndUserId(websiteId, user.id())
            .orElse(null);

        if (version == null) {
            return new EditorStateResponse(
                    website.id(),
                    website.name(),
                    "",
                    "",
                    null,
                    null,
                    website.updatedAt(),
                    website.status(),
                    website.publishedUrl()
            );
        }

        return websiteMapper.toEditorStateResponse(version.website(), version);
    }

    @Transactional
    public SaveEditorStateResponse saveEditorState(UUID websiteId, SaveEditorStateRequest request, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        WebsiteVersionEntity currentVersion = websiteVersionRepository
            .findCurrentByWebsiteIdAndUserId(websiteId, user.id())
                .orElseThrow(() -> new ApiException("WEBSITE_NOT_FOUND", "Website not found"));

        // Mark current version as no longer current
        currentVersion.setIsCurrent(false);
        websiteVersionRepository.save(currentVersion);
        websiteVersionRepository.flush();

        // Create new version with incremented versionNumber
        Instant now = Instant.now();
        WebsiteVersionEntity newVersion = new WebsiteVersionEntity(
            UUID.randomUUID(),
            website,
            htmlSanitizer.sanitize(request.htmlContent()),
            sanitizeCss(request.cssContent()),
            sanitizeEditorState(request.editorState()),
            currentVersion.versionNumber() + 1,
            true,
            now
        );
        websiteVersionRepository.save(newVersion);

        // Prune old versions - keep only the last 10
        int keepFromVersion = newVersion.versionNumber() - 11;
        if (keepFromVersion > 0) {
            websiteVersionRepository.deleteOldVersions(website.id(), keepFromVersion);
        }

        return websiteMapper.toSaveEditorStateResponse(website, newVersion);
    }

    @Transactional(readOnly = true)
    public PreviewResponse getPreview(UUID websiteId, UserEntity user) {
        getOwnedWebsiteOrThrow(websiteId, user);

        WebsiteVersionEntity version = websiteVersionRepository
            .findCurrentByWebsiteIdAndUserId(websiteId, user.id())
                .orElseThrow(() -> new ApiException("WEBSITE_NOT_FOUND", "Website not found"));

        return new PreviewResponse(version.htmlContent(), version.cssContent());
    }

    @Transactional
    public PublishResponse publish(UUID websiteId, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        if (!billingService.canPublish(user)) {
            throw new ApiException("SUBSCRIPTION_REQUIRED", "Active subscription required to publish");
        }

        WebsiteVersionEntity version = websiteVersionRepository
                .findCurrentByWebsiteIdAndUserId(websiteId, user.id())
                .orElseThrow(() -> new ApiException("WEBSITE_VERSION_NOT_FOUND", "Website version not found"));

        PublishLogEntity log = publishLogService.logStarted(website);

        try {
            String mergedHtml = injectCssIntoHtml(version.htmlContent(), version.cssContent());
            r2UploadService.uploadSiteFiles(
                    buildUserSlug(user),
                    website.slug(),
                mergedHtml,
                    version.cssContent()
            );

            website.setPublishedUrl(buildPublishedUrl(user, website));
            website.setStatus(WebsiteStatus.PUBLISHED);
            website.setLastPublishedAt(Instant.now());
            websiteRepository.save(website);

            publishLogService.logSuccess(log, website.publishedUrl());
            recordWebsitePublished(website, user);
            return new PublishResponse("SUCCESS", website.publishedUrl(), null);
        } catch (Exception ex) {
            publishLogService.logFailed(log, "R2 upload failed");
            throw new ApiException("PUBLISH_FAILED", "Failed to publish website to R2");
        }
    }

    @Transactional
    public PublishResponse republish(UUID websiteId, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        if (website.status() != WebsiteStatus.PUBLISHED) {
            throw new ApiException("WEBSITE_NOT_PUBLISHED", "Website is not published");
        }

        if (!billingService.canPublish(user)) {
            throw new ApiException("SUBSCRIPTION_REQUIRED", "Active subscription required to publish");
        }

        WebsiteVersionEntity version = websiteVersionRepository
                .findCurrentByWebsiteIdAndUserId(websiteId, user.id())
                .orElseThrow(() -> new ApiException("WEBSITE_VERSION_NOT_FOUND", "Website version not found"));

        PublishLogEntity log = publishLogService.logStarted(website);

        try {
            String mergedHtml = injectCssIntoHtml(version.htmlContent(), version.cssContent());
            r2UploadService.uploadSiteFiles(
                    buildUserSlug(user),
                    website.slug(),
                mergedHtml,
                    version.cssContent()
            );

            website.setLastPublishedAt(Instant.now());
            websiteRepository.save(website);

            publishLogService.logSuccess(log, website.publishedUrl());
            recordWebsitePublished(website, user);
            return new PublishResponse("SUCCESS", website.publishedUrl(), null);
        } catch (Exception ex) {
            publishLogService.logFailed(log, "Failed to republish website");
            throw new ApiException("REPUBLISH_FAILED", "Failed to republish website to R2");
        }
    }

    @Transactional
    public void unpublish(UUID websiteId, UserEntity user) {
        WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

        if (website.status() != WebsiteStatus.PUBLISHED) {
            throw new ApiException("WEBSITE_NOT_PUBLISHED", "Website is not published");
        }

        website.setStatus(WebsiteStatus.DRAFT);
        website.setPublishedUrl(null);
        website.setLastPublishedAt(null);
        websiteRepository.save(website);

        r2UploadService.deleteSiteFiles(buildUserSlug(user), website.slug());

        publishLogService.logUnpublished(website);
    }

    private void recordWebsitePublished(WebsiteEntity website, UserEntity user) {
        activityEventService.record(
                ActivityEventType.WEBSITE_PUBLISHED,
                "Website published: " + website.name(),
                user.email()
        );
    }

    @Transactional(readOnly = true)
    public PublishStatusResponse getPublishStatus(UUID websiteId, UserEntity user) {
    WebsiteEntity website = getOwnedWebsiteOrThrow(websiteId, user);

    return publishLogRepository.findTopByWebsiteIdOrderByCreatedAtDesc(website.id())
        .map(log -> new PublishStatusResponse(
            log.status().name(),
            log.publishedUrl(),
            log.createdAt()
        ))
        .orElseGet(() -> new PublishStatusResponse(
            "NOT_PUBLISHED",
            website.publishedUrl(),
            website.lastPublishedAt()
        ));
    }

    @Transactional(readOnly = true)
    public List<PublishLogResponse> getPublishLogs(UUID websiteId, UserEntity user) {
        getOwnedWebsiteOrThrow(websiteId, user);

        return publishLogRepository.findTop50ByWebsiteIdOrderByCreatedAtDesc(websiteId)
                .stream()
                .map(log -> new PublishLogResponse(
                        log.id(),
                        log.status(),
                        log.publishedUrl(),
                        log.message(),
                        log.createdAt()
                ))
                .toList();
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");
    }

    private String resolveUniqueSlug(UUID userId, String baseSlug) {
        if (!websiteRepository.existsByUserIdAndSlug(userId, baseSlug)) {
            return baseSlug;
        }
        for (int i = 2; i <= 100; i++) {
            String candidate = baseSlug + "-" + i;
            if (!websiteRepository.existsByUserIdAndSlug(userId, candidate)) {
                return candidate;
            }
        }
        throw new ApiException("WEBSITE_SLUG_CONFLICT", "Could not generate a unique slug for this website name");
    }

    private String buildPublishedUrl(UserEntity user, WebsiteEntity website) {
        String publicUrlBase = r2Properties.publicUrlBase();
        if (publicUrlBase == null || publicUrlBase.isBlank()) {
            throw new IllegalStateException("R2 publicUrlBase is not configured");
        }
        if (!publicUrlBase.startsWith("https://")) {
            throw new IllegalStateException("R2 publicUrlBase must use https scheme");
        }
        String baseUrl = publicUrlBase.endsWith("/")
            ? publicUrlBase.substring(0, publicUrlBase.length() - 1)
            : publicUrlBase;
        return baseUrl + "/" + buildUserSlug(user) + "/" + website.slug();
    }

    private String buildUserSlug(UserEntity user) {
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

    private WebsiteEntity getOwnedWebsiteOrThrow(UUID websiteId, UserEntity user) {
        WebsiteEntity website = websiteRepository.findById(websiteId)
                .orElseThrow(() -> new ApiException("WEBSITE_NOT_FOUND", "Website not found"));

        if (!website.user().id().equals(user.id())) {
            throw new ApiException("WEBSITE_ACCESS_DENIED", "Access denied");
        }

        return website;
    }

    private JsonNode sanitizeEditorState(JsonNode node) {
        if (node == null || node.isNull()) return null;
        // Treat an empty JSON object as absent project data.
        if (node.isObject() && node.size() == 0) return null;
        if (node.isObject()) {
            ObjectNode obj = (ObjectNode) node;
            // Remove script-executing keys
            obj.remove("script");
            // Sanitize attributes object to remove on* event handlers and javascript: srcs
            JsonNode attrs = obj.get("attributes");
            if (attrs != null && attrs.isObject()) {
                ObjectNode attrsObj = (ObjectNode) attrs;
                List<String> toRemove = new ArrayList<>();
                attrsObj.fieldNames().forEachRemaining(field -> {
                    if (field.toLowerCase(Locale.ROOT).startsWith("on")) {
                        toRemove.add(field);
                    }
                });
                attrsObj.remove(toRemove);
                // Strip javascript: from src/href
                for (String attr : List.of("src", "href", "action")) {
                    JsonNode val = attrsObj.get(attr);
                    if (val != null && val.isTextual() && val.asText().trim().toLowerCase(Locale.ROOT).startsWith("javascript:")) {
                        attrsObj.put(attr, "");
                    }
                }
            }
            // Sanitize content field using existing htmlSanitizer
            JsonNode content = obj.get("content");
            if (content != null && content.isTextual()) {
                obj.put("content", htmlSanitizer.sanitize(content.asText()));
            }
            // Recurse into remaining fields
            obj.fields().forEachRemaining(entry -> sanitizeEditorState(entry.getValue()));
        } else if (node.isArray()) {
            node.forEach(this::sanitizeEditorState);
        }
        return node;
    }

    private String sanitizeCss(String css) {
        if (css == null) return null;
        return css
                .replaceAll("(?i)expression\\s*\\(", "")
                .replaceAll("(?i)javascript\\s*:", "")
                .replaceAll("(?i)behavior\\s*:", "")
                .replaceAll("(?i)-moz-binding\\s*:", "")
                .replaceAll("(?i)url\\s*\\(\\s*[\"']?\\s*data:", "url(invalid:")
                .replaceAll("(?i)@import\\b", "/* @import removed */")
                .replace("<", "\\3C ")
                .replace(">", "\\3E ");
    }

    private String injectCssIntoHtml(String htmlContent, String cssContent) {
        if (cssContent == null || cssContent.isBlank()) {
            return htmlContent;
        }
        if (htmlContent.matches("(?si).*</head\\s*>.*")) {
            return htmlContent.replaceFirst(
                    "(?i)</head\\s*>",
                    "<style>" + java.util.regex.Matcher.quoteReplacement(cssContent) + "</style></head>"
            );
        }
        return htmlContent;
    }
}
