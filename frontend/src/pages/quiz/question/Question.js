import { useSelector } from 'react-redux';
import RadioButton from '../../../components/input/radio-button/RadioButton';
import styles from './Question.module.scss';

function Question({ quiz, quizNum, onSubmit }) {
  const { loginedUser } = useSelector((state) => state.userSlice);

  console.log(loginedUser);

  const handleSendResult = (e) => {
    e.preventDefault();

    const answer = e.target.answer.value;
    const isCorrect = answer === quiz.answer;

    const result = {
      qrNo: quiz.quizNo,
      userId: loginedUser.userId || null,
      quizType: quiz.quizType,
      userAnswer: answer,
      correctAnswer: quiz.answer,
      commentary: quiz.commentary || null,
      isCorrect: isCorrect,
    };

    onSubmit(result);
  };

  return (
    <div>
      <div>
        <h3>
          {quizNum}. {quiz.question}
        </h3>
      </div>
      <form onSubmit={handleSendResult}>
        {quiz.quizType === 'word' ? (
          <div className={styles.selectAnswer}>
            {quiz.options.map((op, idx) => (
              <RadioButton key={idx} name="answer" value={op}>
                {op}
              </RadioButton>
            ))}
          </div>
        ) : (
          <div className={styles.inputAnswer}>
            <input type="text" id="answer" name="answer" autoComplete="off" />
          </div>
        )}
        <div>
          <button type="submit">제출</button>
        </div>
      </form>
    </div>
  );
}

export default Question;
