package com.websitebuilder.platform.admin.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.admin.controller.AdminMetricsTimeSeriesController;
import com.websitebuilder.platform.admin.dto.AdminMetricsTimeSeriesBucket;
import com.websitebuilder.platform.billing.repository.PaidInvoiceMonthlyRevenueProjection;
import com.websitebuilder.platform.billing.repository.PaidInvoiceSnapshotRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AdminMetricsTimeSeriesServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PaidInvoiceSnapshotRepository paidInvoiceSnapshotRepository;

    @Test
    @DisplayName("SCRUM-111 - time series returns six monthly user and revenue buckets with zero-filled gaps")
    void getSixMonthSeries_returnsSixMonthsAndZeroFillsMissingRevenue() {
        AdminMetricsTimeSeriesService service = new AdminMetricsTimeSeriesService(
                userRepository, paidInvoiceSnapshotRepository);
        YearMonth current = YearMonth.now(ZoneOffset.UTC);
        YearMonth first = current.minusMonths(5);
        when(paidInvoiceSnapshotRepository.findMonthlyRevenueCents(any(), any(), any()))
                .thenReturn(List.of(revenue(first.plusMonths(1), 2500), revenue(current, 8400)));
        when(userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any()))
                .thenReturn(1L, 2L, 3L, 4L, 5L, 6L);

        List<AdminMetricsTimeSeriesBucket> buckets = service.getSixMonthSeries();

        assertEquals(6, buckets.size());
        assertEquals(first.toString(), buckets.getFirst().month());
        assertEquals(current.toString(), buckets.getLast().month());
        assertEquals(List.of(1L, 2L, 3L, 4L, 5L, 6L), buckets.stream().map(AdminMetricsTimeSeriesBucket::userCount).toList());
        assertEquals(List.of(0L, 2500L, 0L, 0L, 0L, 8400L), buckets.stream().map(AdminMetricsTimeSeriesBucket::revenueCents).toList());
    }

    @Test
    @DisplayName("SCRUM-111 - time series controller rejects unsupported periods")
    void controllerRejectsUnsupportedPeriod() {
        AdminMetricsTimeSeriesService service = new AdminMetricsTimeSeriesService(
                userRepository, paidInvoiceSnapshotRepository);
        AdminMetricsTimeSeriesController controller = new AdminMetricsTimeSeriesController(service);

        ApiException exception = assertThrows(ApiException.class, () -> controller.getTimeSeries("3m"));

        assertEquals("ADMIN_METRICS_PERIOD_INVALID", exception.code());
        verify(userRepository, org.mockito.Mockito.never()).countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(any(), any());
    }

    private PaidInvoiceMonthlyRevenueProjection revenue(YearMonth month, long cents) {
        LocalDate firstOfMonth = month.atDay(1);
        return new PaidInvoiceMonthlyRevenueProjection() {
            @Override public LocalDate getMonth() { return firstOfMonth; }
            @Override public Long getRevenueCents() { return cents; }
        };
    }
}
