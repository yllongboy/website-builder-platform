package com.websitebuilder.platform.admin.service;

import com.websitebuilder.platform.admin.dto.AdminMetricsResponse;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMetricsService {

    private final UserRepository userRepository;
    private final WebsiteRepository websiteRepository;
    private final SubscriptionRepository subscriptionRepository;

    public AdminMetricsResponse getMetrics() {
        long totalUsers = userRepository.count();
        long totalWebsites = websiteRepository.count();
        long totalActiveSubscriptions = subscriptionRepository.countByStatusIn(
                List.of(SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING)
        );

        return new AdminMetricsResponse(totalUsers, totalWebsites, totalActiveSubscriptions);
    }
}