package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizResultServiceImpl implements QuizResultService {

  @Autowired
  QuizResultDao quizResultDao;

  // 로그인한 회원의 퀴즈 결과 조회
  // -> 마이페이지용
  @Override
  public List<QuizResult> getAllResultsByUser(String userId) {
    return quizResultDao.selectAllResultsByUser(userId);
  }

  // 결과 저장
  @Override
  public void saveResult(QuizResult quizResult) {
    quizResultDao.insertResult(quizResult);
  }

  // 오답 노트 관리
  @Override
  public List<QuizResult> getIncorrectNote(String userId) {
    return quizResultDao.selectIncorrectNote(userId);
  }

  // 랭킹 조회
  @Override
  public List<QuizResult> getRanking() {
    return quizResultDao.selectRanking();
  }


  // 난이도 추가


}
