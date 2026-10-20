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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.ArgumentCaptor;
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
    @DisplayName("SCRUM-97 - registration persists names and returns them in the user summary")
    void register_recordsSignupOnlyAfterUserIsSaved() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
        RegisterRequest request = new RegisterRequest("new@example.com", "password123", "Ada", "Lovelace");

        when(userRepository.existsByEmail(request.email())).thenReturn(false);
        when(passwordEncoder.encode(request.password())).thenReturn("encoded-password");
        when(jwtService.generateToken(any(), eq("USER"))).thenReturn("jwt-token");
        when(userMapper.toUserSummary(any(UserEntity.class))).thenAnswer(invocation ->
                new com.websitebuilder.platform.users.mapper.UserMapper().toUserSummary(invocation.getArgument(0)));

        AuthResponse response = authService.register(request);

        assertEquals("jwt-token", response.accessToken());
        ArgumentCaptor<UserEntity> savedUser = ArgumentCaptor.forClass(UserEntity.class);
        verify(userRepository).save(savedUser.capture());
        assertEquals("Ada", savedUser.getValue().firstName());
        assertEquals("Lovelace", savedUser.getValue().lastName());
        assertEquals("Ada", response.user().firstName());
        assertEquals("Lovelace", response.user().lastName());
        verify(activityEventService).record(ActivityEventType.SIGNUP, "User signed up", request.email());
    }

    @Test
    @DisplayName("SCRUM-97 - duplicate registration does not create an account")
    void register_rejectsDuplicateEmail_withoutRecordingSignup() {
        AuthService authService = new AuthService(userRepository, userMapper, jwtService, passwordEncoder, tokenBlocklistService, activityEventService);
        RegisterRequest request = new RegisterRequest("existing@example.com", "password123");
        when(userRepository.existsByEmail(request.email())).thenReturn(true);

        assertThrows(ApiException.class, () -> authService.register(request));

        verify(activityEventService, never()).record(any(ActivityEventType.class), anyString(), anyString());
    }

    @Test
    @DisplayName("SCRUM-97 - profile lookup returns the user's saved first and last names")
    void getMe_mapsSavedNamesToProfileResponse() {
        UUID userId = UUID.fromString("81818181-8181-8181-8181-818181818181");
        Instant now = Instant.parse("2026-05-01T10:15:30Z");
        UserEntity user = new UserEntity(userId, "ada@example.com", "Ada", "Lovelace", "hash",
                com.websitebuilder.platform.users.entity.UserRole.USER,
                com.websitebuilder.platform.users.entity.UserStatus.ACTIVE, now, now);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userMapper.toUserDetail(user)).thenAnswer(invocation ->
                new com.websitebuilder.platform.users.mapper.UserMapper().toUserDetail(invocation.getArgument(0)));

        var profile = new AuthService(userRepository, userMapper, jwtService, passwordEncoder,
                tokenBlocklistService, activityEventService).getMe(userId);

        assertEquals("Ada", profile.firstName());
        assertEquals("Lovelace", profile.lastName());
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
