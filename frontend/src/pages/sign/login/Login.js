import Input from '../../../components/input/Input';
import Button from './../../../components/button/Button';
import styles from './Login.module.scss';

import { FaKey, FaUser } from 'react-icons/fa6';

function Login() {
  return (
    <form className={styles.loginForm} method="POST">
      <div className={styles.inputContent}>
        <div className={styles.id}>
          <label htmlFor="userid" className={styles.icon}>
            <FaUser />
          </label>
          <Input id="userid" name="userid" placeholder="아이디" />
        </div>
        <div className={styles.pw}>
          <label htmlFor="userpw" className={styles.icon}>
            <FaKey />
          </label>
          <Input
            id="userpw"
            name="userpw"
            type="password"
            placeholder="비밀번호"
          />
        </div>
      </div>
      <div className={styles.submit}>
        <Button type="submit">로그인</Button>
      </div>
    </form>
  );
}

export default Login;
