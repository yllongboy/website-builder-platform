package com.websitebuilder.platform.categories.service;

import com.websitebuilder.platform.categories.dto.AdminCategoryResponse;
import com.websitebuilder.platform.categories.dto.CategoryResponse;
import com.websitebuilder.platform.categories.dto.CategoryUpsertRequest;
import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.categories.mapper.CategoryMapper;
import com.websitebuilder.platform.categories.repository.CategoryRepository;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final TemplateRepository templateRepository;

    public CategoryService(
            CategoryRepository categoryRepository,
            CategoryMapper categoryMapper,
            TemplateRepository templateRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
        this.templateRepository = templateRepository;
    }

    public List<CategoryResponse> listPublic() {
        return categoryRepository.findAllByIsActiveTrueOrderBySortOrderAsc()
                .stream()
                .map(categoryMapper::toResponse)
                .toList();
    }

    public List<AdminCategoryResponse> listAdmin() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toAdminResponse)
                .toList();
    }

    @Transactional
    public AdminCategoryResponse create(CategoryUpsertRequest request) {
        if (categoryRepository.findBySlug(request.slug()).isPresent()) {
            throw new ApiException("CATEGORY_SLUG_TAKEN", "Category slug is already in use");
        }

        Instant now = Instant.now();
        CategoryEntity entity = new CategoryEntity(
                UUID.randomUUID(),
                request.name(),
                request.slug(),
                request.description(),
                request.sortOrder() != null ? request.sortOrder() : 0,
                request.isActive() != null ? request.isActive() : true,
                now,
                now
        );

        categoryRepository.save(entity);
        return categoryMapper.toAdminResponse(entity);
    }

    @Transactional
    public AdminCategoryResponse update(UUID id, CategoryUpsertRequest request) {
        CategoryEntity entity = categoryRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ApiException("CATEGORY_NOT_FOUND", "Category not found"));

        categoryRepository.findBySlug(request.slug())
                .filter(existing -> !existing.id().equals(entity.id()))
                .ifPresent(existing -> {
                    throw new ApiException("CATEGORY_SLUG_TAKEN", "Category slug is already in use");
                });

        entity.setName(request.name());
        entity.setSlug(request.slug());
        entity.setDescription(request.description());
        entity.setSortOrder(request.sortOrder() != null ? request.sortOrder() : 0);
        entity.setIsActive(request.isActive() != null ? request.isActive() : true);

        categoryRepository.save(entity);
        return categoryMapper.toAdminResponse(entity);
    }

    @Transactional
    public SuccessResponse delete(UUID id) {
        UUID requiredId = Objects.requireNonNull(id);
        CategoryEntity entity = categoryRepository.findById(requiredId)
                .orElseThrow(() -> new ApiException("CATEGORY_NOT_FOUND", "Category not found"));

        if (templateRepository.existsByIsActiveTrueAndCategoryId(requiredId)) {
            throw new ApiException("CATEGORY_HAS_ACTIVE_TEMPLATES", "Category has active templates");
        }

        entity.setIsActive(false);
        categoryRepository.save(entity);
        return new SuccessResponse(true);
    }
}
