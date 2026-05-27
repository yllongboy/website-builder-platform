package com.websitebuilder.platform.websites.dto;

import jakarta.validation.constraints.Size;

public record UpdateWebsiteRequest(@Size(min = 1, max = 150) String name) {}
