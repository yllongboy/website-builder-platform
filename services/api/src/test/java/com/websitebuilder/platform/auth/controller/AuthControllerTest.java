package com.websitebuilder.platform.auth.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.auth.service.AuthService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.common.exceptions.GlobalExceptionHandler;
import com.websitebuilder.platform.security.filters.JwtAuthenticationFilter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
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
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    @DisplayName("SCRUM-127 - logout delegates the bearer authorization header to AuthService")
    void logout_withValidToken_returnsOk() throws Exception {
        mockMvc.perform(post("/auth/logout")
                        .header("Authorization", "Bearer valid-token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        verify(authService).logout("Bearer valid-token");
    }

    @Test
    @DisplayName("SCRUM-127 - logout delegates a missing authorization header and returns unauthorized")
    void logout_withMissingAuthorizationHeader_returnsUnauthorized() throws Exception {
        doThrow(new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session"))
                .when(authService).logout(null);

        mockMvc.perform(post("/auth/logout"))
                .andExpect(status().isUnauthorized());

        verify(authService).logout(null);
    }

    @Test
    @DisplayName("SCRUM-127 - logout rejects an invalid authorization header")
    void logout_withInvalidAuthorizationHeader_returnsUnauthorized() throws Exception {
        doThrow(new ApiException("AUTH_INVALID_CREDENTIALS", "Invalid session"))
                .when(authService).logout("Bearer invalid-token");

        mockMvc.perform(post("/auth/logout")
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isUnauthorized());

        verify(authService).logout("Bearer invalid-token");
    }
}
