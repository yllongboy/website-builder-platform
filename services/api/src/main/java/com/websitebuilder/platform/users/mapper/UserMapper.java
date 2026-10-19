package com.websitebuilder.platform.users.mapper;

import com.websitebuilder.platform.users.dto.UserDetail;
import com.websitebuilder.platform.users.dto.UserRole;
import com.websitebuilder.platform.users.dto.UserStatus;
import com.websitebuilder.platform.users.dto.UserSummary;
import com.websitebuilder.platform.users.entity.UserEntity;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserSummary toUserSummary(UserEntity entity) {
        return new UserSummary(
            entity.id(),
            entity.email(),
            UserRole.valueOf(entity.role().name()),
            entity.firstName(),
            entity.lastName()
        );
    }

    public UserDetail toUserDetail(UserEntity entity) {
        return new UserDetail(
            entity.id(),
            entity.email(),
            UserRole.valueOf(entity.role().name()),
            UserStatus.valueOf(entity.status().name()),
            entity.firstName(),
            entity.lastName()
        );
    }
}
