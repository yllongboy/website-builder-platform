package com.websitebuilder.platform.admin.billing.controller;

import com.websitebuilder.platform.admin.billing.dto.AdminBillingOverviewResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminInvoicePageResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminSubscriptionPageResponse;
import com.websitebuilder.platform.admin.billing.service.AdminBillingService;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/billing")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminBillingController {

    private final AdminBillingService adminBillingService;

    @GetMapping("/overview")
    public AdminBillingOverviewResponse getOverview() {
        return adminBillingService.getOverview();
    }

    @GetMapping("/invoices")
    public AdminInvoicePageResponse getInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return adminBillingService.getInvoices(page, size);
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<AdminSubscriptionPageResponse> getSubscriptions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(adminBillingService.getSubscriptions(page, size));
    }

    @PostMapping("/subscriptions/{userId}/cancel")
    public SuccessResponse cancelSubscription(@PathVariable UUID userId) {
        adminBillingService.cancelSubscription(userId);
        return new SuccessResponse(true);
    }
}
