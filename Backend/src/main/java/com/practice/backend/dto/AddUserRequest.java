package com.practice.backend.dto;

import lombok.*;

@Getter
@Setter

public class AddUserRequest {
    private String nickName;
    private String email;
    private String password;
    private int visitCount;
    private int articleCount;
    private int followerCount;
    private int followedCount;
}
