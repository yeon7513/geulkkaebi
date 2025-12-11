package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;

public interface CommentDao {

  List<Comments> selectCommentByPost(Long postNo);

  int insertComment(Comments comment);

  int deleteComment(Long cmtNo);

  Comments selectCommentByCmtNo(Long cmtNo);

  int updateComment(Comments comment);

}
