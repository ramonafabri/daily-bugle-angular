package hu.progmasters.dailybugle.service;


import hu.progmasters.dailybugle.domain.Article;
import hu.progmasters.dailybugle.domain.Rating;
import hu.progmasters.dailybugle.dto.incoming.RatingCommand;
import hu.progmasters.dailybugle.repository.RatingRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class RatingService {

    private final RatingRepository ratingRepository;

    private  final ArticleService articleService;

    private final ModelMapper modelMapper;

    public RatingService(RatingRepository ratingRepository, ArticleService articleService, ModelMapper modelMapper) {
        this.ratingRepository = ratingRepository;
        this.articleService = articleService;
        this.modelMapper = modelMapper;
    }


    public void createRating(RatingCommand ratingCommand) {
        Article article = articleService.findArticleById(ratingCommand.getArticleId());

        Rating rating = new Rating();
        rating.setValue(ratingCommand.getValue());
        rating.setArticle(article);
        article.getRatings().add(rating);

        ratingRepository.save(rating);

    }



}
