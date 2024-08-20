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

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="author", nullable = false)
    private long authorId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name="publishDate", nullable = false)
    private LocalDateTime publishDate;

    @Column(name="likeCount", nullable = true)
    private Integer likeCount = 0;

    @Column(name="commentCount", nullable = true)
    private Integer commentCount = 0;

    @Builder
    public Article(String title, String content, long authorId, Category category, LocalDateTime publishDate, int likeCount, int commentCount) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.authorId = authorId;
        this.publishDate = LocalDateTime.now();
        this.likeCount = likeCount;
        this.commentCount = commentCount;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
        this.publishDate = LocalDateTime.now();
    }

}
