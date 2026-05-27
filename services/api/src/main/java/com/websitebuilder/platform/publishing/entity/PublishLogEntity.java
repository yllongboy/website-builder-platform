package com.websitebuilder.platform.publishing.entity;

import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "publish_logs")
public class PublishLogEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "website_id", nullable = false)
    private WebsiteEntity website;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PublishLogStatus status;

    private String message;

    @Column(name = "published_url")
    private String publishedUrl;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected PublishLogEntity() {
    }

    public PublishLogEntity(
            UUID id,
            WebsiteEntity website,
            PublishLogStatus status,
            String message,
            String publishedUrl,
            Instant createdAt
    ) {
        this.id = id;
        this.website = website;
        this.status = status;
        this.message = message;
        this.publishedUrl = publishedUrl;
        this.createdAt = createdAt;
    }

    public UUID id() { return id; }
    public WebsiteEntity website() { return website; }
    public PublishLogStatus status() { return status; }
    public String message() { return message; }
    public String publishedUrl() { return publishedUrl; }
    public Instant createdAt() { return createdAt; }
}
