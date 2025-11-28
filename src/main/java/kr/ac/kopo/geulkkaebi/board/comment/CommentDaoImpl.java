package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CommentDaoImpl implements CommentDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Comments> selectCommentByPost(Long postNo) {
    return sql.selectList("comments.selectCommentsByPost", postNo);
  }

  @Override
  public int insertComment(Comments comment) {
    return sql.insert("comments.insert", comment);
  }

  @Override
  public int deleteComment(Long cmtNo) {
    return sql.delete("comments.delete", cmtNo);
  }

}
