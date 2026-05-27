package com.websitebuilder.platform.billing.controller;

import com.websitebuilder.platform.billing.dto.BillingStatusResponse;
import com.websitebuilder.platform.billing.dto.CheckoutRequest;
import com.websitebuilder.platform.billing.dto.CheckoutResponse;
import com.websitebuilder.platform.billing.dto.PortalResponse;
import com.websitebuilder.platform.billing.service.BillingService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.entity.UserEntity;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/billing")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping("/status")
    public BillingStatusResponse getStatus(Authentication authentication) {
        return billingService.getStatus(currentUser(authentication));
    }

    @PostMapping("/checkout")
    public CheckoutResponse createCheckoutSession(
            @Valid @RequestBody CheckoutRequest request,
            Authentication authentication
    ) {
        return billingService.createCheckoutSession(request, currentUser(authentication));
    }

    @PostMapping("/portal")
    public PortalResponse createPortalSession(Authentication authentication) {
        return billingService.createPortalSession(currentUser(authentication));
    }

    @PostMapping(value = "/webhook", consumes = "application/json")
    public ResponseEntity<Void> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String stripeSignature
    ) {
        billingService.handleWebhook(payload, stripeSignature);
        return ResponseEntity.ok().build();
    }

    private UserEntity currentUser(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof UserEntity userEntity)) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session");
        }
        return userEntity;
    }
}
