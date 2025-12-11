package kr.ac.kopo.geulkkaebi.quiz.ranking;

import java.util.List;

public interface QuizRankingService {

  List<QuizRanking> getRankings(int page, int pageSize);

  List<QuizRanking> getRankingsByQuizType(String quizType, int page, int pageSize);

  int getMyRanking(String quizType, String userId);

}
