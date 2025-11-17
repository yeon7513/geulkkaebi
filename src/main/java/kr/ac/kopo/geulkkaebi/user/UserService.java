package kr.ac.kopo.geulkkaebi.user;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

  List<User> selectList();

  User selectOne(String userId);

  int insert(User user, MultipartFile file);

  int update(User user, MultipartFile flie);

  int delete(String userId);

}
