package kr.ac.kopo.geulkkaebi.user;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("users")
public class UserDaoImpl implements UserDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<User> selectList() {
    return sql.selectList("users.selectList");
  }

  @Override
  public User selectOne(String userId) {
    return sql.selectOne("users.selectOne", userId);
  }

  @Override
  public int insert(User user) {
    return sql.insert("users.insert", user);
  }

  @Override
  public int update(User user) {
    return sql.update("users.update", user);
  }

  @Override
  public int delete(String userId) {
    return sql.delete("users.delete", userId);
  }

}
