package com.websitebuilder.platform.common.dto;

import java.util.List;

public record ApiError(ErrorBody error) {
    public record ErrorBody(String code, String message, List<ApiErrorDetail> details) {}
}
