package com.practice.backend.controller;

import com.practice.backend.dto.ArticleFindAllResponse;
import com.practice.backend.dto.UpdateArticleRequest;
import com.practice.backend.entity.Article;
import com.practice.backend.dto.AddArticleRequest;
import com.practice.backend.service.BlogService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class BlogApiController {
    private final BlogService blogService;

    @PostMapping("/api/articles")
    // 요청 본문 값 매칭
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request) {
        Article savedArticle = blogService.save(request);
        // 요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답 객체에 담아 전송
        return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
    }

    @GetMapping("/api/articles")
    // 게시글 전체 조회
    public ResponseEntity<List<ArticleFindAllResponse>> getAllArticles() {
        List<ArticleFindAllResponse> articles = blogService.findAll()
                .stream()
                .map(ArticleFindAllResponse::new)
                .toList();
        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/api/articles/{id}")
    // 게시글 상세 조회
    public ResponseEntity<ArticleFindAllResponse> findArticleById(@PathVariable Long id) {
        Article article = blogService.findById(id);
        return ResponseEntity.ok().body(new ArticleFindAllResponse(article));
    }

    @DeleteMapping("/api/articles/{id}")
    // 게시글 삭제
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        blogService.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("status", id + "번 게시글이 삭제되었습니다.");
        return ResponseEntity.ok(response.toString());
    }
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    // 게시글 수정
    @PutMapping(("/api/articles/{id}"))
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody UpdateArticleRequest request) {
        Article updatedArticle = blogService.update(id, request);

        return ResponseEntity.ok().body(updatedArticle);
    }
}
