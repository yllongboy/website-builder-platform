package com.websitebuilder.platform.admin.settings.controller;

import com.websitebuilder.platform.admin.settings.dto.AdminSettingsResponse;
import com.websitebuilder.platform.admin.settings.dto.UpdateAdminSettingsRequest;
import com.websitebuilder.platform.admin.settings.service.AdminSettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/settings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminSettingsController {

    private final AdminSettingsService adminSettingsService;

    @GetMapping
    public AdminSettingsResponse getSettings() {
        return adminSettingsService.getSettings();
    }

    @PatchMapping
    public AdminSettingsResponse updateSettings(@RequestBody @Valid UpdateAdminSettingsRequest request) {
        return adminSettingsService.updateSettings(request);
    }
}
