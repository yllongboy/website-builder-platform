package com.websitebuilder.platform.users.controller;

import com.websitebuilder.platform.users.dto.AdminUserResponse;
import com.websitebuilder.platform.users.dto.UserRole;
import com.websitebuilder.platform.users.dto.UserStatus;
import com.websitebuilder.platform.users.dto.UpdateUserStatusRequest;
import com.websitebuilder.platform.users.service.AdminUserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@Validated
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public List<AdminUserResponse> listAll(
            @RequestParam(required = false) @Size(max = 254) String email,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) UserRole role
    ) {
        return adminUserService.listAll(email, status, role);
    }

    @GetMapping("/{userId}")
    public AdminUserResponse getById(@PathVariable UUID userId) {
        return adminUserService.getById(userId);
    }

    @PatchMapping("/{userId}/status")
    public AdminUserResponse updateStatus(
            @PathVariable UUID userId,
            @RequestBody @Valid UpdateUserStatusRequest request
    ) {
        return adminUserService.updateStatus(userId, request.status());
    }
}