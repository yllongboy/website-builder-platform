package com.websitebuilder.platform.users.service;

import com.websitebuilder.platform.billing.entity.SubscriptionEntity;
import com.websitebuilder.platform.billing.repository.SubscriptionRepository;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.dto.AdminUserResponse;
import com.websitebuilder.platform.users.dto.UserRole;
import com.websitebuilder.platform.users.dto.UserStatus;
import com.websitebuilder.platform.users.entity.UserEntity;
import com.websitebuilder.platform.users.repository.UserRepository;
import com.websitebuilder.platform.websites.repository.WebsiteRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminUserService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final WebsiteRepository websiteRepository;

    @Transactional(readOnly = true)
    public List<AdminUserResponse> listAll(String email, UserStatus status, UserRole role) {
        List<UserEntity> users = userRepository.findAll();

        Map<UUID, SubscriptionEntity> latestSubscriptionsByUserId = subscriptionRepository.findAll()
                .stream()
                .collect(Collectors.toMap(
                        subscription -> subscription.user().id(),
                        Function.identity(),
                        (left, right) -> isNewer(left, right) ? left : right
                ));

        Map<UUID, Long> websiteCountByUserId = websiteRepository.countGroupedByUserId()
                .stream()
                .collect(Collectors.toMap(
                        row -> (UUID) row[0],
                        row -> ((Number) row[1]).longValue()
                ));

        return users.stream()
                .filter(user -> email == null || email.isBlank() ||
                        user.email().toLowerCase(java.util.Locale.ROOT)
                                .contains(email.toLowerCase(java.util.Locale.ROOT)))
                .filter(user -> status == null || user.status().name().equals(status.name()))
                .filter(user -> role == null || user.role().name().equals(role.name()))
                .map(user -> toAdminUserResponse(
                        user,
                        latestSubscriptionsByUserId.get(user.id()),
                        websiteCountByUserId.getOrDefault(user.id(), 0L)
                ))
                .toList();
    }

    @Transactional(readOnly = true)
    public AdminUserResponse getById(UUID userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found"));

        SubscriptionEntity subscription = subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElse(null);

        return toAdminUserResponse(user, subscription, websiteRepository.countByUserId(userId));
    }

    @Transactional
    public AdminUserResponse updateStatus(UUID userId, UserStatus newStatus) {
        if (newStatus != UserStatus.ACTIVE && newStatus != UserStatus.SUSPENDED) {
            throw new ApiException("USER_STATUS_INVALID", "Only ACTIVE or SUSPENDED status transitions are permitted");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiException("USER_NOT_FOUND", "User not found"));

        user.updateStatus(com.websitebuilder.platform.users.entity.UserStatus.valueOf(newStatus.name()));
        userRepository.save(user);

        SubscriptionEntity subscription = subscriptionRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElse(null);

        return toAdminUserResponse(user, subscription, websiteRepository.countByUserId(userId));
    }

    private boolean isNewer(SubscriptionEntity left, SubscriptionEntity right) {
        return Comparator.nullsFirst(Comparator.<java.time.Instant>naturalOrder())
                .compare(left.createdAt(), right.createdAt()) >= 0;
    }

        private AdminUserResponse toAdminUserResponse(UserEntity user, SubscriptionEntity subscription, long websiteCount) {
        return new AdminUserResponse(
                user.id(),
                user.email(),
                UserRole.valueOf(user.role().name()),
                UserStatus.valueOf(user.status().name()),
                user.createdAt(),
                                websiteCount,
                subscription != null ? subscription.status() : null,
                subscription != null ? subscription.planCode() : null
        );
    }
}