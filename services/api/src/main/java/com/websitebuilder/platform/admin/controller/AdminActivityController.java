package com.websitebuilder.platform.admin.controller;

import com.websitebuilder.platform.admin.dto.AdminActivityRecord;
import com.websitebuilder.platform.admin.service.AdminActivityService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminActivityController {

    private final AdminActivityService adminActivityService;

    @GetMapping("/activity")
    public List<AdminActivityRecord> getRecentActivity() {
        return adminActivityService.getRecentActivity();
    }
}
