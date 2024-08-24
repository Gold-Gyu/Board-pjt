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
    private String author;
    private Category category;
    private long authorId;
    private String publishDate;
    private int likeCount;
    private int commentCount;
    private int views;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    public ArticleFindAllResponse(Article article) {
        this.BoardId = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.author = article.getAuthor();
        this.category = article.getCategory();
        this.authorId = article.getAuthorId();
        this.views = article.getViews();
        this.likeCount = article.getLikeCount();
        this.commentCount = article.getCommentCount();
        this.publishDate = article.getPublishDate().format(formatter);
    }
}
