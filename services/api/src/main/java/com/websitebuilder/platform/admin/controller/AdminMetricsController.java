package com.websitebuilder.platform.admin.controller;

import com.websitebuilder.platform.admin.dto.AdminMetricsResponse;
import com.websitebuilder.platform.admin.service.AdminMetricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminMetricsController {

    private final AdminMetricsService adminMetricsService;

    @GetMapping("/metrics")
    public AdminMetricsResponse getMetrics() {
        return adminMetricsService.getMetrics();
    }
}