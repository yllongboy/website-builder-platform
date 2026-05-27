package com.websitebuilder.platform.websites.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SaveEditorStateRequest(
	@NotBlank @Size(max = 500_000) String htmlContent,
	@Size(max = 100_000) String cssContent,
	JsonNode editorState
) {}
