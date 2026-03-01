package hu.progmasters.dailybugle.service;


import hu.progmasters.dailybugle.domain.Article;
import hu.progmasters.dailybugle.domain.Comment;
import hu.progmasters.dailybugle.dto.incoming.CommentCommand;
import hu.progmasters.dailybugle.exception.ArticleNotFoundException;
import hu.progmasters.dailybugle.repository.ArticleRepository;
import hu.progmasters.dailybugle.repository.CommentRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleService articleService ;

    private final ModelMapper modelMapper;

    @Autowired
    public CommentService(CommentRepository commentRepository, ArticleRepository articleRepository, ArticleService articleService, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.articleService = articleService;
        this.modelMapper = modelMapper;
    }

    public void createComment(CommentCommand commentCommand) {
        Article article = articleService.findArticleById(commentCommand.getArticleId());

        Comment comment = new Comment();
        comment.setAuthor(commentCommand.getAuthor());
        comment.setContent(commentCommand.getContent());
        comment.setArticle(article);
        article.getComments().add(comment);

        commentRepository.save(comment);

    }



}
