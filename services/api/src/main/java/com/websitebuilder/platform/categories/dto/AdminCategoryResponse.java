package com.websitebuilder.platform.categories.dto;

import java.util.UUID;

public record AdminCategoryResponse(UUID id, String name, String slug, String description, Integer sortOrder, Boolean isActive, long templatesCount) {}
