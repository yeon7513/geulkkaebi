package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired
  private PostService postService;

  // 전체 or 카테고리별 조회
  @GetMapping("/list")
  public Map<String, Object> displayPostList(@RequestParam(required = false) String boardType,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(required = false, defaultValue = "10") int size) {

    return postService.selectList(boardType, page, size);
  }

  // 단일 게시글 상세 조회
  @GetMapping("/list/{postNo}")
  public Map<String, Object> displayPostDetail(@PathVariable Long postNo,
      @RequestParam(required = false, defaultValue = "all") String boardType,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    String userId;

    if (loginUser != null) {
      userId = loginUser.getUserId();
    } else {
      userId = null;
    }

    return postService.getPostDetail(userId, postNo, boardType);
  }

  // 오늘의 인기글 조회
  @GetMapping("/popular")
  public List<Posts> displayPopularPosts() {
    return postService.selectPopularPosts();
  }

  @PostMapping("/add")
  public ResponseEntity<?> addPost(@RequestBody Posts posts,
      @SessionAttribute("loginUser") User loginUser) {

    String writerId = loginUser.getUserId();

    // 작성자 아이디 저장
    posts.setWriter(writerId);

    try {
      // 데이터를 Service를 통해 insert 요청
      // 반환값은 새로 등록한 글 조회를 위해
      // 새로운 글 번호를 반환한다.
      int postNo = postService.insert(posts);

      // 성공/실패 확인
      if (postNo > 0) {
        // insert 성공
        return ResponseEntity.ok(postNo);
      } else {
        // insert 실패
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("insert failed");
      }

    } catch (Exception e) {
      // 제약 조건 위반 시 에러 반환
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("DB Error: " + e.getMessage());
    }
  }

  // 조회수 증가
  @PostMapping("/view/{postNo}")
  public ResponseEntity<Void> viewPost(@PathVariable Long postNo) {
    postService.increaseHitcount(postNo);
    return ResponseEntity.ok().build();
  }

  // 게시글 수정
  @PostMapping("/update/{boardType}/{postNo}")
  public ResponseEntity<?> updatePost(@PathVariable Long postNo, @RequestBody Posts posts,
      @SessionAttribute("loginUser") User loginUser) {

    String userId = loginUser.getUserId();
    String writer = posts.getWriter();

    // 본문 작성자 본인인지 확인 (수정 권한 체크)
    if (!userId.equals(writer)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다");
    }

    int result = postService.updatePost(posts);

    Map<String, Object> updatePost =
        postService.getPostDetail(userId, postNo, posts.getBoardType());

    Posts resultPost = (Posts) updatePost.get("postItem");

    return result > 0 ? ResponseEntity.ok(resultPost)
        : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("update failed");

  }


  // 게시글 삭제
  @DeleteMapping("/delete/{postNo}")
  public ResponseEntity<Long> deletePost(@PathVariable Long postNo,
      @SessionAttribute("loginUser") User loginUser) {

    int result = postService.removePost(postNo);
    return result > 0 ? ResponseEntity.ok(postNo) : ResponseEntity.notFound().build();
  }

}
