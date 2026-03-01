package hu.progmasters.dailybugle.dto.incoming;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentCommand {

    @NotBlank(message = "Author cannot be blank")
    private String author;

    @NotNull(message = "Article id cannot be null")
    private Long articleId;

    @NotBlank(message = "Content cannot be blank")
    private String content;


}
