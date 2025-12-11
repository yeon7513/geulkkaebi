import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextIcon from '../../../components/text-icon/TextIcon';
import { fetchQuizResult } from '../../../store/quiz/quizResultSlice';
import { formatDateTimeKorean } from '../../../utils/formatter';
import styles from './MemberQuizResult.module.scss';

const quizTypes = {
  word: '단어 탐험대',
  proverb: '속담 마법사',
};

const quizTypeColors = {
  word: 'green',
  proverb: 'purple',
};

const isCorrect = (num) => {
  return num === 1 ? '정답' : '오답';
};

function MemberQuizResult() {
  const dispatch = useDispatch();

  const { quizResultList, totalPages } = useSelector(
    (state) => state.quizResultSlice
  );

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchQuizResult({ page, filter }));
  }, [dispatch, filter, page]);

  return (
    <div className={styles.wrap}>
      <h2>퀴즈 풀이 결과</h2>
      <div className={styles.dateNav}>
        <button>이전 날짜</button>
        <p>날짜</p>
        <button>다음 날짜</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>카테고리</th>
              <th>정답/오답</th>
              <th>풀이시간</th>
            </tr>
          </thead>
          <tbody>
            {quizResultList.map((qr) => (
              <tr key={qr.qrNo}>
                <td>
                  <TextIcon colors={quizTypeColors[qr.quizType]}>
                    {quizTypes[qr.quizType]}
                  </TextIcon>
                </td>
                <td>{isCorrect(qr.isCorrect)}</td>
                <td>{formatDateTimeKorean(qr.attemptedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberQuizResult;
