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

  // 일반 게시글 전체 개수 조회
  @Override
  public int countNormalPosts(String boardType) {
    return sql.selectOne("posts.countNormalPosts", boardType);
  }

  @Override
  public List<Posts> selectNormalList(Map<String, Object> params) {
    return sql.selectList("posts.selectNormalList", params);
  }

  @Override
  public List<Posts> selectNoticeList(String boardType) {
    return sql.selectList("posts.selectNoticeList", boardType);
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
