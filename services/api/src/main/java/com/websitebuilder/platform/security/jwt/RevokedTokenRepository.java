package com.websitebuilder.platform.security.jwt;

import java.time.Instant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RevokedTokenRepository extends JpaRepository<RevokedTokenEntity, String> {

    boolean existsByJtiAndExpiresAtAfter(String jti, Instant now);

    long deleteByExpiresAtBefore(Instant now);

    @Modifying
    @Transactional
    @Query(value = """
            INSERT INTO revoked_tokens (jti, expires_at)
            VALUES (:jti, :expiresAt)
            ON CONFLICT (jti) DO UPDATE
            SET expires_at = GREATEST(revoked_tokens.expires_at, EXCLUDED.expires_at)
            """, nativeQuery = true)
    int revoke(@Param("jti") String jti, @Param("expiresAt") Instant expiresAt);
}
