package kr.ac.kopo.geulkkaebi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  // 로그인
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {

    User loginUser = authService.login(user.getId(), user.getPw());

    if (loginUser != null) {
      System.out.println(session.getId());
      session.setAttribute("loginUser", loginUser);

      System.out.println("loginUser: " + session.getAttribute("loginUser"));
      return ResponseEntity.ok(loginUser);
    } else {
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
  public ResponseEntity<?> checkLogin(HttpSession session) {
    User loginUser = (User) session.getAttribute("loginUser");

    // 로그인한 유저가 없다면 처리
    // 주석 처리함. 콘솔에 불필요한 오류 표시남.
    // if (loginUser == null) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in.");
    // }

    // 로그인한 유저에 대해 반환
    return ResponseEntity.ok(loginUser);
  }

}
