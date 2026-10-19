package com.websitebuilder.platform.admin.dto;

import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import java.time.Instant;

public record AdminActivityRecord(
        ActivityEventType type,
        String description,
        String userName,
        Instant timestamp
) {
}
