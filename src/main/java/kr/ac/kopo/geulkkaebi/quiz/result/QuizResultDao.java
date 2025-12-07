package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;

public interface QuizResultDao {

  void insertResult(QuizResult quizResult);

  List<QuizResult> selectAllResultsByUser(String userId);

  List<QuizResult> selectIncorrectNote(String userId);

  List<QuizResult> selectRanking();

}
