import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Visual.module.scss';

import Button from '../../../components/button/Button';

function Visual() {
  return (
    <div className={styles.visual}>
      <Swiper
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={styles.slide}
      >
        <SwiperSlide className={styles.introSlide}>
          <span className={styles.hide}>
            글깨비: 글 읽기와 쓰기를 더 재미있게 깨우고, 배우고, 가지고 노는
            비밀 친구 같은 도깨비
          </span>
        </SwiperSlide>
        <SwiperSlide className={styles.bookSlide}>
          <span className={styles.hide}>
            글깨비가 추천하는 오늘의 책: 신작과 추천 도서, 지금 확인하세요!
          </span>
          <Button variant="pushable" colors="mint" onClick={null}>
            신작·추천 도서 보러가기
          </Button>
        </SwiperSlide>
        <SwiperSlide className={styles.boardSlide}>
          <span className={styles.hide}>
            글깨비 친구들과 함께 놀자! 읽고, 쓰고, 나누는 즐거움. 나만의
            이야기를 써보세요!
          </span>
          <Button variant="pushable" colors="yellow" onClick={null}>
            글쓰러 가기
          </Button>
        </SwiperSlide>
        <SwiperSlide className={styles.quizSlide}>
          <span className={styles.hide}>
            오늘의 하이라이트. 신나는~ 퀴즈게임
          </span>
          <Button variant="pushable" colors="orange" onClick={null}>
            퀴즈 풀기
          </Button>
        </SwiperSlide>
        <SwiperSlide className={styles.campaignSlide}>
          <span className={styles.hide}>
            글깨비 클린 캠페인: 부적절한 글과 악플은 NO! 서로를 배려해요.
          </span>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Visual;
