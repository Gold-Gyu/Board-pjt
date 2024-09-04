package com.practice.backend.controller;

import com.practice.backend.dto.AddUserRequest;
import com.practice.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class UserApiController {
    private final UserService userService;

    @PostMapping("/api/articles/user")
    public ResponseEntity<String> signup(@RequestBody AddUserRequest request) {
        Long userId = userService.save(request);

        // HTTP 200 OK와 함께 성공 메시지를 반환합니다.
        return ResponseEntity.ok("User created successfully with ID: " + userId);
    }
}
