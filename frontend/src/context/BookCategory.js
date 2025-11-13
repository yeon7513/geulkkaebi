import BookBest from '../pages/books/book-best/BookBest';
import BookNewest from '../pages/books/book-newest/BookNewest';
import { useComponentContext } from './ComponentProvider';

function BookCategory() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'BookNewest':
      return <BookNewest />;
    case 'BookBest':
      return <BookBest />;
    default:
      return <BookNewest />;
  }
}

export default BookCategory;
