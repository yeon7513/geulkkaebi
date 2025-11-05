import { useState } from 'react';
import Button from '../../components/button/Button';
import Container from '../../components/layout/container/Container';
import { bestBookList, newBookList } from '../../lib/bookTest';
import BookList from './book-list/BookList';
import styles from './Book.module.scss';

function Book() {
  const [books, setBooks] = useState(newBookList);
  const [active, setActive] = useState('new');

  const handleChangeBooks = (bookList) => {
    setBooks(bookList);
  };

  return (
    <div className={styles.book}>
      <h3>
        {active === 'new'
          ? '새롭게 만나는 책 친구들'
          : '모두가 좋아하는 책 모음'}
        <div className={styles.toggle}>
          <Button
            className={active === 'new' ? styles.active : ''}
            variant="outline"
            isRound={true}
            colors={active === 'new' ? 'mint' : 'gray'}
            onClick={() => {
              handleChangeBooks(newBookList);
              setActive('new');
            }}
          >
            신작
          </Button>
          <Button
            className={active === 'best' ? styles.active : ''}
            variant="outline"
            isRound={true}
            colors={active === 'best' ? 'mint' : 'gray'}
            onClick={() => {
              handleChangeBooks(bestBookList);
              setActive('best');
            }}
          >
            추천
          </Button>
        </div>
      </h3>
      <Container className={styles.container}>
        <BookList list={books} />
      </Container>
    </div>
  );
}

export default Book;
