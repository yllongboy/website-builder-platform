package com.websitebuilder.platform.templates.dto;

import java.util.UUID;

public record TemplateSummary(UUID id, UUID categoryId, String name, String slug, String description, String thumbnailUrl, Boolean isPremium) {}
