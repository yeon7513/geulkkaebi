package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PostDaoImpl implements PostDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Posts> selectList(Map<String, Object> params) {
    return sql.selectList("posts.selectList", params);
  }

  @Override
  public List<Posts> selectPopularPosts() {
    return sql.selectList("posts.selectPopularPosts");
  }

  @Override
  public void increaseHitcount(Long postNo) {
    sql.insert("posts.increaseHitcount", postNo);
  }

  @Override
  public void addLikeToPost(Map<String, Object> params) {
    sql.insert("posts.addLikeToPost", params);
  }

  @Override
  public int insert(Posts posts) {
    return sql.insert("posts.insert", posts);
  }

}
