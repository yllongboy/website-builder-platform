package com.websitebuilder.platform.templates.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.time.Instant;
import java.util.UUID;

public record AdminTemplateResponse(UUID id, UUID categoryId, String name, String slug, String description, String thumbnailUrl, Boolean isPremium, Boolean isActive, String htmlContent, String cssContent, JsonNode editorState, long usageCount, Instant createdAt) {}
