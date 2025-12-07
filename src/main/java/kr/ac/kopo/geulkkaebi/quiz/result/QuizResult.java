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

  // 랭킹 조회용 필드
  private String rankerId; // 랭커 아이디
  private String nickname; // 회원 닉네임
  private int score; // 회원 점수

  public String getRankerId() {
    return rankerId;
  }

  public void setRankerId(String rankerId) {
    this.rankerId = rankerId;
  }

  public String getNickname() {
    return nickname;
  }

  public void setNickname(String nickname) {
    this.nickname = nickname;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

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
