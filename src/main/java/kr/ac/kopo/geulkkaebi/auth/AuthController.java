package kr.ac.kopo.geulkkaebi.auth;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;
import kr.ac.kopo.geulkkaebi.user.SecurityUser;
import kr.ac.kopo.geulkkaebi.user.User;
import kr.ac.kopo.geulkkaebi.user.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  UserService userService;

  // 로그인
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user) {
    try {
      // 회원 정보 조회
      Authentication auth = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(user.getUserId(), user.getUserPw()));

      // 인증이 완료된 회원 정보가 담김
      SecurityUser authenticUser = (SecurityUser) auth.getPrincipal();

      // JWT 발급
      String token = JwtUtil.generateToken(authenticUser.getUsername(),
          authenticUser.getAuthorities().iterator().next().getAuthority());

      // DB에서 조회
      User loginUser = userService.selectOne(authenticUser.getUsername());

      loginUser.setUserPw(null);
      // // Map으로 변환 후 userPw 제거
      // Map<String, Object> responseUser = new HashMap<>();
      // BeanUtils.copyProperties(loginUser, responseUser); // User 필드 복사
      // responseUser.remove("userPw"); // 비밀번호 제거

      return ResponseEntity.ok(Map.of("token", token, "user", loginUser));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Id or Password.");
    }

  }

  // 로그아웃
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session) {
    SecurityContextHolder.clearContext();
    return ResponseEntity.ok("Logout success.");
  }

  // 로그인 확인
  @GetMapping("/check")
  public ResponseEntity<?> checkLogin(HttpSession session) {
    // 로그인 시 담긴 시큐리티 컨텍스트에 담긴 객체를 꺼내온다.
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    // auth.getPrincipal().equals("anonymousUser")
    // -> 시큐리티에서 비로그인 상태를 나타낼 때
    // 즉, 로그인하지 않은 상태일 경우 이 if문이 실행된다.
    if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
      // ResponseEntity로 보내니 로그인하지 않은 상태에도
      // 오류를 뱉음. -> null로 변경
      return null;
    }

    // principal이 String일 경우
    String userId = (String) auth.getPrincipal();
    // DB에서 해당하는 사용자 정보 가져오기
    User loginUser = userService.selectOne(userId);

    // 로그인한 유저에 대해 반환
    return ResponseEntity.ok(loginUser);
  }

}
