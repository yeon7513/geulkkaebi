import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../../components/button/Button';
import styles from './QuizRanking.module.scss';
import QuizRankingBoard from './quiz-ranking-board/QuizRankingBoard';

const title = {
  word: '단어 탐험대',
  proverb: '속담 마법사',
};

const quizTypeColor = {
  word: 'green',
  proverb: 'purple',
};

function QuizRanking({ score, quizType }) {
  const navigate = useNavigate();

  const { loginedUser } = useSelector((state) => state.userSlice);

  const handleReset = () => {
    navigate(`/quiz/${quizType}`);
  };

  return (
    <div className={styles.wrap}>
      <h2>{title[quizType]}</h2>
      <QuizRankingBoard quizType={quizType} />
      <div className={styles.result}>
        <p className={styles.score}>
          점수:
          <span> {score}</span>
        </p>

        {!loginedUser ? (
          <div className={styles.nologin}>
            <p>
              점수 랭킹과 오답 복습은 회원 전용 기능입니다.
              <br />
              <Link
                to="/sign/login"
                className={styles[quizTypeColor[quizType]]}
              >
                로그인
              </Link>{' '}
              또는{' '}
              <Link to="/sign/join" className={styles[quizTypeColor[quizType]]}>
                회원가입
              </Link>{' '}
              후 이용해주세요.
            </p>
          </div>
        ) : (
          <div className={styles.member}>
            <p>
              {loginedUser.nickname}님, 오늘도 퀴즈 도전 중이군요!
              <br /> 점수 랭킹에서 나의 순위를 확인하고, 오답 복습으로 실력을
              쌓아보세요.
            </p>
          </div>
        )}
        <div className={styles.btnGroup}>
          <Button
            colors={quizTypeColor[quizType]}
            onClick={() => navigate('/quiz')}
          >
            다시 도전!
          </Button>
          {loginedUser && (
            <Button colors="yellow" onClick={handleReset}>
              오답 다시 풀어보기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizRanking;
