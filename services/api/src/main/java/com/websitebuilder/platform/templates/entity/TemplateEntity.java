package com.websitebuilder.platform.templates.entity;

import com.fasterxml.jackson.databind.JsonNode;
import com.websitebuilder.platform.categories.entity.CategoryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "templates")
public class TemplateEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    private String description;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "html_content", nullable = false)
    private String htmlContent;

    @Column(name = "css_content")
    private String cssContent;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "editor_state", columnDefinition = "jsonb")
    private JsonNode editorState;

    @Column(name = "is_premium", nullable = false)
    private Boolean isPremium;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected TemplateEntity() {
    }

    public TemplateEntity(
            UUID id,
            CategoryEntity category,
            String name,
            String slug,
            String description,
            String thumbnailUrl,
            String htmlContent,
            String cssContent,
            JsonNode editorState,
            Boolean isPremium,
            Boolean isActive,
            Instant createdAt,
            Instant updatedAt
    ) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.htmlContent = htmlContent;
        this.cssContent = cssContent;
        this.editorState = editorState;
        this.isPremium = isPremium;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID id() { return id; }
    public CategoryEntity category() { return category; }
    public String name() { return name; }
    public String slug() { return slug; }
    public String description() { return description; }
    public String thumbnailUrl() { return thumbnailUrl; }
    public String htmlContent() { return htmlContent; }
    public String cssContent() { return cssContent; }
    public JsonNode editorState() { return editorState; }
    public Boolean isPremium() { return isPremium; }
    public Boolean isActive() { return isActive; }
    public Instant createdAt() { return createdAt; }
    public Instant updatedAt() { return updatedAt; }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public void setCssContent(String cssContent) {
        this.cssContent = cssContent;
    }

    public void setEditorState(JsonNode editorState) {
        this.editorState = editorState;
    }

    public void setIsPremium(Boolean premium) {
        isPremium = premium;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }
}
