package kr.ac.kopo.geulkkaebi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.user.SecurityUser;
import kr.ac.kopo.geulkkaebi.user.User;
import kr.ac.kopo.geulkkaebi.user.UserService;

@Service
public class AuthService implements UserDetailsService {

  @Autowired
  UserService userService;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userService.selectOne(username);

    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    System.out.println("DB PW = " + user.getUserPw()); // 해시값 찍힘
    UserDetails u = new SecurityUser(user);
    System.out.println("UserDetails PW = " + u.getPassword()); // 여기 null 또는 공백일 가능성 100%

    return u;
    // return new SecurityUser(user);
  }

}
