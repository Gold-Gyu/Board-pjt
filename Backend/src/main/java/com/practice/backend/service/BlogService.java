package com.practice.backend.service;

import com.practice.backend.dto.UpdateArticleRequest;
import com.practice.backend.entity.Article;
import com.practice.backend.dto.AddArticleRequest;
import com.practice.backend.repository.BlogRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor // Final이 붙거나 @Notnull이 붙은 필드의 생성자 추가
@Service // 빈으로 추가
public class BlogService {
    private final BlogRepository blogRepository;
    // 비즈니스 로직 구현
    //
    // 블로그 글 추가 메서드
    public Article save(AddArticleRequest request) {
        return blogRepository.save(request.toEntity());
    }

    // 블로그 글 전체 조회
    public List<Article> findAll() {
        return blogRepository.findAllByOrderByIdDesc();
    }

    // 블로그 글 상세조회
    public Article findById(Long id) {
        return blogRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Blog not found : " + id));
    }

    // 블로그 글 삭제
    public void delete(Long id) {
        blogRepository.deleteById(id);
    }

    // 블로그 글 수정
    @Transactional
    public Article update(Long id, UpdateArticleRequest request) {

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new EntityNotFoundException("Title cannot be blank");
        }

        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new EntityNotFoundException("Content cannot be blank");
        }
        Article article = blogRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Blog not found : " + id));
        article.update(request.getTitle(), request.getContent());

        return article;
    }
}
