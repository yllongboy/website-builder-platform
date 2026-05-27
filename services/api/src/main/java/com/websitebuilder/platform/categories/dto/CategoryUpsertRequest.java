package com.websitebuilder.platform.categories.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryUpsertRequest(
    @NotBlank @Size(max = 150) String name,
    @NotBlank @Size(max = 180) String slug,
    String description,
    Integer sortOrder,
    Boolean isActive
) {}
