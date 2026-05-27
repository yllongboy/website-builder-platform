package com.websitebuilder.platform.websites.entity;

import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.users.entity.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "websites")
public class WebsiteEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    private TemplateEntity template;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WebsiteStatus status;

    @Column(name = "published_url")
    private String publishedUrl;

    @Column(name = "last_published_at")
    private Instant lastPublishedAt;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected WebsiteEntity() {
    }

    public WebsiteEntity(
            UUID id,
            UserEntity user,
            TemplateEntity template,
            String name,
            String slug,
            WebsiteStatus status,
            String publishedUrl,
            Instant lastPublishedAt,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.user = user;
        this.template = template;
        this.name = name;
        this.slug = slug;
        this.status = status;
        this.publishedUrl = publishedUrl;
        this.lastPublishedAt = lastPublishedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID id() { return id; }
    public UserEntity user() { return user; }
    public TemplateEntity template() { return template; }
    public String name() { return name; }
    public String slug() { return slug; }
    public WebsiteStatus status() { return status; }
    public String publishedUrl() { return publishedUrl; }
    public Instant lastPublishedAt() { return lastPublishedAt; }
    public Instant createdAt() { return createdAt; }
    public Instant updatedAt() { return updatedAt; }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(WebsiteStatus status) {
        this.status = status;
    }

    public void setPublishedUrl(String publishedUrl) {
        this.publishedUrl = publishedUrl;
    }

    public void setLastPublishedAt(Instant lastPublishedAt) {
        this.lastPublishedAt = lastPublishedAt;
    }
}
