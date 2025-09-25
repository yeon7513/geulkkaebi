package kr.ac.kopo.geulkkaebi.quizword.dto;

import org.apache.ibatis.type.Alias;

@Alias("quiz")
public class Quiz {
  private String qid;
  private String question;
  private String option1;
  private String option2;
  private String option3;
  private String option4;
  private String correct_option;
  // 여기서 발견한 것.
  // 필드명과 데이터베이스 속성명이 동일해야 값이 제대로 나옴
  // correct_option이 원래 correctOption이였는데,
  // 이름이 다르니 값이 NULL로 들어옴
  // 속성명과 일치시키니 됨.
  private int difficulty;
  // 오라클에서 difficulty 데이터 타입 수정할 것..
  // 임시로 int로 넣음. double로 바꾸기!
  private String created_at;

  public String getQid() {
    return qid;
  }

  public void setQid(String qid) {
    this.qid = qid;
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

  public String getCorrectOption() {
    return correct_option;
  }

  public void setCorrectOption(String correctOption) {
    this.correct_option = correctOption;
  }

  public int getDifficulty() {
    return difficulty;
  }

  public void setDifficulty(int difficulty) {
    this.difficulty = difficulty;
  }

  public String getCreated_at() {
    return created_at;
  }

  public void setCreated_at(String created_at) {
    this.created_at = created_at;
  }



}
