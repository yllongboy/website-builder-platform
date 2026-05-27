package com.websitebuilder.platform.websites.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateWebsiteFromTemplateRequest(@NotBlank @Size(max = 150) String name) {}
