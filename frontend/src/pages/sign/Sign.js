import { Link, Outlet, useLocation } from 'react-router-dom';
import Logo from './../../components/logo/Logo';
import styles from './Sign.module.scss';

function Sign() {
  const { pathname } = useLocation();

  return (
    <div className={styles.wrap}>
      <div className={styles.sign}>
        <header>
          <Logo isShow={false} className={styles.logo} />
        </header>
        <div className={styles.form}>
          <Outlet />
        </div>
        <div className={styles.check}>
          {pathname.includes('login') ? (
            <>
              <p>처음이신가요?</p>
              <Link to="/sign/join">회원가입하기</Link>
            </>
          ) : (
            <>
              <p>아이디가 있으신가요?</p>
              <Link to="/sign/login">로그인하기</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sign;
