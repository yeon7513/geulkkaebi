package kr.ac.kopo.geulkkaebi.board.post;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired
  private PostService postService;

  // 전체 or 게시글 번호별 or 카테고리별 or 아이디별 or 신고된 글 조회
  @GetMapping("/list")
  public Map<String, Object> displayPostList(
      @RequestParam(name = "postno", required = false) Long postNo,
      @RequestParam(required = false) String boardType,
      @RequestParam(required = false) String writer,
      @RequestParam(required = false, defaultValue = "false") boolean isReport,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(required = false, defaultValue = "10") int size) {

    return postService.selectList(postNo, boardType, writer, isReport, page, size);
  }

  // 오늘의 인기글 조회
  @GetMapping("/popular")
  public List<Posts> displayPopularPosts() {
    // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    // String encodedPw = encoder.encode("admin01");
    // System.out.println("암호화: " + encodedPw);

    return postService.selectPopularPosts();
  }

  @PostMapping("/add")
  public ResponseEntity<?> addPost(@RequestBody Posts posts, HttpSession session) {
    // 세션에서 로그인한 회원의 정보 가져오기
    User loginUser = (User) session.getAttribute("loginUser");

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

  // 좋아요 추가
  @PostMapping("/like/{postNo}")
  public ResponseEntity<Void> likePost(@PathVariable Long postNo, @RequestParam String userId) {
    postService.addLikeToPost(postNo, userId);
    return ResponseEntity.ok().build();
  }


}
