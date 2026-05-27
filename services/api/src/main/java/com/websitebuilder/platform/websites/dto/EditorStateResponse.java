package com.websitebuilder.platform.websites.dto;

import com.fasterxml.jackson.databind.JsonNode;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import java.time.Instant;
import java.util.UUID;

public record EditorStateResponse(UUID websiteId, String name, String htmlContent, String cssContent, JsonNode editorState, Integer versionNumber, Instant updatedAt, WebsiteStatus websiteStatus, String publishedUrl) {}
