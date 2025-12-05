package kr.ac.kopo.geulkkaebi.global.likes;

import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LikesDaoImpl implements LikesDao {

  @Autowired
  SqlSession sql;

  // 게시글
  @Override
  public void insertPostLikes(Map<String, Object> params) {
    sql.insert("like.insertPostLike", params);
  }

  @Override
  public void deletePostLike(Map<String, Object> params) {
    sql.delete("like.deletePostLike", params);
  }

  // 게시글 좋아요 여부 검사
  public int isPostLiked(Map<String, Object> params) {
    return sql.selectOne("like.isPostLiked", params);
  }

  // 갱신된 게시글의 좋아요 수 반환
  @Override
  public int countLikesByPost(Long postNo) {
    return sql.selectOne("like.countLikesPost", postNo);
  }

  // 댓글
  @Override
  public void insertCmtLikes(Map<String, Object> params) {
    sql.insert("like.insertCmtLike", params);
  }

  @Override
  public void deleteCmtLike(Map<String, Object> params) {
    sql.delete("like.deleteCmtLike", params);
  }

  // 댓글 좋아요 여부 검사
  public int isCmtLiked(Map<String, Object> params) {
    return sql.selectOne("like.isCmtLiked", params);
  }

  // 갱신된 댓글의 좋아요 수 반환
  @Override
  public int countLikesByCmt(Long cmtNo) {
    return sql.selectOne("like.countLikesCmt", cmtNo);
  }


}
