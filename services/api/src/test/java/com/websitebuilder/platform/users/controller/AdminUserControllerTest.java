package com.websitebuilder.platform.users.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.common.exceptions.ApiException;
import com.websitebuilder.platform.common.exceptions.GlobalExceptionHandler;
import com.websitebuilder.platform.security.filters.JwtAuthenticationFilter;
import com.websitebuilder.platform.users.dto.UserStatus;
import com.websitebuilder.platform.users.service.AdminUserService;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AdminUserController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import(GlobalExceptionHandler.class)
class AdminUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminUserService adminUserService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    void patchStatus_withDeletedStatus_returnsBadRequest() throws Exception {
        UUID userId = UUID.fromString("90909090-9090-9090-9090-909090909090");

        when(adminUserService.updateStatus(userId, UserStatus.DELETED))
                .thenThrow(new ApiException("USER_STATUS_INVALID", "Only ACTIVE or SUSPENDED status can be set by admins"));

        mockMvc.perform(
                        patch("/admin/users/{userId}/status", userId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"status\":\"DELETED\"}")
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("USER_STATUS_INVALID"));
    }
}
