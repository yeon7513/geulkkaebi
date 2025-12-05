import gsap from 'gsap';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import Goto from '../../components/goto/Goto';
import SearchBox from '../../components/input/search-box/SearchBox';
import Container from '../../components/layout/container/Container';
import {
  clearBookList,
  searchBookList,
  setKeyword,
} from '../../store/book/bookSlice';
import { randomText } from './../../utils/randomText';
import styles from './Book.module.scss';

import NaverOpenApi from '../../assets/img/naver_open_api.png';

const randomKeywordList = [
  '떡이 입안에 떡!',
  '100층 짜리 집',
  '긴긴밤',
  '나는 빛나는 3학년이야',
  '모두 행복해지는 말',
  '머리카락이 자라면',
  '훌쩍훌쩍 노랑이',
  '언제나 다정 죽집',
  '싫어요! 나가고 싶지 않아요',
  '책 읽는 고양이 서꽁치',
];

function Book() {
  const { bookList, bookItem, savedKeyword, total } = useSelector(
    (state) => state.bookSlice
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 최초 렌더링 시 랜덤 키워드
  const randomKeyword = useMemo(() => randomText(randomKeywordList), []);
  // 검색 키워드 관리 state
  const [currentKeyword, setCurrentKeyword] = useState(
    savedKeyword || randomKeyword
  );

  const isHome = pathname === '/';
  const [displayCount, setDisplayCount] = useState(isHome ? 8 : 16);

  const handleSearch = async (keyword) => {
    setCurrentKeyword(keyword);
    // 상세페이지 이동 후 뒤로가기 했을때
    // 검색한 내용을 남기기 위해 추가
    dispatch(setKeyword(keyword));
    setDisplayCount(isHome ? 8 : 16);
  };

  // 더보기 버튼 핸들러
  const handleMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  // top 버튼
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
  };

  useEffect(() => {
    if (currentKeyword) {
      dispatch(
        searchBookList({ title: currentKeyword, display: displayCount })
      );
    }
  }, [dispatch, currentKeyword, displayCount]);

  // 최초 진입 시에만 랜덤 키워드 저장
  // 또한, 검색어를 리덕스에도 저장
  // -> 뒤로가기 눌렀을 경우 다시 렌더링하기 위해
  useEffect(() => {
    if (!savedKeyword) {
      // 최초 진입 또는 다른 메뉴에서 Book 페이지로 들어왔을 때 초기화
      const keyword = randomKeyword;
      setCurrentKeyword(keyword);
      dispatch(setKeyword(keyword));
    } else {
      // 뒤로가기 등으로 이미 savedKeyword가 있을 경우 유지
      setCurrentKeyword(savedKeyword);
    }
  }, [dispatch, savedKeyword, randomKeyword, currentKeyword]);

  // 2025.12.01 구현 실패.. 나중에 수정할 것..
  useEffect(() => {
    return () => {
      // '/book/~~' 경로가 아닐 경우에만 초기화
      if (!pathname.startsWith('/book')) {
        dispatch(setKeyword(''));
        dispatch(clearBookList());
      }
    };
  }, [dispatch, pathname]);

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
          keyword={currentKeyword}
          onSearch={handleSearch}
        />
        {!bookList || (bookList.length === 0 && !bookItem) ? (
          <div className={styles.noSearch}>
            <p>검색된 도서가 없습니다.</p>
          </div>
        ) : (
          <div className={styles.bookList}>
            {bookList.length > 0 ? (
              bookList.map((item, idx) => (
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
              ))
            ) : (
              <div
                className={styles.bookItem}
                onClick={() => navigate(`/book/detail/${bookItem.isbn}`)}
              >
                <img src={bookItem.image} alt={bookItem.title} />
                <div className={styles.contents}>
                  <h4>{bookItem.title}</h4>
                  <ul>
                    <li className={styles.author}>
                      <span>저자</span>
                      {bookItem.author}
                    </li>
                    <li className={styles.publisher}>
                      <span>출판사</span>
                      {bookItem.publisher}
                    </li>
                  </ul>
                  <p>{bookItem.description || '책 소개가 없습니다.'}</p>
                </div>
              </div>
            )}
          </div>
        )}
        {!isHome && bookList.length < total && (
          <div className={styles.moreBtn}>
            <Button onClick={handleMore} variant="pushable" colors="mint">
              더보기
            </Button>
          </div>
        )}
        <div className={styles.apiSource}>
          <Link to="http://developers.naver.com" target="_blank">
            <img src={NaverOpenApi} alt="NAVER 오픈 API" />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Book;
