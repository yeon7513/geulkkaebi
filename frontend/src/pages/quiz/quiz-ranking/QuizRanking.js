import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function QuizRanking({ score, quizType }) {
  const navigate = useNavigate();

  const { loginedUser } = useSelector((state) => state.userSlice);

  console.log(score);

  console.log(quizType);

  const handleReset = () => {
    navigate(`/quiz/${quizType}`);
  };

  return (
    <div>
      <p>점수: {score}</p>
      {!loginedUser && (
        <div>
          <p>
            점수 랭킹과 오답 복습은 회원 전용 기능입니다.
            <br />
            <Link to="/sign/login">로그인</Link> 또는
            <Link to="/sign/join">회원가입</Link> 후 이용해주세요.
          </p>
        </div>
      )}
      <Link to="/quiz">다시 도전!</Link>
      {loginedUser && <button onClick={handleReset}>오답 다시 풀어보기</button>}
    </div>
  );
}

export default QuizRanking;
