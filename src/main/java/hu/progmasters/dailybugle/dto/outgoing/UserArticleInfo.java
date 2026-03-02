package hu.progmasters.dailybugle.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserArticleInfo {

    private Long articleId;
    private String title;

}
