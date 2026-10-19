package com.websitebuilder.platform.security.jwt;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TokenBlocklistService {

    private static final Logger logger = LoggerFactory.getLogger(TokenBlocklistService.class);

    private final RevokedTokenRepository revokedTokenRepository;

    public TokenBlocklistService(RevokedTokenRepository revokedTokenRepository) {
        this.revokedTokenRepository = revokedTokenRepository;
    }

    @Transactional
    public void revoke(String jti, Instant expiresAt) {
        if (jti == null || jti.isBlank() || expiresAt == null) {
            return;
        }
        revokedTokenRepository.revoke(jti, expiresAt);
    }

    public boolean isRevoked(String jti) {
        if (jti == null || jti.isBlank()) {
            return true;
        }

        try {
            return revokedTokenRepository.existsByJtiAndExpiresAtAfter(jti, Instant.now());
        } catch (DataAccessException exception) {
            // Authentication must fail closed when revocation state cannot be checked.
            logger.error("Unable to check JWT revocation state; rejecting token", exception);
            return true;
        }
    }

    @Scheduled(fixedRate = 300_000, initialDelay = 300_000)
    @Transactional
    public void evictExpired() {
        revokedTokenRepository.deleteByExpiresAtBefore(Instant.now());
    }
}
