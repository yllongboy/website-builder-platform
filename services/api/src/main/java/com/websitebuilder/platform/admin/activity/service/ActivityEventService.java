package com.websitebuilder.platform.admin.activity.service;

import com.websitebuilder.platform.admin.activity.entity.ActivityEventEntity;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.admin.activity.repository.ActivityEventRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ActivityEventService {

    private final ActivityEventRepository activityEventRepository;

    @Transactional
    public ActivityEventEntity record(ActivityEventType eventType, String description, String userName) {
        ActivityEventEntity event = new ActivityEventEntity(
                UUID.randomUUID(), eventType, description, userName, Instant.now()
        );
        return activityEventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public List<ActivityEventEntity> getRecentActivity() {
        return activityEventRepository.findTop20ByOrderByOccurredAtDescIdDesc();
    }
}
