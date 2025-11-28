package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;

public interface CommentService {

  List<Comments> getCommentByPost(Long postNo);

  int addComment(Comments comment);

  int removeComment(Long cmtNo);

}
