import cn from 'classnames';
import styles from './BookList.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { useLocation } from 'react-router-dom';
import { EffectCards } from 'swiper/modules';

function BookList({ list, className }) {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === '/' ? (
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className={cn(styles.bookSilde, className)}
        >
          {list.map((item, idx) => (
            <SwiperSlide key={idx} className={styles.bookItem}>
              <img src={item.cover} alt={`${item.title} 표지`} />
              <div className={styles.contents}>
                <div className={styles.title}>
                  <h4>{item.title}</h4>
                  <ul className={styles.info}>
                    <li>
                      <span>지은이</span>
                      <span>{item.author}</span>
                    </li>
                    <li>
                      <span>출판사</span>
                      <span>{item.publisher}</span>
                    </li>
                    <li>
                      <span>장르</span>
                      <span>{item.genre}</span>
                    </li>
                    <li>
                      <span>출간일</span>
                      <span>{item.releaseDate}</span>
                    </li>
                    <li>
                      <span>페이지수</span>
                      <span>{item.pages}쪽</span>
                    </li>
                  </ul>
                </div>
                <p>{item.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>booklist</div>
      )}
    </>
  );
}

export default BookList;
