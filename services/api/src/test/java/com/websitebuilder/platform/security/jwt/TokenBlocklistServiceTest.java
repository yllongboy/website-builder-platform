package com.websitebuilder.platform.security.jwt;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.time.Instant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessResourceFailureException;

@ExtendWith(MockitoExtension.class)
class TokenBlocklistServiceTest {

    @Mock
    private RevokedTokenRepository revokedTokenRepository;

    private TokenBlocklistService service;

    @BeforeEach
    void setUp() {
        service = new TokenBlocklistService(revokedTokenRepository);
    }

    @Test
    void revoke_persistsJtiAndExpiry() {
        String jti = "jti-123";
        Instant expiresAt = Instant.parse("2030-01-01T00:00:00Z");

        service.revoke(jti, expiresAt);

        verify(revokedTokenRepository).revoke(jti, expiresAt);
    }

    @Test
    void revoke_ignoresNullBlankAndIncompleteInputs() {
        service.revoke(null, Instant.now().plusSeconds(60));
        service.revoke("", Instant.now().plusSeconds(60));
        service.revoke("   ", Instant.now().plusSeconds(60));
        service.revoke("jti-without-expiry", null);

        verifyNoInteractions(revokedTokenRepository);
    }

    @Test
    void isRevoked_returnsRepositoryResultForKnownAndUnknownJtis() {
        when(revokedTokenRepository.existsByJtiAndExpiresAtAfter(
                eq("revoked-jti"), any(Instant.class)))
                .thenReturn(true);
        when(revokedTokenRepository.existsByJtiAndExpiresAtAfter(
                eq("unknown-jti"), any(Instant.class)))
                .thenReturn(false);

        assertTrue(service.isRevoked("revoked-jti"));
        assertFalse(service.isRevoked("unknown-jti"));
    }

    @Test
    void isRevoked_failsClosedForNullAndBlankJtisWithoutQueryingRepository() {
        assertTrue(service.isRevoked(null));
        assertTrue(service.isRevoked(""));
        assertTrue(service.isRevoked("  "));

        verify(revokedTokenRepository, never())
                .existsByJtiAndExpiresAtAfter(any(), any());
    }

    @Test
    void isRevoked_failsClosedWhenDatabaseLookupFails() {
        when(revokedTokenRepository.existsByJtiAndExpiresAtAfter(
                eq("jti-123"), any(Instant.class)))
                .thenThrow(new DataAccessResourceFailureException("database unavailable"));

        assertTrue(service.isRevoked("jti-123"));
    }

    @Test
    void evictExpired_deletesEntriesBeforeCurrentTime() {
        service.evictExpired();

        verify(revokedTokenRepository).deleteByExpiresAtBefore(any(Instant.class));
    }
}
