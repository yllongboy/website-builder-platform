package com.websitebuilder.platform.templates.service;

import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.categories.repository.CategoryRepository;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.templates.dto.AdminTemplateResponse;
import com.websitebuilder.platform.templates.dto.TemplateDetail;
import com.websitebuilder.platform.templates.dto.TemplateSummary;
import com.websitebuilder.platform.templates.dto.TemplateUpsertRequest;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.templates.mapper.TemplateMapper;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final CategoryRepository categoryRepository;
    private final TemplateMapper templateMapper;
    private final WebsiteRepository websiteRepository;

    public TemplateService(
            TemplateRepository templateRepository,
            CategoryRepository categoryRepository,
            TemplateMapper templateMapper,
            WebsiteRepository websiteRepository
    ) {
        this.templateRepository = templateRepository;
        this.categoryRepository = categoryRepository;
        this.templateMapper = templateMapper;
        this.websiteRepository = websiteRepository;
    }

    @Transactional(readOnly = true)
    public List<TemplateSummary> listPublic(String categorySlug, String search) {
        return templateRepository.findPublicFiltered(normalize(categorySlug), normalize(search))
                .stream()
                .map(templateMapper::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public TemplateDetail getPublicDetail(UUID id) {
        TemplateEntity entity = templateRepository.findByIdAndIsActiveTrue(id)
                .orElseThrow(() -> new ApiException("TEMPLATE_NOT_FOUND", "Template not found"));
        return templateMapper.toDetail(entity);
    }

    @Transactional(readOnly = true)
    public List<AdminTemplateResponse> listAdmin() {
        List<TemplateEntity> templates = templateRepository.findAll();
        if (templates.isEmpty()) {
            return List.of();
        }
        List<UUID> templateIds = templates.stream().map(TemplateEntity::id).toList();
        Map<UUID, Long> usageCounts = websiteRepository.countGroupedByTemplateId(templateIds).stream()
                .collect(Collectors.toMap(row -> (UUID) row[0], row -> (Long) row[1]));
        return templates.stream()
                .map(template -> templateMapper.toAdminResponse(template, usageCounts.getOrDefault(template.id(), 0L)))
                .toList();
    }

    @Transactional
    public AdminTemplateResponse create(TemplateUpsertRequest request) {
        CategoryEntity category = categoryRepository.findById(Objects.requireNonNull(request.categoryId()))
                .orElseThrow(() -> new ApiException("CATEGORY_NOT_FOUND", "Category not found"));

        if (templateRepository.findBySlug(request.slug()).isPresent()) {
            throw new ApiException("TEMPLATE_SLUG_TAKEN", "Template slug is already in use");
        }

        Instant now = Instant.now();
        TemplateEntity entity = new TemplateEntity(
                UUID.randomUUID(),
                category,
                request.name(),
                request.slug(),
                request.description(),
                request.thumbnailUrl(),
                request.htmlContent(),
                request.cssContent(),
                request.editorState(),
                request.isPremium() != null ? request.isPremium() : false,
                request.isActive() != null ? request.isActive() : true,
                now,
                now
        );

        templateRepository.save(entity);
        return templateMapper.toAdminResponse(entity, websiteRepository.countByTemplateId(entity.id()));
    }

    @Transactional
    public AdminTemplateResponse update(UUID id, TemplateUpsertRequest request) {
        TemplateEntity entity = templateRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ApiException("TEMPLATE_NOT_FOUND", "Template not found"));

        CategoryEntity category = categoryRepository.findById(Objects.requireNonNull(request.categoryId()))
                .orElseThrow(() -> new ApiException("CATEGORY_NOT_FOUND", "Category not found"));

        templateRepository.findBySlug(request.slug())
                .filter(existing -> !existing.id().equals(entity.id()))
                .ifPresent(existing -> {
                    throw new ApiException("TEMPLATE_SLUG_TAKEN", "Template slug is already in use");
                });

        entity.setCategory(category);
        entity.setName(request.name());
        entity.setSlug(request.slug());
        entity.setDescription(request.description());
        entity.setThumbnailUrl(request.thumbnailUrl());
        entity.setHtmlContent(request.htmlContent());
        entity.setCssContent(request.cssContent());
        entity.setEditorState(request.editorState());
        entity.setIsPremium(request.isPremium() != null ? request.isPremium() : false);
        entity.setIsActive(request.isActive() != null ? request.isActive() : true);

        templateRepository.save(entity);
        return templateMapper.toAdminResponse(entity, websiteRepository.countByTemplateId(entity.id()));
    }

    @Transactional
    public SuccessResponse delete(UUID id) {
        TemplateEntity entity = templateRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ApiException("TEMPLATE_NOT_FOUND", "Template not found"));

        templateRepository.delete(Objects.requireNonNull(entity));
        return new SuccessResponse(true);
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
