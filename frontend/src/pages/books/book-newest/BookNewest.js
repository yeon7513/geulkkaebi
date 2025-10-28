import { newBookList } from '../../../lib/bookTest';
import BookList from '../book-list/BookList';
import styles from './BookNewest.module.scss';

function BookNewest() {
  return (
    <div className={styles.newest}>
      <h3>신작 도서</h3>
      <BookList list={newBookList} />
    </div>
  );
}

export default BookNewest;
