package com.websitebuilder.platform.websites.dto;

import java.time.Instant;
import java.util.UUID;

public record SaveEditorStateResponse(UUID websiteId, Integer versionNumber, Instant savedAt) {}
