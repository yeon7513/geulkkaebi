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

  // 댓글 전체 조회
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

  // 새로 등록한 하나의 댓글 조회
  public Comments getCommentByCmtNo(String userId, Long cmtNo) {
    Comments comment = commentDao.selectCommentByCmtNo(cmtNo);

    if (userId != null) {
      boolean liked = likeService.isCmtLiked(cmtNo, userId) > 0;
      comment.setLiked(liked);
    }

    return comment;
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
