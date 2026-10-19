package com.websitebuilder.platform.auth.controller;

import com.websitebuilder.platform.auth.dto.AuthResponse;
import com.websitebuilder.platform.auth.dto.LoginRequest;
import com.websitebuilder.platform.auth.dto.RegisterRequest;
import com.websitebuilder.platform.auth.service.AuthService;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.users.dto.UserDetail;
import com.websitebuilder.platform.users.entity.UserEntity;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public UserDetail me(Authentication authentication) {
        if (!(authentication.getPrincipal() instanceof UserEntity userEntity)) {
            throw new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session");
        }
        return authService.getMe(userEntity.id());
    }

    @PostMapping("/logout")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<SuccessResponse> logout(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader
    ) {
        authService.logout(authorizationHeader);
        return ResponseEntity.ok(new SuccessResponse(true));
    }
}
