package kr.ac.kopo.geulkkaebi.auth;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import jakarta.servlet.http.HttpSession;
import kr.ac.kopo.geulkkaebi.user.User;
import kr.ac.kopo.geulkkaebi.user.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  UserService userService;

  // 로그인
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
    try {
      // DB에서 조회
      User loginUser = userService.selectOne(user.getUserId());

      if (loginUser != null && loginUser.getUserPw().equals(user.getUserPw())) {
        // 로그인 성공 시 세션에 저장
        session.setAttribute("loginUser", loginUser);

        return ResponseEntity.ok(loginUser);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Id or Password");
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Id or Password.");
    }
  }

  // 로그아웃
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.ok("Logout success.");
  }

  // 로그인 확인
  @GetMapping("/check")
  public ResponseEntity<?> checkLogin(
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    if (loginUser != null) {
      boolean isAdmin = loginUser.getAdminYn() == 0 ? false : true;

      Map<String, Object> result = new HashMap<>();
      result.put("isLogin", true);
      result.put("isAdmin", isAdmin);
      result.put("userInfo", loginUser);

      return ResponseEntity.ok(result);
    } else {
      Map<String, Object> result = new HashMap<>();
      result.put("isLogin", false);

      return ResponseEntity.ok(result);
    }

  }

}
