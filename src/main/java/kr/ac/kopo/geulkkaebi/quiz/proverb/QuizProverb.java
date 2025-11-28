package kr.ac.kopo.geulkkaebi.quiz.proverb;

import org.apache.ibatis.type.Alias;

@Alias("quizPvDto")
public class QuizProverb {

  private int quizNo;
  private String question;
  private String answer;
  private String commentary;
  private int difficulty;

}
