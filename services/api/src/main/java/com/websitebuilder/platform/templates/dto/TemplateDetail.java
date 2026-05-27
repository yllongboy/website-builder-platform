package com.websitebuilder.platform.templates.dto;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.UUID;

public record TemplateDetail(UUID id, UUID categoryId, String name, String slug, String description, String thumbnailUrl, Boolean isPremium, String htmlContent, String cssContent, JsonNode editorState) {}
