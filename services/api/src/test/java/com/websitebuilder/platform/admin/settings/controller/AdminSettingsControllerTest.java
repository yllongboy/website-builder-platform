package com.websitebuilder.platform.admin.settings.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.websitebuilder.platform.admin.settings.entity.PlatformSettingsEntity;
import com.websitebuilder.platform.admin.settings.repository.PlatformSettingsRepository;
import com.websitebuilder.platform.admin.settings.service.AdminSettingsService;
import com.websitebuilder.platform.common.exceptions.GlobalExceptionHandler;
import com.websitebuilder.platform.security.config.SecurityConfig;
import com.websitebuilder.platform.security.filters.JwtAuthenticationFilter;
import java.lang.reflect.Constructor;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AdminSettingsController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import({AdminSettingsService.class, GlobalExceptionHandler.class, SecurityConfig.class})
class AdminSettingsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PlatformSettingsRepository platformSettingsRepository;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private PlatformSettingsEntity persistedSettings;

    @BeforeEach
    void setUp() throws Exception {
        persistedSettings = defaultSettings();
        when(platformSettingsRepository.findById((short) 1)).thenAnswer(invocation -> Optional.of(persistedSettings));
        when(platformSettingsRepository.save(any(PlatformSettingsEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @Test
    @DisplayName("SCRUM-107 - admin patch persists settings returned by a later get")
    @WithMockUser(roles = "ADMIN")
    void patchSettings_persistsUpdatesAndGetReturnsThem() throws Exception {
        mockMvc.perform(patch("/admin/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"siteName":"Launchpad","supportEmail":"help@launchpad.test",
                                 "notifications":{"weeklyReport":false},
                                 "security":{"sessionTimeout":90}}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.siteName").value("Launchpad"))
                .andExpect(jsonPath("$.supportEmail").value("help@launchpad.test"))
                .andExpect(jsonPath("$.notifications.weeklyReport").value(false))
                .andExpect(jsonPath("$.security.sessionTimeout").value(90));

        verify(platformSettingsRepository).save(persistedSettings);

        mockMvc.perform(get("/admin/settings"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.siteName").value("Launchpad"))
                .andExpect(jsonPath("$.siteDescription").value("A platform for websites"))
                .andExpect(jsonPath("$.supportEmail").value("help@launchpad.test"))
                .andExpect(jsonPath("$.notifications.emailNotifications").value(true))
                .andExpect(jsonPath("$.notifications.weeklyReport").value(false))
                .andExpect(jsonPath("$.security.sessionTimeout").value(90))
                .andExpect(jsonPath("$.security.passwordMinLength").value(12));
    }

    @Test
    @DisplayName("SCRUM-107 - partial patch preserves omitted setting fields")
    @WithMockUser(roles = "ADMIN")
    void patchSettings_withPartialUpdatePreservesOmittedFields() throws Exception {
        mockMvc.perform(patch("/admin/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"security\":{\"sessionTimeout\":45}}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.siteName").value("SiteBuilder"))
                .andExpect(jsonPath("$.notifications.emailNotifications").value(true))
                .andExpect(jsonPath("$.security.twoFactorRequired").value(false))
                .andExpect(jsonPath("$.security.passwordMinLength").value(12))
                .andExpect(jsonPath("$.security.sessionTimeout").value(45));

        verify(platformSettingsRepository).save(persistedSettings);
    }

    @Test
    @DisplayName("SCRUM-107 - empty patch is rejected without a database write")
    @WithMockUser(roles = "ADMIN")
    void patchSettings_withEmptyPatchReturnsBadRequest() throws Exception {
        mockMvc.perform(patch("/admin/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(platformSettingsRepository);
    }

    @Test
    @DisplayName("SCRUM-107 - invalid patch values are rejected without a database write")
    @WithMockUser(roles = "ADMIN")
    void patchSettings_withInvalidValuesReturnsBadRequest() throws Exception {
        mockMvc.perform(patch("/admin/settings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"supportEmail\":\"not-an-email\",\"security\":{\"sessionTimeout\":0}}"))
                .andExpect(status().isBadRequest());

        verifyNoInteractions(platformSettingsRepository);
    }

    @Test
    @DisplayName("SCRUM-107 - non-admin cannot read platform settings")
    @WithMockUser(roles = "USER")
    void getSettings_nonAdminIsForbidden() throws Exception {
        mockMvc.perform(get("/admin/settings"))
                .andExpect(status().isForbidden());

        verifyNoInteractions(platformSettingsRepository);
    }

    private static PlatformSettingsEntity defaultSettings() throws Exception {
        Constructor<PlatformSettingsEntity> constructor = PlatformSettingsEntity.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        PlatformSettingsEntity settings = constructor.newInstance();
        settings.setSiteName("SiteBuilder");
        settings.setSiteDescription("A platform for websites");
        settings.setSupportEmail("support@sitebuilder.test");
        settings.setEmailNotifications(true);
        settings.setNewUserNotifications(true);
        settings.setPaymentNotifications(false);
        settings.setWeeklyReport(true);
        settings.setTwoFactorRequired(false);
        settings.setSessionTimeout(24);
        settings.setPasswordMinLength(12);
        return settings;
    }
}
