package kr.ac.kopo.geulkkaebi.quiz.word;

import org.apache.ibatis.type.Alias;

@Alias("quizWdDto")
public class QuizWord {

  private int quizNo;
  private String question;
  private String option1;
  private String option2;
  private String option3;
  private String option4;
  private String correctOption;
  private int difficulty;

}
