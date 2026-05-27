package com.websitebuilder.platform.websites.dto;

import java.time.Instant;
import java.util.UUID;

public record AdminWebsiteResponse(UUID id, String ownerEmail, String name, WebsiteStatus status, String publishedUrl, Instant updatedAt) {}
