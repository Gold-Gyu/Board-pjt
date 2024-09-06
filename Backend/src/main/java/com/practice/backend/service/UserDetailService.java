package com.practice.backend.service;

import com.practice.backend.entity.User;
import com.practice.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
        System.out.println("Request parameters: " + ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest().getParameterMap());
        
        if (email == null || email.isEmpty()) {
            throw new UsernameNotFoundException("이메일이 비어있습니다.");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email + " 해당 메일을 찾을 수 없습니다."));
    }
}
