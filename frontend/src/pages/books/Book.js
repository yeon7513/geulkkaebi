import gsap from 'gsap';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Goto from '../../components/goto/Goto';
import SearchBox from '../../components/input/search-box/SearchBox';
import Container from '../../components/layout/container/Container';
import { searchBookList } from '../../store/book/bookSlice';
import { randomText } from './../../utils/randomText';
import styles from './Book.module.scss';

const randomKeywordList = [
  '떡이 입안에 떡! : 열두 달 맛있는 우리 떡 이야기',
  '100층 짜리 집',
  '긴긴밤',
  '나는 빛나는 3학년이야',
  '모두 행복해지는 말',
  '머리카락이 자라면',
  '훌쩍훌쩍 노랑이',
  '언제나 다정 죽집 2: 고양이롤의 비밀',
  '싫어요! 나가고 싶지 않아요',
  '책 읽는 고양이 서꽁치',
];

function Book() {
  const { bookList, total } = useSelector((state) => state.bookSlice);
  const { pathname } = useLocation();
  const disaptch = useDispatch();
  const navigate = useNavigate();

  const randomKeyword = useMemo(() => randomText(randomKeywordList), []);
  // 검색 키워드 관리 state
  const [currentKeyword, setCurrentKeyword] = useState(randomKeyword);

  const isHome = pathname === '/';
  const [displayCount, setDisplayCount] = useState(isHome ? 8 : 16);

  const handleSearch = async (keyword) => {
    setCurrentKeyword(keyword);
    disaptch(searchBookList({ title: keyword, display: displayCount }));
    setDisplayCount(isHome ? 8 : 16);
  };

  const handleMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  // top 버튼
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  useEffect(() => {
    disaptch(searchBookList({ title: currentKeyword, display: displayCount }));
  }, [disaptch, currentKeyword, displayCount]);

  return (
    <div className={styles.book}>
      {!isHome && (
        <Goto
          className={styles.toTop}
          onClickToTop={scrollToTop}
          isScroll={true}
        />
      )}
      <Container>
        {isHome ? (
          <h3>지금 바로 읽고 싶은 책을 검색해볼까요?</h3>
        ) : (
          <h3>어떤 책이 궁금한가요?</h3>
        )}
        <SearchBox
          className={styles.search}
          keyword={randomKeyword}
          onSearch={handleSearch}
        />
        {!bookList || bookList.length === 0 ? (
          <div className={styles.noSearch}>
            <p>검색된 도서가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.bookList}>
            {bookList.map((item, idx) => (
              <div
                key={idx}
                className={styles.bookItem}
                onClick={() => navigate(`/book/detail/${item.isbn}`)}
              >
                <img src={item.image} alt={item.title} />
                <div className={styles.contents}>
                  <h4>{item.title}</h4>
                  <ul>
                    <li className={styles.author}>
                      <span>저자</span>
                      {item.author}
                    </li>
                    <li className={styles.publisher}>
                      <span>출판사</span>
                      {item.publisher}
                    </li>
                  </ul>
                  <p>{item.description || '책 소개가 없습니다.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isHome && bookList.length < total && (
          <div className={styles.moreBtn}>
            <Button onClick={handleMore} variant="pushable" colors="mint">
              더보기
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Book;
