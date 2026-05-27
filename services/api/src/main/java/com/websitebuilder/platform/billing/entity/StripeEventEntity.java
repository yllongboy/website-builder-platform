package com.websitebuilder.platform.billing.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "stripe_events")
public class StripeEventEntity {

    @Id
    private UUID id;

    @Column(name = "stripe_event_id", nullable = false, unique = true)
    private String stripeEventId;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(nullable = false)
    private Boolean processed;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private JsonNode payload;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected StripeEventEntity() {
    }

    public StripeEventEntity(
            UUID id,
            String stripeEventId,
            String eventType,
            Boolean processed,
            JsonNode payload,
            Instant createdAt
    ) {
        this.id = id;
        this.stripeEventId = stripeEventId;
        this.eventType = eventType;
        this.processed = processed;
        this.payload = payload;
        this.createdAt = createdAt;
    }

    public UUID id() { return id; }
    public String stripeEventId() { return stripeEventId; }
    public String eventType() { return eventType; }
    public Boolean processed() { return processed; }
    public JsonNode payload() { return payload; }
    public Instant createdAt() { return createdAt; }
}
