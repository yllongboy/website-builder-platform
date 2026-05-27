package com.websitebuilder.platform.billing.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.websitebuilder.platform.billing.dto.BillingStatusResponse;
import com.websitebuilder.platform.billing.dto.SubscriptionStatus;
import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.repository.StripeEventRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.env.Environment;

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

    @Mock
    private ObjectMapper objectMapper;

    @Mock
    private Environment environment;

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

    private BillingService newBillingService() {
        return new BillingService(
                subscriptionRepository,
                stripeEventRepository,
                userRepository,
                objectMapper,
                environment
        );
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
