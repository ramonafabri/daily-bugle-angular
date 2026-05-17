package hu.progmasters.dailybugle.dto.incoming;

import hu.progmasters.dailybugle.domain.Category;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class
ArticleCommand {


    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Synopsis cannot be blank")
    private String synopsis;

    @NotBlank(message = "Content cannot be blank")
    private String content;

    private Category category;

    private LocalDateTime publishAt;

    List<String> keywords;
}
