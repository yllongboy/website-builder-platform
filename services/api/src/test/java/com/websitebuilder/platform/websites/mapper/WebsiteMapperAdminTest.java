package com.websitebuilder.platform.websites.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.websitebuilder.platform.categories.entity.CategoryEntity;
import com.websitebuilder.platform.templates.entity.TemplateEntity;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.websites.dto.AdminWebsiteResponse;
import com.websitebuilder.platform.websites.entity.WebsiteEntity;
import com.websitebuilder.platform.websites.entity.WebsiteStatus;
import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class WebsiteMapperAdminTest {

    private final WebsiteMapper mapper = new WebsiteMapper();

    @Test
    void toAdminResponse_includesTemplateTrimmedOwnerAndAdminDetailDefaults() {
        Instant createdAt = Instant.parse("2026-02-03T04:05:06Z");
        Instant updatedAt = Instant.parse("2026-04-05T06:07:08Z");
        UserEntity owner = user("  Ada  ", "  Lovelace ");
        WebsiteEntity website = website(owner, template("Portfolio"), createdAt, updatedAt);

        AdminWebsiteResponse response = mapper.toAdminResponse(website);

        assertEquals("Portfolio", response.templateName());
        assertEquals("Ada Lovelace", response.ownerName());
        assertEquals(0, response.pageViews());
        assertEquals(createdAt, response.createdAt());
        assertEquals(updatedAt, response.updatedAt());
        assertEquals(website.publishedUrl(), response.publishedUrl());
    }

    @Test
    void toAdminResponse_returnsNullForMissingTemplateAndOwnerNames() {
        Instant now = Instant.parse("2026-02-03T04:05:06Z");
        WebsiteEntity website = website(user("  ", null), null, now, now);

        AdminWebsiteResponse response = mapper.toAdminResponse(website);

        assertNull(response.templateName());
        assertNull(response.ownerName());
        assertEquals(0, response.pageViews());
        assertEquals(now, response.createdAt());
    }

    private static WebsiteEntity website(UserEntity owner, TemplateEntity template, Instant createdAt, Instant updatedAt) {
        return new WebsiteEntity(UUID.randomUUID(), owner, template, "My Site", "my-site",
                WebsiteStatus.PUBLISHED, "https://sites.example.test/my-site", null, createdAt, updatedAt);
    }

    private static UserEntity user(String firstName, String lastName) {
        Instant now = Instant.parse("2026-01-01T00:00:00Z");
        return new UserEntity(UUID.randomUUID(), "ada@example.test", firstName, lastName, "hash",
                UserRole.USER, UserStatus.ACTIVE, now, now);
    }

    private static TemplateEntity template(String name) {
        Instant now = Instant.parse("2026-01-01T00:00:00Z");
        CategoryEntity category = new CategoryEntity(UUID.randomUUID(), "Portfolio", "portfolio", null,
                0, true, now, now);
        return new TemplateEntity(UUID.randomUUID(), category, name, "template", null, null,
                "<main></main>", null, null, false, true, now, now);
    }
}
