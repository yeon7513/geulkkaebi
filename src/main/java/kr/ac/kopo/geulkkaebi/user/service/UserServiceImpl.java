package kr.ac.kopo.geulkkaebi.user.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.user.dao.UserDao;
import kr.ac.kopo.geulkkaebi.user.dto.Users;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  UserDao userDao;

  @Override
  public List<Users> selectList() {
    return userDao.selectList();
  }

  @Override
  public Users selectOne(String id) {
    return userDao.selectOne(id);
  }

  @Override
  public int insert(Users user) {
    return userDao.insert(user);
  }

  @Override
  public void update(Users user) {
    userDao.update(user);
  }

  @Override
  public void delete(String id) {
    userDao.delete(id);

  }


}
