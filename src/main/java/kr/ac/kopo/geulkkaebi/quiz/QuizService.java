package kr.ac.kopo.geulkkaebi.quiz;

import java.util.List;
import java.util.Map;

public interface QuizService {

  List<Quiz> selectAllQuizList();

  List<?> selectAllQuizListByType(String quizType);

  void registerQuiz(Map<String, Object> quizData);

  List<?> getRandomQuizList(String quizType);

  double getDifficulty(String quizType, Long quizNo);

}
