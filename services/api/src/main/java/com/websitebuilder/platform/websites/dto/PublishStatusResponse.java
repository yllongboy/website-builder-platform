package com.websitebuilder.platform.websites.dto;

import java.time.Instant;

public record PublishStatusResponse(String status, String publishedUrl, Instant lastPublishedAt) {}
