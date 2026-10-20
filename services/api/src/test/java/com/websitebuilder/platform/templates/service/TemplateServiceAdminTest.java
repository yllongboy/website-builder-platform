package com.websitebuilder.platform.templates.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.categories.repository.CategoryRepository;
import com.websitebuilder.platform.templates.dto.AdminTemplateResponse;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.templates.mapper.TemplateMapper;
import com.websitebuilder.platform.templates.repository.TemplateRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TemplateServiceAdminTest {

    @Mock private TemplateRepository templateRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private WebsiteRepository websiteRepository;
    @Mock private TemplateMapper templateMapper;

    @Test
    void listAdminLoadsWebsiteUsageCountsInOneBatchAndDefaultsMissingCountToZero() {
        Instant now = Instant.parse("2026-10-01T12:34:56Z");
        CategoryEntity category = new CategoryEntity(UUID.randomUUID(), "Business", "business", null, 0, true, now, now);
        TemplateEntity used = template(category, "used", now);
        TemplateEntity unused = template(category, "unused", now);
        when(templateRepository.findAll()).thenReturn(List.of(used, unused));
        when(websiteRepository.countGroupedByTemplateId(List.of(used.id(), unused.id())))
                .thenReturn(List.<Object[]>of(new Object[] { used.id(), 4L }));
        AdminTemplateResponse usedResponse = response(used, 4);
        AdminTemplateResponse unusedResponse = response(unused, 0);
        when(templateMapper.toAdminResponse(used, 4)).thenReturn(usedResponse);
        when(templateMapper.toAdminResponse(unused, 0)).thenReturn(unusedResponse);

        List<AdminTemplateResponse> result = new TemplateService(templateRepository, categoryRepository, templateMapper, websiteRepository).listAdmin();

        assertEquals(List.of(usedResponse, unusedResponse), result);
        verify(websiteRepository).countGroupedByTemplateId(List.of(used.id(), unused.id()));
    }

    private static TemplateEntity template(CategoryEntity category, String slug, Instant createdAt) {
        return new TemplateEntity(UUID.randomUUID(), category, slug, slug, null, null, "<main />", null, null,
                false, true, createdAt, createdAt);
    }

    private static AdminTemplateResponse response(TemplateEntity template, long count) {
        return new AdminTemplateResponse(template.id(), template.category().id(), template.name(), template.slug(),
                template.description(), template.thumbnailUrl(), template.isPremium(), template.isActive(),
                template.htmlContent(), template.cssContent(), template.editorState(), count, template.createdAt());
    }
}
