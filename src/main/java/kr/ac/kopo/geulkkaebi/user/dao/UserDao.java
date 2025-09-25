package kr.ac.kopo.geulkkaebi.user.dao;

import java.util.List;
import kr.ac.kopo.geulkkaebi.user.dto.Users;

public interface UserDao {

  List<Users> selectList();

  Users selectOne(String id);

  int insert(Users user);

  void update(Users user);

  void delete(String id);

}
