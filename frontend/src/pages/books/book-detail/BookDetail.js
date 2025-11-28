import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { searchBookList } from '../../../store/book/bookSlice';
import { formatDate } from '../../../utils/formatCreatedAt';
import styles from './BookDetail.module.scss';

function BookDetail() {
  const { isbn } = useParams();
  const { bookItem } = useSelector((state) => state.bookSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(searchBookList({ display: 1, isbn: isbn }));
  }, [dispatch, isbn]);

  if (!bookItem) {
    return <div>정보를 불러오는 중이에요!</div>;
  }

  return (
    <div className={styles.detail}>
      <div>
        <button onClick={() => navigate(-1)}>뒤로</button>
      </div>
      <div>
        <img src={bookItem.image} alt="" />
        <div className={styles.contents}>
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
          <div>
            <Link to={bookItem.link} target="_blank">
              구매하기
            </Link>
          </div>
          <p>{bookItem.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
