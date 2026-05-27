package com.websitebuilder.platform.auth.controller;

import com.websitebuilder.platform.auth.dto.AuthResponse;
import com.websitebuilder.platform.auth.dto.LoginRequest;
import com.websitebuilder.platform.auth.dto.RegisterRequest;
import com.websitebuilder.platform.auth.service.AuthService;
import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.security.jwt.TokenBlocklistService;
import com.websitebuilder.platform.users.dto.UserDetail;
import com.websitebuilder.platform.users.entity.UserEntity;
import java.time.Instant;
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
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final TokenBlocklistService tokenBlocklistService;

    public AuthController(
            AuthService authService,
            JwtService jwtService,
            TokenBlocklistService tokenBlocklistService
    ) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.tokenBlocklistService = tokenBlocklistService;
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
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        String token = authorizationHeader.substring(7).trim();
        if (token.isBlank() || !jwtService.validateToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        String jti = jwtService.extractJti(token);
        Instant expiry = jwtService.extractExpiry(token);
        if (jti == null || expiry == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }

        tokenBlocklistService.revoke(jti, expiry);
        return ResponseEntity.ok(new SuccessResponse(true));
    }
}
