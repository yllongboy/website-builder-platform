package com.websitebuilder.platform.billing.repository;

import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, UUID> {
    Optional<SubscriptionEntity> findFirstByUserIdOrderByCreatedAtDesc(UUID userId);
    Optional<SubscriptionEntity> findByProviderSubscriptionId(String providerSubscriptionId);
    long countByStatusIn(Collection<SubscriptionStatus> statuses);
    List<SubscriptionEntity> findByStatusIn(Collection<SubscriptionStatus> statuses);
}
