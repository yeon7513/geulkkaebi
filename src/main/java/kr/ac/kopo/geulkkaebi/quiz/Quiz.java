package kr.ac.kopo.geulkkaebi.quiz;

import org.apache.ibatis.type.Alias;

@Alias("quizDto")
public class Quiz {

  // quiz
  private String quizType;
  private String creator;
  private String createdAt;
  private String modifier;
  private String modifiedDate;
  private String status;

  public String getQuizType() {
    return quizType;
  }

  public void setQuizType(String quizType) {
    this.quizType = quizType;
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

  public String getModifiedDate() {
    return modifiedDate;
  }

  public void setModifiedDate(String modifiedDate) {
    this.modifiedDate = modifiedDate;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }


}
