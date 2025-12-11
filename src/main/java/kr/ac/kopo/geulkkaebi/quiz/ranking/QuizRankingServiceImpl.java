package kr.ac.kopo.geulkkaebi.quiz.ranking;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizRankingServiceImpl implements QuizRankingService {

  @Autowired
  QuizRankingDao rankingDao;

  // 전체 랭킹 조회
  @Override
  public List<QuizRanking> getRankings(int page, int pageSize) {
    // 페이지네이션 계산
    int startRank = (page - 1) * pageSize + 1;
    int endRank = startRank + pageSize - 1;

    Map<String, Integer> params = new HashMap<>();

    params.put("startRank", startRank);
    params.put("endRank", endRank);

    return rankingDao.selectAllQuizRankings(params);
  }

  // 카테고리별 랭킹 조회
  @Override
  public List<QuizRanking> getRankingsByQuizType(String quizType, int page, int pageSize) {

    int startRank = (page - 1) * pageSize + 1;
    int endRank = startRank + pageSize - 1;

    Map<String, Integer> params = new HashMap<>();

    params.put("startRank", startRank);
    params.put("endRank", endRank);

    if (quizType.equals("word")) {
      return rankingDao.selectWordQuizRanking(params);
    } else if (quizType.equals("proverb")) {
      return rankingDao.selectProverbQuizRanking(params);
    } else {
      return Collections.emptyList();
    }

  }

  // 회원의 랭킹 순위 조회
  @Override
  public int getMyRanking(String quizType, String userId) {

    Map<String, String> params = new HashMap<>();
    params.put("userId", userId);
    params.put("quizType", quizType);

    // 랭크 조회
    Integer rank = rankingDao.selectRankByUser(params);

    if (rank == null) {
      return 0;
    }

    // 참여 횟수, 최근 참여일 조회
    // Integer attemptCount = rankingDao.selectAttemptCount(params);
    // String lastAttemptedAt = rankingDao.selectLastAttemptedAt(params);

    // 회원 정보 조회
    // QuizRanking myRank = rankingDao.selectUserInfo(userId);

    // DTO에 추가 정보 세팅
    // myRank.setRank(rank);
    // myRank.setAttemptCount(attemptCount != null ? attemptCount : 0);
    // myRank.setLastAttemptedAt(lastAttemptedAt);

    return rank;
  }

}
