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
  public User selectOne(String id) {
    return sql.selectOne("users.selectOne", id);
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
  public int delete(Long userNo) {
    return sql.delete("users.delete", userNo);
  }

}
