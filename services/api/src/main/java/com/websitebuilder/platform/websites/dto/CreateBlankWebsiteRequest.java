package com.websitebuilder.platform.websites.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateBlankWebsiteRequest(@NotBlank @Size(max = 150) String name) {}
