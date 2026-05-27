package com.websitebuilder.platform.websites.repository;

import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WebsiteRepository extends JpaRepository<WebsiteEntity, UUID> {
    @Query("SELECT w.user.id, COUNT(w) FROM WebsiteEntity w GROUP BY w.user.id")
    List<Object[]> countGroupedByUserId();

    long countByUserId(UUID userId);

    List<WebsiteEntity> findByUserId(UUID userId);
    Optional<WebsiteEntity> findByIdAndUserId(UUID id, UUID userId);
    boolean existsByUserIdAndSlug(UUID userId, String slug);
}
