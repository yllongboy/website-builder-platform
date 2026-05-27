package com.websitebuilder.platform.common.response;

public record ApiResponse<T>(
    T data
) {}
