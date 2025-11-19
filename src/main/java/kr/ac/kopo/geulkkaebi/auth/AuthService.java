package kr.ac.kopo.geulkkaebi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.user.User;
import kr.ac.kopo.geulkkaebi.user.UserService;

@Service
public class AuthService {

  @Autowired
  UserService userService;

  public User login(String userId, String userPw) {
    User user = userService.selectOne(userId);

    // 로그인 성공 시 user 반환
    if (user != null && user.getUserPw().equals(userPw)) {

      return user;
    }

    return null;
  }

}
