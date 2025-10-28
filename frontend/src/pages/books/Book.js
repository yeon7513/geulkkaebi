import { useState } from 'react';
import { bestBookList, newBookList } from '../../lib/bookTest';
import BookList from './book-list/BookList';

function Book() {
  const [books, setBooks] = useState(newBookList);

  const handleChangeBooks = (bookList) => {
    setBooks(bookList);
  };

  return (
    <div>
      <button onClick={() => handleChangeBooks(newBookList)}>신작 도서</button>
      <button onClick={() => handleChangeBooks(bestBookList)}>추천 도서</button>
      <BookList list={books} />
    </div>
  );
}

export default Book;
