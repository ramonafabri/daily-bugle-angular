package hu.progmasters.dailybugle.dto.outgoing;

import hu.progmasters.dailybugle.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private Long id;
    private String email;
    private String displayName;
    private Role role;
    private List<UserRatingInfo> ratings = new ArrayList<>();
    private List<UserCommentInfo> comments = new ArrayList<>();
    private List<UserArticleInfo> writtenArticles = new ArrayList<>();

}
