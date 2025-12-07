package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;

public interface QuizResultService {

  void saveResult(QuizResult quizResult);

  List<QuizResult> getIncorrectNote(String userId);

  List<QuizResult> getRanking();

  List<QuizResult> getAllResultsByUser(String userId);

}
