package com.websitebuilder.platform.websites.mapper;

import com.websitebuilder.platform.websites.dto.AdminWebsiteResponse;
import com.websitebuilder.platform.websites.dto.EditorStateResponse;
import com.websitebuilder.platform.websites.dto.SaveEditorStateResponse;
import com.websitebuilder.platform.websites.dto.WebsiteStatus;
import com.websitebuilder.platform.websites.dto.WebsiteSummary;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteVersionEntity;
import java.time.Instant;
import org.springframework.stereotype.Component;

@Component
public class WebsiteMapper {

    public WebsiteSummary toSummary(WebsiteEntity entity) {
        String thumbnailUrl = entity.template() != null ? entity.template().thumbnailUrl() : null;
        return new WebsiteSummary(
                entity.id(),
                entity.name(),
                entity.slug(),
                WebsiteStatus.valueOf(entity.status().name()),
                entity.publishedUrl(),
                entity.updatedAt(),
                thumbnailUrl
        );
    }

    public AdminWebsiteResponse toAdminResponse(WebsiteEntity entity) {
        return new AdminWebsiteResponse(
                entity.id(),
                entity.user().email(),
                entity.name(),
                WebsiteStatus.valueOf(entity.status().name()),
                entity.publishedUrl(),
                entity.updatedAt()
        );
    }

    public EditorStateResponse toEditorStateResponse(WebsiteEntity website, WebsiteVersionEntity version) {
        return new EditorStateResponse(
                website.id(),
                website.name(),
                version.htmlContent(),
                version.cssContent(),
                version.editorState(),
                version.versionNumber(),
                website.updatedAt(),
                website.status(),
                website.publishedUrl()
        );
    }

    public SaveEditorStateResponse toSaveEditorStateResponse(WebsiteEntity website, WebsiteVersionEntity version) {
        return new SaveEditorStateResponse(
                website.id(),
                version.versionNumber(),
                Instant.now()
        );
    }
}
