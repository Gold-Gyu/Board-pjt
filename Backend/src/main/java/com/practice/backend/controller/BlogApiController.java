package com.practice.backend.controller;

import com.practice.backend.dto.ArticleFindAllResponse;
import com.practice.backend.entity.Article;
import com.practice.backend.dto.AddArticleRequest;
import com.practice.backend.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class BlogApiController {
    private final BlogService blogService;

    @PostMapping("/api/articles")
    // 요청 본문 값 매칭
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request) {
        Article savedArticle = blogService.save(request);
        System.out.println(savedArticle.getCategory());
        // 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답 객체에 담아 전송
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    @GetMapping("/api/articles")
    // 게시글 조회
    public ResponseEntity<List<ArticleFindAllResponse>> getAllArticles() {
        List<ArticleFindAllResponse> articles = blogService.findAll()
                .stream()
                .map(ArticleFindAllResponse::new)
                .toList();
        return ResponseEntity.ok().body(articles);
    }
}
