import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Goto from '../../components/goto/Goto';
import PopularPosts from '../board/popularPosts/PopularPosts';
import Book from '../books/Book';
import Login from '../sign/login/Login';
import SupportIntro from '../support/support-intro/SupportIntro';
import Container from './../../components/layout/container/Container';
import MemberInformation from './../member/member-information/MemberInformation';
import styles from './Home.module.scss';
import Visual from './visual/Visual';

import cn from 'classnames';

gsap.registerPlugin(ScrollToPlugin);

function Home() {
  const [isShow, setIsShow] = useState(false);
  const visualRef = useRef(null);

  const { loginedUser } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!visualRef.current) return;

      const visualBottom = visualRef.current.getBoundingClientRect().bottom;
      setIsShow(visualBottom < 0); // visual이 화면 위로 벗어나면 true
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 상태 체크

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.home}>
      <Goto isScroll={isShow} onClickToTop={scrollToTop} />
      {/* 메인 슬라이드 */}
      <section className={styles.visual} ref={visualRef}>
        <Visual />
        {!loginedUser ? (
          <div className={cn(styles.member, styles.login)}>
            <h2>로그인</h2>
            <Login />
          </div>
        ) : (
          <div className={cn(styles.member, styles.memberInfo)}>
            <MemberInformation />
          </div>
        )}
      </section>
      {/* 도서 검색 */}
      <section className={styles.books}>
        <Book />
      </section>
      {/* 오늘의 인기글 */}
      <section className={styles.board}>
        <Container>
          <PopularPosts />
        </Container>
      </section>
      {/* 공지사항 및 이벤트 */}
      <section className={styles.notice}>
        <SupportIntro />
      </section>
    </div>
  );
}

export default Home;
