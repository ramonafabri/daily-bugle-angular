package hu.progmasters.dailybugle.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticlesListItem {

    private Long id;

    private String author;

    private String title;

    private String synopsis;

    private Long commentCount;

    private BigDecimal averageRating;

    private long ratingCount;

}
