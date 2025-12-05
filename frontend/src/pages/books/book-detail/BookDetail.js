import { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Container from '../../../components/layout/container/Container';
import { searchBookList } from '../../../store/book/bookSlice';
import { formatDate } from '../../../utils/formatter';
import styles from './BookDetail.module.scss';

function BookDetail() {
  const { isbn } = useParams();
  const { bookItem } = useSelector((state) => state.bookSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchBookList({ display: 1, isbn: isbn }));
  }, [dispatch, isbn]);

  // 페이지 불러오는중..
  if (!bookItem) {
    return <div>정보를 불러오는 중이에요!</div>;
  }

  return (
    <div className={styles.detail}>
      <Container className={styles.container}>
        <div className={styles.contents}>
          <img src={bookItem.image} alt="" />
          <div className={styles.info}>
            <h3>{bookItem.title}</h3>
            <ul>
              <li>
                <span>저자</span>
                {bookItem.author}
              </li>
              <li>
                <span>출판사</span>
                {bookItem.publisher}
              </li>
              <li>
                <span>출판일</span>
                {formatDate(bookItem.pubdate)}
              </li>
            </ul>
            <p>{bookItem.description}</p>
            <div className={styles.btns}>
              <Button
                className={styles.back}
                colors="gray"
                onClick={() => navigate('/book')}
              >
                <FaArrowLeft />
              </Button>
              <Link
                to={bookItem.link}
                target="_blank"
                className={styles.purchase}
              >
                구매하기
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default BookDetail;
