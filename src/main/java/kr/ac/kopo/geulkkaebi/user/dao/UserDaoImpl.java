package kr.ac.kopo.geulkkaebi.user.dao;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import kr.ac.kopo.geulkkaebi.user.dto.Users;

@Repository("users")
public class UserDaoImpl implements UserDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Users> selectList() {
    return sql.selectList("users.selectList");
  }

  @Override
  public Users selectOne(String id) {
    return sql.selectOne("users.selectOne");
  }

  @Override
  public int insert(Users user) {
    return sql.insert("users.insert", user);
  }

  @Override
  public void update(Users user) {
    sql.update("users.update", user);
  }

  @Override
  public void delete(String id) {
    sql.delete("users.delete", id);

  }

}
