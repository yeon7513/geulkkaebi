import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import Logo from '../../logo/Logo';
import { Nav, NavLink } from '../nav/Nav';
import { gnb } from './../../../lib/menus';
import Container from './../container/Container';
import styles from './Header.module.scss';

import { BiSolidLogInCircle, BiSolidUserPlus } from 'react-icons/bi';

function Header() {
  const { pathname } = useLocation();

  return (
    <header
      className={cn(styles.header, pathname === '/' ? styles.position : '')}
    >
      <Container className={styles.container}>
        <ul className={styles.utils}>
          <NavLink path="sign/login" comp="Login">
            <BiSolidLogInCircle /> 로그인
          </NavLink>
          <NavLink path="sign/join" comp="Join">
            <BiSolidUserPlus /> 회원가입
          </NavLink>
        </ul>
        <Logo className={styles.logo} />
        <Nav menus={gnb} className={styles.item} />
      </Container>
    </header>
  );
}

export default Header;
