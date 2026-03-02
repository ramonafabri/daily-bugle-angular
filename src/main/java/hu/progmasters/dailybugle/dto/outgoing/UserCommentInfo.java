package hu.progmasters.dailybugle.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCommentInfo {

    private Long articleId;
    private String articleTitle;
    private Long commentCount;

}
