package com.websitebuilder.platform.billing.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.billingportal.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import com.websitebuilder.platform.billing.dto.BillingStatusResponse;
import com.websitebuilder.platform.billing.dto.CheckoutRequest;
import com.websitebuilder.platform.billing.dto.CheckoutResponse;
import com.websitebuilder.platform.billing.dto.PortalResponse;
import com.websitebuilder.platform.billing.entity.StripeEventEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.repository.StripeEventRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BillingService {

    private final SubscriptionRepository subscriptionRepository;
    private final StripeEventRepository stripeEventRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final Environment environment;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @Value("${stripe.success-url}")
    private String successUrl;

    @Value("${stripe.cancel-url}")
    private String cancelUrl;

    @Value("${stripe.portal-return-url}")
    private String portalReturnUrl;

    public BillingService(
            SubscriptionRepository subscriptionRepository,
            StripeEventRepository stripeEventRepository,
            UserRepository userRepository,
            ObjectMapper objectMapper,
            Environment environment
    ) {
        this.subscriptionRepository = subscriptionRepository;
        this.stripeEventRepository = stripeEventRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.environment = environment;
    }

    @PostConstruct
    void initStripe() {
        if (stripeSecretKey != null && !stripeSecretKey.isBlank()) {
            Stripe.apiKey = stripeSecretKey;
        }
    }

    @Transactional(readOnly = true)
    public BillingStatusResponse getStatus(UserEntity user) {
        return subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id())
                .map(subscription -> new BillingStatusResponse(
                        toDtoStatus(subscription.status()),
                        subscription.planCode(),
                        isPublishEnabled(subscription.status()),
                        subscription.currentPeriodEnd()
                ))
                .orElseGet(() -> new BillingStatusResponse(
                        com.websitebuilder.platform.billing.dto.SubscriptionStatus.NONE,
                        null,
                        false,
                        null
                ));
    }

    @Transactional
    public CheckoutResponse createCheckoutSession(CheckoutRequest request, UserEntity user) {
        String planCode = request.planCode().strip().toLowerCase();
        String priceId = planPriceId(planCode);

        try {
            com.stripe.param.checkout.SessionCreateParams params =
                    com.stripe.param.checkout.SessionCreateParams.builder()
                            .setMode(com.stripe.param.checkout.SessionCreateParams.Mode.SUBSCRIPTION)
                            .setSuccessUrl(successUrl)
                            .setCancelUrl(cancelUrl)
                            .setCustomerEmail(user.email())
                            .setClientReferenceId(user.id().toString())
                            .putMetadata("planCode", planCode)
                            .addLineItem(LineItem.builder().setPrice(priceId).setQuantity(1L).build())
                            .build();

            Session session = Session.create(params);
            return new CheckoutResponse(session.getUrl());
        } catch (StripeException ex) {
            throw new ApiException("BILLING_CHECKOUT_FAILED", "Failed to create checkout session");
        }
    }

    @Transactional
    public PortalResponse createPortalSession(UserEntity user) {
        SubscriptionEntity subscription = subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id())
                .orElseThrow(() -> new ApiException("SUBSCRIPTION_NOT_FOUND", "No active subscription found"));

        String providerCustomerId = subscription.providerCustomerId();
        if (providerCustomerId == null || providerCustomerId.isBlank()) {
            throw new ApiException("SUBSCRIPTION_NOT_FOUND", "No active subscription found");
        }

        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setCustomer(providerCustomerId)
                    .setReturnUrl(portalReturnUrl)
                    .build();

            com.stripe.model.billingportal.Session portalSession = com.stripe.model.billingportal.Session.create(params);
            return new PortalResponse(portalSession.getUrl());
        } catch (StripeException ex) {
            throw new ApiException("BILLING_PORTAL_FAILED", "Failed to create billing portal session");
        }
    }

    @Transactional(readOnly = true)
    public boolean canPublish(UserEntity user) {
        return subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id())
                .map(SubscriptionEntity::status)
                .map(this::isPublishEnabled)
                .orElse(false);
    }

    @Transactional
    public void handleWebhook(String payload, String stripeSignature) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, stripeSignature, webhookSecret);
        } catch (SignatureVerificationException ex) {
            throw new ApiException("STRIPE_SIGNATURE_INVALID", "Invalid Stripe signature");
        }

        if (stripeEventRepository.existsByStripeEventId(event.getId())) {
            return;
        }

        switch (event.getType()) {
            case "checkout.session.completed" -> handleCheckoutSessionCompleted(event);
            case "customer.subscription.updated" -> handleSubscriptionUpdated(event);
            case "customer.subscription.deleted" -> handleSubscriptionDeleted(event);
            default -> {
                // Ignore unknown events but persist event id for idempotency.
            }
        }

        stripeEventRepository.save(new StripeEventEntity(
                UUID.randomUUID(),
                event.getId(),
                event.getType(),
                true,
                toJsonNode(payload),
                Instant.now()
        ));
    }

    private void handleCheckoutSessionCompleted(Event event) {
        Session session = requiredObject(event, Session.class);

        UserEntity user = resolveUserForCheckoutSession(session)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found for checkout session"));

        String planCode = Optional.ofNullable(session.getMetadata())
                .map(metadata -> metadata.get("planCode"))
                .filter(value -> value != null && !value.isBlank())
                .orElse("pro");

        SubscriptionEntity subscription = subscriptionRepository
                .findFirstByUserIdOrderByCreatedAtDesc(user.id())
                .orElseGet(() -> new SubscriptionEntity(
                        UUID.randomUUID(),
                        user,
                        "stripe",
                        null,
                        null,
                        com.websitebuilder.platform.billing.entity.SubscriptionStatus.INCOMPLETE,
                        planCode,
                        null,
                        false,
                        Instant.now(),
                        Instant.now()
                ));

        subscription.setProviderCustomerId(session.getCustomer());
        subscription.setProviderSubscriptionId(session.getSubscription());
        subscription.setStatus(com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE);
        subscription.setPlanCode(planCode);
        subscription.setCancelAtPeriodEnd(false);
        subscriptionRepository.save(subscription);
    }

    private void handleSubscriptionUpdated(Event event) {
        Subscription stripeSubscription = requiredObject(event, Subscription.class);

        subscriptionRepository.findByProviderSubscriptionId(stripeSubscription.getId())
                .ifPresent(subscription -> {
                    subscription.setStatus(mapProviderStatus(stripeSubscription.getStatus()));
                    subscription.setCurrentPeriodEnd(epochSecondsToInstant(stripeSubscription.getCurrentPeriodEnd()));
                    subscription.setCancelAtPeriodEnd(Boolean.TRUE.equals(stripeSubscription.getCancelAtPeriodEnd()));
                    subscriptionRepository.save(subscription);
                });
    }

    private void handleSubscriptionDeleted(Event event) {
        Subscription stripeSubscription = requiredObject(event, Subscription.class);

        subscriptionRepository.findByProviderSubscriptionId(stripeSubscription.getId())
                .ifPresent(subscription -> {
                    subscription.setStatus(com.websitebuilder.platform.billing.entity.SubscriptionStatus.CANCELED);
                    subscription.setCancelAtPeriodEnd(Boolean.TRUE);
                    subscriptionRepository.save(subscription);
                });
    }

    private Optional<UserEntity> resolveUserForCheckoutSession(Session session) {
        String clientReferenceId = session.getClientReferenceId();
        if (clientReferenceId != null && !clientReferenceId.isBlank()) {
            try {
                UUID userId = UUID.fromString(clientReferenceId);
                Optional<UserEntity> byId = userRepository.findById(userId);
                if (byId.isPresent()) {
                    return byId;
                }
            } catch (IllegalArgumentException ignored) {
                // Fall through to email lookup.
            }
        }

        String customerEmail = session.getCustomerEmail();
        if (customerEmail != null && !customerEmail.isBlank()) {
            return userRepository.findByEmail(customerEmail);
        }

        return Optional.empty();
    }

    private JsonNode toJsonNode(String payload) {
        try {
            return objectMapper.readTree(payload);
        } catch (IOException ex) {
            throw new ApiException("STRIPE_EVENT_INVALID", "Invalid Stripe event payload");
        }
    }

    private String planPriceId(String planCode) {
        String priceId = environment.getProperty("stripe.plans." + planCode + ".price-id");
        if (priceId == null || priceId.isBlank()) {
            priceId = environment.getProperty("stripe.plans." + planCode + ".priceId");
        }
        if (priceId == null || priceId.isBlank()) {
            throw new ApiException("BILLING_PLAN_NOT_SUPPORTED", "Unsupported billing plan");
        }
        return priceId;
    }

    private Instant epochSecondsToInstant(Long epochSeconds) {
        return epochSeconds == null ? null : Instant.ofEpochSecond(epochSeconds);
    }

    private boolean isPublishEnabled(com.websitebuilder.platform.billing.entity.SubscriptionStatus status) {
        return status == com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE
                || status == com.websitebuilder.platform.billing.entity.SubscriptionStatus.TRIALING;
    }

    private com.websitebuilder.platform.billing.entity.SubscriptionStatus mapProviderStatus(String providerStatus) {
        if (providerStatus == null) {
            return com.websitebuilder.platform.billing.entity.SubscriptionStatus.NONE;
        }

        return switch (providerStatus) {
            case "active" -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE;
            case "trialing" -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.TRIALING;
            case "past_due", "unpaid" -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.PAST_DUE;
            case "canceled", "incomplete_expired" -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.CANCELED;
            case "incomplete" -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.INCOMPLETE;
            default -> com.websitebuilder.platform.billing.entity.SubscriptionStatus.NONE;
        };
    }

    private com.websitebuilder.platform.billing.dto.SubscriptionStatus toDtoStatus(
            com.websitebuilder.platform.billing.entity.SubscriptionStatus status
    ) {
        return switch (status) {
            case ACTIVE -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.ACTIVE;
            case TRIALING -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.TRIALING;
            case PAST_DUE -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.PAST_DUE;
            case CANCELED -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.CANCELED;
            case INCOMPLETE -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.INCOMPLETE;
            case NONE -> com.websitebuilder.platform.billing.dto.SubscriptionStatus.NONE;
        };
    }

    private <T extends StripeObject> T requiredObject(Event event, Class<T> targetType) {
        Optional<StripeObject> object = event.getDataObjectDeserializer().getObject();
        if (object.isEmpty()) {
            throw new ApiException("STRIPE_EVENT_INVALID", "Unable to deserialize Stripe event data");
        }
        StripeObject stripeObject = object.get();
        if (!targetType.isInstance(stripeObject)) {
            throw new ApiException("STRIPE_EVENT_INVALID", "Unexpected Stripe event payload type");
        }
        return targetType.cast(stripeObject);
    }
}
