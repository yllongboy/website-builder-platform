package com.websitebuilder.platform.security.jwt;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

    private static final String JWT_SECRET = "this-is-a-very-long-test-secret-key-with-at-least-32-chars";

    @Test
    void generateToken_includesNonNullJtiClaim() {
        JwtService jwtService = new JwtService(JWT_SECRET, 60_000L);

        String token = jwtService.generateToken(UUID.randomUUID(), "USER");
        String jti = jwtService.extractJti(token);

        assertNotNull(jti);
        assertTrue(!jti.isBlank());
    }

    @Test
    void extractJti_returnsJtiFromGeneratedToken() {
        JwtService jwtService = new JwtService(JWT_SECRET, 60_000L);

        String token = jwtService.generateToken(UUID.randomUUID(), "ADMIN");
        String extractedJti = jwtService.extractJti(token);

        String claimJti = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(JWT_SECRET.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getId();

        assertNotNull(extractedJti);
        assertTrue(extractedJti.equals(claimJti));
    }

    @Test
    void extractExpiry_returnsInstantAfterNow() {
        JwtService jwtService = new JwtService(JWT_SECRET, 60_000L);

        String token = jwtService.generateToken(UUID.randomUUID(), "USER");
        Instant expiry = jwtService.extractExpiry(token);

        assertNotNull(expiry);
        assertTrue(expiry.isAfter(Instant.now().minusSeconds(1)));
    }
}
