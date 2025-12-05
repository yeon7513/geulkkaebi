import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';
import { quiz } from '../../../lib/menus';
import styles from './QuizIntro.module.scss';

function QuizIntro() {
  const navigate = useNavigate();

  const { loginedUser } = useSelector((state) => state.userSlice);

  return (
    <div className={styles.wrap}>
      <h3>어떤 퀴즈 풀까요?</h3>
      <div className={styles.rule}>
        <h4>퀴즈 규칙</h4>
        <ul>
          <li>모든 퀴즈는 5문제씩 풀 수 있습니다.</li>
          <li>
            난이도에 따라 점수가 다릅니다.
            <ul>
              <li>0~10% : 5점</li>
              <li>11~30% : 4점</li>
              <li>31~50% : 3점</li>
              <li>51~70% : 2점</li>
              <li>71~100% : 1점</li>
            </ul>
          </li>
          {!loginedUser && (
            <li>
              점수 랭킹과 오답 복습은 회원 전용 기능입니다.
              <br />
              <Link to="/sign/login">로그인</Link> 또는{' '}
              <Link to="/sign/join">회원가입</Link> 후 이용해주세요.
            </li>
          )}
        </ul>
      </div>
      <ul className={styles.btns}>
        {quiz.map((menu, idx) => (
          <li key={idx}>
            <Button
              variant="pushable"
              colors={menu.color}
              onClick={() => navigate(menu.path)}
            >
              {menu.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizIntro;
