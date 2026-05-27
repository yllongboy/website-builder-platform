package com.websitebuilder.platform.templates.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.UUID;

public record TemplateUpsertRequest(
    @NotNull UUID categoryId,
    @NotBlank @Size(max = 150) String name,
    @NotBlank @Size(max = 180) String slug,
    String description,
    String thumbnailUrl,
    @NotBlank String htmlContent,
    String cssContent,
    JsonNode editorState,
    Boolean isPremium,
    Boolean isActive
) {}
