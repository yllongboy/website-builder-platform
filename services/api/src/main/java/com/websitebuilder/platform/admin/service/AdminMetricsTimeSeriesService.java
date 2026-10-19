package com.websitebuilder.platform.admin.service;

import com.websitebuilder.platform.admin.dto.AdminMetricsTimeSeriesBucket;
import com.websitebuilder.platform.billing.repository.PaidInvoiceMonthlyRevenueProjection;
import com.websitebuilder.platform.billing.repository.PaidInvoiceSnapshotRepository;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminMetricsTimeSeriesService {

    private static final int BUCKET_COUNT = 6;
    private static final String USD_CURRENCY = "usd";

    private final UserRepository userRepository;
    private final PaidInvoiceSnapshotRepository paidInvoiceSnapshotRepository;

    public AdminMetricsTimeSeriesService(
            UserRepository userRepository,
            PaidInvoiceSnapshotRepository paidInvoiceSnapshotRepository
    ) {
        this.userRepository = userRepository;
        this.paidInvoiceSnapshotRepository = paidInvoiceSnapshotRepository;
    }

    @Transactional(readOnly = true)
    public List<AdminMetricsTimeSeriesBucket> getSixMonthSeries() {
        YearMonth currentMonth = YearMonth.now(ZoneOffset.UTC);
        YearMonth firstMonth = currentMonth.minusMonths(BUCKET_COUNT - 1L);
        Instant rangeStart = firstMonth.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        Instant rangeEnd = currentMonth.plusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();

        Map<YearMonth, Long> revenueByMonth = new LinkedHashMap<>();
        List<YearMonth> months = new ArrayList<>(BUCKET_COUNT);
        for (int offset = 0; offset < BUCKET_COUNT; offset++) {
            YearMonth month = firstMonth.plusMonths(offset);
            months.add(month);
            revenueByMonth.put(month, 0L);
        }

        List<PaidInvoiceMonthlyRevenueProjection> monthlyRevenue = paidInvoiceSnapshotRepository
                .findMonthlyRevenueCents(USD_CURRENCY, rangeStart, rangeEnd);
        for (PaidInvoiceMonthlyRevenueProjection revenue : monthlyRevenue) {
            YearMonth paidMonth = YearMonth.from(revenue.getMonth());
            revenueByMonth.computeIfPresent(paidMonth, (month, existing) -> revenue.getRevenueCents());
        }

        List<AdminMetricsTimeSeriesBucket> buckets = new ArrayList<>(BUCKET_COUNT);
        for (YearMonth month : months) {
            Instant monthStart = month.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
            Instant monthEnd = month.plusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
            long userCount = userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(monthStart, monthEnd);
            buckets.add(new AdminMetricsTimeSeriesBucket(month.toString(), userCount, revenueByMonth.get(month)));
        }
        return buckets;
    }
}
