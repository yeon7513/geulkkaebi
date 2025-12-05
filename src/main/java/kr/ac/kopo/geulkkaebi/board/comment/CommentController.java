package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/comments")
public class CommentController {

  @Autowired
  CommentService commentService;

  @GetMapping("/list/{postNo}")
  public List<Comments> getComments(@PathVariable Long postNo,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    String userId;

    if (loginUser != null) {
      userId = loginUser.getUserId();
    } else {
      userId = null;
    }
    return commentService.getCommentByPost(userId, postNo);
  }

  @PostMapping("/add/{postNo}")
  public ResponseEntity<Long> addComment(@PathVariable Long postNo, @RequestBody Comments comment,
      @SessionAttribute("loginUser") User loginUser) {
    // 댓글 작성 회원 정보 가져오기
    String writer = loginUser.getUserId();

    // 글 번호 저장
    comment.setPostNo(postNo);
    // 작성자 저장
    comment.setWriter(writer);

    int result = commentService.addComment(comment);
    return result > 0 ? ResponseEntity.ok(comment.getCmtNo()) : ResponseEntity.badRequest().build();
  }

  @DeleteMapping("/delete/{cmtNo}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long cmtNo) {
    int result = commentService.removeComment(cmtNo);
    return result > 0 ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
  }

}
