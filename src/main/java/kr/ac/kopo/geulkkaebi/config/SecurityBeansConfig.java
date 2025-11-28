package kr.ac.kopo.geulkkaebi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import kr.ac.kopo.geulkkaebi.auth.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityBeansConfig {

  private final UserDetailsService userDetailsService;

  public SecurityBeansConfig(UserDetailsService userDetailsService) {
    this.userDetailsService = userDetailsService;
  }

  // 비밀번호 암호화
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  // AuthenticationManager 빈 등록
  // 로그인 시 인증을 처리하는 매니저.
  // UserDetailsService + PasswordEncoder를 사용해서 인증 수행
  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
      throws Exception {
    return config.getAuthenticationManager();
  }

  // 엔드포인트 접근권한 및 로그인/로그아웃 설정
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter)
      throws Exception {
    http.csrf().disable().formLogin().disable().authorizeHttpRequests(authorize ->
    // requestMatchers("엔드포인트").permitAll()
    // 누구나 접근 가능
    authorize
        .requestMatchers("/users/add", "/auth/login", "/auth/check", "/posts/list",
            "/posts/popular", "/posts/view/**", "/css/**", "/js/**")
        .permitAll()

        // requestMatchers("엔드포인트").authenticated()
        // 일반 사용자용 - 로그인이 필요함
        .requestMatchers("/users/delete/**", "/users/update/**", "/posts/add", "/posts/like/**")
        .authenticated()

        // requestMatchers("엔드포인트").hasRole(String)
        // 관리자용
        .requestMatchers("/users/list/**", "/users/list").hasRole("ADMIN")

        // 그 외 모든 요청 허용
        .anyRequest().permitAll())

        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}
