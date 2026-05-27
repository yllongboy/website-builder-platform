package com.websitebuilder.platform.admin.billing.dto;

import java.util.List;

public record AdminInvoicePageResponse(
        List<AdminInvoiceResponse> content,
        long totalElements,
        int page,
        int size
) {
}
