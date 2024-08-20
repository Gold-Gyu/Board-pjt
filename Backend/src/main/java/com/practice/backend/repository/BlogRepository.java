package com.practice.backend.repository;

import com.practice.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Article, Long> {
    // boardId 기준 내림차순으로 모든 게시글 조회
    List<Article> findAllByOrderByIdDesc();

}
