package com.websitebuilder.platform.categories.mapper;

import com.websitebuilder.platform.categories.dto.AdminCategoryResponse;
import com.websitebuilder.platform.categories.dto.CategoryResponse;
import com.websitebuilder.platform.categories.entity.CategoryEntity;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(CategoryEntity entity) {
        return new CategoryResponse(
                entity.id(),
                entity.name(),
                entity.slug(),
                entity.description(),
                entity.sortOrder()
        );
    }

    public AdminCategoryResponse toAdminResponse(CategoryEntity entity) {
        return new AdminCategoryResponse(
                entity.id(),
                entity.name(),
                entity.slug(),
                entity.description(),
                entity.sortOrder(),
                entity.isActive()
        );
    }
}
