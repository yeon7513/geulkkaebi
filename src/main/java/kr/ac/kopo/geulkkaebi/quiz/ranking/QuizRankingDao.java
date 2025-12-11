package kr.ac.kopo.geulkkaebi.quiz.ranking;

import java.util.List;
import java.util.Map;

public interface QuizRankingDao {

  List<QuizRanking> selectAllQuizRankings(Map<String, Integer> params);

  List<QuizRanking> selectWordQuizRanking(Map<String, Integer> params);

  List<QuizRanking> selectProverbQuizRanking(Map<String, Integer> params);

  Integer selectRankByUser(Map<String, String> params);

  QuizRanking selectUserInfo(String userId);

  Integer selectAttemptCount(Map<String, String> params);

  String selectLastAttemptedAt(Map<String, String> params);

}
