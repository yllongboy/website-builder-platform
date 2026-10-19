package com.websitebuilder.platform.security.jwt;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import com.websitebuilder.platform.WebsiteBuilderPlatformApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(
        properties = {
                "APP_JWT_SECRET=01234567890123456789012345678901",
                "APP_CORS_ALLOWED_ORIGINS=http://localhost:4200"
        }
)
@Testcontainers
class TokenBlocklistPostgresIntegrationTest {

    @Container
    private static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("website_builder_test")
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
    private TokenBlocklistService tokenBlocklistService;

    @Autowired
    private RevokedTokenRepository revokedTokenRepository;

    @Test
    void revokedJti_survivesApplicationContextRestartAgainstSameDatabase() {
        String jti = "restart-test-" + UUID.randomUUID();
        Instant expiresAt = Instant.now().plusSeconds(600);
        tokenBlocklistService.revoke(jti, expiresAt);

        try (var restartedApplication = new SpringApplicationBuilder(WebsiteBuilderPlatformApplication.class)
                .web(WebApplicationType.NONE)
                .properties(
                        "spring.datasource.url=" + POSTGRES.getJdbcUrl(),
                        "spring.datasource.username=" + POSTGRES.getUsername(),
                        "spring.datasource.password=" + POSTGRES.getPassword(),
                        "spring.datasource.driver-class-name=" + POSTGRES.getDriverClassName(),
                        "APP_JWT_SECRET=01234567890123456789012345678901",
                        "APP_CORS_ALLOWED_ORIGINS=http://localhost:4200"
                )
                .run()) {
            TokenBlocklistService restartedService = restartedApplication.getBean(TokenBlocklistService.class);
            assertTrue(restartedService.isRevoked(jti));
        }
    }

    @Test
    void evictExpired_removesExpiredJtisAndRetainsUnexpiredJtis() {
        String expiredJti = "expired-" + UUID.randomUUID();
        String activeJti = "active-" + UUID.randomUUID();
        tokenBlocklistService.revoke(expiredJti, Instant.now().minusSeconds(1));
        tokenBlocklistService.revoke(activeJti, Instant.now().plusSeconds(600));

        tokenBlocklistService.evictExpired();

        assertFalse(revokedTokenRepository.existsById(expiredJti));
        assertTrue(revokedTokenRepository.existsById(activeJti));
    }
}
