package kr.ac.kopo.geulkkaebi.quiz;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quiz")
public class QuizController {

  @Autowired
  QuizService quizService;

  // 모든 퀴즈 목록 조회
  @GetMapping("/list")
  public List<Quiz> displayAllQuizList() {
    return quizService.selectAllQuizList();
  }

  // 카테고리별 퀴즈 조회
  @GetMapping("/list/{quizType}")
  public List<?> displayAllQuizListByType(@PathVariable String quizType) {
    return quizService.selectAllQuizListByType(quizType);
  }

  // 퀴즈 등록
  @PostMapping("/register")
  public ResponseEntity<?> registerQuiz(@RequestBody Map<String, Object> quizData) {
    quizService.registerQuiz(quizData);
    return ResponseEntity.ok("등록 성공");
  }

}
