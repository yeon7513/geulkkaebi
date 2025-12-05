import { formatLineBreaks } from '../../../utils/formatter';
import styles from './QuizResult.module.scss';

function QuizResult({ results, isLast, onNext }) {
  console.log(results);

  return (
    <div className={styles.wrap}>
      <h3>{results.isCorrect ? '정답입니다!' : '오답입니다.'}</h3>
      <div className={styles.result}>
        {results.commentary && <p>{formatLineBreaks(results.commentary)}</p>}
        <button onClick={onNext}>
          {isLast ? '랭킹 확인하기' : '다음 문제 풀기'}
        </button>
      </div>
    </div>
  );
}

export default QuizResult;
