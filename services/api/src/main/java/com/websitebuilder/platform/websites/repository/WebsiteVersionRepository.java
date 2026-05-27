package com.websitebuilder.platform.websites.repository;

import com.websitebuilder.platform.websites.entity.WebsiteVersionEntity;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WebsiteVersionRepository extends JpaRepository<WebsiteVersionEntity, UUID> {
    Optional<WebsiteVersionEntity> findByWebsiteIdAndIsCurrentTrue(UUID websiteId);
    @Query("SELECT v FROM WebsiteVersionEntity v WHERE v.website.id = :websiteId AND v.website.user.id = :userId AND v.isCurrent = true")
    Optional<WebsiteVersionEntity> findCurrentByWebsiteIdAndUserId(@Param("websiteId") UUID websiteId, @Param("userId") UUID userId);

    @Modifying
    @Query("DELETE FROM WebsiteVersionEntity v WHERE v.website.id = :websiteId AND v.isCurrent = false AND v.versionNumber <= :pruneBeforeVersion")
    void deleteOldVersions(@Param("websiteId") UUID websiteId, @Param("pruneBeforeVersion") int pruneBeforeVersion);
}
