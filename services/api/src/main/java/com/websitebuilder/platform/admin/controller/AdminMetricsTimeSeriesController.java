package com.websitebuilder.platform.admin.controller;

import com.websitebuilder.platform.admin.dto.AdminMetricsTimeSeriesBucket;
import com.websitebuilder.platform.admin.service.AdminMetricsTimeSeriesService;
import com.websitebuilder.platform.common.exceptions.ApiException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/metrics")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminMetricsTimeSeriesController {

    private final AdminMetricsTimeSeriesService adminMetricsTimeSeriesService;

    @GetMapping("/timeseries")
    public List<AdminMetricsTimeSeriesBucket> getTimeSeries(@RequestParam(required = true) String period) {
        if (!"6m".equals(period)) {
            throw new ApiException("ADMIN_METRICS_PERIOD_INVALID", "Unsupported metrics period. Supported value: 6m");
        }
        return adminMetricsTimeSeriesService.getSixMonthSeries();
    }
}
