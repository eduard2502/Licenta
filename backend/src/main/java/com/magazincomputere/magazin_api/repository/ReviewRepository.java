// backend/src/main/java/com/magazincomputere/magazin_api/repository/ReviewRepository.java
package com.magazincomputere.magazin_api.repository;

import com.magazincomputere.magazin_api.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findByProductIdOrderByCreatedAtDesc(Long productId, Pageable pageable);
    
    Optional<Review> findByProductIdAndUserId(Long productId, Long userId);
    
    boolean existsByProductIdAndUserId(Long productId, Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.id = :productId")
    Double calculateAverageRatingByProductId(@Param("productId") Long productId);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.product.id = :productId")
    Integer countByProductId(@Param("productId") Long productId);
    
    @Query("SELECT r.rating, COUNT(r) FROM Review r WHERE r.product.id = :productId GROUP BY r.rating")
    List<Object[]> getRatingDistributionByProductId(@Param("productId") Long productId);

    List<Review> findByUserId(Long userId);
}