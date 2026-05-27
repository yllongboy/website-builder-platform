package com.websitebuilder.platform.categories.controller;

import com.websitebuilder.platform.categories.dto.AdminCategoryResponse;
import com.websitebuilder.platform.categories.dto.CategoryUpsertRequest;
import com.websitebuilder.platform.categories.service.CategoryService;
import com.websitebuilder.platform.common.dto.SuccessResponse;
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
@RequestMapping("/admin/categories")
public class AdminCategoryController {

    private final CategoryService categoryService;

    public AdminCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<AdminCategoryResponse> listAdmin() {
        return categoryService.listAdmin();
    }

    @PostMapping
    public AdminCategoryResponse create(@Valid @RequestBody CategoryUpsertRequest request) {
        return categoryService.create(request);
    }

    @PutMapping("/{categoryId}")
    public AdminCategoryResponse update(
            @PathVariable("categoryId") UUID categoryId,
            @Valid @RequestBody CategoryUpsertRequest request
    ) {
        return categoryService.update(categoryId, request);
    }

    @DeleteMapping("/{categoryId}")
    public SuccessResponse delete(@PathVariable("categoryId") UUID categoryId) {
        return categoryService.delete(categoryId);
    }
}
