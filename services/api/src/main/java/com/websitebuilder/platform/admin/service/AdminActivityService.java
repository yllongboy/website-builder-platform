package com.websitebuilder.platform.admin.service;

import com.websitebuilder.platform.admin.activity.entity.ActivityEventEntity;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.admin.dto.AdminActivityRecord;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminActivityService {

    private final ActivityEventService activityEventService;

    @Transactional(readOnly = true)
    public List<AdminActivityRecord> getRecentActivity() {
        return activityEventService.getRecentActivity().stream()
                .map(this::toRecord)
                .toList();
    }

    private AdminActivityRecord toRecord(ActivityEventEntity event) {
        return new AdminActivityRecord(
                event.eventType(), event.description(), event.userName(), event.occurredAt()
        );
    }
}
