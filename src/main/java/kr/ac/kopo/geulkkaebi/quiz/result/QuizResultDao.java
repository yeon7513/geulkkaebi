package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import java.util.Map;

public interface QuizResultDao {

  void insertQuizResults(List<QuizResult> quizResults);

  List<QuizResult> selectIncorrectNote(String userId);

  List<QuizResult> selectRanking();

  int selectQuizResultsCount(Map<String, Object> params);

  List<QuizResult> selectAllResultsByUser(Map<String, Object> params);

  void updateCorrectAnswer(Long qrNo);

}
