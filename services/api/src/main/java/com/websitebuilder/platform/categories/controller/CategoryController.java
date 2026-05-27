package com.websitebuilder.platform.categories.controller;

import com.websitebuilder.platform.categories.dto.CategoryResponse;
import com.websitebuilder.platform.categories.service.CategoryService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryResponse> listPublic() {
        return categoryService.listPublic();
    }
}
