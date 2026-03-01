package hu.progmasters.dailybugle.dto.outgoing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDetail {

    private String author;
    private String content;
    private LocalDateTime createdAt;
}
