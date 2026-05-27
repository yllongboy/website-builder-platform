package com.websitebuilder.platform.assets.repository;

import com.websitebuilder.platform.assets.entity.AssetEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<AssetEntity, UUID> {
    List<AssetEntity> findByWebsiteId(UUID websiteId);
}
