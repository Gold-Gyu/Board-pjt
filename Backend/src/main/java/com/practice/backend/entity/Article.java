package com.practice.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.practice.backend.enums.Category;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long Id;

    @Enumerated(EnumType.STRING)
    @Column(name="category", nullable = false)
    private Category category;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name="authorId", nullable = false)
    private long authorId;

    @Column(name="author", nullable = false)
    private String author;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name="publishDate", nullable = false)
    private LocalDateTime publishDate;

    @Column(name="likeCount", nullable = true)
    private Integer likeCount = 0;

    @Column(name="commentCount", nullable = true)
    private Integer commentCount = 0;

    @Column(name="views", nullable = true)
    private Integer views = 0;

    @Builder
    public Article(String title, String content, String author, long authorId, Category category, int views, LocalDateTime publishDate, int likeCount, int commentCount) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.authorId = authorId;
        this.publishDate = LocalDateTime.now();
        this.views = views;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
        this.publishDate = LocalDateTime.now();
    }

}
