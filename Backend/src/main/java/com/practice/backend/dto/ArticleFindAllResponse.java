package com.practice.backend.dto;

import com.practice.backend.entity.Article;
import com.practice.backend.enums.Category;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class ArticleFindAllResponse {
    private long BoardId;
    private String title;
    private String content;
    private Category category;
    private long author;
    private String publishDate;
    private int likeCount;
    private int commentCount;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    public ArticleFindAllResponse(Article article) {
        this.BoardId = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.category = article.getCategory();
        this.author = article.getAuthorId();
        this.likeCount = article.getLikeCount();
        this.commentCount = article.getCommentCount();
        this.publishDate = article.getPublishDate().format(formatter);
    }
}
