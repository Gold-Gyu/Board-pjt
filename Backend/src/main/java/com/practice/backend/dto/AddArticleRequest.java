package com.practice.backend.dto;

import com.practice.backend.entity.Article;
import com.practice.backend.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class AddArticleRequest {
    // 내용
    private String title;
    private String content;
    private Category category;
    private String author;
    private long authorId;
    private LocalDateTime publishDate;
    private int likeCount;
    private int commentCount;
    private int views;

    public Article toEntity() {
        return Article.builder()
                .title(title)
                .content(content)
                .author(author)
                .category(category)
                .authorId(authorId)
                .views(views)
                .likeCount(likeCount)
                .commentCount(commentCount)
                .publishDate(publishDate)
                .build();
    }
}
