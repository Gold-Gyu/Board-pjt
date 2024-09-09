package com.practice.backend.service;

import com.practice.backend.entity.User;
import com.practice.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Received email: " + email);

        if (email == null || email.isEmpty()) {
            throw new UsernameNotFoundException("이메일이 비어있습니다.");
        }

        // 사용자를 DB에서 가져옴
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + " 해당 메일을 찾을 수 없습니다."));

        // visitCount 증가 로직을 여기서 처리
        user.setVisitCount(user.getVisitCount() + 1);
        userRepository.save(user);  // 변경된 visitCount 저장

        return user;
    }
}

