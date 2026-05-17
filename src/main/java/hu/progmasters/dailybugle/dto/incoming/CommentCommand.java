package hu.progmasters.dailybugle.dto.incoming;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentCommand {


    @NotBlank(message = "Content cannot be blank")
    private String content;


}
