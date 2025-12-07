package kr.ac.kopo.geulkkaebi.quiz;

import java.util.List;
import java.util.Map;
import kr.ac.kopo.geulkkaebi.quiz.proverb.QuizProverb;
import kr.ac.kopo.geulkkaebi.quiz.word.QuizWord;

public interface QuizDao {

  List<Quiz> selectAllQuizList();

  List<QuizWord> selectAllWordQuiz();

  List<QuizProverb> selectAllProverbQuiz();

  void insertQuiz(Map<String, Object> quizData);

  List<QuizWord> selectRandomWordQuiz();

  List<QuizProverb> selectRandomProverbQuiz();

}
