package com.websitebuilder.platform.auth.controller;

import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.auth.service.AuthService;
import com.websitebuilder.platform.common.exceptions.GlobalExceptionHandler;
import com.websitebuilder.platform.security.jwt.JwtService;
import com.websitebuilder.platform.security.jwt.TokenBlocklistService;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private TokenBlocklistService tokenBlocklistService;

    @Test
    void logout_withValidToken_returnsOk() throws Exception {
        Instant expiry = Instant.parse("2030-01-01T00:00:00Z");
        when(jwtService.validateToken("valid-token")).thenReturn(true);
        when(jwtService.extractJti("valid-token")).thenReturn("jti-1");
        when(jwtService.extractExpiry("valid-token")).thenReturn(expiry);

        mockMvc.perform(post("/auth/logout")
                        .header("Authorization", "Bearer valid-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        verify(tokenBlocklistService).revoke("jti-1", expiry);
    }

    @Test
    void logout_withMissingAuthorizationHeader_returnsUnauthorized() throws Exception {
        mockMvc.perform(post("/auth/logout"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(authService);
        verifyNoInteractions(jwtService, tokenBlocklistService);
    }
}
