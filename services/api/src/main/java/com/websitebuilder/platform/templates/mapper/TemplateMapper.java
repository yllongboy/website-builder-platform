package com.websitebuilder.platform.templates.mapper;

import com.websitebuilder.platform.templates.dto.AdminTemplateResponse;
import com.websitebuilder.platform.templates.dto.TemplateDetail;
import com.websitebuilder.platform.templates.dto.TemplateSummary;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import org.springframework.stereotype.Component;

@Component
public class TemplateMapper {

    public TemplateSummary toSummary(TemplateEntity entity) {
        return new TemplateSummary(
                entity.id(),
                entity.category().id(),
                entity.name(),
                entity.slug(),
                entity.description(),
                entity.thumbnailUrl(),
                entity.isPremium()
        );
    }

    public TemplateDetail toDetail(TemplateEntity entity) {
        return new TemplateDetail(
                entity.id(),
                entity.category().id(),
                entity.name(),
                entity.slug(),
                entity.description(),
                entity.thumbnailUrl(),
                entity.isPremium(),
                entity.htmlContent(),
                entity.cssContent(),
                entity.editorState()
        );
    }

    public AdminTemplateResponse toAdminResponse(TemplateEntity entity, long usageCount) {
        return new AdminTemplateResponse(
                entity.id(),
                entity.category().id(),
                entity.name(),
                entity.slug(),
                entity.description(),
                entity.thumbnailUrl(),
                entity.isPremium(),
                entity.isActive(),
                entity.htmlContent(),
                entity.cssContent(),
                entity.editorState(),
                usageCount,
                entity.createdAt()
        );
    }
}
