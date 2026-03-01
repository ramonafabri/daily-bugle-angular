package hu.progmasters.dailybugle.repository;

import hu.progmasters.dailybugle.domain.Comment;
import hu.progmasters.dailybugle.domain.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
}
