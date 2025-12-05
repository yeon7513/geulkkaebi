package kr.ac.kopo.geulkkaebi.quiz.word;

import org.apache.ibatis.type.Alias;

@Alias("quizWdDto")
public class QuizWord {

  private Long qwdNo; // 식별 번호
  private String quizType; // 카테고리
  private String question; // 문제
  private String option1; // 객관식 1
  private String option2; // 객관식 2
  private String option3; // 객관식 3
  private String option4; // 객관식 4
  private String answer; // 정답
  private int difficulty; // 난이도
  private String creator; // 퀴즈를 등록한 관리자
  private String createdAt; // 퀴즈를 등록한 날짜
  private String modifier; // 퀴즈를 수정한 관리자
  private String modifiedAt; // 퀴즈를 수정한 날짜

  public Long getQwdNo() {
    return qwdNo;
  }

  public void setQwdNo(Long qwdNo) {
    this.qwdNo = qwdNo;
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

  public String getOption1() {
    return option1;
  }

  public void setOption1(String option1) {
    this.option1 = option1;
  }

  public String getOption2() {
    return option2;
  }

  public void setOption2(String option2) {
    this.option2 = option2;
  }

  public String getOption3() {
    return option3;
  }

  public void setOption3(String option3) {
    this.option3 = option3;
  }

  public String getOption4() {
    return option4;
  }

  public void setOption4(String option4) {
    this.option4 = option4;
  }

  public String getAnswer() {
    return answer;
  }

  public void setAnswer(String answer) {
    this.answer = answer;
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
