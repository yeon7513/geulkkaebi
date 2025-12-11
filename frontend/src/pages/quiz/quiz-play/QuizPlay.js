import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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

import { IoArrowBackOutline } from 'react-icons/io5';

const title = {
  word: '단어 탐험대',
  proverb: '속담 마법사',
};

const quizTypeColor = {
  word: 'green',
  proverb: 'purple',
};

function QuizPlay({ quizType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wordList, proverbList, status } = useSelector(
    (state) => state.quizSlice
  );

  const { loginedUser } = useSelector((state) => state.userSlice);

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
  // 문제 풀이 누적 결과
  // -> 회원은 이 데이터를 바로 insert
  // -> 비회원은 화면에 보여주기만! insert X
  const [results, setResults] = useState();

  const [saveResult, setSaveResult] = useState([]);

  const handleSaveResult = (result) => {
    if (result.isCorrect) {
      setScore((prev) => prev + 1);
    }

    setResults(result);
    setSaveResult((prev) => [...prev, result]);
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

  // 퀴즈 결과 전송
  const sendResultsToServer = useCallback(async () => {
    // 비회원이면 전송 X
    if (!loginedUser) return;

    // 서버용 데이터 변환
    const processData = saveResult.map((item) => ({
      ...item,
      isCorrect: item.isCorrect ? 1 : 0,
    }));

    try {
      await axios.post('/quizResult/save', processData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  }, [loginedUser, saveResult]);

  useEffect(() => {
    dispatch(fetchRandomQuizList(quizType));

    return () => {
      dispatch(clearQuizList());
    };
  }, [dispatch, quizType]);

  useEffect(() => {
    if (isFinish) {
      sendResultsToServer();
    }
  }, [isFinish, sendResultsToServer]);

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
      <div className={styles.title}>
        <Button
          className={styles.backBtn}
          colors={quizTypeColor[quizType]}
          onClick={() => navigate('/quiz')}
        >
          <IoArrowBackOutline />
        </Button>
        <h2>{title[quizType]}</h2>
      </div>
      <div className={styles.display}>
        {showResult ? (
          <QuizResult
            results={results}
            themeColor={quizTypeColor[quizType]}
            isLast={currentIdx === quizList.length - 1}
            onNext={handleNextQuiz}
          />
        ) : (
          <Question
            quiz={quizList[currentIdx]}
            quizNum={currentIdx + 1}
            themeColor={quizTypeColor[quizType]}
            onSubmit={handleSaveResult}
          />
        )}
      </div>
    </div>
  );
}

export default QuizPlay;
