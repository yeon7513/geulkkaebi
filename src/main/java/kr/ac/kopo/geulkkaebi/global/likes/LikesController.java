package kr.ac.kopo.geulkkaebi.global.likes;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/likes")
public class LikesController {

  @Autowired
  LikesService likeService;

  // 게시글 좋아요 추가
  @PostMapping("/post/{postNo}")
  public ResponseEntity<?> addPostLike(@PathVariable Long postNo,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    // 로그인하지 않은 회원일 경우 좋아요 추가 X
    if (loginUser == null) {
      return ResponseEntity.status(401).body("로그인이 필요합니다.");
    }

    String userId = loginUser.getUserId();

    Map<String, Object> result = likeService.addPostLike(postNo, userId);

    return ResponseEntity.ok(result);
  }

  // 게시글 좋아요 삭제
  @DeleteMapping("/post/{postNo}")
  public ResponseEntity<?> deletePostLike(@PathVariable Long postNo,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    // 로그인하지 않은 회원일 경우 좋아요 추가 X
    if (loginUser == null) {
      return ResponseEntity.status(401).body("로그인이 필요합니다.");
    }

    String userId = loginUser.getUserId();

    Map<String, Object> result = likeService.deletePostLike(postNo, userId);

    return ResponseEntity.ok(result);
  }

  // 댓글 좋아요 추가
  @PostMapping("/comment/{cmtNo}")
  public ResponseEntity<?> addCommentLike(@PathVariable Long cmtNo,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    // 로그인하지 않은 회원일 경우 좋아요 추가 X
    if (loginUser == null) {
      return ResponseEntity.status(401).body("로그인이 필요합니다.");
    }

    String userId = loginUser.getUserId();

    Map<String, Object> result = likeService.addCmtLike(cmtNo, userId);

    return ResponseEntity.ok(result);
  }

  // 댓글 좋아요 삭제
  @DeleteMapping("/comment/{cmtNo}")
  public ResponseEntity<?> deleteCommetLike(@PathVariable Long cmtNo,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    // 로그인하지 않은 회원일 경우 좋아요 추가 X
    if (loginUser == null) {
      return ResponseEntity.status(401).body("로그인이 필요합니다.");
    }

    String userId = loginUser.getUserId();

    Map<String, Object> result = likeService.deleteCmtLike(cmtNo, userId);

    return ResponseEntity.ok(result);
  }

}
