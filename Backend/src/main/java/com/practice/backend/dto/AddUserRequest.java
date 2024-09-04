package com.practice.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 추가
@AllArgsConstructor // 모든 필드를 받는 생성자 추가
public class AddUserRequest {
    private String nickName;
    private String email;
    private String password;
}
