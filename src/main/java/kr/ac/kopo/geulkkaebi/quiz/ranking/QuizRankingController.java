package kr.ac.kopo.geulkkaebi.quiz.ranking;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/quizRanking")
public class QuizRankingController {

  @Autowired
  QuizRankingService rankingService;

  // 전체 랭킹 리스트
  @GetMapping("/list")
  public ResponseEntity<List<QuizRanking>> getRankings(@RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int pageSize) {
    List<QuizRanking> result = rankingService.getRankings(page, pageSize);

    return ResponseEntity.ok(result);
  }

  // 카테고리별 리스트
  @GetMapping("/list/{quizType}")
  public ResponseEntity<List<QuizRanking>> getRankingsByQuizType(@PathVariable String quizType,
      @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int pageSize) {
    List<QuizRanking> result = rankingService.getRankingsByQuizType(quizType, page, pageSize);

    return ResponseEntity.ok(result);
  }


  // 회원의 순위 조회 -> 없으면 null
  @GetMapping("/view/{quizType}/myRank")
  public ResponseEntity<Integer> getMyRanking(@PathVariable String quizType,
      @SessionAttribute(name = "loginUser", required = false) User loginUser) {

    if (loginUser == null) {
      return ResponseEntity.ok(null);
    }

    String userId = loginUser.getUserId();

    int myRank = rankingService.getMyRanking(quizType, userId);

    System.out.println("myRank: " + myRank);

    if (myRank == 0) {
      return ResponseEntity.ok(null);
    }

    return ResponseEntity.ok(myRank);
  }

}
