package com.websitebuilder.platform.publishing.repository;

import com.websitebuilder.platform.publishing.entity.PublishLogEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublishLogRepository extends JpaRepository<PublishLogEntity, UUID> {
    List<PublishLogEntity> findByWebsiteIdOrderByCreatedAtDesc(UUID websiteId);
    List<PublishLogEntity> findTop50ByWebsiteIdOrderByCreatedAtDesc(UUID websiteId);
    Optional<PublishLogEntity> findTopByWebsiteIdOrderByCreatedAtDesc(UUID websiteId);
}
