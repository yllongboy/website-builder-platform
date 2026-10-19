package com.websitebuilder.platform.billing.repository;

import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.Instant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, UUID> {
    @Override
    @EntityGraph(attributePaths = "user")
    Page<SubscriptionEntity> findAll(Pageable pageable);
    Optional<SubscriptionEntity> findFirstByUserIdOrderByCreatedAtDesc(UUID userId);
    Optional<SubscriptionEntity> findByProviderSubscriptionId(String providerSubscriptionId);
    long countByStatusIn(Collection<SubscriptionStatus> statuses);
    long countByStatus(SubscriptionStatus status);
    long countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(Instant startInclusive, Instant endExclusive);
    List<SubscriptionEntity> findByStatusIn(Collection<SubscriptionStatus> statuses);
}
