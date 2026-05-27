package com.websitebuilder.platform.assets.entity;

import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "assets")
public class AssetEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id")
    private UserEntity ownerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "website_id")
    private WebsiteEntity website;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    private TemplateEntity template;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @Column(name = "r2_object_key", nullable = false)
    private String r2ObjectKey;

    @Column(name = "public_url")
    private String publicUrl;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected AssetEntity() {
    }

    public UUID id() { return id; }
    public UserEntity ownerUser() { return ownerUser; }
    public WebsiteEntity website() { return website; }
    public TemplateEntity template() { return template; }
    public String fileName() { return fileName; }
    public String contentType() { return contentType; }
    public Long fileSize() { return fileSize; }
    public String r2ObjectKey() { return r2ObjectKey; }
    public String publicUrl() { return publicUrl; }
    public Instant createdAt() { return createdAt; }
}
