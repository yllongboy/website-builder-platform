package com.websitebuilder.platform.templates.repository;

import com.websitebuilder.platform.templates.entity.TemplateEntity;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TemplateRepository extends JpaRepository<TemplateEntity, UUID> {
    @Query("""
        SELECT t FROM TemplateEntity t
        JOIN t.category c
        WHERE t.isActive = true
                    AND (CAST(:categorySlug AS string) IS NULL OR c.slug = :categorySlug)
                    AND (CAST(:search AS string) IS NULL OR LOWER(t.name) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%'))
                               OR LOWER(t.description) LIKE LOWER(CONCAT('%', CAST(:search AS string), '%')))
        """)
    List<TemplateEntity> findPublicFiltered(@Param("categorySlug") String categorySlug,
                                            @Param("search") String search);

    Optional<TemplateEntity> findByIdAndIsActiveTrue(UUID id);
    Optional<TemplateEntity> findBySlug(String slug);
    List<TemplateEntity> findByIsActiveTrue();
    boolean existsByIsActiveTrueAndCategoryId(UUID categoryId);
}
