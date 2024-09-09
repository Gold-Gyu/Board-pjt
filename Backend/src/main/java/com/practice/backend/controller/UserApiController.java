package com.practice.backend.controller;

import com.practice.backend.dto.AddUserRequest;
import com.practice.backend.entity.User;
import com.practice.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserApiController {
    private final UserService userService;


    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuth() {
        // 현재 인증 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증된 사용자가 있는지 확인
        if (authentication != null && authentication.isAuthenticated()) {
            return ResponseEntity.ok("Authenticated");  // 인증 성공 시
        } else {
            return ResponseEntity.status(401).body("Unauthorized");  // 인증되지 않은 경우
        }
    }

    @GetMapping("/user-info")
    public ResponseEntity<AddUserRequest> getUserInfo() {
        // 현재 인증된 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // UserDetails를 통해 현재 로그인된 사용자 정보 반환
        if (authentication != null && authentication.isAuthenticated()) {
            User userDetails = (User) authentication.getPrincipal(); // Principal을 User로 캐스팅

            // 유저 정보를 DTO로 변환
            AddUserRequest userInfoResponse = new AddUserRequest();
            userInfoResponse.setNickName(userDetails.getNickName());
            userInfoResponse.setEmail(userDetails.getEmail());
            userInfoResponse.setVisitCount(userDetails.getVisitCount());
            userInfoResponse.setArticleCount(userDetails.getArticleCount());
            userInfoResponse.setFollowerCount(userDetails.getFollowerCount());
            userInfoResponse.setFollowedCount(userDetails.getFollowedCount());

            // 유저 정보를 JSON 형태로 반환
            return ResponseEntity.ok(userInfoResponse);
        } else {
            // 인증되지 않은 경우 401 Unauthorized 반환
            return ResponseEntity.status(401).body(null);
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AddUserRequest request) {
        Long userId = userService.save(request);
        System.out.println(ResponseEntity.ok("User created successfully with ID: " + userId));
        // HTTP 200 OK와 함께 성공 메시지를 반환합니다.
        return ResponseEntity.ok("User created successfully with ID: " + userId);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("logout successful");
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        System.out.println("logout successful");
        return ResponseEntity.ok("User logout successfully with ID");
    }
}
