package kr.ac.kopo.geulkkaebi.quiz.proverb;

import org.apache.ibatis.type.Alias;

@Alias("quizPvDto")
public class QuizProverb {

  private int quizNo;
  private String question;
  private String answer;
  private String commentary;
  private int difficulty;

  public int getQuizNo() {
    return quizNo;
  }

  public void setQuizNo(int quizNo) {
    this.quizNo = quizNo;
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



}
