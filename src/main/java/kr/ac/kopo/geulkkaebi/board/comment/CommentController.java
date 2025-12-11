package kr.ac.kopo.geulkkaebi.board.comment;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

  // 해당 게시글의 댓글 조회
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

  // 해당 게시글에 댓글 추가
  @PostMapping("/add/{postNo}")
  public ResponseEntity<?> addComment(@PathVariable Long postNo, @RequestBody Comments comment,
      @SessionAttribute("loginUser") User loginUser) {
    // 댓글 작성 회원 정보 가져오기
    String writer = loginUser.getUserId();

    // 글 번호 저장
    comment.setPostNo(postNo);
    // 작성자 저장
    comment.setWriter(writer);

    int result = commentService.addComment(comment);
    if (result > 0) {
      // 새로 INSERT된 댓글 객체를 다시 조회해서 반환
      Comments saved = commentService.getCommentByCmtNo(writer, comment.getCmtNo());
      return ResponseEntity.ok(saved);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  // 댓글 수정
  @PostMapping("/update/{cmtNo}")
  public ResponseEntity<Comments> updateComment(@PathVariable Long cmtNo,
      @RequestBody Comments comment, @SessionAttribute("loginUser") User loginUser) {
    // 로그인한 회원 아이디 조회
    String userId = loginUser.getUserId();

    // 해당 댓글이 없을 경우
    if (comment == null) {
      return ResponseEntity.notFound().build();
    }

    // 로그인한 회원과 작성자 아이디가 일치하지 않을 경우 접근 차단
    if (!userId.equals(comment.getWriter())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    int result = commentService.updateComment(comment);

    Comments updatedComment = commentService.getCommentByCmtNo(userId, cmtNo);

    if (result > 0) {
      return ResponseEntity.ok(updatedComment);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }

  // 댓글 삭제
  @DeleteMapping("/delete/{cmtNo}")
  public ResponseEntity<Long> deleteComment(@PathVariable Long cmtNo,
      @SessionAttribute("loginUser") User loginUser) {

    // 로그인한 회원 아이디 조회
    String userId = loginUser.getUserId();

    // 단일 댓글 조회
    Comments comments = commentService.getCommentByCmtNo(userId, cmtNo);

    // 해당 댓글이 없을 경우
    if (comments == null) {
      return ResponseEntity.notFound().build();
    }

    // 로그인한 회원과 작성자 아이디가 일치하지 않을 경우 접근 차단
    if (!userId.equals(comments.getWriter())) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    int result = commentService.removeComment(cmtNo);

    return result > 0 ? ResponseEntity.ok(cmtNo)
        : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  }

}
