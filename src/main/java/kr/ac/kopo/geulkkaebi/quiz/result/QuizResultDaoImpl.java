package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class QuizResultDaoImpl implements QuizResultDao {

  @Autowired
  SqlSession sql;

  // 퀴즈 결과 조회 (마이페이지용)
  @Override
  public List<QuizResult> selectAllResultsByUser(String userId) {
    return sql.selectList("quizResult.selectAllResultsByUser", userId);
  }

  // 퀴즈 결과 삽입
  @Override
  public void insertResult(QuizResult quizResult) {
    sql.insert("quizResult.insertResult", quizResult);

  }

  // 오답 노트 관리
  @Override
  public List<QuizResult> selectIncorrectNote(String userId) {
    // TODO Auto-generated method stub
    return null;
  }

  // 랭킹 조회
  @Override
  public List<QuizResult> selectRanking() {
    // TODO Auto-generated method stub
    return null;
  }



}
