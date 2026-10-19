package com.websitebuilder.platform.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;

import com.websitebuilder.platform.auth.dto.AuthResponse;
import com.websitebuilder.platform.auth.dto.LoginRequest;
import com.websitebuilder.platform.auth.dto.RegisterRequest;
import com.websitebuilder.platform.admin.activity.entity.ActivityEventType;
import com.websitebuilder.platform.admin.activity.service.ActivityEventService;
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

    @Mock
    private ActivityEventService activityEventService;

    @Test
    void login_rejectsNonActiveUser_withGenericError() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
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
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
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
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
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

    @Test
    void register_recordsSignupOnlyAfterUserIsSaved() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
        RegisterRequest request = new RegisterRequest("new@example.com", "password123");
        UserSummary summary = new UserSummary(UUID.randomUUID(), request.email(), UserRole.USER);

        when(userRepository.existsByEmail(request.email())).thenReturn(false);
        when(passwordEncoder.encode(request.password())).thenReturn("encoded-password");
        when(jwtService.generateToken(any(), eq("USER"))).thenReturn("jwt-token");
        when(userMapper.toUserSummary(any(UserEntity.class))).thenReturn(summary);

        AuthResponse response = authService.register(request);

        assertEquals("jwt-token", response.accessToken());
        verify(userRepository).save(any(UserEntity.class));
        verify(activityEventService).record(ActivityEventType.SIGNUP, "User signed up", request.email());
    }

    @Test
    void register_rejectsDuplicateEmail_withoutRecordingSignup() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
        RegisterRequest request = new RegisterRequest("existing@example.com", "password123");
        when(userRepository.existsByEmail(request.email())).thenReturn(true);

        assertThrows(ApiException.class, () -> authService.register(request));

        verify(activityEventService, never()).record(any(ActivityEventType.class), anyString(), anyString());
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
