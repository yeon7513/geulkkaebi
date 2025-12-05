package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.global.likes.LikesService;

@Service
public class CommentServiceImpl implements CommentService {

  @Autowired
  CommentDao commentDao;

  @Autowired
  LikesService likeService;

  @Override
  public List<Comments> getCommentByPost(String userId, Long postNo) {

    List<Comments> commentList = commentDao.selectCommentByPost(postNo);

    if (userId != null) {
      for (Comments c : commentList) {
        boolean liked = likeService.isCmtLiked(c.getCmtNo(), userId) > 0;
        c.setLiked(liked);
      }
    }

    return commentList;
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
