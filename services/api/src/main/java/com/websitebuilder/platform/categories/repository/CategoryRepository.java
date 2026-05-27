package com.websitebuilder.platform.categories.repository;

import com.websitebuilder.platform.categories.entity.CategoryEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, UUID> {
    List<CategoryEntity> findAllByIsActiveTrueOrderBySortOrderAsc();
    Optional<CategoryEntity> findBySlug(String slug);
}
