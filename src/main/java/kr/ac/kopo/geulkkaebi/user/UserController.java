package kr.ac.kopo.geulkkaebi.user;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserService userService;

  // 모든 회원 조회
  @GetMapping("/list")
  public List<User> displayUsersList() {
    return userService.selectList();
  }

  // 한 명의 회원 조회
  @GetMapping("/list/{userId}")
  public User displayUser(@PathVariable String userId) {
    return userService.selectOne(userId);
  }

  // 회원 등록
  @PostMapping("/add")
  public ResponseEntity<?> addUser(@RequestPart("user") User user,
      @RequestPart(value = "file", required = false) MultipartFile file) {
    // ResponseEntity<String>
    // insert의 성공 여부를 확인 할 때,
    // int로만 반환하면 실패 했을 경우의 원인은 확인할 수 없다.
    // (NOT NULL인데 NULL이 들어가는 경우 등)
    // 프론트쪽에 어떤 오류인지 명확하게 전달하기 위해
    // ResponseEntity를 사용한다.

    // @@RequestPart로 데이터를 받는 이유
    // -> 프로필 이미지 파일을 받아야해서 각각 처리한다.

    try {
      // 데이터를 Service를 통해 insert 요청
      User result = userService.insert(user, file);

      // 성공/실패 확인
      if (result != null) {
        // 회원가입 성공 시 자동 로그인
        User loginUser = userService.selectOne(user.getUserId());

        // 회원가입 성공 시 user 객체를 반환해서
        // 자동으로 로그인해준다.
        // -> 시간되면 구현하기..

        return ResponseEntity.ok(loginUser);
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

  // 회원 정보 수정
  @PostMapping("/update/{userId}")
  public ResponseEntity<Object> updateUser(@PathVariable String userId,
      @RequestPart("user") User user,
      @RequestPart(value = "file", required = false) MultipartFile file) {

    try {
      user.setUserId(userId);

      User result = userService.update(user, file);

      // 성공/실패 확인
      if (result != null) {
        // insert 성공
        User updatedUser = userService.selectOne(user.getUserId());

        return ResponseEntity.ok(updatedUser);
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("update failed");
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("DB Error: " + e.getMessage());
    }
  }

  @DeleteMapping("/delete/{userId}")
  public ResponseEntity<String> deleteUser(@PathVariable String userId, HttpSession session) {
    try {
      int result = userService.delete(userId);

      if (result > 0) {
        // 세션 비우기
        session.invalidate();
        return ResponseEntity.ok("success");
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("delete failed");
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("DB Error: " + e.getMessage());
    }

  }

}
