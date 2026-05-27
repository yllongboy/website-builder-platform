package com.websitebuilder.platform.auth.service;

import com.websitebuilder.platform.auth.dto.AuthResponse;
import com.websitebuilder.platform.auth.dto.LoginRequest;
import com.websitebuilder.platform.auth.dto.RegisterRequest;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.security.jwt.TokenBlocklistService;
import com.websitebuilder.platform.users.dto.UserDetail;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.mapper.UserMapper;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TokenBlocklistService tokenBlocklistService;

    public AuthService(
            UserRepository userRepository,
            UserMapper userMapper,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            TokenBlocklistService tokenBlocklistService
    ) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.tokenBlocklistService = tokenBlocklistService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ApiException("AUTH_EMAIL_TAKEN", "Email is already in use");
        }

        Instant now = Instant.now();
        UserEntity user = new UserEntity(
                UUID.randomUUID(),
                request.email(),
                passwordEncoder.encode(request.password()),
                com.websitebuilder.platform.users.entity.UserRole.USER,
                com.websitebuilder.platform.users.entity.UserStatus.ACTIVE,
                now,
                now
        );

        userRepository.save(user);
        String token = jwtService.generateToken(user.id(), user.role().name());
        return new AuthResponse(token, userMapper.toUserSummary(user));
    }

    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid email or password"));

        if (user.status() != com.websitebuilder.platform.users.entity.UserStatus.ACTIVE) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid email or password");
        }

        if (!passwordEncoder.matches(request.password(), user.passwordHash())) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid email or password");
        }

        String token = jwtService.generateToken(user.id(), user.role().name());
        return new AuthResponse(token, userMapper.toUserSummary(user));
    }

    public UserDetail getMe(UUID userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found"));
        return userMapper.toUserDetail(user);
    }

    public void logout(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session");
        }

        String token = authorizationHeader.substring(7);
        if (!jwtService.validateToken(token)) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session");
        }

        String jti = jwtService.extractJti(token);
        Instant expiresAt = jwtService.extractExpiry(token);
        if (jti == null || jti.isBlank() || expiresAt == null) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session");
        }

        tokenBlocklistService.revoke(jti, expiresAt);
    }
}
