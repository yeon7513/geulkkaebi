import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useEffect, useRef, useState } from 'react';
import Goto from '../../components/goto/Goto';
import Board from '../board/Board';
import Book from '../books/Book';
import Support from '../support/Support';
import Container from './../../components/layout/container/Container';
import styles from './Home.module.scss';
import Visual from './visual/Visual';

gsap.registerPlugin(ScrollToPlugin);

function Home() {
  const homeRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const sections = homeRef.current.querySelectorAll('section');
    const footer = document.querySelector('footer');
    sectionRefs.current = [...sections, footer];

    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && currentIndex < sectionRefs.current.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex]);

  useEffect(() => {
    const targetSection = sectionRefs.current[currentIndex];
    if (targetSection) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetSection, offsetY: 0 },
        ease: 'power2.inOut',
      });
    }
  }, [currentIndex]);

  return (
    <div className={styles.home} ref={homeRef}>
      {/* 메인 슬라이드 */}
      <section className={styles.visual}>
        <Visual />
        <Container className={styles.goto}>
          {/* 바로가기 */}
          <Goto />
        </Container>
      </section>
      {/* 신작 및 추천 도서 */}
      <section className={styles.books}>
        <Book />
      </section>
      {/* 오늘의 인기글 */}
      <section className={styles.board}>
        <Container>
          <Board />
        </Container>
      </section>
      {/* 공지사항 및 이벤트 */}
      <section className={styles.notice}>
        <Container>
          <Support />
        </Container>
      </section>
    </div>
  );
}

export default Home;
