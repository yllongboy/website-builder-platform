package com.websitebuilder.platform.admin.billing.controller;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.admin.billing.dto.AdminSubscriptionPageResponse;
import com.websitebuilder.platform.admin.billing.service.AdminBillingService;
import com.websitebuilder.platform.common.exceptions.GlobalExceptionHandler;
import com.websitebuilder.platform.security.config.SecurityConfig;
import com.websitebuilder.platform.security.filters.JwtAuthenticationFilter;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AdminSubscriptionController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import({GlobalExceptionHandler.class, SecurityConfig.class})
class AdminSubscriptionControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private AdminBillingService adminBillingService;
    @MockBean private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    @DisplayName("SCRUM-105 - subscription endpoint rejects a non-admin user")
    @WithMockUser(roles = "USER")
    void subscriptions_forbiddenForNonAdmin() throws Exception {
        mockMvc.perform(get("/admin/subscriptions"))
                .andExpect(status().isForbidden());

        verifyNoInteractions(adminBillingService);
    }

    @Test
    @DisplayName("SCRUM-105 - admin can request a paged subscription response")
    @WithMockUser(roles = "ADMIN")
    void subscriptions_returnsRequestedPage() throws Exception {
        when(adminBillingService.getSubscriptions(0, 20))
                .thenReturn(new AdminSubscriptionPageResponse(List.of(), 0, 0, 20));

        mockMvc.perform(get("/admin/subscriptions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content").isEmpty())
                .andExpect(jsonPath("$.totalElements").value(0));

        verify(adminBillingService).getSubscriptions(0, 20);
    }
}
