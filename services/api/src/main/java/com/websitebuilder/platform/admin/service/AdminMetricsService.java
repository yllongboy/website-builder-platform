package com.websitebuilder.platform.admin.service;

import com.websitebuilder.platform.admin.dto.AdminMetricsResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.PaidInvoiceMonthlyRevenueProjection;
import com.websitebuilder.platform.billing.repository.PaidInvoiceSnapshotRepository;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.List;
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
        YearMonth currentUtcMonth = YearMonth.now(ZoneOffset.UTC);
        var monthStart = currentUtcMonth.atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        var nextMonthStart = currentUtcMonth.plusMonths(1).atDay(1).atStartOfDay(ZoneOffset.UTC).toInstant();
        List<PaidInvoiceMonthlyRevenueProjection> monthlyRevenue =
                paidInvoiceSnapshotRepository.findMonthlyRevenueCents("usd", monthStart, nextMonthStart);
        long monthlyRevenueCents = monthlyRevenue.stream()
                .mapToLong(PaidInvoiceMonthlyRevenueProjection::getRevenueCents)
                .sum();

        return new AdminMetricsResponse(totalUsers, totalWebsites, totalActiveSubscriptions, monthlyRevenueCents);
    }
}
