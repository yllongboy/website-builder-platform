package com.websitebuilder.platform.security.jwt;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TokenBlocklistService {

    private final ConcurrentMap<String, Instant> revokedTokensByJti = new ConcurrentHashMap<>();

    public void revoke(String jti, Instant expiresAt) {
        if (jti == null || jti.isBlank() || expiresAt == null) {
            return;
        }
        revokedTokensByJti.put(jti, expiresAt);
    }

    public boolean isRevoked(String jti) {
        if (jti == null || jti.isBlank()) {
            return true;
        }

        Instant expiresAt = revokedTokensByJti.get(jti);
        if (expiresAt == null) {
            return false;
        }

        if (expiresAt.isBefore(Instant.now())) {
            revokedTokensByJti.remove(jti, expiresAt);
            return false;
        }

        return true;
    }

    @Scheduled(fixedRate = 300_000)
    public void evictExpired() {
        Instant now = Instant.now();
        revokedTokensByJti.entrySet().removeIf(entry -> isExpired(entry, now));
    }

    private boolean isExpired(Map.Entry<String, Instant> entry, Instant now) {
        Instant expiresAt = entry.getValue();
        return expiresAt == null || expiresAt.isBefore(now);
    }
}
