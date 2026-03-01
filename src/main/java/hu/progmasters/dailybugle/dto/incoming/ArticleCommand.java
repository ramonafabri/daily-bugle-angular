package hu.progmasters.dailybugle.dto.incoming;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleCommand {

    @NotBlank(message = "Athor cannot be blank")
    private String author;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Synopsis cannot be blank")
    private String synopsis;

    @NotBlank(message = "Content cannot be blank")
    private String content;



}
