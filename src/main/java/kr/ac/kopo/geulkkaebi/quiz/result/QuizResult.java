package kr.ac.kopo.geulkkaebi.quiz.result;

import org.apache.ibatis.type.Alias;

@Alias("quizResultDto")
public class QuizResult {
  private Long qrNo; // 결과 식별 번호
  private String userId; // 퀴즈를 푼 회원의 아이디
  private String quizType; // 퀴즈 카테고리
  private Long quizNo; // 퀴즈 식별 번호
  private int isCorrect; // 정답 여부 (1이면 정답, 0이면 오답)
  private String attemptedAt; // 퀴즈를 푼 날짜

  public Long getQrNo() {
    return qrNo;
  }

  public void setQrNo(Long qrNo) {
    this.qrNo = qrNo;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getQuizType() {
    return quizType;
  }

  public void setQuizType(String quizType) {
    this.quizType = quizType;
  }

  public Long getQuizNo() {
    return quizNo;
  }

  public void setQuizNo(Long quizNo) {
    this.quizNo = quizNo;
  }

  public int getIsCorrect() {
    return isCorrect;
  }

  public void setIsCorrect(int isCorrect) {
    this.isCorrect = isCorrect;
  }

  public String getAttemptedAt() {
    return attemptedAt;
  }

  public void setAttemptedAt(String attemptedAt) {
    this.attemptedAt = attemptedAt;
  }


}
