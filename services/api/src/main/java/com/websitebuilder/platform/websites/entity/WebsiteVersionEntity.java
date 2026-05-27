package com.websitebuilder.platform.websites.entity;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "website_versions")
public class WebsiteVersionEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "website_id", nullable = false)
    private WebsiteEntity website;

    @Column(name = "html_content", nullable = false)
    private String htmlContent;

    @Column(name = "css_content")
    private String cssContent;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "editor_state", columnDefinition = "jsonb")
    private JsonNode editorState;

    @Column(name = "version_number", nullable = false)
    private Integer versionNumber;

    @Column(name = "is_current", nullable = false)
    private Boolean isCurrent;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    protected WebsiteVersionEntity() {
    }

    public WebsiteVersionEntity(
            UUID id,
            WebsiteEntity website,
            String htmlContent,
            String cssContent,
            JsonNode editorState,
            Integer versionNumber,
            Boolean isCurrent,
            Instant createdAt
    ) {
        this.id = id;
        this.website = website;
        this.htmlContent = htmlContent;
        this.cssContent = cssContent;
        this.editorState = editorState;
        this.versionNumber = versionNumber;
        this.isCurrent = isCurrent;
        this.createdAt = createdAt;
    }

    public UUID id() { return id; }
    public WebsiteEntity website() { return website; }
    public String htmlContent() { return htmlContent; }
    public String cssContent() { return cssContent; }
    public JsonNode editorState() { return editorState; }
    public Integer versionNumber() { return versionNumber; }
    public Boolean isCurrent() { return isCurrent; }
    public Instant createdAt() { return createdAt; }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public void setCssContent(String cssContent) {
        this.cssContent = cssContent;
    }

    public void setEditorState(JsonNode editorState) {
        this.editorState = editorState;
    }

    public void setIsCurrent(Boolean isCurrent) {
        this.isCurrent = isCurrent;
    }
}
