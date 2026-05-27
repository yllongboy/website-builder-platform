package com.websitebuilder.platform.admin.billing.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.admin.billing.dto.AdminSubscriptionPageResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
class AdminBillingServiceTest {

    @Mock private SubscriptionRepository subscriptionRepository;
    @Mock private UserRepository userRepository;
    @Mock private Environment environment;

    @Test
    void getSubscriptions_clampsNegativePageToZero() {
        AdminBillingService service = new AdminBillingService(subscriptionRepository, userRepository, environment);

        when(subscriptionRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of()));

        AdminSubscriptionPageResponse response = service.getSubscriptions(-3, 20);

        assertEquals(0, response.page());
        assertEquals(20, response.size());
        assertRequestedPageAndSize(0, 20);
    }

    @Test
    void getSubscriptions_clampsNonPositiveSizeToOne() {
        AdminBillingService service = new AdminBillingService(subscriptionRepository, userRepository, environment);

        when(subscriptionRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of()));

        AdminSubscriptionPageResponse response = service.getSubscriptions(0, 0);

        assertEquals(0, response.page());
        assertEquals(1, response.size());
        assertRequestedPageAndSize(0, 1);
    }

    @Test
    void getSubscriptions_clampsSizeAboveHundredToHundred() {
        AdminBillingService service = new AdminBillingService(subscriptionRepository, userRepository, environment);

        when(subscriptionRepository.findAll(any(Pageable.class))).thenReturn(new PageImpl<>(List.of()));

        AdminSubscriptionPageResponse response = service.getSubscriptions(2, 101);

        assertEquals(2, response.page());
        assertEquals(100, response.size());
        assertRequestedPageAndSize(2, 100);
    }

    @Test
    void getSubscriptions_keepsNominalPaginationValues() {
        AdminBillingService service = new AdminBillingService(subscriptionRepository, userRepository, environment);

        SubscriptionEntity subscription = createSubscription(Instant.parse("2026-12-01T00:00:00Z"));
        when(subscriptionRepository.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(subscription), Pageable.unpaged(), 1));

        AdminSubscriptionPageResponse response = service.getSubscriptions(0, 20);

        assertEquals(0, response.page());
        assertEquals(20, response.size());
        assertEquals(1L, response.totalElements());
        assertEquals(1, response.content().size());
        assertRequestedPageAndSize(0, 20);
    }

    @Test
    void getSubscriptions_mapsNullCurrentPeriodEndToNullDtoField() {
        AdminBillingService service = new AdminBillingService(subscriptionRepository, userRepository, environment);

        SubscriptionEntity subscription = createSubscription(null);
        when(subscriptionRepository.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(subscription), Pageable.unpaged(), 1));

        AdminSubscriptionPageResponse response = service.getSubscriptions(0, 20);

        assertEquals(1, response.content().size());
        assertNotNull(response.content().get(0));
        assertNull(response.content().get(0).currentPeriodEnd());
    }

    private void assertRequestedPageAndSize(int expectedPage, int expectedSize) {
        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(subscriptionRepository).findAll(pageableCaptor.capture());

        Pageable pageable = pageableCaptor.getValue();
        assertEquals(expectedPage, pageable.getPageNumber());
        assertEquals(expectedSize, pageable.getPageSize());
    }

    private SubscriptionEntity createSubscription(Instant currentPeriodEnd) {
        Instant createdAt = Instant.parse("2026-01-01T00:00:00Z");
        UserEntity user = new UserEntity(
                UUID.randomUUID(),
                "admin-test@example.com",
                "hashed-password",
                UserRole.USER,
                UserStatus.ACTIVE,
                createdAt,
                createdAt
        );

        return new SubscriptionEntity(
                UUID.randomUUID(),
                user,
                "stripe",
                "cus_123",
                "sub_123",
                SubscriptionStatus.ACTIVE,
                "pro_monthly",
                currentPeriodEnd,
                Boolean.FALSE,
                createdAt,
                createdAt
        );
    }
}
