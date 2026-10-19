package com.websitebuilder.platform.admin.activity.repository;

import com.websitebuilder.platform.admin.activity.entity.ActivityEventEntity;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityEventRepository extends JpaRepository<ActivityEventEntity, UUID> {

    List<ActivityEventEntity> findTop20ByOrderByOccurredAtDescIdDesc();
}
