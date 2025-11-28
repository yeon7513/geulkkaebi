package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  CommentDao commentDao;

  @Override
  public List<Comments> getCommentByPost(Long postNo) {
    return commentDao.selectCommentByPost(postNo);
  }

  @Override
  public int addComment(Comments comment) {
    return commentDao.insertComment(comment);
  }

  @Override
  public int removeComment(Long cmtNo) {
    return commentDao.deleteComment(cmtNo);
  }

}
