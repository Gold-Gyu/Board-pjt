package com.practice.backend.service;

import com.practice.backend.dto.AddUserRequest;
import com.practice.backend.entity.User;
import com.practice.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Transactional
    public Long save(AddUserRequest dto) {

        if (dto.getPassword() == null || dto.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        System.out.println("Received password: " + dto.getPassword());


        User user = User.builder()
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))  // 비밀번호를 암호화
                .nickName(dto.getNickName())
                .build();
        System.out.println(user.getEmail( ));
        System.out.println(user.getUsername());
        System.out.println(user.getPassword( ));
        System.out.println(user.getNickName( ));
        System.out.println(user.getUserId( ));

        return userRepository.save(user).getUserId();


    }
}
