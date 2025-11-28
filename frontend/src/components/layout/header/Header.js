import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../logo/Logo';
import { Nav, NavLink } from '../nav/Nav';
import { gnb } from './../../../lib/menus';
import Container from './../container/Container';
import styles from './Header.module.scss';

import { useEffect, useState } from 'react';
import { BiSolidLogInCircle, BiSolidUserPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { loginCheck, logout } from '../../../store/user/userSlice';

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isShrink, setIsShrink] = useState(pathname !== '/');

  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (pathname !== '/') {
      setIsShrink(true);
      return;
    }

    setIsShrink(false);

    const handleScroll = () => {
      setIsShrink(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

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
                <li>{loginedUser.nickname}님, 안녕하세요!</li>
                <button onClick={handleLogout}>로그아웃</button>
                {loginedUser.adminYn === 1 ? (
                  <NavLink path="/manager">관리자 페이지</NavLink>
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
