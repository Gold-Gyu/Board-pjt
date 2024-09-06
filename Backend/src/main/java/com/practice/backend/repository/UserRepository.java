package com.practice.backend.repository;

import com.practice.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email); // email로 정보를 가져옴
}
