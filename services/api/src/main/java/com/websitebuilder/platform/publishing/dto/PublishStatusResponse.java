package com.websitebuilder.platform.publishing.dto;

import java.time.Instant;

public record PublishStatusResponse(PublishLogStatus status, String publishedUrl, Instant lastPublishedAt) {}
