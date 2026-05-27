package com.websitebuilder.platform.security.jwt;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import org.junit.jupiter.api.Test;

class TokenBlocklistServiceTest {

    @Test
    void revoke_addsEntry_andIsRevokedReturnsTrue() {
        TokenBlocklistService service = new TokenBlocklistService();
        String jti = "jti-123";

        service.revoke(jti, Instant.now().plusSeconds(600));

        assertTrue(service.isRevoked(jti));
    }

    @Test
    void isRevoked_returnsFalse_forUnknownJti() {
        TokenBlocklistService service = new TokenBlocklistService();

        assertFalse(service.isRevoked("missing-jti"));
    }

    @Test
    void evictExpired_removesExpiredEntries() {
        TokenBlocklistService service = new TokenBlocklistService();
        String expiredJti = "expired-jti";

        service.revoke(expiredJti, Instant.now().minusSeconds(1));
        service.evictExpired();

        assertFalse(service.isRevoked(expiredJti));
    }
}
