import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Button from './../../../components/button/Button';
import styles from './Login.module.scss';

import { FaKey, FaUser } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { loginedData } from '../../../store/user/userSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = e.target.userId.value;
    const userPw = e.target.userPw.value;

    try {
      const result = dispatch(loginedData({ userId, userPw }));

      if (result) {
        navigate('/');
      }
    } catch (error) {
      alert('로그인 실패');
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputContent}>
        <div className={styles.id}>
          <label htmlFor="userId" className={styles.icon}>
            <FaUser />
          </label>
          <Input id="userId" name="userId" placeholder="아이디" />
        </div>
        <div className={styles.pw}>
          <label htmlFor="userPw" className={styles.icon}>
            <FaKey />
          </label>
          <Input
            id="userPw"
            name="userPw"
            type="password"
            placeholder="비밀번호"
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Button variant="pushable" type="submit">
          로그인
        </Button>
        <div className={styles.find}>
          <Link to="/find">아이디/비밀번호 찾기</Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
