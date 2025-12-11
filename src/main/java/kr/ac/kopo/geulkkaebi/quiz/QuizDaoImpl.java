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

  // 단어 퀴즈 랜덤 조회
  @Override
  public List<QuizWord> selectRandomWordQuiz() {
    return sql.selectList("quiz.selectRandomWordQuiz");
  }

  // 속담 퀴즈 랜덤 조회
  @Override
  public List<QuizProverb> selectRandomProverbQuiz() {
    return sql.selectList("quiz.selectRandomProverbQuiz");
  }

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

  // 난이도 조회
  @Override
  public double selectWordDifficulty(Long quizNo) {
    return sql.selectOne("quiz.selectWordDifficulty", quizNo);
  }

  @Override
  public double selectProverbDifficulty(Long quizNo) {
    return sql.selectOne("quiz.selectProverbDifficulty", quizNo);
  }

}
