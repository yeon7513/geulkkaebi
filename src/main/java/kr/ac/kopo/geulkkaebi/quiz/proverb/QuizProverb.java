package kr.ac.kopo.geulkkaebi.quiz.proverb;

import org.apache.ibatis.type.Alias;

@Alias("quizPvDto")
public class QuizProverb {

  private Long qpvNo; // 식별 번호
  private String quizType; // 카테고리
  private String question; // 문제
  private String answer; // 정답
  private String commentary; // 해설
  private int difficulty; // 난이도
  private String creator; // 퀴즈를 등록한 관리자
  private String createdAt; // 퀴즈를 등록한 날짜
  private String modifier; // 퀴즈를 수정한 관리자
  private String modifiedAt; // 퀴즈를 수정한 날짜

  public Long getQpvNo() {
    return qpvNo;
  }

  public void setQpvNo(Long qpvNo) {
    this.qpvNo = qpvNo;
  }

  public String getQuizType() {
    return quizType;
  }

  public void setQuizType(String quizType) {
    this.quizType = quizType;
  }

  public String getQuestion() {
    return question;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
  }

  public String getCommentary() {
    return commentary;
  }

  public void setCommentary(String commentary) {
    this.commentary = commentary;
  }

  public int getDifficulty() {
    return difficulty;
  }

  public void setDifficulty(int difficulty) {
    this.difficulty = difficulty;
  }

  public String getCreator() {
    return creator;
  }

  public void setCreator(String creator) {
    this.creator = creator;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }

  public String getModifier() {
    return modifier;
  }

  public void setModifier(String modifier) {
    this.modifier = modifier;
  }

  public String getModifiedAt() {
    return modifiedAt;
  }

  public void setModifiedAt(String modifiedAt) {
    this.modifiedAt = modifiedAt;
  }

}
