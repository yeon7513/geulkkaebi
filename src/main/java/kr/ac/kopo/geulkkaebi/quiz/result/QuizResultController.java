package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import kr.ac.kopo.geulkkaebi.user.User;

@RestController
@RequestMapping("/quizResult")
public class QuizResultController {

  @Autowired
  QuizResultService quizResultService;

  // 로그인한 회원 기준으로 자신의 모든 퀴즈 결과 조회
  // -> 마이페이지 조회용
  @GetMapping("/list")
  public ResponseEntity<List<QuizResult>> getAllResultsByUser(
      @SessionAttribute("loginUser") User loginUser) {

    // 세션에서 로그인한 회원 ID 가져오기
    String userId = loginUser.getUserId();

    if (userId == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    List<QuizResult> results = quizResultService.getAllResultsByUser(userId);
    return ResponseEntity.ok(results);
  }


  // 퀴즈 결과 저장
  @PostMapping("/save")
  public ResponseEntity<?> saveQuizResult(@RequestBody QuizResult quizResult) {
    quizResultService.saveResult(quizResult);

    return ResponseEntity.ok().build();
  }

  // 오답 조회
  // 마이페이지 또는 퀴즈 페이지에서 조회 후 다시 풀이함.
  @GetMapping("/incorrectNote/{userId}")
  public ResponseEntity<List<QuizResult>> getIncorrectNote(@PathVariable String userId) {
    List<QuizResult> incorrectQuiz = quizResultService.getIncorrectNote(userId);

    return ResponseEntity.ok(incorrectQuiz);
  }

  // 점수 랭킹 조회
  @GetMapping("/ranking")
  public ResponseEntity<List<QuizResult>> getRanking() {
    List<QuizResult> ranking = quizResultService.getRanking();
    return ResponseEntity.ok(ranking);
  }

}
