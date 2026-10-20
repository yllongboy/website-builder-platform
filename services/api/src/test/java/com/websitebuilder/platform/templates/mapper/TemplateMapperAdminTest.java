package com.websitebuilder.platform.templates.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.templates.dto.AdminTemplateResponse;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class TemplateMapperAdminTest {

    @Test
    void mapsUsageCountAndCreationTimestamp() {
        Instant createdAt = Instant.parse("2026-10-01T12:34:56Z");
        CategoryEntity category = new CategoryEntity(UUID.randomUUID(), "Business", "business", null, 0, true, createdAt, createdAt);
        TemplateEntity template = new TemplateEntity(UUID.randomUUID(), category, "Studio", "studio", null, null,
                "<main />", null, null, false, true, createdAt, createdAt.plusSeconds(30));

        AdminTemplateResponse response = new TemplateMapper().toAdminResponse(template, 7);

        assertEquals(7L, response.usageCount());
        assertEquals(createdAt, response.createdAt());
    }
}
