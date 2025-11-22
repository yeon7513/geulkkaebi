package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired
  private PostService postService;

  // 전체 or 게시글 번호별 or 카테고리별 or 아이디별 or 신고된 글 조회
  @GetMapping("/list")
  public List<Posts> displayPostList(@RequestParam(name = "postno", required = false) Long postNo,
      @RequestParam(required = false) String boardType,
      @RequestParam(required = false) String writer,
      @RequestParam(required = false, defaultValue = "false") boolean isReport) {

    return postService.selectList(postNo, boardType, writer, isReport);
  }

  // 오늘의 인기글 조회
  @GetMapping("/popular")
  public List<Posts> displayPopularPosts() {
    return postService.selectPopularPosts();
  }

  // 조회수 증가
  @PostMapping("/view/{postNo}")
  public ResponseEntity<Void> viewPost(@PathVariable Long postNo) {
    postService.increaseHitcount(postNo);
    return ResponseEntity.ok().build();
  }

  // 좋아요 추가
  @PostMapping("/like/{postNo}")
  public ResponseEntity<Void> likePost(@PathVariable Long postNo, @RequestParam String userId) {
    postService.addLikeToPost(postNo, userId);
    return ResponseEntity.ok().build();
  }


}
