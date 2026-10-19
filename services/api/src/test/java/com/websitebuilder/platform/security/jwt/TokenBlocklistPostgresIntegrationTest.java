package com.websitebuilder.platform.security.jwt;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.time.Instant;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TokenBlocklistService.class)
@Testcontainers(disabledWithoutDocker = true)
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
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    void revokedJti_survivesFreshServiceUsingSameMigratedDatabase() {
        String jti = "restart-test-" + UUID.randomUUID();
        Instant expiresAt = Instant.now().plusSeconds(600);
        tokenBlocklistService.revoke(jti, expiresAt);

        TokenBlocklistService freshService = new TokenBlocklistService(revokedTokenRepository);

        assertTrue(freshService.isRevoked(jti));
    }

    @Test
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
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
