package com.practice.backend.service;

import com.practice.backend.entity.Article;
import com.practice.backend.dto.AddArticleRequest;
import com.practice.backend.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor // Final이 붙거나 @Notnull이 붙은 필드의 생성자 추가
@Service // 빈으로 추가
public class BlogService {
    private final BlogRepository blogRepository;

    // 블로그 글 추가 메서드
    public Article save(AddArticleRequest request) {
        return blogRepository.save(request.toEntity());
    }

    // 블로그 글 조회
    public List<Article> findAll() {
        return blogRepository.findAll();
    }
}
