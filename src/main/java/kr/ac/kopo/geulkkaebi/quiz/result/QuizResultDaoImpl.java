package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QuizResultDaoImpl implements QuizResultDao {

  @Autowired
  SqlSession sql;

  // 퀴즈 결과 조회 (마이페이지용)
  @Override
  public List<QuizResult> selectAllResultsByUser(Map<String, Object> params) {
    return sql.selectList("quizResult.selectQuizResults", params);
  }

  // 총 개수 조회 (페이지네이션)
  @Override
  public int selectQuizResultsCount(Map<String, Object> params) {
    return sql.selectOne("quizResult.selectQuizResultsCount", params);
  }

  // 오답을 다시 풀면 정답여부 갱신
  @Override
  public void updateCorrectAnswer(Long qrNo) {
    sql.update("quizResult.updateCorrectAnswer", qrNo);

  }

  // 퀴즈 결과 삽입 (저장)
  @Override
  public void insertQuizResults(List<QuizResult> quizResults) {
    sql.insert("quizResult.insertQuizResults", quizResults);

  }

  // 오답 노트 관리
  @Override
  public List<QuizResult> selectIncorrectNote(String userId) {
    return null;
  }

  // 랭킹 조회
  @Override
  public List<QuizResult> selectRanking() {
    return null;
  }



}
