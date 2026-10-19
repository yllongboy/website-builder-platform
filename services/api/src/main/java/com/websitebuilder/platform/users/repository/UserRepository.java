package com.websitebuilder.platform.users.repository;

import com.websitebuilder.platform.users.entity.UserEntity;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    long countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(Instant startInclusive, Instant endExclusive);
}
