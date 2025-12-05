import { Outlet } from 'react-router-dom';
import Logo from './../../components/logo/Logo';
import styles from './Sign.module.scss';

function Sign() {
  return (
    <div className={styles.wrap}>
      <div className={styles.sign}>
        <header>
          <Logo isShow={false} className={styles.logo} />
        </header>
        <div className={styles.form}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sign;
