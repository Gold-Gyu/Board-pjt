package com.practice.backend.config;

import com.practice.backend.service.UserDetailService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailService userService;

    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers(toH2Console())
                .requestMatchers("/static/**");
    }



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("http://localhost:5173")); // 정확한 프론트엔드 도메인 설정
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE")); // 허용할 HTTP 메서드
                    config.setAllowedHeaders(List.of("*")); // 허용할 헤더
                    config.setAllowCredentials(true); // 쿠키 허용
                    return config;
                }))
//                .cors(cors -> cors.configurationSource(request -> {
//                    CorsConfiguration config = new CorsConfiguration();
//                    config.setAllowedOriginPatterns(List.of("http://localhost:5173"));  // 도메인 패턴 허용
//                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));  // 허용할 HTTP 메서드
//                    config.setAllowedHeaders(List.of("*"));  // 모든 헤더 허용
//                    config.setAllowCredentials(true);  // 쿠키, 인증 정보 허용
//                    return config;
//                }))

                .csrf(AbstractHttpConfigurer::disable)// CSRF 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login", "/signup").permitAll() // 로그인, 회원가입 허용
                        .anyRequest().authenticated() // 그 외 요청은 인증 필요
                )
                .formLogin(formLogin -> formLogin
                        .loginProcessingUrl("/login") // 로그인 처리 URL
                        .usernameParameter("email")     // "username" 대신 "email"로 변경
                        .passwordParameter("password")     // 프론트엔드에서 'password' 필드가 비밀번호
                        .successHandler(authenticationSuccessHandler())  // 성공 시 JSON 응답
                        .failureHandler(authenticationFailureHandler())
                        .permitAll() // 로그인 페이지 및 인증 관련 경로 모두 허용
                )
                .logout(logout -> logout

                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET"))  // GET 방식 로그아웃 허용
//                        .logoutSuccessUrl("http://localhost:5173/login") // 로그아웃 후 리다이렉트 경로
                        .invalidateHttpSession(true)  // 세션 무효화
                        .deleteCookies("JSESSIONID")  // 쿠키 삭제
                        .permitAll()
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

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/x-www-form-urlencoded");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"message\": \"Login successful\"}");
        };
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/x-www-form-urlencoded");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"message\": \"Login failed: " + exception.getMessage() + "\"}");
        };
    }

    // AuthenticationProvider 설정
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
        builder.authenticationProvider(authenticationProvider());  // 명시적으로 DaoAuthenticationProvider 설정
        return builder.build();
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
