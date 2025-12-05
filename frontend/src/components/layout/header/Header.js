import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import Logo from '../../logo/Logo';
import { Nav, NavLink } from '../nav/Nav';
import { gnb } from './../../../lib/menus';
import Container from './../container/Container';
import styles from './Header.module.scss';

import { useEffect } from 'react';
import { BiSolidLogInCircle, BiSolidUserPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { loginCheck, logout } from '../../../store/user/userSlice';

function Header() {
  const navigate = useNavigate();

  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    dispatch(loginCheck());
  }, [dispatch]);

  return (
    <header className={cn(styles.header)}>
      <Container className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.menu}>
          <ul className={styles.utils}>
            {!loginedUser ? (
              <>
                <NavLink path="sign/login" comp="Login">
                  <BiSolidLogInCircle /> 로그인
                </NavLink>
                <NavLink path="sign/join" comp="Join">
                  <BiSolidUserPlus /> 회원가입
                </NavLink>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
                {loginedUser.adminYn === 1 ? (
                  <>
                    <NavLink path="mypage">마이페이지</NavLink>
                    <NavLink path="/manager">관리자 페이지</NavLink>
                  </>
                ) : (
                  <NavLink path="mypage">마이페이지</NavLink>
                )}
              </>
            )}
          </ul>
          <Nav menus={gnb} className={styles.item} />
        </div>
      </Container>
    </header>
  );
}

export default Header;
