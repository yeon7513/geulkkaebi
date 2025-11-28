package kr.ac.kopo.geulkkaebi.user;

import java.util.List;

public interface UserDao {

  List<User> selectList();

  User selectOne(String userId);

  int insert(User user);

  int update(User user);

  int delete(String userId);

  void updateUserGrade(String writerId);

}
