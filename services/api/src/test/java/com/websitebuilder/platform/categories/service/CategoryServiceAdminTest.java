package com.websitebuilder.platform.categories.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.categories.dto.AdminCategoryResponse;
import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.categories.mapper.CategoryMapper;
import com.websitebuilder.platform.categories.repository.CategoryRepository;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class CategoryServiceAdminTest {

    @Mock private CategoryRepository categoryRepository;
    @Mock private CategoryMapper categoryMapper;
    @Mock private TemplateRepository templateRepository;

    @Test
    @DisplayName("SCRUM-103 - categories receive their own batched template count and zero fallback")
    void listAdminUsesBatchCountsAndDefaultsMissingCountsToZero() {
        UUID firstId = UUID.randomUUID();
        UUID secondId = UUID.randomUUID();
        Instant now = Instant.now();
        CategoryEntity first = new CategoryEntity(firstId, "First", "first", null, 0, true, now, now);
        CategoryEntity second = new CategoryEntity(secondId, "Second", "second", null, 1, false, now, now);
        when(categoryRepository.findAll()).thenReturn(List.of(first, second));
        when(templateRepository.countTemplatesByCategoryIds(List.of(firstId, secondId)))
                .thenReturn(List.<Object[]>of(new Object[] { firstId, 3L }));
        AdminCategoryResponse firstResponse = new AdminCategoryResponse(firstId, "First", "first", null, 0, true, 3L);
        AdminCategoryResponse secondResponse = new AdminCategoryResponse(secondId, "Second", "second", null, 1, false, 0L);
        when(categoryMapper.toAdminResponse(first, 3L)).thenReturn(firstResponse);
        when(categoryMapper.toAdminResponse(second, 0L)).thenReturn(secondResponse);

        List<AdminCategoryResponse> response = new CategoryService(categoryRepository, categoryMapper, templateRepository)
                .listAdmin();

        assertEquals(List.of(firstResponse, secondResponse), response);
        verify(templateRepository).countTemplatesByCategoryIds(List.of(firstId, secondId));
    }
}
