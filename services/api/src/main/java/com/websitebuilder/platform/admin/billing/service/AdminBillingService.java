package com.websitebuilder.platform.admin.billing.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Invoice;
import com.stripe.model.InvoiceCollection;
import com.stripe.model.Subscription;
import com.stripe.param.InvoiceListParams;
import com.websitebuilder.platform.admin.billing.dto.AdminBillingOverviewResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminInvoicePageResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminInvoiceResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminSubscriptionPageResponse;
import com.websitebuilder.platform.admin.billing.dto.AdminSubscriptionResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminBillingService {

    private static final Logger log = LoggerFactory.getLogger(AdminBillingService.class);

    private static final List<SubscriptionStatus> ACTIVE_STATUSES = List.of(
            SubscriptionStatus.ACTIVE,
            SubscriptionStatus.TRIALING
    );

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final Environment environment;

    @Value("${stripe.secret-key:}")
    private String stripeSecretKey;

    public AdminBillingService(
            SubscriptionRepository subscriptionRepository,
            UserRepository userRepository,
            Environment environment
    ) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.environment = environment;
    }

    @PostConstruct
    void initStripe() {
        String key = stripeSecretKey;
        if (key == null || key.isBlank()) {
            key = environment.getProperty("stripe.secret-key", "");
        }
        if (key != null && !key.isBlank()) {
            Stripe.apiKey = key;
        }
    }

    @Transactional(readOnly = true)
    public AdminBillingOverviewResponse getOverview() {
        long totalActiveSubscriptions = subscriptionRepository.countByStatusIn(ACTIVE_STATUSES);

        Map<String, Long> planDistribution = subscriptionRepository.findByStatusIn(ACTIVE_STATUSES)
                .stream()
                .filter(subscription -> subscription.planCode() != null && !subscription.planCode().isBlank())
                .collect(Collectors.groupingBy(
                        subscription -> subscription.planCode().toLowerCase(Locale.ROOT),
                        Collectors.counting()
                ));

        return new AdminBillingOverviewResponse(
                BigDecimal.ZERO,
                BigDecimal.ZERO,
                totalActiveSubscriptions,
                planDistribution
        );
    }

    @Transactional(readOnly = true)
    public AdminSubscriptionPageResponse getSubscriptions(int page, int size) {
        int safePage = Math.min(Math.max(0, page), 999);
        int safeSize = Math.min(Math.max(1, size), 100);

        Pageable pageable = PageRequest.of(safePage, safeSize);
        Page<SubscriptionEntity> subscriptions = subscriptionRepository.findAll(pageable);

        List<AdminSubscriptionResponse> content = subscriptions.getContent()
                .stream()
                .map(subscription -> new AdminSubscriptionResponse(
                        subscription.user().id(),
                        subscription.user().email(),
                        subscription.planCode(),
                        subscription.status(),
                        subscription.createdAt(),
                        subscription.currentPeriodEnd()
                ))
                .toList();

        return new AdminSubscriptionPageResponse(content, subscriptions.getTotalElements(), safePage, safeSize);
    }

    @Transactional(readOnly = true)
    public AdminInvoicePageResponse getInvoices(int page, int size) {
        int safePage = Math.min(Math.max(0, page), 999);
        int safeSize = size <= 0 ? 20 : Math.min(size, 100);

        if (!isStripeConfigured()) {
            return new AdminInvoicePageResponse(List.of(), 0L, safePage, safeSize);
        }

        try {
            InvoiceCollection invoiceCollection = fetchInvoiceCollection(safePage, safeSize);
            if (invoiceCollection == null) {
                return new AdminInvoicePageResponse(List.of(), 0L, safePage, safeSize);
            }

            Map<String, SubscriptionEntity> subscriptionsByCustomerId = latestSubscriptionsByCustomerId();

            List<AdminInvoiceResponse> content = invoiceCollection.getData()
                    .stream()
                    .map(invoice -> toInvoiceResponse(invoice, subscriptionsByCustomerId))
                    .toList();

            long estimatedTotal = (long) safePage * safeSize + content.size();
            if (Boolean.TRUE.equals(invoiceCollection.getHasMore())) {
                estimatedTotal += 1;
            }

            return new AdminInvoicePageResponse(content, estimatedTotal, safePage, safeSize);
        } catch (StripeException ex) {
            log.error("Stripe API error: {}", ex.getMessage());
            throw new ApiException("BILLING_STRIPE_ERROR", "A billing service error occurred. Please contact support.");
        }
    }

    @Transactional
    public void cancelSubscription(UUID userId) {
        SubscriptionEntity subscription = subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new ApiException("SUBSCRIPTION_NOT_FOUND", "No active subscription found."));

        String providerSubscriptionId = subscription.providerSubscriptionId();
        if (providerSubscriptionId == null || providerSubscriptionId.isBlank()) {
            throw new ApiException("SUBSCRIPTION_NOT_FOUND", "Subscription provider ID is not configured for this subscription.");
        }

        if (!isStripeConfigured()) {
            throw new ApiException("BILLING_STRIPE_ERROR", "Stripe secret key is not configured");
        }

        try {
            Subscription stripeSubscription = Subscription.retrieve(providerSubscriptionId);
            stripeSubscription.cancel();

            subscription.setStatus(SubscriptionStatus.CANCELED);
            subscription.setCancelAtPeriodEnd(Boolean.TRUE);
            subscriptionRepository.save(subscription);
        } catch (StripeException ex) {
            log.error("Stripe API error: {}", ex.getMessage());
            throw new ApiException("BILLING_STRIPE_ERROR", "A billing service error occurred. Please contact support.");
        } catch (Exception ex) {
            throw new ApiException("BILLING_CANCEL_FAILED", "Failed to cancel subscription");
        }
    }

    private InvoiceCollection fetchInvoiceCollection(int page, int size) throws StripeException {
        String startingAfter = null;

        for (int index = 0; index <= page; index++) {
            InvoiceListParams.Builder paramsBuilder = InvoiceListParams.builder()
                    .setStatus(InvoiceListParams.Status.PAID)
                    .setLimit((long) size);

            if (startingAfter != null) {
                paramsBuilder.setStartingAfter(startingAfter);
            }

            InvoiceCollection collection = Invoice.list(paramsBuilder.build());

            if (index == page) {
                return collection;
            }

            List<Invoice> invoices = collection.getData();
            if (invoices.isEmpty() || !Boolean.TRUE.equals(collection.getHasMore())) {
                return null;
            }

            String lastId = invoices.get(invoices.size() - 1).getId();
            if (lastId == null || lastId.isBlank()) {
                return null;
            }
            startingAfter = lastId;
        }

        return null;
    }

    private Map<String, SubscriptionEntity> latestSubscriptionsByCustomerId() {
        return subscriptionRepository.findAll()
                .stream()
                .filter(subscription -> subscription.providerCustomerId() != null && !subscription.providerCustomerId().isBlank())
                .collect(Collectors.toMap(
                        SubscriptionEntity::providerCustomerId,
                        Function.identity(),
                        this::newerSubscription
                ));
    }

    private SubscriptionEntity newerSubscription(SubscriptionEntity left, SubscriptionEntity right) {
        Instant leftCreatedAt = left.createdAt();
        Instant rightCreatedAt = right.createdAt();

        if (leftCreatedAt == null) {
            return right;
        }
        if (rightCreatedAt == null) {
            return left;
        }
        return leftCreatedAt.isAfter(rightCreatedAt) ? left : right;
    }

    private AdminInvoiceResponse toInvoiceResponse(Invoice invoice, Map<String, SubscriptionEntity> subscriptionsByCustomerId) {
        String customerId = invoice.getCustomer();
        SubscriptionEntity subscription = customerId == null ? null : subscriptionsByCustomerId.get(customerId);

        String userId = null;
        String userEmail = invoice.getCustomerEmail();

        if (subscription != null) {
            UUID subscriptionUserId = subscription.user().id();
            userId = subscriptionUserId.toString();

            userEmail = userRepository.findById(subscriptionUserId)
                    .map(UserEntity::email)
                    .orElse(userEmail);
        }

        BigDecimal amount = invoice.getAmountPaid() == null
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(invoice.getAmountPaid(), 2);

        Instant createdAt = invoice.getCreated() == null
                ? null
                : Instant.ofEpochSecond(invoice.getCreated());

        String currency = invoice.getCurrency() == null
                ? null
                : invoice.getCurrency().toUpperCase(Locale.ROOT);

        return new AdminInvoiceResponse(
                invoice.getId(),
                userId,
                userEmail,
                amount,
                currency,
                invoice.getStatus(),
                createdAt
        );
    }

    private boolean isStripeConfigured() {
        return Stripe.apiKey != null && !Stripe.apiKey.isBlank();
    }
}
