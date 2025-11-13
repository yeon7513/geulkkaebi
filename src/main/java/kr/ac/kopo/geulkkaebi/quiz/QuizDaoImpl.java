package kr.ac.kopo.geulkkaebi.quiz;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import kr.ac.kopo.geulkkaebi.quiz.proverb.QuizProverb;
import kr.ac.kopo.geulkkaebi.quiz.word.QuizWord;

@Repository("quiz")
public class QuizDaoImpl implements QuizDao {

  @Autowired
  SqlSession sql;

  @Override
  public List<Quiz> selectAllQuizList() {
    return sql.selectList("quiz.selectAllQuizList");
  }

  @Override
  public List<QuizWord> selectAllWordQuiz() {
    return sql.selectList("quiz.selectAllWordQuiz");
  }

  @Override
  public List<QuizProverb> selectAllProverbQuiz() {
    return sql.selectList("quiz.selectAllProverbQuiz");
  }

  // 퀴즈 등록
  @Override
  public void insertQuiz(Map<String, Object> quizData) {
    sql.insert("quiz.insertQuiz", quizData);
  }


}
