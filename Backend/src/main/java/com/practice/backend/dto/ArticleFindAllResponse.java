package com.practice.backend.dto;

import com.practice.backend.entity.Article;
import com.practice.backend.enums.Category;
import lombok.Getter;

@Getter
public class ArticleFindAllResponse {
    private String title;
    private String content;
    private Category category;
    private String author;
    //    private Date publishDate;
    private int likeCount;
    private int commentCount;


    public ArticleFindAllResponse(Article article) {
        this.title = article.getTitle();
        this.content = article.getContent();
        this.category = article.getCategory();
        this.author = article.getAuthor();
        this.likeCount = article.getLikeCount();
        this.commentCount = article.getCommentCount();
    }
}
