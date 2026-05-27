package com.websitebuilder.platform.publishing.dto;

import com.websitebuilder.platform.publishing.entity.PublishLogStatus;
import java.time.Instant;
import java.util.UUID;

public record PublishLogResponse(
        UUID id,
        PublishLogStatus status,
        String publishedUrl,
        String message,
        Instant createdAt
) {
}
