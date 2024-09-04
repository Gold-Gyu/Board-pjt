package com.practice.backend.service;

import com.practice.backend.dto.AddUserRequest;
import com.practice.backend.entity.User;
import com.practice.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) {

        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        System.out.println("Received password: " + dto.getPassword());


        return userRepository.save(User.builder()
                .email(dto.getEmail())
                .password
                        (bCryptPasswordEncoder.encode(dto.getPassword()))
                .build()).getUserId();


    }
}
