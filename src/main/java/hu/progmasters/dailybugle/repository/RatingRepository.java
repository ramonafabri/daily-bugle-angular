package hu.progmasters.dailybugle.repository;

import hu.progmasters.dailybugle.domain.Comment;
import hu.progmasters.dailybugle.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    boolean existsByArticle_IdAndUser_Id(Long articleId, Long userId);
    List<Rating> findByUser_Id(Long userId);

}
