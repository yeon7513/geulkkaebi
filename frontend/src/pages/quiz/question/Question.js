import cn from 'classnames';
import { useSelector } from 'react-redux';
import Button from '../../../components/button/Button';
import RadioButton from '../../../components/input/radio-button/RadioButton';
import styles from './Question.module.scss';

import { useRef } from 'react';
import { TbBulbFilled } from 'react-icons/tb';

function Question({ quiz, quizNum, themeColor, onSubmit }) {
  const { loginedUser } = useSelector((state) => state.userSlice);

  const inputRef = useRef();

  const handleSendResult = (e) => {
    e.preventDefault();

    const answer = e.target.answer.value;
    const isCorrect = answer === quiz.answer;

    if (!answer && quiz.quizType === 'proverb') {
      alert('정답을 입력해주세요.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    if (!answer && quiz.quizType === 'word') {
      alert('정답을 선택해주세요.');
      return;
    }

    const result = {
      quizNo: quiz.quizNo,
      userId: loginedUser?.userId || null,
      quizType: quiz.quizType,
      userAnswer: answer,
      correctAnswer: quiz.answer,
      commentary: quiz.commentary || null,
      isCorrect: isCorrect,
    };

    onSubmit(result);
  };

  return (
    <div className={styles.contents}>
      <h3>
        {quizNum}. {quiz.question}
      </h3>
      <form onSubmit={handleSendResult}>
        {quiz.quizType === 'word' ? (
          <div className={styles.selectAnswer}>
            {quiz.options.map((op, idx) => (
              <RadioButton
                key={idx}
                className={cn(styles.option, styles[themeColor])}
                name="answer"
                value={op}
              >
                {op}
              </RadioButton>
            ))}
          </div>
        ) : (
          <div className={styles.inputAnswer}>
            <label htmlFor="answer">
              <TbBulbFilled />
            </label>
            <input
              ref={inputRef}
              type="text"
              id="answer"
              name="answer"
              autoComplete="off"
            />
          </div>
        )}
        <div className={styles.submit}>
          <Button type="submit" colors={themeColor}>
            제출
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Question;
