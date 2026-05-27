package com.websitebuilder.platform.billing.repository;

import com.websitebuilder.platform.billing.entity.StripeEventEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StripeEventRepository extends JpaRepository<StripeEventEntity, UUID> {
    boolean existsByStripeEventId(String stripeEventId);
}
