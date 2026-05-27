package com.websitebuilder.platform.websites.dto;

import jakarta.validation.constraints.NotNull;

public record AdminWebsiteStatusRequest(@NotNull WebsiteStatus status) {}
