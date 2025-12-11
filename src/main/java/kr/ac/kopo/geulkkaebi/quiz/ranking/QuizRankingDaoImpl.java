package kr.ac.kopo.geulkkaebi.quiz.ranking;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QuizRankingDaoImpl implements QuizRankingDao {

  @Autowired
  SqlSession sql;

  // 전체 퀴즈 랭킹
  @Override
  public List<QuizRanking> selectAllQuizRankings(Map<String, Integer> params) {
    return sql.selectList("quizRanking.selectQuizRanking", params);
  }

  // 단어 퀴즈 랭킹
  @Override
  public List<QuizRanking> selectWordQuizRanking(Map<String, Integer> params) {
    return sql.selectList("quizRanking.selectWordQuizRanking", params);
  }

  // 속담 퀴즈 랭킹
  @Override
  public List<QuizRanking> selectProverbQuizRanking(Map<String, Integer> params) {
    return sql.selectList("quizRanking.selectProverbQuizRanking", params);
  }

  // 랭킹 순위 조회
  @Override
  public Integer selectRankByUser(Map<String, String> params) {
    return sql.selectOne("quizRanking.selectRankByUser", params);
  }

  // 회원 정보
  @Override
  public QuizRanking selectUserInfo(String userId) {
    return sql.selectOne("quizRanking.selectUserInfo", userId);
  }

  // 참여 횟수
  @Override
  public Integer selectAttemptCount(Map<String, String> params) {
    return sql.selectOne("quizRanking.selectAttemptCount", params);
  }

  // 최근 참여일
  @Override
  public String selectLastAttemptedAt(Map<String, String> params) {
    return sql.selectOne("quizRanking.selectLastAttemptedAt", params);
  }


}
