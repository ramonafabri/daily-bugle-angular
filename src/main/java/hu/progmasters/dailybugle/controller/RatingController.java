package hu.progmasters.dailybugle.controller;


import hu.progmasters.dailybugle.dto.incoming.CommentCommand;
import hu.progmasters.dailybugle.dto.incoming.RatingCommand;
import hu.progmasters.dailybugle.service.RatingService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/ratings")
@Slf4j
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<Void> createRating(@Valid @RequestBody RatingCommand ratingCommand) {
        log.info("Create rating: {}", ratingCommand);
        ratingService.createRating(ratingCommand);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
