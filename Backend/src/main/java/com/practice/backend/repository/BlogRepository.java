package com.practice.backend.repository;

import com.practice.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Article, Long> {


}
