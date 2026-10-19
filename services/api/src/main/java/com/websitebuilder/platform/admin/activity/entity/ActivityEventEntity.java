package com.websitebuilder.platform.admin.activity.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "activity_events")
public class ActivityEventEntity {

    @Id
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 40)
    private ActivityEventType eventType;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(name = "user_name", nullable = false, length = 255)
    private String userName;

    @Column(name = "occurred_at", nullable = false)
    private Instant occurredAt;

    protected ActivityEventEntity() {
    }

    public ActivityEventEntity(
            UUID id,
            ActivityEventType eventType,
            String description,
            String userName,
            Instant occurredAt
    ) {
        this.id = id;
        this.eventType = eventType;
        this.description = description;
        this.userName = userName;
        this.occurredAt = occurredAt;
    }

    public UUID id() { return id; }
    public ActivityEventType eventType() { return eventType; }
    public String description() { return description; }
    public String userName() { return userName; }
    public Instant occurredAt() { return occurredAt; }
}
