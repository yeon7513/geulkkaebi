package kr.ac.kopo.geulkkaebi.user.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kr.ac.kopo.geulkkaebi.user.dto.Users;
import kr.ac.kopo.geulkkaebi.user.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  // 모든 회원 조회
  @GetMapping("/list")
  public List<Users> displayUsersList() {
    return userService.selectList();
  }

  // 한 명의 회원 조회
  @GetMapping("/{id}")
  public Users displayUser(@PathVariable String id) {
    return userService.selectOne(id);
  }

  // 회원 등록
  @PostMapping("/add")
  public ResponseEntity<String> addUser(Users user) {
    // ResponseEntity<String>
    // insert의 성공 여부를 확인 할 때,
    // int로만 반환하면 실패 했을 경우의 원인은 확인할 수 없다.
    // (NOT NULL인데 NULL이 들어가는 경우 등)
    // 프론트쪽에 어떤 오류인지 명확하게 전달하기 위해
    // ResponseEntity를 사용한다.

    try {
      // 성공/실패 확인
      int result = userService.insert(user);

      if (result > 0) {
        // insert 성공
        return ResponseEntity.ok("success");
      } else {
        // insert 실패
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("insert failed");
      }

    } catch (Exception e) {
      // 제약 조건 위반 시 에러 반환
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("DB Error: " + e.getMessage());
    }
  }

}
