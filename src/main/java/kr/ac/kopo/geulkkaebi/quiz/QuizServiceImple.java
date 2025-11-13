package kr.ac.kopo.geulkkaebi.quiz;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizServiceImple implements QuizService {

  @Autowired
  QuizDao quizDao;

  @Override
  public List<Quiz> selectAllQuizList() {
    // 모든 퀴즈 목록 조회
    return quizDao.selectAllQuizList();
  }

  // 카테고리별 퀴즈 목록 조회
  @Override
  public List<?> selectAllQuizListByType(String quizType) {
    // Service 계층에서 카테고리를 분기 처리
    if (quizType.equals("word")) {
      // 단어 퀴즈
      return quizDao.selectAllWordQuiz();
    } else if (quizType.equals("proverb")) {
      // 속담 퀴즈
      return quizDao.selectAllProverbQuiz();
    } else {
      // 컬렉션 비우기
      return Collections.emptyList();
    }
  }

  // 퀴즈 등록
  @Override
  public void registerQuiz(Map<String, Object> quizData) {
    String quizType = (String) quizData.get("quizType");

    if (quizType.equals("word")) {
      // 속담 관련 속성 비우기
      quizData.putIfAbsent("pvQuestion", null);
      quizData.putIfAbsent("pvAnswer", null);
      quizData.putIfAbsent("pvCommentary", null);
    } else if (quizType.equals("proverb")) {
      // 단어 관련 속성 비우기
      quizData.putIfAbsent("wdQuestion", null);
      quizData.putIfAbsent("wdOption1", null);
      quizData.putIfAbsent("wdOption2", null);
      quizData.putIfAbsent("wdOption3", null);
      quizData.putIfAbsent("wdOption4", null);
      quizData.putIfAbsent("wdCorrect", null);
    }

    quizDao.insertQuiz(quizData);
  }

}
