package com.practice.backend.config;

import com.practice.backend.service.UserDetailService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final UserDetailService userService;

    public WebSecurityConfig(UserDetailService userService) {
        this.userService = userService;
    }

    // 스프링 시큐리티 기능 비활성화 (H2 콘솔과 정적 리소스 무시)
    @Bean
    public WebSecurityCustomizer configure() {
        return (web -> web.ignoring()
                .requestMatchers(toH2Console())
                .requestMatchers("/static/**"));  // 정적 리소스에 대한 접근 허용
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
//                .cors(cors -> cors.disable()) // CORS 설정 추가 (사용할 경우 disable() 제거)
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // 프론트엔드 도메인 허용
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); // 허용할 HTTP 메서드
                    config.setAllowedHeaders(List.of("*")); // 모든 헤더 허용
                    config.setAllowCredentials(true); // 인증 정보(쿠키 등) 허용
                    return config;
                })) // CSRF 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login", "/signup", "/user").permitAll() // 로그인, 회원가입 허용
                        .anyRequest().authenticated() // 그 외 요청은 인증 필요
                )
                .formLogin(formLogin -> formLogin
                        .loginPage("http://localhost:5173/login") // 프론트엔드 로그인 페이지 경로
                        .loginProcessingUrl("/login") // 로그인 처리 URL
                        .defaultSuccessUrl("http://localhost:5173/home") // 로그인 성공 시 이동할 경로
//                        .failureUrl("http://localhost:5173/signup") // 로그인 실패 시 리다이렉트 경로
                        .permitAll() // 로그인 페이지 및 인증 관련 경로 모두 허용
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/articles/logout")) // 로그아웃 URL
                        .logoutSuccessUrl("http://localhost:5173/login") // 로그아웃 성공 후 이동할 경로
                        .invalidateHttpSession(true) // 세션 무효화
                        .permitAll() // 로그아웃 경로 모두 허용
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        // 인증되지 않은 사용자가 접근할 때 프론트엔드의 로그인 페이지로 리다이렉트
                        .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("http://localhost:5173/login"))
                );
//                .exceptionHandling(exceptionHandling -> exceptionHandling
//                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)) // 인증되지 않은 사용자는 401 응답
//                );

        return http.build();
    }

    // AuthenticationProvider 설정
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        System.out.println("Authentication Provider");
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder());
        System.out.println("인증");
        return authProvider;
    }

    // AuthenticationManager 설정
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
