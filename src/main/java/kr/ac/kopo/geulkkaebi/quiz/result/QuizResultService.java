package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import java.util.Map;

public interface QuizResultService {

  void saveResult(List<QuizResult> quizResults, String userId);

  List<QuizResult> getIncorrectNote(String userId);

  List<QuizResult> getRanking();

  Map<String, Object> getAllResultsByUser(String userId, int page, String filter);

  void updateCorrect(Long qrNo);


}
