import { useState } from 'react';
import styles from './Question.module.scss';

function Question({ quizData }) {
  const [isCorrect, setIsCorrect] = useState(false);

  return <div className={styles.question}></div>;
}

export default Question;
