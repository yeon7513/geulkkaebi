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

  const { list } = useSelector((state) => state.userSlice);
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
    <header
      className={cn(
        styles.header,
        isShrink ? styles.shrink : '',
        pathname === '/' ? styles.fixed : ''
      )}
    >
      <Container className={styles.container}>
        <ul className={styles.utils}>
          {list.length === 0 ? (
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
              <li>{list.nickname}님, 안녕하세요!</li>
              <button onClick={handleLogout}>로그아웃</button>
              {list.adminYn === 'Y' ? (
                <NavLink path="/manager">관리자 페이지</NavLink>
              ) : (
                <NavLink path="mypage">마이페이지</NavLink>
              )}
            </>
          )}
        </ul>
        <Logo isShow={!isShrink} className={styles.logo} />
        <Nav menus={gnb} className={styles.item} />
      </Container>
    </header>
  );
}

export default Header;
