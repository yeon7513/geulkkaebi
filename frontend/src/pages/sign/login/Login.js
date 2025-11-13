import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/input/Input';
import Button from './../../../components/button/Button';
import styles from './Login.module.scss';

import { FaKey, FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { loginedData } from '../../../store/user/userSlice';

function Login() {
  const { list } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = e.target.id.value;
    const pw = e.target.pw.value;

    try {
      const result = dispatch(loginedData({ id, pw }));

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
          <label htmlFor="userid" className={styles.icon}>
            <FaUser />
          </label>
          <Input id="userid" name="id" placeholder="아이디" />
        </div>
        <div className={styles.pw}>
          <label htmlFor="userpw" className={styles.icon}>
            <FaKey />
          </label>
          <Input id="userpw" name="pw" type="password" placeholder="비밀번호" />
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
