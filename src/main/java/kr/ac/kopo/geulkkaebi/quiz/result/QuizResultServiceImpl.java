package kr.ac.kopo.geulkkaebi.quiz.result;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.ac.kopo.geulkkaebi.global.util.CommonUtilMethod;
import kr.ac.kopo.geulkkaebi.quiz.QuizService;
import kr.ac.kopo.geulkkaebi.user.UserService;

@Service
public class QuizResultServiceImpl implements QuizResultService {

  @Autowired
  QuizResultDao quizResultDao;

  @Autowired
  QuizService quizService;

  @Autowired
  UserService userService;

  // 로그인한 회원의 퀴즈 결과 조회
  // -> 마이페이지용
  @Override
  public Map<String, Object> getAllResultsByUser(String userId, int page, String filter) {
    int pageSize = 10;
    int startRow = (page - 1) * pageSize + 1;
    int endRow = page * pageSize;

    Map<String, Object> params = new HashMap<>();
    params.put("userId", userId);
    params.put("filter", filter);
    params.put("startRow", startRow);
    params.put("endRow", endRow);

    List<QuizResult> list = quizResultDao.selectAllResultsByUser(params);
    int totalCount = quizResultDao.selectQuizResultsCount(params);

    Map<String, Object> result = new HashMap<>();
    result.put("list", list);
    result.put("totalCount", totalCount);

    return result;
  }

  public void updateCorrect(Long qrNo) {
    quizResultDao.updateCorrectAnswer(qrNo);
  }

  // 결과 저장
  @Override
  public void saveResult(List<QuizResult> quizResults, String userId) {
    // 대량 등록
    quizResultDao.insertQuizResults(quizResults);

    // 점수 계산
    // 회원의 score만 업데이트
    // 단, 정답인 것만!
    int totalScore = 0;
    for (QuizResult qr : quizResults) {
      if (qr.getIsCorrect() == 1) {
        // 난이도 조회
        double difficulty = quizService.getDifficulty(qr.getQuizType(), qr.getQuizNo());
        // 점수 계산
        totalScore += CommonUtilMethod.calculateScore(difficulty);
      }
    }

    // userService에서 회원 점수를 업데이트하는 메소드 호출
    userService.updateUserScore(userId, totalScore);
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
