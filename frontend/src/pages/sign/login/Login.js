import { Link, useNavigate } from 'react-router-dom';
import Button from './../../../components/button/Button';
import styles from './Login.module.scss';

import { FaKey, FaUser } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import TextInput from '../../../components/input/text-input/TextInput';
import { loginedData } from '../../../store/user/userSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = e.target.userId.value;
    const userPw = e.target.userPw.value;

    try {
      const result = await dispatch(loginedData({ userId, userPw })).unwrap();

      if (result) {
        // 로그인 성공 시 메인페이지로 이동
        navigate('/');
      } else {
        // 로그인 실패 시 패스워드 input 초기화
        e.target.userPw.value = '';
        e.target.userPw.focus();
      }
    } catch (error) {
      console.log('login err: ', error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.inputContent}>
        <div className={styles.id}>
          <label htmlFor="userId" className={styles.icon}>
            <FaUser />
          </label>
          <TextInput id="userId" name="userId" placeholder="아이디" autoFocus />
        </div>
        <div className={styles.pw}>
          <label htmlFor="userPw" className={styles.icon}>
            <FaKey />
          </label>
          <TextInput
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
        <Button
          variant="pushable"
          colors="gray"
          type="button"
          onClick={() => navigate('/sign/join')}
        >
          회원가입
        </Button>
        <div className={styles.find}>
          <Link to="/find">아이디/비밀번호 찾기</Link>
        </div>
      </div>
    </form>
  );
}

export default Login;
