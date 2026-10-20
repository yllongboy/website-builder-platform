package com.websitebuilder.platform.admin.settings.repository;

import com.websitebuilder.platform.admin.settings.entity.PlatformSettingsEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformSettingsRepository extends JpaRepository<PlatformSettingsEntity, Short> {
    Optional<PlatformSettingsEntity> findBySingletonId(Short singletonId);
}
