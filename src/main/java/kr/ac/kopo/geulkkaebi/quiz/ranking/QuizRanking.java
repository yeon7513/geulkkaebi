package kr.ac.kopo.geulkkaebi.quiz.ranking;

import org.apache.ibatis.type.Alias;

@Alias("quizRankingDto")
public class QuizRanking {
  private String userId; // 랭커 아이디
  private String nickname; // 회원 닉네임
  private int score; // 회원 점수
  private int grade; // 회원 등급
  private String profileImg; // 프로필 사진
  private int rank; // 랭킹 순위
  private int attemptCount; // 참여 횟수
  private String lastAttemptedAt; // 최근 참여일

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
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

  public int getGrade() {
    return grade;
  }

  public void setGrade(int grade) {
    this.grade = grade;
  }

  public String getProfileImg() {
    return profileImg;
  }

  public void setProfileImg(String profileImg) {
    this.profileImg = profileImg;
  }

  public int getRank() {
    return rank;
  }

  public void setRank(int rank) {
    this.rank = rank;
  }

  public int getAttemptCount() {
    return attemptCount;
  }

  public void setAttemptCount(int attemptCount) {
    this.attemptCount = attemptCount;
  }

  public String getLastAttemptedAt() {
    return lastAttemptedAt;
  }

  public void setLastAttemptedAt(String lastAttemptedAt) {
    this.lastAttemptedAt = lastAttemptedAt;
  }

}
