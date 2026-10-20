package com.websitebuilder.platform.admin.activity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.WebsiteBuilderPlatformApplication;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventEntity;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.admin.activity.repository.ActivityEventRepository;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.entity.UserStatus;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(properties = {
        "APP_JWT_SECRET=01234567890123456789012345678901",
        "APP_CORS_ALLOWED_ORIGINS=http://localhost:4200"
})
@AutoConfigureMockMvc
@Testcontainers
class AdminActivityPostgresIntegrationTest {

    private static final String JWT_SECRET = "01234567890123456789012345678901";

    @Container
    private static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("website_builder_activity_test")
            .withUsername("website_builder_test")
            .withPassword("website_builder_test");

    @DynamicPropertySource
    static void configureDatabase(DynamicPropertyRegistry properties) {
        properties.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        properties.add("spring.datasource.username", POSTGRES::getUsername);
        properties.add("spring.datasource.password", POSTGRES::getPassword);
        properties.add("spring.datasource.driver-class-name", POSTGRES::getDriverClassName);
    }

    @Autowired
    private ActivityEventRepository activityEventRepository;

    @Autowired
    private ActivityEventService activityEventService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void clearActivityEvents() {
        activityEventRepository.deleteAll();
    }

    @Test
    @DisplayName("SCRUM-112 - admin activity feed is empty when no events exist")
    void recentFeedIsEmptyWhenNoEventsExist() throws Exception {
        mockMvc.perform(get("/admin/activity").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(0)));
    }

    @Test
    @DisplayName("SCRUM-112 - activity feed returns only the newest twenty records with stable tie breaking")
    void feedReturnsNewestTwentyWithUuidDescendingTieBreakAndContractFieldsOnly() throws Exception {
        Instant occurredAt = Instant.parse("2026-08-01T10:00:00Z");
        List<ActivityEventEntity> events = java.util.stream.IntStream.rangeClosed(1, 25)
                .mapToObj(number -> new ActivityEventEntity(
                        new UUID(0, number), ActivityEventType.SIGNUP, "signup-" + number,
                        "user" + number + "@example.com", occurredAt))
                .toList();
        activityEventRepository.saveAll(events);

        var response = mockMvc.perform(get("/admin/activity").header("Authorization", adminToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(20)))
                .andExpect(jsonPath("$[0].type").value("SIGNUP"))
                .andExpect(jsonPath("$[0].description").value("signup-25"))
                .andExpect(jsonPath("$[0].userName").value("user25@example.com"))
                .andExpect(jsonPath("$[0].timestamp").value(occurredAt.toString()))
                .andExpect(jsonPath("$[0].id").doesNotExist())
                .andReturn();

        org.assertj.core.api.Assertions.assertThat(response.getResponse().getContentAsString())
                .doesNotContain("\"id\"");
        List<ActivityEventEntity> recent = activityEventService.getRecentActivity();
        assertEquals(new UUID(0, 25), recent.get(0).id());
        assertEquals(new UUID(0, 6), recent.get(19).id());
    }

    @Test
    @DisplayName("SCRUM-112 - activity feed requires an authenticated administrator")
    void endpointRequiresAuthenticationAndAdminRole() throws Exception {
        mockMvc.perform(get("/admin/activity"))
                .andExpect(status().isUnauthorized());

        UserEntity ordinaryUser = saveUser("ordinary@example.com", UserRole.USER);
        mockMvc.perform(get("/admin/activity")
                        .header("Authorization", "Bearer " + jwtService.generateToken(ordinaryUser.id(), "USER")))
                .andExpect(status().isForbidden());

        mockMvc.perform(get("/admin/activity").header("Authorization", adminToken()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("SCRUM-112 - recorded activity events survive an application context restart")
    void recordedEventsSurviveFreshApplicationContextAgainstSamePostgresDatabase() {
        String actor = "restart-" + UUID.randomUUID() + "@example.com";
        activityEventService.record(ActivityEventType.WEBSITE_PUBLISHED, "Website published: restart test", actor);

        try (var restartedApplication = new SpringApplicationBuilder(WebsiteBuilderPlatformApplication.class)
                .web(WebApplicationType.SERVLET)
                .properties(
                        "server.port=0",
                        "spring.datasource.url=" + POSTGRES.getJdbcUrl(),
                        "spring.datasource.username=" + POSTGRES.getUsername(),
                        "spring.datasource.password=" + POSTGRES.getPassword(),
                        "spring.datasource.driver-class-name=" + POSTGRES.getDriverClassName(),
                        "APP_JWT_SECRET=" + JWT_SECRET,
                        "APP_CORS_ALLOWED_ORIGINS=http://localhost:4200"
                )
                .run()) {
            List<ActivityEventEntity> feed = restartedApplication.getBean(ActivityEventService.class)
                    .getRecentActivity();
            assertTrue(feed.stream().anyMatch(event -> event.userName().equals(actor)));
        }
    }

    @Test
    @DisplayName("SCRUM-112 - feed supports signup, website published, and subscription created event types")
    void feedContainsRequiredEventTypes() {
        String actor = "events-" + UUID.randomUUID() + "@example.com";
        activityEventService.record(ActivityEventType.SIGNUP, "User signed up", actor);
        activityEventService.record(ActivityEventType.WEBSITE_PUBLISHED, "Website published", actor);
        activityEventService.record(ActivityEventType.SUBSCRIPTION_CREATED, "Subscription created", actor);

        List<ActivityEventEntity> feed = activityEventService.getRecentActivity();

        assertTrue(feed.stream().anyMatch(event -> event.eventType() == ActivityEventType.SIGNUP));
        assertTrue(feed.stream().anyMatch(event -> event.eventType() == ActivityEventType.WEBSITE_PUBLISHED));
        assertTrue(feed.stream().anyMatch(event -> event.eventType() == ActivityEventType.SUBSCRIPTION_CREATED));
    }

    private String adminToken() {
        UserEntity admin = saveUser("admin-" + UUID.randomUUID() + "@example.com", UserRole.ADMIN);
        return "Bearer " + jwtService.generateToken(admin.id(), "ADMIN");
    }

    private UserEntity saveUser(String email, UserRole role) {
        Instant now = Instant.now();
        return userRepository.save(new UserEntity(UUID.randomUUID(), email, "not-used", role,
                UserStatus.ACTIVE, now, now));
    }
}
