package com.websitebuilder.platform.websites.dto;

import java.time.Instant;
import java.util.UUID;

public record WebsiteSummary(UUID id, String name, String slug, WebsiteStatus status, String publishedUrl, Instant updatedAt, String thumbnailUrl) {}
