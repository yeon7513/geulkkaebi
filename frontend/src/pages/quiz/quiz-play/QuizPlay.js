import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { STATUS } from '../../../store/common/commoms';
import {
  clearQuizList,
  fetchRandomQuizList,
} from '../../../store/quiz/quizSlice';
import Question from '../question/Question';
import QuizRanking from '../quiz-ranking/QuizRanking';
import QuizResult from './../quiz-result/QuizResult';
import styles from './QuizPlay.module.scss';

const title = {
  word: '단어 탐험대',
  proverb: '속담 마법사',
};

function QuizPlay({ quizType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wordList, proverbList, status } = useSelector(
    (state) => state.quizSlice
  );

  const quizList = (quizType === 'word' ? wordList : proverbList).map(
    (item) => ({
      quizNo: item.qwdNo || item.qpvNo, // 공통 PK
      quizType: item.quizType, // word / proverb
      question: item.question,
      options: item.option1
        ? [item.option1, item.option2, item.option3, item.option4] // 객관식
        : null,
      answer: item.answer,
      commentary: item.commentary || null, // 속담만 존재
      difficulty: item.difficulty,
      creator: item.creator,
      createdAt: item.createdAt,
    })
  );

  // 문제 리스트의 인덱스 저장
  const [currentIdx, setCurrentIdx] = useState(0);
  // 점수 합산 -> 정답이면 올라감
  const [score, setScore] = useState(0);
  // 결과화면 렌더링용 state
  const [showResult, setShowResult] = useState(false);
  // 문제 풀이 완료 확인용 state
  const [isFinish, setIsFinish] = useState(false);
  // 비회원 전용 state
  // 회원은 DB에 바로 저장(insert)이 되지만,
  // 비회원은 저장을 할 수 없기 때문에 state로 관리함.
  const [results, setResults] = useState(null);

  const handleSubmitAnswer = (result) => {
    if (result.isCorrect) {
      setScore((prev) => prev + 1);
    }
    setResults(result);
    setShowResult(true);
  };

  // 다음 문제로 넘어감
  const handleNextQuiz = () => {
    if (currentIdx === quizList.length - 1) {
      setIsFinish(true);
      return;
    }

    setCurrentIdx((prev) => prev + 1);
    setResults(null);
    setShowResult(false);
  };

  useEffect(() => {
    dispatch(fetchRandomQuizList(quizType));

    return () => {
      dispatch(clearQuizList());
    };
  }, [dispatch, quizType]);

  if (status === STATUS.WAITING || status === STATUS.LOADING) {
    return (
      <div>
        <p>퀴즈를 준비중이에요!</p>
      </div>
    );
  }

  if (isFinish) {
    return <QuizRanking score={score} quizType={quizType} />;
  }

  return (
    <div className={styles.quizPlay}>
      <h2>{title[quizType]}</h2>
      <Button onClick={() => navigate('/quiz')}>처음으로</Button>
      <div>
        {showResult ? (
          <QuizResult
            results={results}
            isLast={currentIdx === quizList.length - 1}
            onNext={handleNextQuiz}
          />
        ) : (
          <Question
            quiz={quizList[currentIdx]}
            quizNum={currentIdx + 1}
            onSubmit={handleSubmitAnswer}
          />
        )}
      </div>
    </div>
  );
}

export default QuizPlay;
