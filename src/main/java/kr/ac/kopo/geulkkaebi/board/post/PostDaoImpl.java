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

  // 일반 게시글 조회
  @Override
  public List<Posts> selectNormalList(Map<String, Object> params) {
    return sql.selectList("posts.selectNormalList", params);
  }

  // 공지사항으로 설정된 게시글 조회
  @Override
  public List<Posts> selectNoticeList(String boardType) {
    return sql.selectList("posts.selectNoticeList", boardType);
  }

  // 게시글 상세 정보 조회
  @Override
  public Posts selectPostDetail(Long postNo) {
    return sql.selectOne("posts.selectPostDetail", postNo);
  }

  // 이전 게시글 정보 조회
  @Override
  public Posts selectPrevPost(Map<String, Object> params) {
    return sql.selectOne("posts.selectPrevPost", params);
  }

  // 다음 게시글 정보 조회
  @Override
  public Posts selectNextPost(Map<String, Object> params) {
    return sql.selectOne("posts.selectNextPost", params);
  }

  // 인기글 조회
  @Override
  public List<Posts> selectPopularPosts() {
    return sql.selectList("posts.selectPopularPosts");
  }

  // 조회수 증가
  @Override
  public void increaseHitcount(Long postNo) {
    sql.insert("posts.increaseHitcount", postNo);
  }

  // 게시글 등록
  @Override
  public int insert(Posts posts) {
    return sql.insert("posts.insert", posts);
  }

}
