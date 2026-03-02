package hu.progmasters.dailybugle.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRatingInfo {


    private Long articleId;
    private String articleTitle;
    private Integer value;

}
