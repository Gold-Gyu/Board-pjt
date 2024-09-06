package com.practice.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED) // what is function do?
@Getter
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private long userId;

    @Column(name ="nickName")
    private String nickName;

    @Column(name= "password")
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name="visit_count")
    private int visitCount;

    @Column(name="article_count")
    private int articleCount;

    @Column(name="follower_count")
    private int followerCount;

    @Column(name="followed_count")
    private int followedCount;

    @Builder
    public User(String email, String password, String nickName) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
    }

    // 권한을 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    // 사용자의 id를 반환(고유값)
    @Override
    public String getUsername() {
        return email;
    }

    // 사용자의 패스워드를 반환
    @Override
    public String getPassword() {
        return password;
    }
    // 계정만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    // 계정 잠금여부 반환
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    //패스워드의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //계정사용 가능 여부 반환
    @Override
    public boolean isEnabled() {

    // 계정이 사용 가능한지 확인로직
        return true;
    }

}