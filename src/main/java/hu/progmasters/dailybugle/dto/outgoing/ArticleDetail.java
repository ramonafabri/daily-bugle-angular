package hu.progmasters.dailybugle.dto.outgoing;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDetail {

    private Long id;
    private String author;
    private String title;
    private String synopsis;
    private String content;
    private LocalDateTime createdAt;
    private List<CommentDetail> comments;
    private BigDecimal averageRating;
    private long ratingCount;

}
