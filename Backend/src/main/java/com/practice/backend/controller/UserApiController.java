package com.practice.backend.controller;

import com.practice.backend.dto.AddUserRequest;
import com.practice.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class UserApiController {
    private final UserService userService;

    @PostMapping("/api/articles/user")
    public ResponseEntity<String> signup(@RequestBody AddUserRequest request) {
        Long userId = userService.save(request);
        System.out.println(ResponseEntity.ok("User created successfully with ID: " + userId));
        // HTTP 200 OK와 함께 성공 메시지를 반환합니다.
        return ResponseEntity.ok("User created successfully with ID: " + userId);
    }

    @GetMapping("/api/articles/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("logout successful");
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        System.out.println("logout successful");
        return ResponseEntity.ok("User logout successfully with ID");
    }
}
