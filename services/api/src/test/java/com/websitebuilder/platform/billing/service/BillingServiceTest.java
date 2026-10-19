package com.websitebuilder.platform.billing.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.billing.dto.BillingStatusResponse;
import com.websitebuilder.platform.billing.dto.SubscriptionStatus;
import com.websitebuilder.platform.billing.entity.StripeEventEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.repository.StripeEventRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.Set;
import java.util.Optional;
import java.util.UUID;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.env.Environment;
import org.springframework.test.util.ReflectionTestUtils;

@ExtendWith(MockitoExtension.class)
class BillingServiceTest {

    private static final UUID TEST_USER_ID = UUID.fromString("11111111-1111-1111-1111-111111111111");

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Mock
    private UserEntity user;

    @Mock
    private StripeEventRepository stripeEventRepository;

    @Mock
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private Environment environment;

    @Mock
    private ActivityEventService activityEventService;

    @Test
    @DisplayName("getStatus when no subscription returns NONE and canPublish false")
    void getStatus_whenNoSubscription_returnsNoneWithCanPublishFalse() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.empty());

        BillingStatusResponse result = billingService.getStatus(user);

        assertEquals(new BillingStatusResponse(SubscriptionStatus.NONE, null, false, null), result);
    }

    @Test
    @DisplayName("getStatus when subscription is ACTIVE returns canPublish true")
    void getStatus_whenActiveSubscription_returnsCanPublishTrue() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.of(testSubscription(user, com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE)));

        BillingStatusResponse result = billingService.getStatus(user);

        assertTrue(result.canPublish());
    }

    @Test
    @DisplayName("getStatus when subscription is TRIALING returns canPublish true")
    void getStatus_whenTrialingSubscription_returnsCanPublishTrue() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.of(testSubscription(user, com.websitebuilder.platform.billing.entity.SubscriptionStatus.TRIALING)));

        BillingStatusResponse result = billingService.getStatus(user);

        assertTrue(result.canPublish());
    }

    @Test
    @DisplayName("getStatus when subscription is PAST_DUE returns canPublish false")
    void getStatus_whenPastDueSubscription_returnsCanPublishFalse() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.of(testSubscription(user, com.websitebuilder.platform.billing.entity.SubscriptionStatus.PAST_DUE)));

        BillingStatusResponse result = billingService.getStatus(user);

        assertFalse(result.canPublish());
    }

    @Test
    @DisplayName("canPublish when subscription is ACTIVE returns true")
    void canPublish_whenActive_returnsTrue() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.of(testSubscription(user, com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE)));

        boolean result = billingService.canPublish(user);

        assertTrue(result);
    }

    @Test
    @DisplayName("canPublish when subscription is CANCELED returns false")
    void canPublish_whenCanceled_returnsFalse() {
        BillingService billingService = newBillingService();

        when(user.id()).thenReturn(TEST_USER_ID);

        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(user.id()))
                .thenReturn(Optional.of(testSubscription(user, com.websitebuilder.platform.billing.entity.SubscriptionStatus.CANCELED)));

        boolean result = billingService.canPublish(user);

        assertFalse(result);
    }

    @Test
    @DisplayName("completed checkout records one event when linking a new provider subscription to the local row")
    void completedCheckout_existingLocalRowWithNewProviderId_recordsOnceAndIsIdempotent() throws Exception {
        BillingService billingService = newBillingService();
        ReflectionTestUtils.setField(billingService, "webhookSecret", "whsec_test_activity");
        UserEntity checkoutUser = new UserEntity(TEST_USER_ID, "activity@example.com", "hash", UserRole.USER,
                UserStatus.ACTIVE, Instant.now(), Instant.now());
        SubscriptionEntity existing = new SubscriptionEntity(UUID.randomUUID(), checkoutUser, "stripe", null, null,
                com.websitebuilder.platform.billing.entity.SubscriptionStatus.INCOMPLETE, "pro", null, false,
                Instant.now(), Instant.now());
        when(userRepository.findById(TEST_USER_ID)).thenReturn(Optional.of(checkoutUser));
        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(TEST_USER_ID))
                .thenReturn(Optional.of(existing));
        Set<String> processedEventIds = new java.util.HashSet<>();
        when(stripeEventRepository.existsByStripeEventId(anyString()))
                .thenAnswer(invocation -> processedEventIds.contains(invocation.getArgument(0)));
        doAnswer(invocation -> {
            StripeEventEntity event = invocation.getArgument(0);
            processedEventIds.add(event.stripeEventId());
            return event;
        }).when(stripeEventRepository).save(any(StripeEventEntity.class));

        String firstPayload = checkoutCompletedPayload("evt_activity_1", TEST_USER_ID, "sub_distinct_1");
        billingService.handleWebhook(firstPayload, signature(firstPayload, "whsec_test_activity"));
        billingService.handleWebhook(firstPayload, signature(firstPayload, "whsec_test_activity"));

        String duplicateProviderPayload = checkoutCompletedPayload("evt_activity_2", TEST_USER_ID, "sub_distinct_1");
        billingService.handleWebhook(duplicateProviderPayload, signature(duplicateProviderPayload, "whsec_test_activity"));

        verify(subscriptionRepository, org.mockito.Mockito.times(2)).save(existing);
        verify(activityEventService).record(ActivityEventType.SUBSCRIPTION_CREATED,
                "Subscription created for plan pro", checkoutUser.email());
        verify(stripeEventRepository, org.mockito.Mockito.times(2)).save(any(StripeEventEntity.class));
    }

    @Test
    void invalidWebhookDoesNotRecordActivity() {
        BillingService billingService = newBillingService();
        ReflectionTestUtils.setField(billingService, "webhookSecret", "whsec_test_activity");

        assertThrows(ApiException.class, () -> billingService.handleWebhook("{}", "t=1,v1=invalid"));

        verify(activityEventService, never()).record(any(ActivityEventType.class), anyString(), anyString());
    }

    @Test
    void subscriptionUpdateDoesNotRecordCreatedActivity() throws Exception {
        BillingService billingService = newBillingService();
        ReflectionTestUtils.setField(billingService, "webhookSecret", "whsec_test_activity");
        SubscriptionEntity existing = testSubscription(user,
                com.websitebuilder.platform.billing.entity.SubscriptionStatus.ACTIVE);
        when(subscriptionRepository.findByProviderSubscriptionId("sub_test_123"))
                .thenReturn(Optional.of(existing));
        when(stripeEventRepository.existsByStripeEventId("evt_subscription_update")).thenReturn(false);

        String payload = subscriptionUpdatedPayload("evt_subscription_update", "sub_test_123");
        billingService.handleWebhook(payload, signature(payload, "whsec_test_activity"));

        verify(subscriptionRepository).save(existing);
        verify(activityEventService, never()).record(any(ActivityEventType.class), anyString(), anyString());
    }

    private BillingService newBillingService() {
        return new BillingService(
                subscriptionRepository,
                stripeEventRepository,
                userRepository,
                objectMapper,
                environment,
                activityEventService
        );
    }

    private static String checkoutCompletedPayload(String eventId, UUID userId, String subscriptionId) {
        return "{\"id\":\"" + eventId + "\",\"object\":\"event\",\"api_version\":\"2024-06-20\",\"created\":"
                + Instant.now().getEpochSecond()
                + ",\"data\":{\"object\":{\"id\":\"cs_test_123\",\"object\":\"checkout.session\","
                + "\"client_reference_id\":\"" + userId + "\",\"customer\":\"cus_test_123\","
                + "\"subscription\":\"" + subscriptionId + "\",\"metadata\":{\"planCode\":\"pro\"}}},"
                + "\"livemode\":false,\"pending_webhooks\":1,\"type\":\"checkout.session.completed\"}";
    }

    private static String subscriptionUpdatedPayload(String eventId, String subscriptionId) {
        return "{\"id\":\"" + eventId + "\",\"object\":\"event\",\"api_version\":\"2024-06-20\",\"created\":"
                + Instant.now().getEpochSecond()
                + ",\"data\":{\"object\":{\"id\":\"" + subscriptionId
                + "\",\"object\":\"subscription\",\"status\":\"active\","
                + "\"current_period_end\":" + Instant.now().plusSeconds(3600).getEpochSecond()
                + ",\"cancel_at_period_end\":false}},\"livemode\":false,\"pending_webhooks\":1,"
                + "\"type\":\"customer.subscription.updated\"}";
    }

    private static String signature(String payload, String secret) throws Exception {
        long timestamp = Instant.now().getEpochSecond();
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] digest = mac.doFinal((timestamp + "." + payload).getBytes(StandardCharsets.UTF_8));
        return "t=" + timestamp + ",v1=" + HexFormat.of().formatHex(digest);
    }

    private static SubscriptionEntity testSubscription(
            UserEntity user,
            com.websitebuilder.platform.billing.entity.SubscriptionStatus status
    ) {
        Instant now = Instant.now();
        return new SubscriptionEntity(
                UUID.randomUUID(),
                user,
                "stripe",
                "cus_test_123",
                "sub_test_123",
                status,
                "pro",
                now.plusSeconds(3600),
                false,
                now,
                now
        );
    }
}
