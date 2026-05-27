package com.websitebuilder.platform.users.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.entity.SubscriptionStatus;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.dto.AdminUserResponse;
import com.websitebuilder.platform.users.dto.UserStatus;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.entity.UserRole;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AdminUserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @Mock
    private WebsiteRepository websiteRepository;

    @Test
    void listAll_returnsUsersWithSubscriptionStatus() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UserEntity user = testUser(UUID.fromString("11111111-1111-1111-1111-111111111111"), com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);
        SubscriptionEntity olderSubscription = testSubscription(
                UUID.fromString("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                user,
                SubscriptionStatus.PAST_DUE,
            "STARTER",
                Instant.parse("2026-05-01T00:00:00Z")
        );
        SubscriptionEntity newerSubscription = testSubscription(
                UUID.fromString("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                user,
                SubscriptionStatus.ACTIVE,
            "PRO",
                Instant.parse("2026-05-02T00:00:00Z")
        );

        when(userRepository.findAll()).thenReturn(List.of(user));
        when(subscriptionRepository.findAll()).thenReturn(List.of(olderSubscription, newerSubscription));

        List<AdminUserResponse> result = service.listAll(null, null, null);

        assertEquals(1, result.size());
        assertEquals(SubscriptionStatus.ACTIVE, result.getFirst().subscriptionStatus());
        assertEquals("PRO", result.getFirst().planCode());
    }

    @Test
    void listAll_returnsNullSubscriptionFieldsWhenNoSubscription() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UserEntity user = testUser(UUID.fromString("22222222-2222-2222-2222-222222222222"), com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);

        when(userRepository.findAll()).thenReturn(List.of(user));
        when(subscriptionRepository.findAll()).thenReturn(List.of());

        List<AdminUserResponse> result = service.listAll(null, null, null);

        assertEquals(1, result.size());
        assertNull(result.getFirst().subscriptionStatus());
        assertNull(result.getFirst().planCode());
    }

    @Test
    void listAll_filtersByEmail_caseInsensitive() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UserEntity user1 = testUser(UUID.fromString("11111111-1111-1111-1111-111111111111"), com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);
        UserEntity user2 = testUser(UUID.fromString("22222222-2222-2222-2222-222222222222"), com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));
        when(subscriptionRepository.findAll()).thenReturn(List.of());

        // user1 email contains the id fragment, user2 has a different UUID
        // Search by part of user1's UUID in email
        List<AdminUserResponse> result = service.listAll("11111111", null, null);

        assertEquals(1, result.size());
        assertEquals(user1.id(), result.getFirst().id());
    }

    @Test
    void listAll_filtersByRole() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UserEntity user1 = testUser(UUID.fromString("33333333-3333-3333-3333-333333333333"), com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);

        when(userRepository.findAll()).thenReturn(List.of(user1));
        when(subscriptionRepository.findAll()).thenReturn(List.of());

        // testUser creates users with UserRole.USER
        List<AdminUserResponse> result = service.listAll(null, null, com.websitebuilder.platform.users.dto.UserRole.ADMIN);

        assertEquals(0, result.size());
    }

    @Test
    void getById_returnsUser_whenFound() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UUID userId = UUID.fromString("33333333-3333-3333-3333-333333333333");
        UserEntity user = testUser(userId, com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);
        SubscriptionEntity subscription = testSubscription(
                UUID.fromString("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                user,
                SubscriptionStatus.TRIALING,
            "STARTER",
                Instant.parse("2026-05-03T00:00:00Z")
        );

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)).thenReturn(Optional.of(subscription));

        AdminUserResponse result = service.getById(userId);

        assertEquals(userId, result.id());
        assertNotNull(result.subscriptionStatus());
    }

    @Test
    void getById_throwsNotFoundException_whenUserNotFound() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UUID userId = UUID.fromString("44444444-4444-4444-4444-444444444444");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class, () -> service.getById(userId));

        assertEquals("USER_NOT_FOUND", exception.code());
    }

    @Test
    void updateStatus_toSuspended_succeeds() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UUID userId = UUID.fromString("55555555-5555-5555-5555-555555555555");
        UserEntity user = testUser(userId, com.websitebuilder.platform.users.entity.UserStatus.ACTIVE);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)).thenReturn(Optional.empty());

        AdminUserResponse result = service.updateStatus(userId, UserStatus.SUSPENDED);

        assertEquals(UserStatus.SUSPENDED, result.status());
        verify(userRepository).save(user);
    }

    @Test
    void updateStatus_toActive_succeeds() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UUID userId = UUID.fromString("66666666-6666-6666-6666-666666666666");
        UserEntity user = testUser(userId, com.websitebuilder.platform.users.entity.UserStatus.SUSPENDED);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)).thenReturn(Optional.empty());

        AdminUserResponse result = service.updateStatus(userId, UserStatus.ACTIVE);

        assertEquals(UserStatus.ACTIVE, result.status());
        verify(userRepository).save(user);
    }

    @Test
    void updateStatus_rejectsDELETED_withBadRequest() {
        AdminUserService service = new AdminUserService(userRepository, subscriptionRepository, websiteRepository);
        UUID userId = UUID.fromString("77777777-7777-7777-7777-777777777777");

        ApiException exception = assertThrows(ApiException.class, () -> service.updateStatus(userId, UserStatus.DELETED));

        assertEquals("USER_STATUS_INVALID", exception.code());
        assertEquals("Only ACTIVE or SUSPENDED status transitions are permitted", exception.getMessage());
        verify(userRepository, never()).save(org.mockito.ArgumentMatchers.any());
    }

    private UserEntity testUser(UUID id, com.websitebuilder.platform.users.entity.UserStatus status) {
        Instant now = Instant.parse("2026-05-01T10:15:30Z");
        return new UserEntity(
                id,
                "admin-user-" + id + "@example.com",
                "password-hash",
                UserRole.USER,
                status,
                now,
                now
        );
    }

    private SubscriptionEntity testSubscription(
            UUID id,
            UserEntity user,
            SubscriptionStatus status,
            String planCode,
            Instant createdAt
    ) {
        return new SubscriptionEntity(
                id,
                user,
                "stripe",
                "cus_test",
                "sub_test",
                status,
                planCode,
                createdAt.plusSeconds(3600),
                false,
                createdAt,
                createdAt
        );
    }
}