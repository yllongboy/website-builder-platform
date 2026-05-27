package com.websitebuilder.platform.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.Instant;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

	private final SecretKey signingKey;
	private final long expirationMs;

	public JwtService(
			@Value("${app.jwt.secret}") String jwtSecret,
			@Value("${app.jwt.expiration-ms}") long expirationMs
	) {
		this.expirationMs = expirationMs;
		this.signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
	}

	public String generateToken(UUID userId, String role) {
		Date issuedAt = new Date();
		Date expiration = new Date(issuedAt.getTime() + expirationMs);
		String jti = UUID.randomUUID().toString();

		return Jwts.builder()
				.id(jti)
				.subject(userId.toString())
				.claim("role", role)
				.issuedAt(issuedAt)
				.expiration(expiration)
				.signWith(signingKey)
				.compact();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parser()
					.verifyWith(signingKey)
					.build()
					.parseSignedClaims(token);
			return true;
		} catch (JwtException | IllegalArgumentException ex) {
			return false;
		}
	}

	public UUID extractUserId(String token) {
		Claims claims = parseClaims(token);
		return UUID.fromString(claims.getSubject());
	}

	public String extractRole(String token) {
		Claims claims = parseClaims(token);
		return (String) claims.get("role");
	}

	public String extractJti(String token) {
		Claims claims = parseClaims(token);
		return claims.getId();
	}

	public Instant extractExpiry(String token) {
		Claims claims = parseClaims(token);
		Date expiration = claims.getExpiration();
		return expiration == null ? null : expiration.toInstant();
	}

	private Claims parseClaims(String token) {
		return Jwts.parser()
				.verifyWith(signingKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
}
