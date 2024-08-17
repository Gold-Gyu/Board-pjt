package com.practice.backend.entity;

import com.practice.backend.enums.Category;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class Article {
    @Id

    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name="category", nullable = false)
    private Category category;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="author", nullable = false)
    private String author;

//    @Column(name="publishDate", nullable = false)
//    private Date publishDate;

    @Column(name="likeCount", nullable = true)
    private Integer likeCount = 0;

    @Column(name="commentCount", nullable = true)
    private Integer commentCount = 0;

    @Builder
    public Article(String title, String content, String author, Category category, Date publishDate, int likeCount, int commentCount) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
//        this.publishDate = new Date();
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

}
