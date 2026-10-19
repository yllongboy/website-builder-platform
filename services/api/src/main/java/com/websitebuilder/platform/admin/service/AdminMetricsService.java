package com.websitebuilder.platform.admin.service;

import com.websitebuilder.platform.admin.dto.AdminMetricsResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.PaidInvoiceMonthlyRevenueProjection;
import com.websitebuilder.platform.billing.repository.PaidInvoiceSnapshotRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMetricsService {

    private final UserRepository userRepository;
    private final WebsiteRepository websiteRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PaidInvoiceSnapshotRepository paidInvoiceSnapshotRepository;

    public AdminMetricsResponse getMetrics() {
        long totalUsers = userRepository.count();
        long totalWebsites = websiteRepository.count();
        long totalActiveSubscriptions = subscriptionRepository.countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING)
        );
        Instant now = Instant.now();
        YearMonth currentUtcMonth = YearMonth.from(now.atZone(ZoneOffset.UTC));
        Instant monthStart = currentUtcMonth.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        Instant previousMonthStart = currentUtcMonth.minusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        long currentUsers = userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(monthStart, now);
        long previousUsers = userRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(previousMonthStart, monthStart);
        long currentWebsites = websiteRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(monthStart, now);
        long previousWebsites = websiteRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(previousMonthStart, monthStart);
        long currentSubscriptions = subscriptionRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(monthStart, now);
        long previousSubscriptions = subscriptionRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(previousMonthStart, monthStart);
        List<PaidInvoiceMonthlyRevenueProjection> monthlyRevenue =
                paidInvoiceSnapshotRepository.findMonthlyRevenueCents("usd", previousMonthStart, now);
        long monthlyRevenueCents = monthlyRevenue.stream()
                .filter(row -> row.getMonth().equals(currentUtcMonth.atDay(1)))
                .mapToLong(PaidInvoiceMonthlyRevenueProjection::getRevenueCents)
                .sum();
        Map<LocalDate, Long> revenueByMonth = monthlyRevenue.stream().collect(Collectors.toMap(
                PaidInvoiceMonthlyRevenueProjection::getMonth,
                PaidInvoiceMonthlyRevenueProjection::getRevenueCents,
                Long::sum));
        long previousRevenueCents = revenueByMonth.getOrDefault(currentUtcMonth.minusMonths(1).atDay(1), 0L);

        return new AdminMetricsResponse(
                totalUsers, totalWebsites, totalActiveSubscriptions, monthlyRevenueCents,
                growthPercent(currentUsers, previousUsers),
                growthPercent(currentSubscriptions, previousSubscriptions),
                growthPercent(currentWebsites, previousWebsites),
                growthPercent(monthlyRevenueCents, previousRevenueCents));
    }

    private BigDecimal growthPercent(long current, long previous) {
        if (previous == 0) {
            return null;
        }
        return BigDecimal.valueOf(current).subtract(BigDecimal.valueOf(previous))
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(previous), 1, RoundingMode.HALF_UP);
    }
}
