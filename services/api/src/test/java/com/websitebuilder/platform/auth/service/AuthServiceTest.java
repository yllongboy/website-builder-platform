package com.websitebuilder.platform.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.auth.dto.AuthResponse;
import com.websitebuilder.platform.auth.dto.LoginRequest;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.security.jwt.TokenBlocklistService;
import com.websitebuilder.platform.users.dto.UserRole;
import com.websitebuilder.platform.users.dto.UserSummary;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.mapper.UserMapper;
import com.websitebuilder.platform.users.repository.UserRepository;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenBlocklistService tokenBlocklistService;

    @Test
    void login_rejectsNonActiveUser_withGenericError() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService);
        LoginRequest request = new LoginRequest("suspended@example.com", "password123");
        UserEntity suspendedUser = testUser(
                UUID.fromString("10101010-1010-1010-1010-101010101010"),
                "suspended@example.com",
                com.websitebuilder.platform.users.entity.UserStatus.SUSPENDED
        );

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(suspendedUser));

        ApiException exception = assertThrows(ApiException.class, () -> authService.login(request));

        assertEquals("AUTH_INVALID_CREDENTIALS", exception.code());
        verify(passwordEncoder, never()).matches(request.password(), suspendedUser.passwordHash());
    }

    @Test
    void login_rejectsDeletedUser_withGenericError() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService);
        LoginRequest request = new LoginRequest("deleted@example.com", "password123");
        UserEntity deletedUser = testUser(
                UUID.fromString("20202020-2020-2020-2020-202020202020"),
                "deleted@example.com",
                com.websitebuilder.platform.users.entity.UserStatus.DELETED
        );

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(deletedUser));

        ApiException exception = assertThrows(ApiException.class, () -> authService.login(request));

        assertEquals("AUTH_INVALID_CREDENTIALS", exception.code());
        verify(passwordEncoder, never()).matches(request.password(), deletedUser.passwordHash());
    }

    @Test
    void login_succeedsForActiveUser() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService);
        LoginRequest request = new LoginRequest("active@example.com", "password123");
        UUID userId = UUID.fromString("30303030-3030-3030-3030-303030303030");
        UserEntity activeUser = testUser(userId, "active@example.com", com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);
        UserSummary summary = new UserSummary(userId, "active@example.com", UserRole.USER);

        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(activeUser));
        when(passwordEncoder.matches(request.password(), activeUser.passwordHash())).thenReturn(true);
        when(jwtService.generateToken(activeUser.id(), activeUser.role().name())).thenReturn("jwt-token");
        when(userMapper.toUserSummary(activeUser)).thenReturn(summary);

        AuthResponse response = authService.login(request);

        assertEquals("jwt-token", response.accessToken());
        assertEquals(summary, response.user());
    }

    private UserEntity testUser(UUID id, String email, com.websitebuilder.platform.users.entity.UserStatus status) {
        Instant now = Instant.parse("2026-05-01T10:15:30Z");
        return new UserEntity(
                id,
                email,
                "password-hash",
                com.websitebuilder.platform.users.entity.UserRole.USER,
                status,
                now,
                now
        );
    }
}