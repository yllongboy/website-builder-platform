package com.websitebuilder.platform.websites.controller;

import com.websitebuilder.platform.websites.dto.AdminWebsiteResponse;
import com.websitebuilder.platform.websites.dto.AdminWebsiteStatusRequest;
import com.websitebuilder.platform.websites.service.WebsiteService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/websites")
@PreAuthorize("hasRole('ADMIN')")
public class AdminWebsiteController {

    private final WebsiteService websiteService;

    public AdminWebsiteController(WebsiteService websiteService) {
        this.websiteService = websiteService;
    }

    @GetMapping
    public List<AdminWebsiteResponse> listAll() {
        return websiteService.listAdmin();
    }

    @PatchMapping("/{websiteId}/status")
    public AdminWebsiteResponse updateStatus(
            @PathVariable UUID websiteId,
            @RequestBody @Valid AdminWebsiteStatusRequest request
    ) {
        return websiteService.adminUpdateStatus(websiteId, request.status());
    }
}
