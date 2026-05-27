package com.websitebuilder.platform.templates.controller;

import com.websitebuilder.platform.common.dto.SuccessResponse;
import com.websitebuilder.platform.templates.dto.AdminTemplateResponse;
import com.websitebuilder.platform.templates.dto.TemplateUpsertRequest;
import com.websitebuilder.platform.templates.service.TemplateService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/templates")
public class AdminTemplateController {

    private final TemplateService templateService;

    public AdminTemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public List<AdminTemplateResponse> listAdmin() {
        return templateService.listAdmin();
    }

    @PostMapping
    public AdminTemplateResponse create(@Valid @RequestBody TemplateUpsertRequest request) {
        return templateService.create(request);
    }

    @PutMapping("/{templateId}")
    public AdminTemplateResponse update(
            @PathVariable("templateId") UUID templateId,
            @Valid @RequestBody TemplateUpsertRequest request
    ) {
        return templateService.update(templateId, request);
    }

    @DeleteMapping("/{templateId}")
    public SuccessResponse delete(@PathVariable("templateId") UUID templateId) {
        return templateService.delete(templateId);
    }
}
