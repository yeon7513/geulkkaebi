package kr.ac.kopo.geulkkaebi.user;

import java.util.List;

public interface UserDao {

  List<User> selectList();

  User selectOne(String id);

  int insert(User user);

  int update(User user);

  int delete(Long userNo);

}
