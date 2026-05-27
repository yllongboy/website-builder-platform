package com.websitebuilder.platform.templates.controller;

import com.websitebuilder.platform.templates.dto.TemplateDetail;
import com.websitebuilder.platform.templates.dto.TemplateSummary;
import com.websitebuilder.platform.templates.service.TemplateService;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/templates")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public List<TemplateSummary> listPublic(
            @RequestParam(name = "categorySlug", required = false) String categorySlug,
            @RequestParam(name = "search", required = false) String search
    ) {
        return templateService.listPublic(categorySlug, search);
    }

    @GetMapping("/{templateId}")
    public TemplateDetail getPublicDetail(@PathVariable("templateId") UUID templateId) {
        return templateService.getPublicDetail(templateId);
    }
}
