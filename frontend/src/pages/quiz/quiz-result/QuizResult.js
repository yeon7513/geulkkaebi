import Button from '../../../components/button/Button';
import ParticleEffect from '../../../components/particle-effect/ParticleEffect';
import { formatLineBreaks } from '../../../utils/formatter';
import styles from './QuizResult.module.scss';

function QuizResult({ themeColor, results, isLast, onNext }) {
  console.log(results);

  return (
    <div className={styles.wrap}>
      <ParticleEffect type={results.isCorrect ? 'confetti' : 'rain'} />
      <h3>{results.isCorrect ? '정답입니다!' : '오답입니다.'}</h3>
      <div className={styles.result}>
        {results.commentary && <p>{formatLineBreaks(results.commentary)}</p>}
        <Button colors={themeColor} onClick={onNext}>
          {isLast ? '랭킹 확인하기' : '다음 문제 풀기'}
        </Button>
      </div>
    </div>
  );
}

export default QuizResult;
