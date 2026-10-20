package com.websitebuilder.platform.admin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.admin.dto.AdminMetricsResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.PaidInvoiceMonthlyRevenueProjection;
import com.websitebuilder.platform.billing.repository.PaidInvoiceSnapshotRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AdminMetricsServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private WebsiteRepository websiteRepository;
    @Mock private SubscriptionRepository subscriptionRepository;
    @Mock private PaidInvoiceSnapshotRepository paidInvoiceSnapshotRepository;

    @Test
    void getMetrics_returnsCorrectCounts() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);

        when(userRepository.count()).thenReturn(5L);
        when(userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(13L, 10L);
        when(websiteRepository.count()).thenReturn(10L);
        when(websiteRepository.countByStatus(WebsiteStatus.PUBLISHED)).thenReturn(4L);
        when(websiteRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(17L, 12L);
        when(subscriptionRepository.countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING)))
                .thenReturn(3L);
        when(subscriptionRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(5L, 3L);
        when(paidInvoiceSnapshotRepository.findMonthlyRevenueCents(
                eq("usd"), any(), any()))
                .thenReturn(List.of(revenue(12500L, true), revenue(10000L, false)));

        AdminMetricsResponse response = service.getMetrics();

        assertEquals(new AdminMetricsResponse(5L, 10L, 4L, 3L, 12500L,
                new BigDecimal("30.0"), new BigDecimal("66.7"), new BigDecimal("41.7"),
                new BigDecimal("25.0")), response);
    }

    @Test
    void getMetrics_countsActiveAndTrialingSubscriptions() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);

        when(userRepository.count()).thenReturn(0L);
        when(websiteRepository.count()).thenReturn(0L);
        when(subscriptionRepository.countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING)))
                .thenReturn(0L);

        service.getMetrics();

        verify(subscriptionRepository).countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING));
    }

    @Test
    void getMetrics_returnsZeroWhenNothingExists() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);

        when(userRepository.count()).thenReturn(0L);
        when(websiteRepository.count()).thenReturn(0L);
        when(subscriptionRepository.countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING)))
                .thenReturn(0L);

        AdminMetricsResponse response = service.getMetrics();

        assertEquals(new AdminMetricsResponse(0L, 0L, 0L, 0L, 0L, null, null, null, null), response);
    }

    @Test
    @DisplayName("SCRUM-108 - published website metric counts only websites in PUBLISHED status")
    void getMetrics_countsPublishedWebsitesSeparatelyFromAllWebsites() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);
        when(userRepository.count()).thenReturn(8L);
        when(websiteRepository.count()).thenReturn(11L);
        when(websiteRepository.countByStatus(WebsiteStatus.PUBLISHED)).thenReturn(4L);

        AdminMetricsResponse response = service.getMetrics();

        assertEquals(11L, response.totalWebsites());
        assertEquals(4L, response.publishedWebsites());
        verify(websiteRepository).countByStatus(WebsiteStatus.PUBLISHED);
    }

    @Test
    @DisplayName("SCRUM-109 - growth fields are null when the previous month has no baseline")
    void getMetrics_returnsNullGrowthForMissingPreviousMonthCounts() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);
        when(userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(5L, 0L);
        when(websiteRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(4L, 0L);
        when(subscriptionRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(2L, 0L);

        AdminMetricsResponse response = service.getMetrics();

        assertNull(response.userGrowthPercent());
        assertNull(response.subscriptionGrowthPercent());
        assertNull(response.websiteGrowthPercent());
        assertNull(response.revenueGrowthPercent());
    }

    @Test
    @DisplayName("SCRUM-110 - monthly revenue sums current calendar month paid invoice cents")
    void getMetrics_reportsCurrentMonthRevenueInCents() {
        AdminMetricsService service = new AdminMetricsService(
                userRepository, websiteRepository, subscriptionRepository, paidInvoiceSnapshotRepository);
        when(paidInvoiceSnapshotRepository.findMonthlyRevenueCents(eq("usd"), any(), any()))
                .thenReturn(List.of(revenue(12345L, true), revenue(9999L, false)));

        AdminMetricsResponse response = service.getMetrics();

        assertEquals(12345L, response.monthlyRevenueCents());
        verify(paidInvoiceSnapshotRepository).findMonthlyRevenueCents(eq("usd"), any(), any());
    }

    private PaidInvoiceMonthlyRevenueProjection revenue(long cents, boolean currentMonth) {
        return new PaidInvoiceMonthlyRevenueProjection() {
            @Override
            public java.time.LocalDate getMonth() {
                YearMonth month = YearMonth.now(ZoneOffset.UTC);
                return month.minusMonths(currentMonth ? 0 : 1).atDay(1);
            }

            @Override
            public Long getRevenueCents() {
                return cents;
            }
        };
    }
}
